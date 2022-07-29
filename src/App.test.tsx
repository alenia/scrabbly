import React from 'react';
import { render, screen } from '@testing-library/react';
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
