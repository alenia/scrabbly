import React, { useEffect } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

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

function Rack( { player, tiles, discardTile, disabled } : { player: number, tiles: string[], discardTile: (tile: string) => () => void, disabled: boolean } ) {

  return (
      <TransitionGroup className={`rack player${player} ${disabled ? "playable" : "disabled"}`}>
        { tiles.map(t => (
          <CSSTransition key={t} timeout={{enter: 400, exit: 650}} classNames="tile">
            <Tile letter={t[0]} onClick={discardTile(t)}/>
          </CSSTransition>
        ))}
      </TransitionGroup>
    );
}

export default Rack;
