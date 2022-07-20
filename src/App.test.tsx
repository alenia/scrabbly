import React from 'react';
import { render, screen } from '@testing-library/react';
import App, { helpers } from './App';

describe('helpers', () => {
  describe('nextRacks', () => {
    it("returns the new state based on the previous state and the player", () => {
      const previousRacks = {
        0: ["A0","B0","C0"],
        1: ["A1","B1","C1"],
      };
      const tiles = ["X0","Y0","Z0"]

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
});

test('renders button', () => {
  render(<App />);
  const buttonElement = screen.getByText(/draw tile/i);
  expect(buttonElement).toBeInTheDocument();
});
