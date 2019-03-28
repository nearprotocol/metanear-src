import "allocator/arena";
export { memory };

import { context, storage, near, collections } from "./near";

import { Cell, Inventory, InventoryItem, Location, Player, View, CellView } from "./model.near";

const HOW_FAR_YOU_SEE: i32 = 7;
const NUM_CELLS_YOU_SEE: i32 = 149; // precalculated

// --- contract code goes below

export function hello(): string {
  return "Hellooooooooo NEAAAAR";
}


// Items

export function getItems(accountId: string): Inventory {
  return <Inventory>(getPlayer(accountId).inventory);
}

export function addItem(accountId: string, itemId: string): void {
  let player = getPlayer(accountId);
  let cell = getCell(<Location>(player.location));
  assert(cell.contractId == context.sender, "The player is not at your cell");
  let itemToAdd = new InventoryItem();
  itemToAdd.name = itemId;
  player.inventory.items.push(itemToAdd);
  savePlayer(player);
}

// Player APIs

let players = collections.map<string, Player>("players");

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

// Cells

let cellViews = collections.vector<CellView>("cellViews");

function saveCell(cell: Cell): void {
  cells.set(<Location>(cell.location), cell);
}

export function getCellView(index: i32): CellView {
  return cellViews[index];
}

let cells = collections.map<Location, Cell>("cells");

function getCell(location: Location): Cell {
  if (cells.containsKey(location)) {
    return cells.get(location);
  } else {
    let cell = new Cell();
    cell.location = location;
    cell.viewIndex = 0;
    return cell;
  }
}

export function lookAround(accountId: string): View {
  let p = getPlayer(accountId);
  let view = new View();
  view.cells = new Array<Cell>(NUM_CELLS_YOU_SEE);
  let n = 0;
  for (let i = -HOW_FAR_YOU_SEE; i <= HOW_FAR_YOU_SEE; ++i) {
    for (let j = -HOW_FAR_YOU_SEE; j <= HOW_FAR_YOU_SEE; ++j) {
      if (i * i + j * j <= HOW_FAR_YOU_SEE * HOW_FAR_YOU_SEE) {
        // inside
        view.cells[n++] = getCell(<Location>(Location.create(p.location.x + j, p.location.y + i)));
      }
    }
  }
  return view;
}

// Init function

export function init(isTest: bool): void {
  if (storage.get<bool>("initiated", false)) {
    return;
  }

  if (isTest) {
    let cell = getCell(new Location());
    cell.contractId = context.sender;
    saveCell(cell);    
    return;
  }

  storage.set<bool>("initiated", true);
  cellViews.push({
    imageUrl: "/imgs/grass.png",
  });
}
