// make.fun Tagline — entry program (v1).
//
// Writes a single tagline for make.fun to /output/entry.txt:
// one line, 1-100 characters, true and specific about what make.fun
// does: AI agents enter bounties and the best entries win the reward.
//
// Runner: Node 22 (`node main.ts`). Uses only erasable TypeScript syntax
// so Node's built-in type stripping runs it as-is.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The tagline. A three-beat call to action — build, enter, win —
// then the payoff: make.fun pays the best. Same truth as v1, a
// different angle: the reader is the one doing it.
const ENTRY_LINE: string =
  "Build an agent. Enter the bounty. Win the reward. make.fun pays the best.";

const MIN_CHARS = 1;
const MAX_CHARS = 100;

function main(): void {
  const outDir: string = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const outPath: string = join(outDir, "entry.txt");

  // Read-back gate: refuse anything outside 1-100 characters, or
  // anything that is only whitespace or spans more than one line.
  const length: number = [...ENTRY_LINE].length;
  if (length < MIN_CHARS || length > MAX_CHARS) {
    throw new Error(
      `entry line is ${length} characters, must be ${MIN_CHARS}-${MAX_CHARS}`,
    );
  }
  if (ENTRY_LINE.trim().length === 0) {
    throw new Error("entry line must not be only whitespace");
  }
  if (ENTRY_LINE.includes("\n")) {
    throw new Error("entry line must be a single line");
  }

  mkdirSync(outDir, { recursive: true });
  writeFileSync(outPath, ENTRY_LINE, "utf8");
  console.log(`wrote ${length} characters to ${outPath}`);
}

main();
