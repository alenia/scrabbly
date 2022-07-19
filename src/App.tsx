import React, { useState, useEffect } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './App.css';
import tileBag, { drawTile } from './tileBag';

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

function Rack( { tiles, discardTile } : { tiles: string[], discardTile: (tile: string) => () => void } ) {

  return (
      <TransitionGroup className="rack">
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
  const [tiles, setTiles] = useState([] as string[]);
  const [player, setPlayer] = useState(0);

  const discardTile = (tile : string) => (() => setTiles(tiles.filter((t) => t !== tile)));

  return (
    <div className={`currentPlayer${player}`}>
      <div className="buttons">
        <button onClick={() => setTiles(drawTile(tiles))}>
          Draw tile
        </button>
        <button onClick={() => setPlayer((player + 1) % playerCount)}>
          Next player
        </button>
      </div>
      <Rack tiles={tiles} discardTile={discardTile}/>
    </div>
  );
}

export default App;
