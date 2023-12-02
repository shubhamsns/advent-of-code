import readline from "node:readline";
import fs from "node:fs";
import events from "node:events";

async function getSumOfNumbersFromFileLineByLine() {
  try {
    let totalSum = 0;
    const rl = readline.createInterface({
      input: fs.createReadStream("./input.txt"),
      crlfDelay: Infinity,
    });

    rl.on("line", (line) => {
      let sumOfCurrentLine = getFirstAndLastNumber(line);
      totalSum += sumOfCurrentLine;
    });

    await events.once(rl, "close");
    console.log("answer", totalSum);
  } catch (error) {
    consolr.error(error);
  }
}

let numMap = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

//? Only actually useful for part 2 as part 1 only has numbers
function getNumberIfString(num) {
  if (!isNaN(num)) return num;

  return numMap[num];
}

function getFirstAndLastNumber(string) {
  //!** match for part 1
  // let numbersInString = string.match(/\d/g);
  //
  // match for part 2
  let numbersInString = string.match(
    /(\d|one|two|three|four|five|six|seven|eight|nine)/g,
  );

  if (numbersInString.length === 0) return 0;

  let firstNumber = getNumberIfString(numbersInString[0]);
  let lastNumber = getNumberIfString(
    numbersInString[numbersInString.length - 1],
  );

  let strNum = firstNumber + lastNumber;

  return Number(strNum);
}

getSumOfNumbersFromFileLineByLine();
