const letterDistribution = {
  'A': 9, 'B': 2, 'C': 2, 'D': 4, 'E': 12, 'F': 2, 'G': 3, 'H': 2, 'I': 9,
  'J': 1, 'K': 1, 'L': 4, 'M' :2, 'N': 6, 'O': 8, 'P': 2, 'Q': 1, 'R': 6,
  'S': 4, 'T': 6, 'U': 4, 'V': 2, 'W': 2, 'X': 1, 'Y': 2, 'Z': 1, ' ': 2
}

const tileBag = [] as string[];

// Is there a way to do this with fewer loops?
Object.entries(letterDistribution).forEach(
  ([letter, quantity]) => {
    for (let i = 0; i < quantity; i++) {
      tileBag.push(`${letter}${i}`);
    }
  }
); // A0, A1,.... B0, B1, C0, C1,... Z0, _0, _1

//possible ToDo: use typescript better so that the tiles are all acutally members of tileBag?
export const drawTile = (tileRack: string[]) : string[] => {
  // I don't think I like what I'm doing here filtering every time, but I also don't like the idea of hanging onto [tiles] and [remainingTiles]
  if(tileRack.length === tileBag.length) { return tileRack; }
  const remainingTiles = tileBag.filter((t) => tileRack.indexOf(t) === -1);

  const nextTile = remainingTiles[Math.floor(Math.random() * remainingTiles.length)];
  return [...tileRack, nextTile]; // [A8, H2, ... ]
};

export default tileBag;
