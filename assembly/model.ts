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
  
  key(): i64 {
    let res: i64 = this.y;
    res *= 1000000000;
    res += this.x;
    return res;
  }

  static create(x: i32 = 0, y: i32 = 0): Location {
    return {x, y};
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
      accountId,
      location: Location.create(),
      inventory: Inventory.create(),
    };
  }
}

export class View {
  cells: Cell[];
}

