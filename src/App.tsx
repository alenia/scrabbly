import React, { useState, useEffect } from 'react';
import './App.css';
import tileBag, { drawTile } from './tileBag';

function Tile( { letter } : { letter : string } ) {
  useEffect(() => {
    console.log(`Adding tile ${letter}`);
    return () => { console.log(`Removing tile ${letter}`); }
  });
  return (
    <div className="tile">
      { letter }
    </div>
  );
}

function App() {
  const [tiles, setTiles] = useState([] as string[]);

  const renderTiles = () => tiles.map(t => (<Tile key={t} letter={t[0]} />));
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
