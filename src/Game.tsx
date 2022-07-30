import React, { useState } from 'react';
import Rack from './Rack';
import { PlayerCount, PlayerNumber, emptyRacks } from './rackInterfaces'
import { Tile } from './tileBag';
import { nextRacks, nextPlayer, nextTileMaybe } from './reducers';

function Game({playerCount} : {playerCount: PlayerCount}) {
  const [racks, setRacks] = useState(emptyRacks);
  const [activePlayer, setActivePlayer] = useState(0 as PlayerNumber);
  const activeRack = racks[activePlayer];

  const setNextPlayer = () => { setActivePlayer(nextPlayer({player: activePlayer, playerCount})) };

  const setActiveRack = (tiles: Tile[]) => { setRacks(nextRacks(racks, { tiles, player: activePlayer })) };

  const drawTile = () => {
    const nextTile = nextTileMaybe(racks);
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
