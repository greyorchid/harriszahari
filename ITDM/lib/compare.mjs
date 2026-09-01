export const IDS = ["N1", "N2", "N3", "N4", "C1", "C2", "C3", "C4", "C5", "C6", "R1", "R2", "R3", "R4", "R5", "R6"];

export function eciResult(eci, contradictionStatus) {
  const values = Object.values(eci || {});
  if (values.length !== 6 || values.some((value) => !Number.isFinite(value))) return { base: null, cap: null, effective: null };
  const base = Math.round(values.reduce((sum, value) => sum + value, 0) / 30 * 100);
  const caps = { none: 100, resolved: 100, "material-unresolved": 60, "critical-unresolved": 40 };
  const cap = caps[contradictionStatus];
  return { base, cap: cap ?? null, effective: cap === undefined ? null : Math.min(base, cap) };
}

export function weightedKappa(a, b) {
  const k = 6;
  const matrix = Array.from({ length: k }, () => Array(k).fill(0));
  a.forEach((value, index) => { matrix[value][b[index]] += 1; });
  const rows = matrix.map((row) => row.reduce((sum, value) => sum + value, 0));
  const cols = Array.from({ length: k }, (_, col) => matrix.reduce((sum, row) => sum + row[col], 0));
  let observed = 0, expected = 0;
  for (let i = 0; i < k; i += 1) for (let j = 0; j < k; j += 1) {
    const weight = ((i - j) ** 2) / 25;
    observed += weight * matrix[i][j] / a.length;
    expected += weight * (rows[i] * cols[j]) / (a.length ** 2);
  }
  return expected === 0 ? 1 : 1 - observed / expected;
}

export function compareAssessments(a, b) {
  const differences = IDS.map((id) => ({ id, a: a.scores[id].score, b: b.scores[id].score, gap: Math.abs(a.scores[id].score - b.scores[id].score) }));
  const exact = differences.filter((row) => row.gap === 0).length;
  const withinOne = differences.filter((row) => row.gap <= 1).length;
  const changed = (result) => IDS.filter((id) => result.round1Snapshot.scores[id].score !== result.scores[id].score);
  return {
    exact: { count: exact, percent: Math.round(exact / 16 * 100) },
    withinOne: { count: withinOne, percent: Math.round(withinOne / 16 * 100) },
    quadraticWeightedKappa: Number(weightedKappa(differences.map((row) => row.a), differences.map((row) => row.b)).toFixed(3)),
    differences: differences.filter((row) => row.gap),
    eci: {
      assessorA: { round1: eciResult(a.round1Snapshot.eci, a.round1Snapshot.contradictionStatus), final: eciResult(a.eci, a.contradictionStatus) },
      assessorB: { round1: eciResult(b.round1Snapshot.eci, b.round1Snapshot.contradictionStatus), final: eciResult(b.eci, b.contradictionStatus) }
    },
    changed: { assessorA: changed(a), assessorB: changed(b) },
    predictionAgreement: a.prediction.outcome === b.prediction.outcome,
    outcomeA: a.prediction.outcome,
    outcomeB: b.prediction.outcome,
    requiresHumanReview: withinOne / 16 < 0.85 || differences.some((row) => row.gap > 1) || a.prediction.outcome !== b.prediction.outcome
  };
}
