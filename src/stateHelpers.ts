import { PlayerNumber, PlayerCount, Racks } from './rackInterfaces'
import tileBag, { Tile } from './tileBag';

const helpers = {
  nextRacks: (racks: Racks, {tiles, player} : { tiles: Tile[], player: PlayerNumber }) : Racks => {
    const clonedRacks = { ...racks } as Racks
    clonedRacks[player] = tiles;
    return clonedRacks;
  },
  nextPlayer: ({ player, playerCount } : { player: PlayerNumber, playerCount: PlayerCount}) : PlayerNumber => (
                  (player + 1) % playerCount as PlayerNumber
  ),
  //loooooooops
  allTiles: (racks: Racks) : Tile[] => Object.values(racks).flatMap((rack) => rack),
  maybeNewTile: (tilesDrawn: Tile[]) : Tile | null => {
    if(tilesDrawn.length === tileBag.length) { return null; }

    const remainingTiles = tileBag.filter((t) => tilesDrawn.indexOf(t) === -1);

    return remainingTiles[Math.floor(Math.random() * remainingTiles.length)];
  },
}



export default helpers;
