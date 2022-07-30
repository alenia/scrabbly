import { nextRacks, nextPlayer, _allTiles, _maybeNewTile, nextTileMaybe } from './reducers';
import tileBag, { Tile } from './tileBag';

describe('nextRacks', () => {
  it("returns the new state based on the previous state and the player", () => {
    const previousRacks = {
      0: ["A0" as Tile,"B0" as Tile,"C0" as Tile],
      1: ["A1" as Tile,"B1" as Tile,"C1" as Tile],
      2: [],
    };
    const tiles = ["X0" as Tile,"Y0" as Tile,"Z0" as Tile]

    expect(nextRacks(previousRacks, {player: 0, tiles})).toEqual({
      0: ["X0","Y0","Z0"],
      1: ["A1","B1","C1"],
      2: [],
    })

    expect(nextRacks(previousRacks, {player: 1, tiles})).toEqual({
      0: ["A0","B0","C0"],
      1: ["X0","Y0","Z0"],
      2: [],
    })
  });
});

describe('nextPlayer', () => {
  it('returns the next sequential player number with 2 players', () => {
    expect(nextPlayer({player: 0, playerCount: 2})).toEqual(1);
    expect(nextPlayer({player: 1, playerCount: 2})).toEqual(0);
  })
  it('returns the next sequential player number with 3 players', () => {
    expect(nextPlayer({player: 0, playerCount: 3})).toEqual(1);
    expect(nextPlayer({player: 1, playerCount: 3})).toEqual(2);
    expect(nextPlayer({player: 2, playerCount: 3})).toEqual(0);
  })
});

describe('_allTiles', () => {
  it('returns all the tiles in all the players racks', () => {
    const racks = {
      0: ["A0" as Tile,"B0" as Tile,"C0" as Tile],
      1: ["A1" as Tile,"B1" as Tile,"C1" as Tile],
      2: ["A2" as Tile],
    };
    expect(_allTiles(racks)).toEqual(["A0","B0","C0","A1","B1","C1","A2"]);
  })
});

describe('_maybeNewTile', () => {
  it('chooses a tile from the tile bag', () => {
    const nextTile = _maybeNewTile([]);
    expect(tileBag).toContain(nextTile);
  });

  it('chooses the last tile if there is one tile left', () => {
    const allButQ = tileBag.filter((t) => t !== 'Q0');
    expect(allButQ.length).toEqual(99)

    expect(_maybeNewTile(allButQ)).toEqual('Q0')
  });

  it('does not keep drawing when the last tile has been drawn', () => {
    expect(_maybeNewTile(tileBag)).toBeNull();
  });

  it('should randomize tiles', () => {
    const someFirstTiles = [_maybeNewTile([]),_maybeNewTile([]),_maybeNewTile([]),_maybeNewTile([])];
    expect(new Set(someFirstTiles).size).toBeGreaterThan(1);
  });
});
