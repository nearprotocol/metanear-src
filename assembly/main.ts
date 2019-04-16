import "allocator/arena";
export { memory };

import { context, storage, near, collections, ContractPromise } from "./near";

import { ItemInfo, Item, Location, Player, View, CellInfo, TakeItemFromPlayerArgs, ItemWasTakenArgs } from "./model.near";

const HOW_FAR_YOU_SEE: i32 = 7;
const NUM_CELLS_YOU_SEE: i32 = 149; // precalculated
const MAX_MOVE_DISTANCE: i32 = 7;

const CELL_ID_START = 0;
const CELL_ID_ROAD = 1;
const CELL_ID_GRASS_OFFSET = 2;
const NUM_GRASS_CELLS = 4;
const CELL_ID_N = 6;

// --- contract code goes below


let players = collections.map<string, Player>("players");

let cellIds = collections.map<i64, i32>("cellIds");
let cellInfos = collections.vector<CellInfo>("cellInfos");
let cellOwners = collections.vector<string>("cellOwners");

let itemInfos = collections.vector<ItemInfo>("itemInfos");

// Returns a Map from an ItemID to the quantity the given player has.
function playerItemsMap(accountId: string): collections.Map<i32, Item> {
  return collections.map<i32, Item>("items:" + accountId);
}

function assertPlayerCell(accountId: string): Player {
  let player = getPlayer(accountId);
  let cellId = getCellId(<Location>(player.location));
  let cellInfo = getCellInfo(cellId);
  assert(cellInfo.contractId == context.sender, "The player " + accountId + " is not at your cell");
  return player;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ITEMS
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function getItemInfo(itemId: i32): ItemInfo {
  return itemInfos[itemId];
}

export function createNewItem(itemInfo: ItemInfo): i32 {
  itemInfo.owner = context.sender;
  return itemInfos.push(itemInfo);
}

// Return next NUM_ITEMS_TO_RETURN items, fromItemId is inclusive
export function getItems(accountId: string, fromItemId: i32, limit: i32): Item[] {
  return playerItemsMap(accountId).values(fromItemId, i32.MAX_VALUE, limit);
}

export function playerHasItem(accountId: string, itemId: i32, quantity: u32): bool {
  let item = playerItemsMap(accountId).get(itemId);
  return (item != null && item.quantity >= quantity);
}

function internalIncrementItem(accountId: string, itemId: i32, increment: i64): void {
  let itemsMap = playerItemsMap(accountId);
  let item = itemsMap.get(itemId);
  let quantity: i64 = 0;
  if (item != null) {
    quantity = <i64>(item.quantity);
  }
  quantity += increment;
  assert(quantity >= 0, "Player doesn't have the required item(s)");
  if (quantity == 0) {
    itemsMap.remove(itemId);
  } else {
    itemsMap.set(itemId, {
      itemId,
      quantity,
    });
  }
}

export function giveItemToPlayer(accountId: string, itemId: i32, quantity: u32): void {
  assert(context.sender != accountId, "Can't give item to yourself");
  assert(quantity > 0, "Quantity should be positive");
  let giver = myPlayer();
  let taker = getPlayer(accountId);
  assert(giver.location.key() == taker.location.key(), "Players are not at the same location");

  internalIncrementItem(giver.accountId, itemId, -(<i64>quantity));
  internalIncrementItem(taker.accountId, itemId, <i64>quantity);
}

export function _itemWasTakenCallback(accountId: string, itemId: i32, quantity: u32): void {
  let results = ContractPromise.getResults();
  assert(results.length == 1, "WHAT?");
  if (!results[0].success) {
    // refund items
    internalIncrementItem(accountId, itemId, <i64>quantity);
  }
}

export function giveItemToCell(itemId: i32, quantity: u32): void {
  assert(context.manaLeft() >= 2, "Not enough requests to complete this transaction");
  assert(quantity > 0, "Quantity should be positive");
  let player = myPlayer();
  let cellId = getCellId(<Location>(player.location));
  let cellInfo = getCellInfo(cellId);
  assert(cellInfo.contractId != null && cellInfo.contractId.length > 0, "Empty contract on the cell");

  internalIncrementItem(player.accountId, itemId, -(<i64>quantity));

  let takeItemFromPlayerArgs: TakeItemFromPlayerArgs = {
    accountId: player.accountId,
    itemId,
    quantity,
    location: player.location,
    cellId,
  };

  let promise = ContractPromise.create(
      cellInfo.contractId,
      "takeItemFromPlayer",
      takeItemFromPlayerArgs.encode(),
      context.manaLeft() - 2,
      0,
  );

  let itemWasTakenArgs: ItemWasTakenArgs = {
    accountId: player.accountId,
    itemId,
    quantity,
  };
  promise = promise.then(
      context.contractName,
      "_itemWasTakenCallback",
      itemWasTakenArgs.encode(),
  );
  promise.returnAsResult();
}

export function addItem(accountId: string, itemId: i32, quantity: u32): void {
  assert(quantity > 0, "Quantity should be positive");
  // Check item ID
  assert(itemInfos.containsIndex(itemId), "Unknown item type");
  // Verify item can be given by this contract
  let itemInfo = getItemInfo(itemId);
  assert(context.sender == itemInfo.owner, "Item can only be given by " + itemInfo.owner);
  // Check that the given player (accountId) is at the cell with the caller contract.
  assertPlayerCell(accountId);
  internalIncrementItem(accountId, itemId, <i64>quantity);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Player APIs
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function getPlayer(accountId: string): Player {
  let player = players.get(accountId, null);
  if (player == null) {
    player = {
      accountId,
      location: Location.create(),
    };
  }
  return player;
}

function myPlayer(): Player {
  return getPlayer(context.sender);
}

export function move(dx: i32, dy: i32): View {
  assert(
      dx >= -MAX_MOVE_DISTANCE &&
      dx <= MAX_MOVE_DISTANCE &&
      dy >= -MAX_MOVE_DISTANCE &&
      dy <= MAX_MOVE_DISTANCE &&
      dx * dx + dy * dy <= MAX_MOVE_DISTANCE * MAX_MOVE_DISTANCE,
    "Can move so far");
  let p = myPlayer();
  p.location.x += dx;
  p.location.y += dy;
  players.set(p.accountId, p);
  return lookAround(p.accountId);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Cells
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function getCellInfo(index: i32): CellInfo {
  return cellInfos[index];
}

export function createNewCell(cellInfo: CellInfo): i32 {
  cellInfo.owner = context.sender;
  return cellInfos.push(cellInfo);
}

function isRoad(x: i32): bool {
  x = abs(x);
  if (x <= 10) {
    return (x == 1 || x == 3 || x == 6 || x == 10);
  }
  let sqrt_x = <i32>(sqrt<f32>(x * 2));
  return sqrt_x * (sqrt_x + 1) == x * 2;
}

function getLockedCellId(location: Location): i32 {
  if (location.x == 0 && location.y == 0) {
    return CELL_ID_START;
  }
  if (isRoad(location.x) || isRoad(location.y)) {
    return CELL_ID_ROAD;
  }
  return -1;
}

function getCellId(location: Location): i32 {
  let lockedCellId = getLockedCellId(location);
  if (lockedCellId >= 0) {
    return lockedCellId;
  }
  let key = location.key();
  let cellId = cellIds.get(key, -1);
  if (cellId >= 0) {
    return cellId;
  } else {
    return CELL_ID_GRASS_OFFSET + near.hash32(key) % NUM_GRASS_CELLS;
  }
}

export function deploy(cellId: i32): void {
  // Check cellID
  assert(cellInfos.containsIndex(cellId), "Unknown cell type");
  // Verify cellInfo can be deployed by this user
  let cellInfo = getCellInfo(cellId);
  if (!cellInfo.otherPlayersCanDeploy) {
    assert(context.sender == cellInfo.owner, "This cell type can't be deployed by other players");
  }
  // Verify the location is not locked by the road
  let p = myPlayer();
  let location = <Location>p.location;
  let lockedCellId = getLockedCellId(location);
  assert(lockedCellId < 0, "Can't deploy on the locked cell (e.g. public roads)");
  // Verify the location is not owner by someone else
  const locationKey = location.key();
  let cellOwner = cellOwners.get(locationKey);
  assert(cellOwner == null || p.accountId == cellOwner, "This cell is owned by other player");
  // TODO: Check how many cells player can deploy.
  cellIds.set(locationKey, cellId);
  if (cellOwner == null) {
    cellOwners.set(locationKey, p.accountId);
  }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// View
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function lookAround(accountId: string): View {
  let p = getPlayer(accountId);
  let view = new View();
  view.cells = new Array<i32>(NUM_CELLS_YOU_SEE);
  let n = 0;
  for (let i = -HOW_FAR_YOU_SEE; i <= HOW_FAR_YOU_SEE; ++i) {
    for (let j = -HOW_FAR_YOU_SEE; j <= HOW_FAR_YOU_SEE; ++j) {
      if (i * i + j * j <= HOW_FAR_YOU_SEE * HOW_FAR_YOU_SEE) {
        // inside
        view.cells[n++] = getCellId(<Location>(Location.create(p.location.x + j, p.location.y + i)));
      }
    }
  }
  assert(n == NUM_CELLS_YOU_SEE, "Internal bug with number of cells you see");
  view.cellOwner = cellOwners.get(p.location.key());
  view.location = p.location;
  return view;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Init function
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function init(isTest: bool): void {
  assert(context.sender == context.contractName, "Can only be called by the contract owner");
  if (storage.get<bool>("initiated", false)) {
    return;
  }

  if (isTest) {
    // let cell = getCell(new Location());
    // cell.contractId = context.sender;
    // saveCell(cell);
    // return;
  }

  const owner = context.contractName;
  storage.set<bool>("initiated", true);
  cellInfos.push({
    webUrl: "https://metanear.com/start/",
    imageUrl: "/imgs/start.png",
    owner,
    otherPlayersCanDeploy: false,
  });
  cellInfos.push({
    imageUrl: "/imgs/road.png",
    owner,
    otherPlayersCanDeploy: true,
  });
  cellInfos.push({
    imageUrl: "/imgs/grass0.png",
    owner,
    otherPlayersCanDeploy: true,
  });
  cellInfos.push({
    imageUrl: "/imgs/grass1.png",
    owner,
    otherPlayersCanDeploy: true,
  });
  cellInfos.push({
    imageUrl: "/imgs/grass2.png",
    owner,
    otherPlayersCanDeploy: true,
  });
  cellInfos.push({
    imageUrl: "/imgs/grass3.png",
    owner,
    otherPlayersCanDeploy: true,
  });
  assert(cellInfos.length == CELL_ID_N, "Incorrect default parameters");
}
