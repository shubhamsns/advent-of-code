import { readFileLineByLine } from "../read-file-line-by-line";

const GEMS_AVAILABLE = {
  RED: 12,
  GREEN: 13,
  BLUE: 14,
};

function getValueOutOfSinglePlay(play) {
  const hand = play.split(", ");
  return hand.reduce((prev, curr) => {
    curr.split(", ").forEach((hand) => {
      let [numberofStone, stoneType] = hand.split(" ");
      prev[stoneType] = Number(numberofStone);
    });
    return prev;
  }, {});
}

function parseGameString(gameString) {
  const [gameTitle, gamePlay] = gameString.split(": ");
  let gameNumber = gameTitle.split(" ")[1].trim();
  let handsPlayed = gamePlay.split("; ");
  let handArray = handsPlayed.map((play) => {
    return getValueOutOfSinglePlay(play);
  });

  return [Number(gameNumber), handArray];
}

function getMinSetOfGemsToPlayGame(game) {
  return game.reduce(
    (prev, curr) => {
      return {
        green: Math.max(prev.green, curr.green ?? 1),
        red: Math.max(prev.red, curr.red ?? 1),
        blue: Math.max(prev.blue, curr.blue ?? 1),
      };
    },
    {
      green: 1,
      red: 1,
      blue: 1,
    },
  );
}

async function getListOfPossibleGames() {
  let total = 0;

  let filePath = new URL("./input.txt", import.meta.url);
  await readFileLineByLine(filePath, (line) => {
    const [gameNumber, game] = parseGameString(line);
    let minGems = getMinSetOfGemsToPlayGame(game);
    let product = minGems.green * minGems.red * minGems.blue;
    total += product;

    console.log(gameNumber, product);
  });

  console.log("total product", total);
}

getListOfPossibleGames();
