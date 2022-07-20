import React, { useState } from 'react';
import './App.css';
import tileBag, { maybeNewTile } from './tileBag';
import Rack from './Rack';

function App() {
  //const playerCount = 4;
  //TODO: racks should be dynamically generated from playerCount. currently it just assumes 2 players.
  //racks = {
  //  0: [tile, tile, tile],
  //  1: [tile, tile, tile],
  //  2: [tile, tile, tile],
  //  3: [tile, tile]
  //}
  const [playerRacks, setPlayerRacks] = useState({0: [], 1: []} as {0: string[], 1: string[]});
  const [player, setPlayer] = useState(0 as 0 | 1);
  const allTiles = [...playerRacks[0],...playerRacks[1]];
  const tiles = playerRacks[player];

  const setTiles = (tiles: string[]) => {
    if ( player === 0 ) {
      setPlayerRacks({0: tiles, 1: playerRacks[1] })
    }
    if (player === 1 ) {
      setPlayerRacks({0: playerRacks[0], 1: tiles })
    }
  }

  const setNextPlayer = () => {
    // note playerCount is 2
    let nextPlayer = (player + 1) % 2 as 0 | 1;
    setPlayer(nextPlayer);
  }

  const drawTile = () => {
    const nextTile = maybeNewTile(allTiles);
    if(!nextTile) { return }
    setTiles([...tiles, nextTile])
  };

  const discardTile = (tile : string) => (() => setTiles(tiles.filter((t) => t !== tile)));

  return (
    <div className={`currentPlayer${player}`}>
      <div className="buttons">
        <button onClick={drawTile}>
          Draw tile
        </button>
        <button onClick={setNextPlayer}>
          Next player
        </button>
      </div>
      <Rack player={0} tiles={playerRacks[0]} discardTile={discardTile} disabled={player === 0}/>
      <Rack player={1} tiles={playerRacks[1]} discardTile={discardTile} disabled={player === 1}/>
    </div>
  );
}

export default App;
