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

  // Todo: pull this out into a testable method
  const drawTile = () => {
    // I don't think I like what I'm doing here filtering every time, but I also don't like the idea of hanging onto [tiles] and [remainingTiles]
    const remainingTiles = tileBag.filter((t) => tiles.indexOf(t) === -1);
    if(remainingTiles.length === 0) { return; }
    const nextTile = remainingTiles[Math.floor(Math.random() * remainingTiles.length)];
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
