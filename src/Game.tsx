import React, { useState } from 'react';
import Rack from './Rack';
import { PlayerCount, PlayerNumber, emptyRacks } from './rackInterfaces'
import { Tile } from './tileBag';
import helpers from './stateHelpers';

function Game({playerCount} : {playerCount: PlayerCount}) {
  const [racks, setRacks] = useState(emptyRacks);
  const [activePlayer, setActivePlayer] = useState(0 as PlayerNumber);
  const activeRack = racks[activePlayer];

  const setNextPlayer = () => { setActivePlayer(helpers.nextPlayer({player: activePlayer, playerCount})) };

  const setActiveRack = (tiles: Tile[]) => { setRacks(helpers.nextRacks(racks, { tiles, player: activePlayer })) };

  const drawTile = () => {
    //REFACTOR const nextTile = helpers.maybeNewTile(racks);
    const nextTile = helpers.maybeNewTile(helpers.allTiles(racks));
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
