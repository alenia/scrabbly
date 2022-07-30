import { Tile } from './tileBag';

//Can PlayerNumber dynamically depend on playerCount? Is this overloading the concept of type checking?
export type PlayerCount = 1 | 2 | 3;
export type PlayerNumber = 0 | 1 | 2;
export interface Racks {
  0: Tile[],
  1: Tile[],
  2: Tile[],
}
export const emptyRacks = {
  0: [],
  1: [],
  2: []
} as Racks
