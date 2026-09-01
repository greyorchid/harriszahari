import assert from "node:assert/strict";
import { runDiagnosis } from "./lib/engine.mjs";

const result = await runDiagnosis("demo");
assert.equal(result.comparison.withinOne.percent, 100);
assert.equal(result.comparison.exact.percent, 94);
assert.equal(result.comparison.eci.assessorA.final.effective, 40);
assert.equal(result.comparison.eci.assessorB.final.effective, 40);
assert.equal(result.assessorA.prediction.outcome, "Likely failure or termination");
assert.equal(result.assessorB.prediction.outcome, "Likely failure or termination");
assert.equal(result.status, "human-review-required");
console.log("ITDM product test passed.");
