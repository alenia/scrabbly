import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App, { helpers } from './App';
import { Tile } from './tileBag';

describe('helpers', () => {
  describe('nextRacks', () => {
    it("returns the new state based on the previous state and the player", () => {
      const previousRacks = {
        0: ["A0" as Tile,"B0" as Tile,"C0" as Tile],
        1: ["A1" as Tile,"B1" as Tile,"C1" as Tile],
      };
      const tiles = ["X0" as Tile,"Y0" as Tile,"Z0" as Tile]

      expect(helpers.nextRacks(previousRacks, {player: 0, tiles})).toEqual({
        0: ["X0","Y0","Z0"],
        1: ["A1","B1","C1"],
      })

      expect(helpers.nextRacks(previousRacks, {player: 1, tiles})).toEqual({
        0: ["A0","B0","C0"],
        1: ["X0","Y0","Z0"],
      })
    });
  });

  describe('nextPlayer', () => {
    it('returns the next sequential player number', () => {
      expect(helpers.nextPlayer(0)).toEqual(1);
      expect(helpers.nextPlayer(1)).toEqual(0);

      //I don't have to test the type because the app won't compile if the type is wrong
    })
  });

  describe('allTiles', () => {
    it('returns all the tiles in all the players racks', () => {
      const racks = {
        0: ["A0" as Tile,"B0" as Tile,"C0" as Tile],
        1: ["A1" as Tile,"B1" as Tile,"C1" as Tile],
      };
      expect(helpers.allTiles(racks)).toEqual(["A0","B0","C0","A1","B1","C1"]);
    })
  });
});

test('renders button', () => {
  render(<App />);
  const buttonElement = screen.getByText(/draw tile/i);
  expect(buttonElement).toBeInTheDocument();
});

test('first player draws a tile', async () => {
  const user = userEvent.setup();
  const { container } = render(<App />);
  expect(container.getElementsByClassName('tile').length).toEqual(0);
  const buttonElement = screen.getByText(/draw tile/i);
  await user.click(buttonElement);
  const tiles = container.getElementsByClassName('tile');
  expect(tiles.length).toEqual(1);
  expect(tiles[0]).toHaveTextContent(/^[A-Z|\s]$/);
});

test('player drawing the entire tile bag', () => {
  //get button
  //click it 100 times
  //assert that all tiles are in the first player's rack
  //click it 101 times
  //assert that there's only 100 tiles
});
test('second player draws a tile', () => {});
test('switching back and forth between players', () => {});
