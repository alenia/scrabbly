import React, { useState } from 'react';
import './App.css';
import tileBag, { maybeNewTile } from './tileBag';
import Rack from './Rack';

//const playerCount = 4;
interface Racks {
  0: string[],
  1: string[]
}

type PlayerNumber = 0 | 1;

const helpers = {
  nextRacks: (tiles: string[], player: PlayerNumber, racks: Racks) : Racks => {
    if (player === 0) {
      return { 0: tiles, 1: racks[1] }
    } else { // player === 1
      return { 0: racks[0], 1: tiles }
    }
  },
  nextPlayer: (player: PlayerNumber) : PlayerNumber => (player + 1) % 2 as PlayerNumber
}

function App() {
  const [racks, setRacks] = useState({0: [], 1: []} as Racks);
  const [activePlayer, setActivePlayer] = useState(0 as PlayerNumber);
  const activeRack = racks[activePlayer];

  const setNextPlayer = () => { setActivePlayer(helpers.nextPlayer(activePlayer)) }

  const setActiveRack = (tiles: string[]) => {
    setRacks(helpers.nextRacks(tiles, activePlayer, racks))
  }

  // this should be in the helper. Especially test that allTiles is set correctly
  const drawTile = () => {
    const allTiles = [...racks[0],...racks[1]];
    const nextTile = maybeNewTile(allTiles);
    if(!nextTile) { return }
    setActiveRack([...activeRack, nextTile])
  };

  const discardTile = (tile : string) => (() => setActiveRack(activeRack.filter((t) => t !== tile)));

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
      <Rack player={0} tiles={racks[0]} discardTile={discardTile} disabled={activePlayer === 0}/>
      <Rack player={1} tiles={racks[1]} discardTile={discardTile} disabled={activePlayer === 1}/>
    </div>
  );
}

export default App;
