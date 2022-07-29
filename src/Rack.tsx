import React, { useEffect } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Tile } from './tileBag';

function TileComponent( { tile, onClick } : { tile : Tile, onClick: () => void } ) {
  useEffect(() => {
    console.log(`Adding tile ${tile}`);
    return () => { console.log(`Removing tile ${tile}`); }
  });
  return (
    <div className="tile" id={`tile${tile}`} onClick={onClick}>
      { tile[0] }
    </div>
  );
}

function Rack( { player, tiles, discardTile, disabled } : { player: number, tiles: Tile[], discardTile: (tile: Tile) => () => void, disabled: boolean } ) {

  return (
      <TransitionGroup className={`rack player${player} ${disabled ? "playable" : "disabled"}`}>
        { tiles.map(t => (
          <CSSTransition key={t} timeout={{enter: 400, exit: 650}} classNames="tile">
            <TileComponent tile={t} onClick={discardTile(t)}/>
          </CSSTransition>
        ))}
      </TransitionGroup>
    );
}

export default Rack;
