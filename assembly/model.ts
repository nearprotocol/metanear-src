export class CellInfo {
  contractId: string;
  webUrl: string;
  owner: string;
  imageUrl: string;
  otherPlayersCanDeploy: bool;
}

export class Item {
  itemId: i32;
  quantity: u64;
}

export class ItemInfo {
  name: string;
  imageUrl: string;
  // Contract ID that owns this item
  owner: string;
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

export class Player {
  accountId: string;
  location: Location;
}

export class View {
  cellIds: i32[];
  location: Location;
  cellOwner: string;
}

export class TakeItemFromPlayerArgs {
  accountId: string;
  itemId: i32;
  quantity: u32;
  cellId: i32;
  location: Location;
}

export class ItemWasTakenArgs {
  accountId: string;
  itemId: i32;
  quantity: u32;
}
