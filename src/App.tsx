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

//function Rack( { tiles } : { tiles: string[] } ) {
//}

function App() {
  const [tiles, setTiles] = useState([] as string[]);

  const removeTile = (tile : string) => (() => setTiles(tiles.filter((t) => t !== tile)));

  return (
    <div>
      <button onClick = {() => setTiles(drawTile(tiles))}>
        Draw tile
      </button>
      <TransitionGroup className="rack">
      { tiles.map(t => (
        <CSSTransition key={t} timeout={{enter: 400, exit: 650}} classNames="tile">
          <Tile letter={t[0]} onClick={removeTile(t)}/>
        </CSSTransition>
      ))}
      </TransitionGroup>
    </div>
  );
}

export default App;
