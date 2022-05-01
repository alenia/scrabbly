import React, { useState, useEffect } from 'react';
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

  const renderTiles = () => tiles.map(t => (<Tile key={t} letter={t[0]} onClick={removeTile(t)}/>));
  return (
    <div>
      <button onClick = {() => setTiles(drawTile(tiles))}>
        Draw tile
      </button>
      <div className="rack">
        { renderTiles() }
      </div>
    </div>
  );
}

export default App;
