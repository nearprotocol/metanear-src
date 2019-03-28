import "allocator/arena";
export { memory };

import { context, storage, near, collections } from "./near";

import { Cell } from "./model.near";

// --- contract code goes below

export function hello(): string {
  return "Hellooooooooo NEAAAAR";
}

