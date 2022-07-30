import tileBag from './tileBag';

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
