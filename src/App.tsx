import React, { useState, useEffect } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './App.css';
import tileBag, { maybeNewTile } from './tileBag';

function Tile( { letter, onClick } : { letter : string, onClick: () => void } ) {
  useEffect(() => {
    console.log(`Adding tile ${letter}`);
    return () => { console.log(`Removing tile ${letter}`); }
  });
  return (
    <div className="tile" onClick={onClick}>
      { letter }
    </div>
  );
}

function Rack( { player, tiles, discardTile } : { player: number, tiles: string[], discardTile: (tile: string) => () => void } ) {

  return (
      <TransitionGroup className={`rack player${player}`}>
        { tiles.map(t => (
          <CSSTransition key={t} timeout={{enter: 400, exit: 650}} classNames="tile">
            <Tile letter={t[0]} onClick={discardTile(t)}/>
          </CSSTransition>
        ))}
      </TransitionGroup>
    );
}

function App() {
  const playerCount = 4;
  //TODO:
  //tiles = {
  //  0: [tile, tile, tile],
  //  1: [tile, tile, tile],
  //  2: [tile, tile, tile],
  //  3: [tile, tile]
  //}
  const [tiles, setTiles] = useState([] as string[]);
  const [player, setPlayer] = useState(0);

  const drawTile = () => {
    const nextTile = maybeNewTile(tiles);
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
        <button onClick={() => setPlayer((player + 1) % playerCount)}>
          Next player
        </button>
      </div>
      <Rack player={0} tiles={tiles} discardTile={discardTile}/>
      <Rack player={1} tiles={tiles} discardTile={discardTile}/>
    </div>
  );
}

export default App;
