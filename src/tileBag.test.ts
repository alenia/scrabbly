import tileBag, { maybeNewTile } from './tileBag';

describe('tileBag', () => {
  it('should have the correct number of tiles', () => {
    expect(tileBag.length).toEqual(100);
  });
  it('should have the tiles listed as their letter and an index number', () => {
    const aTiles = tileBag.filter(t => t[0] === 'A')
    expect(aTiles).toEqual(['A0','A1','A2','A3','A4','A5','A6','A7','A8']);
    const mTiles = tileBag.filter(t => t[0] === 'M')
    expect(mTiles).toEqual(['M0', 'M1']);
  });
  it('should list blank tiles with a space', () => {
    const blankTiles = tileBag.filter(t => t[0] === ' ')
    expect(blankTiles).toEqual([' 0', ' 1']);
  })
});

describe('maybeNewTile', () => {
  it('chooses a tile from the tile bag', () => {
    const nextTile = maybeNewTile([]);
    expect(tileBag).toContain(nextTile);
  });

  it('chooses the last tile if there is one tile left', () => {
    const allButQ = tileBag.filter((t) => t !== 'Q0');
    expect(allButQ.length).toEqual(99)

    expect(maybeNewTile(allButQ)).toEqual('Q0')
  });

  it('does not keep drawing when the last tile has been drawn', () => {
    expect(maybeNewTile(tileBag)).toBeNull();
  });

  it('should randomize tiles', () => {
    const someFirstTiles = [maybeNewTile([]),maybeNewTile([]),maybeNewTile([]),maybeNewTile([])];
    expect(new Set(someFirstTiles).size).toBeGreaterThan(1);
  });
});
