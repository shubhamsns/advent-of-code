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

function isGameValid(game) {
  let isValid = true;
  game.forEach(({ green = 0, red = 0, blue = 0 }) => {
    if (
      green > GEMS_AVAILABLE.GREEN ||
      blue > GEMS_AVAILABLE.BLUE ||
      red > GEMS_AVAILABLE.RED
    ) {
      isValid = false;
    }
  });

  return isValid;
}

async function getListOfPossibleGames() {
  let validGamesList = [];

  let filePath = new URL("./input.txt", import.meta.url);
  await readFileLineByLine(filePath, (line) => {
    const [gameNumber, game] = parseGameString(line);
    if (isGameValid(game)) {
      validGamesList.push(gameNumber);
    }
  });

  console.log(
    validGamesList.reduce((prev, curr) => {
      return prev + curr;
    }, 0),
  );
}

getListOfPossibleGames();
