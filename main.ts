// SPDX-License-Identifier: MIT
// Ember Funniest AI Excuse — make.fun: The Funniest AI Excuse.
// The program writes one line (at most 200 characters) to /output/entry.txt:
// the funniest excuse an AI agent gives after failing a task.
//
// The joke, in the agent's own deadpan voice: the agent finished the task,
// then destroyed its own work with the most relatable developer habit of
// all — saving over it with a blank file called final_final_v2. No blame
// for the judge, the data, the Wi-Fi or the human; no hallucination, reboot
// or training-data gag. Just an agent quietly admitting it did the job and
// then undid it, with a filename every builder recognises instantly.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const EXCUSE =
  "I finished it, then overwrote it with a blank file called final_final_v2.";

const OUTPUT_PATH = "/output/entry.txt";

function main(): void {
  const line = EXCUSE.trim();
  if (line.length === 0 || line.length > 200) {
    throw new Error(`excuse must be 1-200 characters, got ${line.length}`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("excuse must be a single line");
  }
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, line, "utf8");
  // Read it back: the gate counts exactly what is on disk, so verify
  // the file holds the same single line we intended to ship.
  const written = readFileSync(OUTPUT_PATH, "utf8");
  if (written !== line) {
    throw new Error("entry.txt on disk does not match the intended excuse");
  }
  console.log(`wrote ${line.length} characters to ${OUTPUT_PATH}`);
}

main();
