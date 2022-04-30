import React, { useState, useEffect } from 'react';
import './App.css';
import tileBag from './tileBag';

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
  const drawTile = () => {
    const nextTile = tileBag[Math.floor(Math.random() * tileBag.length)];
    return setTiles([...tiles, nextTile]); // [A8, H2, ... ]
  };
  const renderTiles = () => tiles.map(t => (<Tile key={t} letter={t[0]} />));
  return (
    <div>
      <button onClick = {drawTile}>
        Draw tile
      </button>
      <div className="rack">
        { renderTiles() }
      </div>
    </div>
  );
}

export default App;
