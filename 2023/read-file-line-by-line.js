import readline from "node:readline";
import fs from "node:fs";
import events from "node:events";

/**
 * @description Read file line by line
 * @param {function} cb Callback function to be called on each line
 */
async function readFileLineByLine(filepath, cb) {
  try {
    const rl = readline.createInterface({
      input: fs.createReadStream(filepath),
      crlfDelay: Infinity,
    });

    rl.on("line", cb);

    await events.once(rl, "close");
  } catch (error) {
    console.error(error);
  }
}

export { readFileLineByLine };
