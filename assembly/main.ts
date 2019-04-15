import "allocator/arena";
export { memory };

import { context, storage, near, collections } from "./near";

import { InventoryItem, Location, Player, View, CellInfo } from "./model.near";

const HOW_FAR_YOU_SEE: i32 = 7;
const NUM_CELLS_YOU_SEE: i32 = 149; // precalculated
const MAX_MOVE_DISTANCE: i32 = 7;
const ROAD_EVERY_N = 9;

const CELL_ID_START = 0;
const CELL_ID_ROAD = 1;
const CELL_ID_GRASS_OFFSET = 2;
const NUM_GRASS_CELLS = 4;

// --- contract code goes below


let players = collections.map<string, Player>("players");
let cellIds = collections.map<i64, i32>("cellIds");
let cellInfos = collections.vector<CellInfo>("cellInfos");
let cellOwners = collections.vector<string>("cellOwners");

// Items
function playerInventoryMap(accountId: string): Map<string, InventoryItem> {
  return collections.map<string, InventoryItem>("items:" + accountId);
}

/*
function assertPlayerCell(accountId: string): void {
  let player = getPlayer(accountId);
  let cell = getCell(<Location>(player.location));
  assert(cell.contractId == context.sender, "The player " + accountId + " is not at your cell");
}

export function addItem(accountId: string, itemId: string): void {
  /*
  let inventory = getItems(accountId);
  let itemToAdd = new InventoryItem();
  itemToAdd.name = itemId;
  itemToAdd.source = context.sender;
  inventory.items.push(itemToAdd);
  saveInventory(inventory);
}
*/

// Player APIs

function savePlayer(player: Player): void {
  players.set(player.accountId, player);
}

export function getPlayer(accountId: string): Player {
  if (players.containsKey(accountId)) {
    return players.get(accountId);
  } else {
    return <Player>(Player.withAccountId(accountId));
  }
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
  assert(cellInfos.containsIndex(cellId), "Unknown cell type");
  let cellInfo = cellInfos[cellId];
  if (!cellInfo.otherPlayersCanDeploy) {
    assert(context.sender == cellInfo.owner, "This cell type can't be deployed by other players");
  }
  let p = myPlayer();
  let location = <Location>p.location;
  let lockedCellId = getLockedCellId(location);
  assert(lockedCellId < 0, "Can't deploy on the locked cell (e.g. public roads)");
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
}
