import { PlayerNumber, PlayerCount, Racks } from './rackInterfaces'
import tileBag, { Tile } from './tileBag';

export const nextRacks = (racks: Racks, {tiles, player} : { tiles: Tile[], player: PlayerNumber }) : Racks => {
  const clonedRacks = { ...racks } as Racks
  clonedRacks[player] = tiles;
  return clonedRacks;
};

export const nextPlayer =  ({ player, playerCount } : { player: PlayerNumber, playerCount: PlayerCount}) : PlayerNumber => (
  (player + 1) % playerCount as PlayerNumber
);

// I'm making these "private" but tested so I can test the parts separately, but they are only used together
export const _allTiles = (racks: Racks) : Tile[] => Object.values(racks).flatMap((rack) => rack);
export const _maybeNewTile = (tilesDrawn: Tile[]) : Tile | null => {
  if(tilesDrawn.length === tileBag.length) { return null; }

  const remainingTiles = tileBag.filter((t) => tilesDrawn.indexOf(t) === -1);

  return remainingTiles[Math.floor(Math.random() * remainingTiles.length)];
};

// TODO: test this combined method somehow? currently covered by component tests
export const nextTileMaybe = (racks: Racks) : Tile | null => {
  return _maybeNewTile(_allTiles(racks));
}

