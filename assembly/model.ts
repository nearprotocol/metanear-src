export class CellView {
  imageUrl: string;
}

export class InventoryItem {
  name: string;
}

export class Inventory {
  items: InventoryItem[];

  static create(): Inventory {
    return {
      items: [],
    };
  }
}

export class Location {
  x: i32;
  y: i32;
  
  static create(): Location {
    return {
      x: 0,
      y: 0,
    }
  }
}

export class Cell {
  location: Location;
  viewIndex: i32;
  contractId: string;
  webUrl: string;
  owner: string;
}

export class Player {
  accountId: string;
  location: Location;
  inventory: Inventory;

  static withAccountId(accountId: string): Player {
    return {
      accountId: accountId,
      location: Location.create(),
      inventory: Inventory.create(),
    };
  }
}

export class View {
  cells: Cell[];
}

