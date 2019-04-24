import "allocator/arena";
export { memory };

import { context, storage, near, collections, ContractPromise } from "./near";

import { ItemInfo, Item, Location, Player, View, CellInfo, TakeItemFromPlayerArgs, ItemWasTakenArgs,
    RenderInfo, OnDeployArgs } from "./model.near";

const KEY_INITIATED = "initiated";
const METHOD_NAME_ON_DEPLOY = "onDeploy";

const MAX_DISTANCE_TO_SEE: i32 = 7;
const NUM_CELLS_YOU_SEE: i32 = 15 * 15;
const MAX_DISTANCE_TO_DEPLOY: i32 = 7;
const DX: i32[] = [1, 0, -1, 0];
const DY: i32[] = [0, 1, 0, -1];

const CELL_ID_START = 0;
const CELL_ID_ROAD = 1;
const CELL_ID_GRASS_OFFSET = 2;
const NUM_GRASS_CELLS = 4;
const CELL_ID_WATER = 6;
const CELL_ID_WALL = 7;
const CELL_ID_N = 8;

// --- contract code goes below

let renderInfos = collections.vector<RenderInfo>("renderInfos");

let players = collections.map<string, Player>("players");

let cellInfos = collections.vector<CellInfo>("cellInfos");
let cellIds = collections.map<i64, i32>("cellIds");
let cellOwners = collections.map<i64, string>("cellOwners");

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
  assert(renderInfos.containsIndex(itemInfo.renderId), "Missing render info");
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
    itemsMap.delete(itemId);
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
  assert(context.manaLeft >= 2, "Not enough requests to complete this transaction");
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
      context.manaLeft - 2,
      0,
  );

  let itemWasTakenArgs: ItemWasTakenArgs = {
    accountId: player.accountId,
    itemId,
    quantity,
  };
  promise = promise.then(
      "_itemWasTakenCallback",
      itemWasTakenArgs.encode(),
      0,
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

function isClose(dx: i32, dy: i32, maxDistance: i32): bool {
  return  dx >= -maxDistance &&
      dx <= maxDistance &&
      dy >= -maxDistance &&
      dy <= maxDistance;
}

export function move(path: i32[]): View {
  // assert(isClose(dx, dy, MAX_DISTANCE_TO_MOVE), "Can move that far");
  let p = myPlayer();
  let n = path.length;
  for (let i = 0; i < n; ++i) {
    let direction = path[i];
    assert(direction >= 0 && direction < 4, "Direction is out of range");
    p.location.x += DX[direction];
    p.location.y += DY[direction];
    let cellId = getCellId(<Location>p.location);
    let cellInfo = getCellInfo(cellId);
    assert(!cellInfo.blocking, "One of the cells on the way is blocking path");
  }
  players.set(p.accountId, p);
  return lookAround(p.accountId);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Renders
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export function getRenderInfo(renderId: i32): RenderInfo {
    return renderInfos[renderId];
}

export function createNewRender(renderInfo: RenderInfo): i32 {
    return renderInfos.push(renderInfo);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Cells
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function getCellInfo(cellId: i32): CellInfo {
  return cellInfos[cellId];
}

export function createNewCell(cellInfo: CellInfo): i32 {
  assert(renderInfos.containsIndex(cellInfo.renderId), "Missing render info");
  cellInfo.owner = context.sender;
  return cellInfos.push(cellInfo);
}

function isRoad(x: i32): bool {
  // Roads are 2, 7, 13, 19, 26 ...
  x = abs(x);
  if (x <= 12) {
    return (x == 2 || x == 7);
  }
  x = x * 2 + 4;
  let sqrt_x = <i32>sqrt(<f32>x);
  return sqrt_x * (sqrt_x + 1) == x;
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

export function updateCellByContract(location: Location, cellId: i32): void {
  assert(cellInfos.containsIndex(cellId), "Unknown cell type");
  let cellInfo = getCellInfo(cellId);
  if (!cellInfo.otherPlayersCanDeploy) {
    assert(context.sender == cellInfo.owner, "This cell type can't be deployed by other players");
  }
  let currentCellId = getCellId(location);
  let currentCellInfo = getCellInfo(currentCellId);
  assert(currentCellInfo.contractCanUpdate, "Cell at the given location can't be updated by the contract");
  assert(context.sender == currentCellInfo.contractId, "Only contract can change types of its cells");
  cellIds.set(location.key(), cellId);
  // Calling contract with onDeploy
  if (cellInfo.contractId != null && cellInfo.contractId.length > 0 && context.manaLeft > 0) {
    let owner = cellOwners.get(location.key());
    let args: OnDeployArgs = {
      owner,
      location,
      cellId,
      updatedByContract: currentCellInfo.contractId,
    };
    ContractPromise.create(
      cellInfo.contractId,
      METHOD_NAME_ON_DEPLOY,
      args.encode(),
      context.manaLeft - 1,
      0,
    );
  }
}

export function deploy(dx: i32, dy: i32, cellId: i32): void {
  // Check cellID
  assert(cellInfos.containsIndex(cellId), "Unknown cell type");
  // Is it within close distance to deploy.
  assert(isClose(dx, dy, MAX_DISTANCE_TO_DEPLOY), "Can't deploy that far");
  // Verify cellInfo can be deployed by this user
  let cellInfo = getCellInfo(cellId);
  if (!cellInfo.otherPlayersCanDeploy) {
    assert(context.sender == cellInfo.owner, "This cell type can't be deployed by other players");
  }
  // Verify the location is not locked by the road
  let p = myPlayer();
  let location = Location.create(p.location.x + dx, p.location.y + dy);
  let lockedCellId = getLockedCellId(<Location>location);
  assert(lockedCellId < 0, "Can't deploy on the locked cell (e.g. public roads)");
  // Verify the location is not owner by someone else
  let locationKey = location.key();
  let cellOwner = cellOwners.get(locationKey);
  assert(cellOwner == null || p.accountId == cellOwner, "This cell is owned by other player");
  // TODO: Check how many cells player can deploy.
  cellIds.set(locationKey, cellId);
  if (cellOwner == null) {
    cellOwners.set(locationKey, p.accountId);
  }
  // Calling contract with onDeploy
  if (cellInfo.contractId != null && cellInfo.contractId.length > 0 && context.manaLeft > 0) {
    let args: OnDeployArgs = {
      owner: p.accountId,
      location,
      cellId,
    };
    ContractPromise.create(
      cellInfo.contractId,
      METHOD_NAME_ON_DEPLOY,
      args.encode(),
      context.manaLeft - 1,
      0,
    );
  }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// View
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function lookAround(accountId: string, withOwned: bool = false): View {
  let p = getPlayer(accountId);
  let view = new View();
  view.cellIds = new Array<i32>(NUM_CELLS_YOU_SEE);
  let n = 0;
  if (withOwned) {
    view.freeCells = new Array<i32>(NUM_CELLS_YOU_SEE);
  }
  for (let i = -MAX_DISTANCE_TO_SEE; i <= MAX_DISTANCE_TO_SEE; ++i) {
    for (let j = -MAX_DISTANCE_TO_SEE; j <= MAX_DISTANCE_TO_SEE; ++j) {
      // inside
      let loc = Location.create(p.location.x + j, p.location.y + i);
      let cellId = getCellId(<Location>loc);
      view.cellIds[n] = cellId;
      if (withOwned && cellId >= 2) {
        let owner = cellOwners.get(loc.key());
        if (owner == null || owner == accountId) {
          view.freeCells[n] = 1;
        }
      }
      ++n;
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
  // assert(context.sender == context.contractName, "Can only be called by the contract owner");
  if (storage.get<bool>(KEY_INITIATED, false)) {
    return;
  }

  if (isTest) {
    // let cell = getCell(new Location());
    // cell.contractId = context.sender;
    // saveCell(cell);
    // return;
  }
  let owner = context.contractName;
  for (let i = -1; i <= 1; ++i) {
    for (let j = -1; j <= 1; ++j) {
      cellOwners.set(Location.create(j, i).key(), owner);
    }
  }
  let N: i32[][] = [
    [1, 0, 0, 1],
    [1, 1, 0, 1],
    [1, 0, 1, 1],
    [1, 0, 0, 1],
  ];
  for (let i = 0; i < N.length; ++i) {
    for (let j = 0; j < N[i].length; ++j) {
      if (N[i][j]) {
        let key = Location.create(-6 + j, -6 + i).key();
        cellIds.set(key, CELL_ID_WALL);
        cellOwners.set(key, owner);
      }
    }
  }
  storage.set<bool>(KEY_INITIATED, true);
  renderInfos.push({ imageUrl: "/static/imgs/start.png" });
  renderInfos.push({ imageUrl: "/static/imgs/road.png" });
  renderInfos.push({ imageUrl: "/static/imgs/grass0.png" });
  renderInfos.push({ imageUrl: "/static/imgs/grass1.png" });
  renderInfos.push({ imageUrl: "/static/imgs/grass2.png" });
  renderInfos.push({ imageUrl: "/static/imgs/grass3.png" });
  renderInfos.push({ imageUrl: "/static/imgs/water.png" });
  renderInfos.push({ imageUrl: "/static/imgs/wall.png" });
  cellInfos.push({
    webUrl: "/start/",
    renderId: 0,
    owner,
    otherPlayersCanDeploy: false,
  });
  cellInfos.push({
    renderId: 1,
    owner,
    otherPlayersCanDeploy: false,
  });
  cellInfos.push({
    renderId: 2,
    owner,
    otherPlayersCanDeploy: true,
  });
  cellInfos.push({
    renderId: 3,
    owner,
    otherPlayersCanDeploy: true,
  });
  cellInfos.push({
    renderId: 4,
    owner,
    otherPlayersCanDeploy: true,
  });
  cellInfos.push({
    renderId: 5,
    owner,
    otherPlayersCanDeploy: true,
  });
  cellInfos.push({
    renderId: 6,
    owner,
    otherPlayersCanDeploy: true,
    blocking: true,
  });
  cellInfos.push({
    renderId: 7,
    owner,
    otherPlayersCanDeploy: true,
    blocking: true,
  });
  assert(cellInfos.length == CELL_ID_N, "Incorrect default parameters");
}
