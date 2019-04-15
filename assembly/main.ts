import "allocator/arena";
export { memory };

import { context, storage, near, collections } from "./near";

import { ItemInfo, Item, Location, Player, View, CellInfo } from "./model.near";

const HOW_FAR_YOU_SEE: i32 = 7;
const NUM_CELLS_YOU_SEE: i32 = 149; // precalculated
const MAX_MOVE_DISTANCE: i32 = 7;
const ROAD_EVERY_N = 9;

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
function playerItemsMap(accountId: string): collections.Map<i32, u64> {
  return collections.map<i32, u64>("items:" + accountId);
}


function assertPlayerCell(accountId: string): Player {
  let player = getPlayer(accountId);
  let cellId = getCellId(<Location>(player.location));
  let cellInfo = getCellInfo(cellId);
  assert(cellInfo.contractId == context.sender, "The player " + accountId + " is not at your cell");
  return player;
}

export function getItemInfo(itemId: i32): ItemInfo {
  return itemInfos[itemId];
}

export function addItem(accountId: string, itemId: i32, quantity: u32): void {
  assert(quantity > 0, "Quantity should be positive");
  // Check item ID
  assert(itemInfos.containsIndex(itemId), "Unknown item type");
  // Verify item can be given by this contract
  let itemInfo = getItemInfo(itemId);
  if (!itemInfo.otherContractsCanAdd) {
    assert(context.sender == itemInfo.owner, "This item type can't be given by other contracts");
  }
  // Check that the given player (accountId) is at the cell with the caller contract.
  assertPlayerCell(accountId);
  // Incrementing number of items
  let itemsMap = playerItemsMap(accountId);
  itemsMap.set(itemId, itemsMap.get(itemId, 0) + <u64>quantity);
}

// Player APIs

function savePlayer(player: Player): void {
  players.set(player.accountId, player);
}

export function getPlayer(accountId: string): Player {
  let player = players.get(accountId, null);
  if (player == null)
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
  savePlayer(p);
  return lookAround(p.accountId);
}

// Cells

export function getCellInfo(index: i32): CellInfo {
  return cellInfos[index];
}

function getLockedCellId(location: Location): i32 {
  if (location.x == 0 && location.y == 0) {
    return CELL_ID_START;
  }
  if (location.x % ROAD_EVERY_N == 0 || location.y % ROAD_EVERY_N == 0) {
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

// View

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

// Init function

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
