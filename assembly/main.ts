import { context, storage, near, collections } from "./near";

import { Cell, Inventory, InventoryItem, Location, Player, View, CellView } from "./model.near";
const ITEM_KEY_PREFIX : string = "metanear_inv_";

// --- contract code goes below

export function hello(): string {
  return "Hellooooooooo NEAAAAR";
}


export function getItems(): Inventory {
  let encodedInventory = storage.getBytes(ITEM_KEY_PREFIX + context.sender);
  //  storage.getBytes(ITEM_KEY_PREFIX + near.str(1)));
  if (encodedInventory) {
    let inventory = Inventory.decode(encodedInventory);
    return inventory;
  }
  let blankInventory = new Inventory();
  blankInventory.items = [];
  return blankInventory;
}

export function addItem(itemId: string): void {
  // check if your inventory is initialized
  let encodedInventory = storage.getBytes(ITEM_KEY_PREFIX + context.sender);
  let itemToAdd = new InventoryItem();
  itemToAdd.name = itemId;
  if (!encodedInventory) {
    let inventory = new Inventory();
    inventory.items = new Array();
    inventory.items.push(itemToAdd);
    storage.setBytes(
      ITEM_KEY_PREFIX + context.sender,
      inventory.encode()
    );
  } else {
    let inventory = Inventory.decode(encodedInventory);
    inventory.items.push(itemToAdd);
    storage.setBytes(
      ITEM_KEY_PREFIX + context.sender,
      inventory.encode()
    );
  }
}

// Player APIs

let players = collections.map<string, Player>("players");

export function otherPlayer(accountId: string): Player {
  if (players.containsKey(accountId)) {
    return players.get(accountId);
  } else {
    return new Player(accountId);
  }
}

export function player(): Player {
  return otherPlayer(context.sender);
}


// Cells

let cellViews = collections.vector<CellView>("cellViews");

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
    cells.set(location, cell);
    return cell;
  }
}

export function lookAround(): View {
  let p = player();
  let view = new View();
  return view;
}


// Init function

export function init(): void {
  if (storage.get<bool>("initiated", false)) {
    return;
  }

  storage.set<bool>("initiated", true);
  cellViews.push({
    imageUrl: "/imgs/grass.png",
  });
}
