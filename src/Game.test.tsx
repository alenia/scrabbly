import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Game from './Game';

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

test('you can play a three player game', async () => {
  const user = userEvent.setup();
  const { container } = render(<Game playerCount={3}/>);
  const drawTileButton = screen.getByText(/draw tile/i);
  const switchPlayerButton = screen.getByText(/next player/i);

  const player0Rack = container.getElementsByClassName('rack player0')[0];
  const player1Rack = container.getElementsByClassName('rack player1')[0];
  const player2Rack = container.getElementsByClassName('rack player2')[0];

  await user.click(drawTileButton);
  await user.click(drawTileButton);
  let player0Tiles = player0Rack.getElementsByClassName('tile');
  let player1Tiles = player1Rack.getElementsByClassName('tile');
  let player2Tiles = player2Rack.getElementsByClassName('tile');
  expect(container.getElementsByClassName('tile').length).toEqual(2);
  expect(player0Tiles.length).toEqual(2)
  expect(player1Tiles.length).toEqual(0)
  expect(player2Tiles.length).toEqual(0)

  await user.click(switchPlayerButton);
  await user.click(drawTileButton);
  player0Tiles = player0Rack.getElementsByClassName('tile');
  player1Tiles = player1Rack.getElementsByClassName('tile');
  player2Tiles = player2Rack.getElementsByClassName('tile');
  expect(container.getElementsByClassName('tile').length).toEqual(3);
  expect(player0Tiles.length).toEqual(2)
  expect(player1Tiles.length).toEqual(1)
  expect(player2Tiles.length).toEqual(0)

  await user.click(switchPlayerButton);
  await user.click(drawTileButton);
  player0Tiles = player0Rack.getElementsByClassName('tile');
  player1Tiles = player1Rack.getElementsByClassName('tile');
  player2Tiles = player2Rack.getElementsByClassName('tile');
  expect(container.getElementsByClassName('tile').length).toEqual(4);
  expect(player0Tiles.length).toEqual(2)
  expect(player1Tiles.length).toEqual(1)
  expect(player2Tiles.length).toEqual(1)
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

test("in a two player game: one player draws, another player draws, orignal player draws again", async () => {
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
