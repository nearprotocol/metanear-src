export class AnimationFrame {
    x: i32;
    y: i32;
    width: i32;
    height: i32;
    // Duration in 1/60 seconds ticks
    duration: i32;
}

export class RenderInfo {
    imageUrl: string;
    animations: AnimationFrame[];
}

export class CellInfo {
  contractId: string;
  webUrl: string;
  owner: string;
  renderId: i32;
  otherPlayersCanDeploy: bool;
  // Blocking path
  blocking: bool;
  // Whether the contract (at contractId) can update this cellId.
  contractCanUpdate: bool;
}

export class Item {
  itemId: i32;
  quantity: u64;
}

export class ItemInfo {
  name: string;
  renderId: i32;
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
  freeCells: i32[];
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

export class OnDeployArgs {
  owner: string;
  location: Location;
  cellId: i32;
  updatedByContract: string;
}
