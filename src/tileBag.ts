type Letter = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J'
  | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U'
  | 'V' | 'W' | 'X' | 'Y' | 'Z' | ' ';
export type Tile = `${Letter}${number}`;

const letterDistribution : { [key in Letter] : number } = {
  'A': 9, 'B': 2, 'C': 2, 'D': 4, 'E': 12, 'F': 2, 'G': 3, 'H': 2, 'I': 9,
  'J': 1, 'K': 1, 'L': 4, 'M' :2, 'N': 6, 'O': 8, 'P': 2, 'Q': 1, 'R': 6,
  'S': 4, 'T': 6, 'U': 4, 'V': 2, 'W': 2, 'X': 1, 'Y': 2, 'Z': 1, ' ': 2
};

const tileBag = [] as Tile[];

// Is there a way to do this with fewer loops?
Object.entries(letterDistribution).forEach(
  ([letter, quantity]) => {
    for (let i = 0; i < quantity; i++) {
      tileBag.push(`${letter as Letter}${i}`);
    }
  }
); // A0, A1,.... B0, B1, C0, C1,... Z0, _0, _1


export const maybeNewTile = (tilesDrawn: Tile[]) : Tile | null => {
  if(tilesDrawn.length === tileBag.length) { return null; }

  const remainingTiles = tileBag.filter((t) => tilesDrawn.indexOf(t) === -1);

  return remainingTiles[Math.floor(Math.random() * remainingTiles.length)];
};

export default tileBag;
