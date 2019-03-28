import "allocator/arena";
export { memory };

import { context, storage, near, collections } from "./near";

import { Cell, Inventory, InventoryItem } from "./model.near";
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

