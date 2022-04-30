import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

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
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const nextTile = alphabet[Math.floor(Math.random() * alphabet.length)];
    return setTiles([...tiles, nextTile]);
  };
  const renderTiles = () => tiles.map(t => (<Tile letter={t} />));
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
