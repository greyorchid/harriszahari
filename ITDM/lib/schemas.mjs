const scoreItem = {
  type: "object",
  additionalProperties: false,
  required: ["id", "score", "evidenceStatus", "confidence", "evidenceIds", "finding", "wordingIssue", "wordingNote"],
  properties: {
    id: { type: "string", enum: ["N1", "N2", "N3", "N4", "C1", "C2", "C3", "C4", "C5", "C6", "R1", "R2", "R3", "R4", "R5", "R6"] },
    score: { type: "integer", minimum: 0, maximum: 5 },
    evidenceStatus: { type: "string", enum: ["Verified fact", "Corroborated finding", "Stakeholder assertion", "Assumption", "Contradiction", "Missing evidence"] },
    confidence: { type: "integer", minimum: 0, maximum: 100 },
    evidenceIds: { type: "array", items: { type: "string" } },
    finding: { type: "string" },
    wordingIssue: { type: "boolean" },
    wordingNote: { type: "string" }
  }
};
const eci = {
  type: "object", additionalProperties: false,
  required: ["authority", "corroboration", "recency", "relevance", "completeness", "consistency"],
  properties: Object.fromEntries(["authority", "corroboration", "recency", "relevance", "completeness", "consistency"].map((id) => [id, { type: "integer", minimum: 0, maximum: 5 }]))
};
const contradiction = { type: "string", enum: ["none", "resolved", "material-unresolved", "critical-unresolved"] };

export const phase1Schema = {
  type: "object", additionalProperties: false,
  required: ["scores", "eci", "eciRationale", "contradictionStatus", "contradictionRationale"],
  properties: {
    scores: { type: "array", minItems: 16, maxItems: 16, items: scoreItem },
    eci,
    eciRationale: { type: "string" },
    contradictionStatus: contradiction,
    contradictionRationale: { type: "string" }
  }
};

export const phase2Schema = {
  type: "object", additionalProperties: false,
  required: ["scores", "eci", "eciRationale", "contradictionStatus", "contradictionRationale", "changes", "prediction"],
  properties: {
    scores: { type: "array", minItems: 16, maxItems: 16, items: scoreItem },
    eci,
    eciRationale: { type: "string" },
    contradictionStatus: contradiction,
    contradictionRationale: { type: "string" },
    changes: { type: "array", items: { type: "object", additionalProperties: false, required: ["id", "newEvidenceIds", "priorAnchorUnsupported", "changeReason"], properties: { id: { type: "string", enum: ["N1", "N2", "N3", "N4", "C1", "C2", "C3", "C4", "C5", "C6", "R1", "R2", "R3", "R4", "R5", "R6"] }, newEvidenceIds: { type: "array", items: { type: "string" } }, priorAnchorUnsupported: { type: "string" }, changeReason: { type: "string" } } } },
    prediction: { type: "object", additionalProperties: false, required: ["outcome", "confidence", "drivers", "rationale"], properties: { outcome: { type: "string", enum: ["Likely success", "Mixed or materially compromised", "Likely failure or termination", "Insufficient evidence"] }, confidence: { type: "integer", minimum: 0, maximum: 100 }, drivers: { type: "array", minItems: 3, maxItems: 3, items: { type: "string", enum: ["N1", "N2", "N3", "N4", "C1", "C2", "C3", "C4", "C5", "C6", "R1", "R2", "R3", "R4", "R5", "R6"] } }, rationale: { type: "string" } } }
  }
};
