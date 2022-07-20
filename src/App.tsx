import React, { useState } from 'react';
import './App.css';
import tileBag, { maybeNewTile } from './tileBag';
import Rack from './Rack';

//const playerCount = 4;
//TODO: is this the right name?
interface PlayerRacks {
  0: string[],
  1: string[]
}

type PlayerNumber = 0 | 1;

const helpers = {
  nextPlayerRacks: (tiles: string[], player: PlayerNumber, playerRacks: PlayerRacks) : PlayerRacks => {
    if (player === 0) {
      return { 0: tiles, 1: playerRacks[1] }
    } else { // player === 1
      return { 0: playerRacks[0], 1: tiles }
    }
  },
  nextPlayer: (player: PlayerNumber) : PlayerNumber => (player + 1) % 2 as PlayerNumber
}

function App() {
  const [playerRacks, setPlayerRacks] = useState({0: [], 1: []} as PlayerRacks);
  const [activePlayer, setActivePlayer] = useState(0 as PlayerNumber);
  const activeRack = playerRacks[activePlayer];

  const setNextPlayer = () => { setActivePlayer(helpers.nextPlayer(activePlayer)) }

  const setTiles = (tiles: string[]) => {
    setPlayerRacks(helpers.nextPlayerRacks(tiles, activePlayer, playerRacks))
  }

  const drawTile = () => {
    const allTiles = [...playerRacks[0],...playerRacks[1]];
    const nextTile = maybeNewTile(allTiles);
    if(!nextTile) { return }
    setTiles([...activeRack, nextTile])
  };

  const discardTile = (tile : string) => (() => setTiles(activeRack.filter((t) => t !== tile)));

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
      <Rack player={0} tiles={playerRacks[0]} discardTile={discardTile} disabled={activePlayer === 0}/>
      <Rack player={1} tiles={playerRacks[1]} discardTile={discardTile} disabled={activePlayer === 1}/>
    </div>
  );
}

export default App;
