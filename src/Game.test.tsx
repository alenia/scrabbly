import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Game, { helpers } from './Game';
import { Tile } from './tileBag';

describe('helpers', () => {
  describe('nextRacks', () => {
    it("returns the new state based on the previous state and the player", () => {
      const previousRacks = {
        0: ["A0" as Tile,"B0" as Tile,"C0" as Tile],
        1: ["A1" as Tile,"B1" as Tile,"C1" as Tile],
        2: [],
      };
      const tiles = ["X0" as Tile,"Y0" as Tile,"Z0" as Tile]

      expect(helpers.nextRacks(previousRacks, {player: 0, tiles})).toEqual({
        0: ["X0","Y0","Z0"],
        1: ["A1","B1","C1"],
        2: [],
      })

      expect(helpers.nextRacks(previousRacks, {player: 1, tiles})).toEqual({
        0: ["A0","B0","C0"],
        1: ["X0","Y0","Z0"],
        2: [],
      })
    });
  });

  describe('nextPlayer', () => {
    it('returns the next sequential player number', () => {
      expect(helpers.nextPlayer(0)).toEqual(1);
      expect(helpers.nextPlayer(1)).toEqual(0);
    })
  });

  describe('allTiles', () => {
    it('returns all the tiles in all the players racks', () => {
      const racks = {
        0: ["A0" as Tile,"B0" as Tile,"C0" as Tile],
        1: ["A1" as Tile,"B1" as Tile,"C1" as Tile],
        2: [],
      };
      expect(helpers.allTiles(racks)).toEqual(["A0","B0","C0","A1","B1","C1"]);
    })
  });
});

test('renders button', () => {
  render(<Game playerCount={2}/>);
  const buttonElement = screen.getByText(/draw tile/i);
  expect(buttonElement).toBeInTheDocument();
});

test('first player draws a tile', async () => {
  const user = userEvent.setup();
  const { container } = render(<Game playerCount={2}/>);
  expect(container.getElementsByClassName('tile').length).toEqual(0);
  const buttonElement = screen.getByText(/draw tile/i);
  await user.click(buttonElement);
  const tiles = container.getElementsByClassName('tile');
  expect(tiles.length).toEqual(1);
  //Note: toHaveTextContent seems to strip the space from the text so I can't check \s
  expect(tiles[0]).toHaveTextContent(/^[A-Z]?$/);
});

test('player drawing the entire tile bag', async () => {
  const user = userEvent.setup();
  const { container } = render(<Game playerCount={2}/>);
  const buttonElement = screen.getByText(/draw tile/i);
  for(let i = 0; i < 100; i ++) {
    await user.click(buttonElement);
  }
  const tiles = container.getElementsByClassName('tile');
  expect(tiles.length).toEqual(100);

  //TODO: the button should probably be disabled at this point
  await user.click(buttonElement);
  expect(tiles.length).toEqual(100);

  for(let i = 0; i < 100; i ++) {
    expect(tiles[i]).toHaveTextContent(/^[A-Z]?$/);
  }
});

test('the first player can draw tiles and then the second player can draw tiles', async () => {
  const user = userEvent.setup();
  const { container } = render(<Game playerCount={2}/>);
  const drawTileButton = screen.getByText(/draw tile/i);
  const switchPlayerButton = screen.getByText(/next player/i);

  await user.click(drawTileButton);
  await user.click(drawTileButton);
  const player0Rack = container.getElementsByClassName('rack player0')[0];
  let player0Tiles = player0Rack.getElementsByClassName('tile');
  const player1Rack = container.getElementsByClassName('rack player1')[0];
  let player1Tiles = player1Rack.getElementsByClassName('tile');
  expect(container.getElementsByClassName('tile').length).toEqual(2);
  expect(player0Tiles.length).toEqual(2)
  expect(player1Tiles.length).toEqual(0)
  await user.click(switchPlayerButton);
  await user.click(drawTileButton);
  player0Tiles = player0Rack.getElementsByClassName('tile');
  player1Tiles = player1Rack.getElementsByClassName('tile');
  expect(container.getElementsByClassName('tile').length).toEqual(3);
  expect(player0Tiles.length).toEqual(2)
  expect(player1Tiles.length).toEqual(1)
});

test('if the first player draws almost all tiles the next player can only draw the remaining tiles', async () => {
  const user = userEvent.setup();
  const { container } = render(<Game playerCount={2}/>);
  const drawTileButton = screen.getByText(/draw tile/i);
  const switchPlayerButton = screen.getByText(/next player/i);

  // first player draws 98 tiles
  for(let i = 0; i < 98; i ++) {
    await user.click(drawTileButton);
  }
  await user.click(switchPlayerButton);
  await user.click(drawTileButton);
  await user.click(drawTileButton);

  const player0Rack = container.getElementsByClassName('rack player0')[0];
  let player0Tiles = player0Rack.getElementsByClassName('tile');
  const player1Rack = container.getElementsByClassName('rack player1')[0];
  let player1Tiles = player1Rack.getElementsByClassName('tile');

  expect(player0Tiles.length).toEqual(98)
  expect(player1Tiles.length).toEqual(2)
  expect(container.getElementsByClassName('tile').length).toEqual(100);

  await user.click(drawTileButton);

  player1Tiles = player1Rack.getElementsByClassName('tile');
  expect(player1Tiles.length).toEqual(2)
  expect(container.getElementsByClassName('tile').length).toEqual(100);
});

test("one player draws, another player draws, orignal player draws again", async () => {
  const user = userEvent.setup();
  const { container } = render(<Game playerCount={2}/>);
  const drawTileButton = screen.getByText(/draw tile/i);
  const switchPlayerButton = screen.getByText(/next player/i);

  // player 0 draws
  await user.click(drawTileButton);

  // switch to player 1
  await user.click(switchPlayerButton);
  await user.click(drawTileButton);

  // player 1 draws again
  await user.click(switchPlayerButton);
  await user.click(drawTileButton);

  const player0Rack = container.getElementsByClassName('rack player0')[0];
  let player0Tiles = player0Rack.getElementsByClassName('tile');
  const player1Rack = container.getElementsByClassName('rack player1')[0];
  let player1Tiles = player1Rack.getElementsByClassName('tile');

  expect(container.getElementsByClassName('tile').length).toEqual(3);
  expect(player0Tiles.length).toEqual(2)
  expect(player1Tiles.length).toEqual(1)
});

test("discarding tiles", () => {});
