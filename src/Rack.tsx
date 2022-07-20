import React, { useEffect } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Tile } from './tileBag';

function TileComponent( { letter, onClick } : { letter : string, onClick: () => void } ) {
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

function Rack( { player, tiles, discardTile, disabled } : { player: number, tiles: Tile[], discardTile: (tile: Tile) => () => void, disabled: boolean } ) {

  return (
      <TransitionGroup className={`rack player${player} ${disabled ? "playable" : "disabled"}`}>
        { tiles.map(t => (
          <CSSTransition key={t} timeout={{enter: 400, exit: 650}} classNames="tile">
            <TileComponent letter={t[0]} onClick={discardTile(t)}/>
          </CSSTransition>
        ))}
      </TransitionGroup>
    );
}

export default Rack;
