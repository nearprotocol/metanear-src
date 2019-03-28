// Basic data model
export class Cell {
  render: string;
  contractId: string;
  webURL: string;
  owner: string;
}

export class InventoryItem {
  name: string;
}

export class Inventory {
  items: Array<InventoryItem>;
}

