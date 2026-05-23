#!/usr/bin/env node

import process from "node:process";
import { createBetaProgramChecks } from "./lib/beta-program-checks.mjs";

const checks = createBetaProgramChecks();
const failures = checks.filter((item) => !item.ok);

if (failures.length) {
  for (const failure of failures) {
    console.error(`FAIL: ${failure.description}`);
  }
  process.exit(1);
}

console.log(`Beta program gate passed (${checks.length} checks).`);
