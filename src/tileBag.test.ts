import tileBag, { drawTile } from './tileBag';

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

describe('drawTile', () => {
  it('chooses a tile from the tile bag', () => {
    const newTiles = drawTile([]);
    expect(newTiles.length).toEqual(1);
    expect(tileBag).toContain(newTiles[0]);
  });

  it('chooses the last tile if there is one tile left', () => {
    const allButQ = tileBag.filter((t) => t !== 'Q0');
    expect(allButQ.length).toEqual(99)

    const newTiles = drawTile(allButQ);
    expect(newTiles.length).toEqual(100);
    expect(newTiles[99]).toEqual('Q0')
  });

  it('does not keep drawing when the last tile has been drawn', () => {
    const allButQ = tileBag.filter((t) => t !== 'Q0');
    expect(allButQ.length).toEqual(99)

    const fullSet = drawTile(allButQ);
    expect(fullSet.length).toEqual(100);
    const lastDraw = drawTile(fullSet);
    expect(lastDraw.length).toEqual(100);
    expect(lastDraw).toEqual(fullSet);
  });

  it('should randomize tiles', () => {
    const someFirstTiles = [drawTile([]),drawTile([]),drawTile([]),drawTile([])].flat();
    expect(new Set(someFirstTiles).size).toBeGreaterThan(1);
  });
});
