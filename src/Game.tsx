import React, { useState } from 'react';
import { Tile, maybeNewTile } from './tileBag';
import Rack from './Rack';


//Can PlayerNumber dynamically depend on playerCount? Is this overloading the concept of type checking?
type PlayerCount = 1 | 2 | 3;
type PlayerNumber = 0 | 1 | 2;
interface Racks {
  0: Tile[],
  1: Tile[],
  2: Tile[],
}
const emptyRacks = {
  0: [],
  1: [],
  2: []
} as Racks

// Exporting just for test
export const helpers = {
  nextRacks: (racks: Racks, {tiles, player} : { tiles: Tile[], player: PlayerNumber }) : Racks => {
    const clonedRacks = { ...racks } as Racks
    clonedRacks[player] = tiles;
    return clonedRacks;
  },
  nextPlayer: ({ player, playerCount } : { player: PlayerNumber, playerCount: PlayerCount}) : PlayerNumber => (
                  (player + 1) % playerCount as PlayerNumber
  ),
  //loooooooops
  allTiles: (racks: Racks) : Tile[] => Object.values(racks).flatMap((rack) => rack)
}

function Game({playerCount} : {playerCount: PlayerCount}) {
  const [racks, setRacks] = useState(emptyRacks);
  const [activePlayer, setActivePlayer] = useState(0 as PlayerNumber);
  const activeRack = racks[activePlayer];

  const setNextPlayer = () => { setActivePlayer(helpers.nextPlayer({player: activePlayer, playerCount})) };

  const setActiveRack = (tiles: Tile[]) => { setRacks(helpers.nextRacks(racks, { tiles, player: activePlayer })) };

  // this should be in the helper. Especially test that allTiles is set correctly
  const drawTile = () => {
    const nextTile = maybeNewTile(helpers.allTiles(racks));
    if(!nextTile) { return }
    setActiveRack([...activeRack, nextTile])
  };

  const discardTile = (tile : Tile) => (() => setActiveRack(activeRack.filter((t) => t !== tile)));

  return (
    <div className={`currentPlayer${activePlayer}`}>
      <div className="buttons">
        <button onClick={drawTile}>
          Draw tile
        </button>
        <button onClick={setNextPlayer}>
          Next player
        </button>
      </div>
      {
        ([...Array(playerCount)]).map((_,i) => (
          <Rack key={`player${i}`} player={i} tiles={racks[i as PlayerNumber]} discardTile={discardTile} disabled={activePlayer !== i}/>
        ))
      }
    </div>
  );
}

export default Game;
