export class CellView {
  imageUrl: string;
}

export class Cell {
  location: Location;
  viewIndex: i32;
  contractId: string;
  webUrl: string;
  owner: string;
}

export class InventoryItem {
  name: string;
}

export class Inventory {
  items: Array<InventoryItem>;
}

export class Location {
  x: i32;
  y: i32;
  
  constructor() {
    this.x = 0;
    this.y = 0;
  }
}

export class Player {
  accountId: string;
  location: Location;

  constructor(accountId: string = null) {
    this.accountId = accountId;
    this.location = new Location();
  }
}

export class View {
  cells: Cell[];
}
