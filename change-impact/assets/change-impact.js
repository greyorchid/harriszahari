(() => {
  "use strict";

  const STORAGE_KEY = "harris-zahari-change-impact-canvas-v1";
  const SCHEMA_VERSION = "1.0";
  const dimensions = [
    ["process", "Process"],
    ["technology", "Technology"],
    ["roleAccountability", "Role and accountability"],
    ["skillsKnowledge", "Skills and knowledge"],
    ["behavior", "Behavior and ways of working"],
    ["organizationLocation", "Organization and location"]
  ];
  const scoreLabels = ["0, No material change", "1, Minor adjustment", "2, Noticeable change", "3, Significant change", "4, Fundamental change"];
  const materialLevels = new Set(["High", "Critical"]);
  const concernLevels = new Set(["Low", "Contradictory", "Missing"]);
  const by = (selector, root = document) => root.querySelector(selector);
  const all = (selector, root = document) => [...root.querySelectorAll(selector)];

  function today() {
    return new Date().toISOString().slice(0, 10);
  }

  function blankState() {
    return {
      schemaVersion: SCHEMA_VERSION,
      updatedAt: new Date().toISOString(),
      project: { name: "", client: "", assessor: "", implementationDate: "", assessmentDate: today(), objective: "", scope: "" },
      impacts: []
    };
  }

  const sampleState = {
    schemaVersion: SCHEMA_VERSION,
    updatedAt: new Date().toISOString(),
    project: {
      name: "Procurement modernization",
      client: "Demonstration organization",
      assessor: "Harris Zahari",
      implementationDate: "2026-11-16",
      assessmentDate: "2026-09-01",
      objective: "Introduce one governed procurement platform, strengthen controls, and reduce fragmented purchasing activity.",
      scope: "Procurement, Finance, business approvers, suppliers, and technology support across the regional operating model."
    },
    impacts: [
      {
        id: "IMP-001", businessUnit: "Procurement", stakeholderGroup: "Procurement officers", role: "Buyer and category specialist", population: 42, location: "Regional", impactDate: "2026-11-16",
        currentState: "Officers coordinate requests through email, spreadsheets, and local approval practices.",
        futureState: "Officers manage standardized digital workflows, category controls, and supplier records in one platform.",
        impactStatement: "Work is redesigned around governed digital workflows, new category controls, and more visible accountability.",
        dimensions: { process: 4, technology: 3, roleAccountability: 3, skillsKnowledge: 3, behavior: 2, organizationLocation: 1 },
        evidenceConfidence: "High", evidenceSource: "Approved process design and platform configuration", evidence: "Future-state workflow is approved. Detailed local exception volumes still require confirmation.", severityOverride: "", overrideRationale: "",
        intervention: "Run role-based simulations, issue revised procedures, and validate exception handling before cutover.", owner: "Procurement transformation lead", targetDate: "2026-10-20", status: "In progress"
      },
      {
        id: "IMP-002", businessUnit: "Finance", stakeholderGroup: "Finance controllers", role: "Financial controller", population: 18, location: "Regional", impactDate: "2026-11-16",
        currentState: "Controllers review transactions after manager approval and resolve exceptions through local escalation.",
        futureState: "Controllers own policy exceptions and approve high-risk categories before manager release.",
        impactStatement: "Decision rights and control accountability move earlier in the purchasing process.",
        dimensions: { process: 3, technology: 2, roleAccountability: 4, skillsKnowledge: 2, behavior: 2, organizationLocation: 1 },
        evidenceConfidence: "Contradictory", evidenceSource: "Design workshop and draft RACI", evidence: "Finance and Procurement documents assign overlapping ownership for policy exceptions.", severityOverride: "", overrideRationale: "",
        intervention: "Facilitate an executive decision on exception ownership and publish the approved RACI.", owner: "", targetDate: "2026-09-30", status: "Open"
      },
      {
        id: "IMP-003", businessUnit: "Business operations", stakeholderGroup: "Line managers", role: "Budget and request approver", population: 310, location: "Multiple sites", impactDate: "2026-11-16",
        currentState: "Managers approve requests through email and apply different local checks.",
        futureState: "Managers approve through standardized workflow rules and provide structured rejection reasons.",
        impactStatement: "Managers must apply consistent policy decisions inside a new approval workflow.",
        dimensions: { process: 2, technology: 2, roleAccountability: 3, skillsKnowledge: 2, behavior: 3, organizationLocation: 1 },
        evidenceConfidence: "Medium", evidenceSource: "Manager interviews and draft training plan", evidence: "Workflow has been demonstrated to a sample of managers. Wider behavioral readiness has not been tested.", severityOverride: "", overrideRationale: "",
        intervention: "Expand user testing and add decision scenarios to manager training and sponsor communications.", owner: "Business change lead", targetDate: "2026-10-31", status: "Validated"
      },
      {
        id: "IMP-004", businessUnit: "External ecosystem", stakeholderGroup: "Suppliers", role: "Supplier administrator", population: 1200, location: "Multiple countries", impactDate: "2026-10-15",
        currentState: "Suppliers submit documents through email and country-specific channels.",
        futureState: "Suppliers maintain profiles and submit documents through a common portal.",
        impactStatement: "Suppliers must adopt a new portal before internal platform cutover.",
        dimensions: { process: 3, technology: 3, roleAccountability: 1, skillsKnowledge: 2, behavior: 2, organizationLocation: 1 },
        evidenceConfidence: "Low", evidenceSource: "Supplier communication draft", evidence: "Supplier segmentation and digital-access constraints have not been validated.", severityOverride: "", overrideRationale: "",
        intervention: "Segment suppliers, confirm access constraints, pilot onboarding, and establish multilingual support.", owner: "Supplier enablement manager", targetDate: "2026-10-01", status: "Open"
      },
      {
        id: "IMP-005", businessUnit: "Technology", stakeholderGroup: "Service desk", role: "Application support analyst", population: 26, location: "Regional", impactDate: "2026-11-01",
        currentState: "The service desk supports local purchasing tools through separate knowledge bases.",
        futureState: "The service desk supports one platform with tiered escalation and integration monitoring.",
        impactStatement: "Support procedures, diagnostic skills, and escalation routes require redesign.",
        dimensions: { process: 3, technology: 3, roleAccountability: 2, skillsKnowledge: 3, behavior: 2, organizationLocation: 1 },
        evidenceConfidence: "Medium", evidenceSource: "Support-model workshop", evidence: "The tiered model is drafted. Service volumes and integration failure patterns are estimates.", severityOverride: "", overrideRationale: "",
        intervention: "Validate support volumes, complete the knowledge base, and rehearse major incident escalation.", owner: "Application support manager", targetDate: "2026-11-01", status: "In progress"
      },
      {
        id: "IMP-006", businessUnit: "Procurement", stakeholderGroup: "Category leaders", role: "Category manager", population: 14, location: "Regional", impactDate: "2026-11-16",
        currentState: "Category leaders use locally maintained reports and intervene after purchasing exceptions occur.",
        futureState: "Category leaders monitor demand patterns and govern exceptions through platform analytics.",
        impactStatement: "Leaders move from retrospective reporting to active category governance.",
        dimensions: { process: 2, technology: 2, roleAccountability: 3, skillsKnowledge: 2, behavior: 3, organizationLocation: 1 },
        evidenceConfidence: "Missing", evidenceSource: "", evidence: "Dashboard requirements and data ownership have not been approved.", severityOverride: "", overrideRationale: "",
        intervention: "Approve analytics requirements, data ownership, and the category-governance review cadence.", owner: "Head of Procurement", targetDate: "2026-10-15", status: "Open"
      }
    ]
  };

  let state = loadState();
  let currentView = "overview";
  const projectDialog = by("[data-project-dialog]");
  const impactDialog = by("[data-impact-dialog]");
  const privacyDialog = by("[data-privacy-dialog]");
  const projectForm = by("[data-project-form]");
  const impactForm = by("[data-impact-form]");

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (validateState(saved)) return saved;
    } catch (_) {
      localStorage.removeItem(STORAGE_KEY);
    }
    return blankState();
  }

  function validateState(candidate) {
    return Boolean(candidate && candidate.schemaVersion === SCHEMA_VERSION && candidate.project && Array.isArray(candidate.impacts));
  }

  function saveState(message = "Saved locally") {
    state.updatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    by("[data-save-status]").textContent = message;
    window.setTimeout(() => { by("[data-save-status]").textContent = "Saved locally"; }, 1200);
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function severityFor(impact) {
    if (impact.severityOverride) return impact.severityOverride;
    const max = Math.max(...dimensions.map(([key]) => Number(impact.dimensions?.[key] || 0)));
    return ["Low", "Low", "Moderate", "High", "Critical"][max];
  }

  function severityReason(scores) {
    const values = dimensions.map(([key]) => Number(scores[key] || 0));
    const max = Math.max(...values);
    if (max === 0) return "No material change is currently recorded.";
    const affected = dimensions.filter(([key]) => Number(scores[key] || 0) === max).map(([, label]) => label.toLowerCase());
    return `Driven by ${affected.join(" and ")} at level ${max}.`;
  }

  function dateLabel(value) {
    if (!value) return "Not set";
    const date = new Date(`${value}T00:00:00`);
    return Number.isNaN(date.valueOf()) ? value : new Intl.DateTimeFormat("en-MY", { day: "numeric", month: "short", year: "numeric" }).format(date);
  }

  function nextId() {
    const highest = state.impacts.reduce((max, item) => Math.max(max, Number(String(item.id || "").replace(/\D/g, "")) || 0), 0);
    return `IMP-${String(highest + 1).padStart(3, "0")}`;
  }

  function text(tag, value, className) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    node.textContent = value;
    return node;
  }

  function severityBadge(level) {
    return text("span", level, `severity-label severity-${level}`);
  }

  function showNotice(message, type = "success") {
    const region = by("[data-notice-region]");
    region.replaceChildren(text("div", message, `app-notice${type === "error" ? " error" : ""}`));
    window.setTimeout(() => region.replaceChildren(), 4500);
  }

  function renderDimensions() {
    const grid = by("[data-dimension-grid]");
    dimensions.forEach(([key, label]) => {
      const field = document.createElement("label");
      field.className = "dimension-field";
      field.append(text("span", label));
      const select = document.createElement("select");
      select.name = `dimension_${key}`;
      select.dataset.dimension = key;
      scoreLabels.forEach((labelText, index) => {
        const option = document.createElement("option");
        option.value = String(index);
        option.textContent = labelText;
        select.append(option);
      });
      field.append(select);
      grid.append(field);
    });
  }

  function render() {
    const name = state.project.name || "Untitled assessment";
    all("[data-project-label]").forEach((node) => { node.textContent = name; });
    by("[data-overview-title]").textContent = name;
    const context = [state.project.client, state.project.objective].filter(Boolean).join(" | ");
    by("[data-overview-context]").textContent = context || "No project details have been recorded.";
    renderMetrics();
    renderHeatmap();
    renderAttention();
    renderControls();
    renderRegister();
    renderActions();
    renderReport();
  }

  function renderMetrics() {
    const material = state.impacts.filter((item) => materialLevels.has(severityFor(item)));
    by("[data-metric-total]").textContent = String(state.impacts.length);
    by("[data-metric-material]").textContent = String(material.length);
    by("[data-metric-evidence]").textContent = String(state.impacts.filter((item) => concernLevels.has(item.evidenceConfidence)).length);
    by("[data-metric-unowned]").textContent = String(material.filter((item) => !item.owner.trim()).length);
  }

  function renderHeatmap() {
    const body = by("[data-heatmap-body]");
    const empty = by("[data-heatmap-empty]");
    body.replaceChildren();
    const groups = new Map();
    state.impacts.forEach((impact) => {
      if (!groups.has(impact.stakeholderGroup)) groups.set(impact.stakeholderGroup, {});
      const scores = groups.get(impact.stakeholderGroup);
      dimensions.forEach(([key]) => { scores[key] = Math.max(scores[key] || 0, Number(impact.dimensions?.[key] || 0)); });
    });
    empty.hidden = groups.size > 0;
    by(".table-scroll", by(".heatmap-panel")).hidden = groups.size === 0;
    [...groups.entries()].sort(([a], [b]) => a.localeCompare(b)).forEach(([group, scores]) => {
      const row = document.createElement("tr");
      row.append(text("td", group));
      dimensions.forEach(([key, label]) => {
        const cell = document.createElement("td");
        const score = scores[key] || 0;
        const value = text("span", String(score), `heatmap-cell score-${score}`);
        value.setAttribute("aria-label", `${label}: ${score}, ${scoreLabels[score].split(", ")[1]}`);
        cell.append(value);
        row.append(cell);
      });
      body.append(row);
    });
  }

  function leadershipItems() {
    return [...state.impacts].filter((item) => materialLevels.has(severityFor(item)) || concernLevels.has(item.evidenceConfidence)).sort((a, b) => {
      const rank = { Critical: 4, High: 3, Moderate: 2, Low: 1 };
      const evidenceA = concernLevels.has(a.evidenceConfidence) ? 1 : 0;
      const evidenceB = concernLevels.has(b.evidenceConfidence) ? 1 : 0;
      return rank[severityFor(b)] - rank[severityFor(a)] || evidenceB - evidenceA;
    });
  }

  function renderAttention() {
    const list = by("[data-attention-list]");
    const empty = by("[data-attention-empty]");
    list.replaceChildren();
    const items = leadershipItems().slice(0, 4);
    empty.hidden = items.length > 0;
    items.forEach((impact) => {
      const item = document.createElement("div");
      item.className = "attention-item";
      const top = document.createElement("div");
      top.className = "attention-top";
      top.append(text("strong", impact.impactStatement), severityBadge(severityFor(impact)));
      const issue = concernLevels.has(impact.evidenceConfidence) ? `${impact.evidenceConfidence} evidence. ` : "";
      item.append(top, text("p", `${issue}${impact.owner ? `Owner: ${impact.owner}.` : "No accountable owner assigned."}`));
      list.append(item);
    });
  }

  function renderControls() {
    const material = state.impacts.filter((item) => materialLevels.has(severityFor(item)));
    const overdue = state.impacts.filter((item) => item.targetDate && item.targetDate < today() && !["Addressed", "Monitored"].includes(item.status));
    const controls = [
      ["Implementation date", dateLabel(state.project.implementationDate)],
      ["Open interventions", String(state.impacts.filter((item) => item.status === "Open").length)],
      ["Overdue interventions", String(overdue.length)],
      ["Material impacts owned", `${material.filter((item) => item.owner.trim()).length} of ${material.length}`]
    ];
    const grid = by("[data-control-grid]");
    grid.replaceChildren();
    controls.forEach(([label, value]) => {
      const item = document.createElement("div");
      item.className = "control-item";
      item.append(text("span", label), text("strong", value));
      grid.append(item);
    });
  }

  function filteredImpacts() {
    const query = by("[data-filter-search]").value.trim().toLowerCase();
    const severity = by("[data-filter-severity]").value;
    const evidence = by("[data-filter-evidence]").value;
    return state.impacts.filter((impact) => {
      const haystack = [impact.id, impact.businessUnit, impact.stakeholderGroup, impact.role, impact.impactStatement, impact.owner].join(" ").toLowerCase();
      return (!query || haystack.includes(query)) && (severity === "all" || severityFor(impact) === severity) && (evidence === "all" || impact.evidenceConfidence === evidence);
    });
  }

  function renderRegister() {
    const body = by("[data-register-body]");
    const empty = by("[data-register-empty]");
    const items = filteredImpacts();
    body.replaceChildren();
    empty.hidden = items.length > 0;
    by(".table-scroll", by(".register-panel", by('[data-view="register"]'))).hidden = items.length === 0;
    items.forEach((impact) => {
      const row = document.createElement("tr");
      const impactCell = document.createElement("td");
      impactCell.append(text("span", impact.impactStatement, "table-primary"), text("span", `${impact.id} | ${impact.businessUnit}`, "table-secondary"));
      const groupCell = document.createElement("td");
      groupCell.append(text("span", impact.stakeholderGroup, "table-primary"), text("span", impact.role || "Role not specified", "table-secondary"));
      const severityCell = document.createElement("td"); severityCell.append(severityBadge(severityFor(impact)));
      const evidenceCell = text("td", impact.evidenceConfidence, concernLevels.has(impact.evidenceConfidence) ? "evidence-label evidence-concern" : "evidence-label");
      const ownerCell = text("td", impact.owner || "Unassigned");
      const statusCell = text("td", impact.status);
      const actionsCell = document.createElement("td"); actionsCell.className = "no-print";
      const actions = document.createElement("div"); actions.className = "row-actions";
      const edit = text("button", "Edit", "row-action"); edit.type = "button"; edit.dataset.editId = impact.id;
      const remove = text("button", "Delete", "row-action delete"); remove.type = "button"; remove.dataset.deleteId = impact.id;
      actions.append(edit, remove); actionsCell.append(actions);
      row.append(impactCell, groupCell, severityCell, evidenceCell, ownerCell, statusCell, actionsCell);
      body.append(row);
    });
  }

  function renderActions() {
    const body = by("[data-actions-body]");
    const empty = by("[data-actions-empty]");
    const items = state.impacts.filter((item) => item.intervention.trim()).sort((a, b) => (a.targetDate || "9999").localeCompare(b.targetDate || "9999"));
    body.replaceChildren();
    empty.hidden = items.length > 0;
    by(".table-scroll", by('[data-view="actions"]')).hidden = items.length === 0;
    items.forEach((impact) => {
      const row = document.createElement("tr");
      const action = document.createElement("td"); action.append(text("span", impact.intervention, "table-primary"), text("span", impact.id, "table-secondary"));
      row.append(action, text("td", impact.stakeholderGroup), text("td", impact.owner || "Unassigned"), text("td", dateLabel(impact.targetDate)), text("td", impact.status));
      const exposure = document.createElement("td"); exposure.append(severityBadge(severityFor(impact))); row.append(exposure);
      body.append(row);
    });
  }

  function renderReport() {
    const name = state.project.name || "Untitled assessment";
    by("[data-report-project]").textContent = name;
    const meta = by("[data-report-meta]");
    meta.replaceChildren();
    [["Organization", state.project.client || "Not stated"], ["Assessor", state.project.assessor || "Not stated"], ["Assessment date", dateLabel(state.project.assessmentDate)], ["Implementation", dateLabel(state.project.implementationDate)]].forEach(([label, value]) => meta.append(text("span", `${label}: ${value}`)));
    const material = state.impacts.filter((item) => materialLevels.has(severityFor(item)));
    const concern = state.impacts.filter((item) => concernLevels.has(item.evidenceConfidence));
    const unowned = material.filter((item) => !item.owner.trim());
    const unownedPhrase = `${unowned.length} material ${unowned.length === 1 ? "impact has" : "impacts have"} no accountable owner`;
    by("[data-report-summary]").textContent = state.impacts.length
      ? `The assessment records ${state.impacts.length} impacts across ${new Set(state.impacts.map((item) => item.stakeholderGroup)).size} stakeholder groups. ${material.length} are high or critical. ${concern.length} have low, missing, or contradictory evidence, and ${unownedPhrase}. Leadership should resolve these conditions before implementation.`
      : "No impacts have been assessed.";
    const priorities = by("[data-report-priorities]");
    priorities.replaceChildren();
    const priorityItems = leadershipItems().slice(0, 5);
    if (!priorityItems.length) priorities.append(text("li", "No material impacts recorded."));
    priorityItems.forEach((impact) => priorities.append(text("li", `${impact.impactStatement} Required response: ${impact.intervention}`)));
    const profile = by("[data-report-profile]");
    profile.replaceChildren();
    [["Total impacts", state.impacts.length], ["High or critical", material.length], ["Evidence concerns", concern.length], ["Unassigned owners", unowned.length]].forEach(([label, value]) => {
      const item = document.createElement("div"); item.append(text("span", label), text("strong", String(value))); profile.append(item);
    });
    const table = by("[data-report-table]"); table.replaceChildren();
    const reportItems = [...state.impacts].filter((item) => materialLevels.has(severityFor(item)) || concernLevels.has(item.evidenceConfidence)).sort((a, b) => ({ Critical: 4, High: 3, Moderate: 2, Low: 1 })[severityFor(b)] - ({ Critical: 4, High: 3, Moderate: 2, Low: 1 })[severityFor(a)]);
    if (!reportItems.length) {
      const row = document.createElement("tr"); const cell = text("td", "No material impacts recorded."); cell.colSpan = 5; row.append(cell); table.append(row);
    }
    reportItems.forEach((impact) => {
      const row = document.createElement("tr");
      row.append(text("td", `${impact.stakeholderGroup}: ${impact.impactStatement}`), text("td", severityFor(impact)), text("td", impact.evidenceConfidence), text("td", impact.intervention), text("td", impact.owner || "Unassigned"));
      table.append(row);
    });
  }

  function switchView(name) {
    currentView = name;
    all("[data-view]").forEach((view) => view.classList.toggle("active", view.dataset.view === name));
    all("[data-view-target]").forEach((button) => {
      const active = button.dataset.viewTarget === name;
      button.classList.toggle("active", active);
      if (active) button.setAttribute("aria-current", "page"); else button.removeAttribute("aria-current");
    });
    if (name === "report") renderReport();
    by("#workspace").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function openProject() {
    Object.entries(state.project).forEach(([key, value]) => { if (projectForm.elements[key]) projectForm.elements[key].value = value || ""; });
    projectDialog.showModal();
  }

  function openImpact(id = "") {
    impactForm.reset();
    by("[data-impact-validation]").textContent = "";
    const existing = state.impacts.find((item) => item.id === id);
    by("[data-impact-dialog-title]").textContent = existing ? "Edit impact" : "Add impact";
    impactForm.elements.id.value = existing?.id || "";
    const source = existing || { dimensions: Object.fromEntries(dimensions.map(([key]) => [key, 0])), status: "Open" };
    Object.entries(source).forEach(([key, value]) => {
      if (key === "dimensions") return;
      if (impactForm.elements[key]) impactForm.elements[key].value = value ?? "";
    });
    dimensions.forEach(([key]) => { impactForm.elements[`dimension_${key}`].value = String(source.dimensions?.[key] || 0); });
    updateSeverityPreview();
    impactDialog.showModal();
  }

  function formDimensions() {
    return Object.fromEntries(dimensions.map(([key]) => [key, Number(impactForm.elements[`dimension_${key}`].value)]));
  }

  function updateSeverityPreview() {
    const scores = formDimensions();
    const temporary = { dimensions: scores, severityOverride: impactForm.elements.severityOverride.value };
    by("[data-suggested-severity]").textContent = severityFor(temporary);
    by("[data-severity-reason]").textContent = temporary.severityOverride ? `Manual override. A rationale is required.` : severityReason(scores);
  }

  function formValue(formData, key) {
    return String(formData.get(key) || "").trim();
  }

  function submitImpact() {
    const data = new FormData(impactForm);
    const override = formValue(data, "severityOverride");
    const overrideRationale = formValue(data, "overrideRationale");
    if (override && !overrideRationale) {
      by("[data-impact-validation]").textContent = "Explain why the suggested classification is being overridden.";
      impactForm.elements.overrideRationale.focus();
      return false;
    }
    const id = formValue(data, "id") || nextId();
    const impact = {
      id,
      businessUnit: formValue(data, "businessUnit"), stakeholderGroup: formValue(data, "stakeholderGroup"), role: formValue(data, "role"),
      population: Number(data.get("population")) || 0, location: formValue(data, "location"), impactDate: formValue(data, "impactDate"),
      currentState: formValue(data, "currentState"), futureState: formValue(data, "futureState"), impactStatement: formValue(data, "impactStatement"),
      dimensions: formDimensions(), evidenceConfidence: formValue(data, "evidenceConfidence"), evidenceSource: formValue(data, "evidenceSource"), evidence: formValue(data, "evidence"),
      severityOverride: override, overrideRationale, intervention: formValue(data, "intervention"), owner: formValue(data, "owner"), targetDate: formValue(data, "targetDate"), status: formValue(data, "status") || "Open"
    };
    const index = state.impacts.findIndex((item) => item.id === id);
    if (index >= 0) state.impacts[index] = impact; else state.impacts.push(impact);
    saveState(index >= 0 ? "Impact updated" : "Impact added");
    render();
    return true;
  }

  function download(content, type, filename) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url; link.download = filename; document.body.append(link); link.click(); link.remove();
    URL.revokeObjectURL(url);
  }

  function safeFilename() {
    return (state.project.name || "change-impact-assessment").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "change-impact-assessment";
  }

  function csvCell(value) {
    return `"${String(value ?? "").replace(/"/g, '""')}"`;
  }

  function exportCsv() {
    const headers = ["Impact ID", "Initiative", "Client", "Business unit", "Stakeholder group", "Role", "Population", "Location", "Impact date", "Current state", "Future state", "Impact statement", ...dimensions.map(([, label]) => label), "Severity", "Evidence confidence", "Evidence source", "Evidence and assumptions", "Intervention", "Owner", "Target date", "Status"];
    const rows = state.impacts.map((impact) => [impact.id, state.project.name, state.project.client, impact.businessUnit, impact.stakeholderGroup, impact.role, impact.population, impact.location, impact.impactDate, impact.currentState, impact.futureState, impact.impactStatement, ...dimensions.map(([key]) => impact.dimensions[key]), severityFor(impact), impact.evidenceConfidence, impact.evidenceSource, impact.evidence, impact.intervention, impact.owner, impact.targetDate, impact.status]);
    download([headers, ...rows].map((row) => row.map(csvCell).join(",")).join("\r\n"), "text/csv;charset=utf-8", `${safeFilename()}-register.csv`);
  }

  function loadDemo() {
    if (state.impacts.length && !confirm("Replace the current browser assessment with the demonstration case? Export it first if you need a copy.")) return;
    state = clone(sampleState);
    state.updatedAt = new Date().toISOString();
    saveState("Demo loaded");
    render();
    switchView("overview");
    showNotice("Demonstration case loaded. Edit it freely or export a copy.");
  }

  function removeImpact(id) {
    const impact = state.impacts.find((item) => item.id === id);
    if (!impact || !confirm(`Delete ${id}, ${impact.stakeholderGroup}?`)) return;
    state.impacts = state.impacts.filter((item) => item.id !== id);
    saveState("Impact deleted");
    render();
  }

  renderDimensions();
  all("[data-view-target]").forEach((button) => button.addEventListener("click", () => switchView(button.dataset.viewTarget)));
  all("[data-edit-project]").forEach((button) => button.addEventListener("click", openProject));
  all("[data-add-impact]").forEach((button) => button.addEventListener("click", () => openImpact()));
  all("[data-load-demo]").forEach((button) => button.addEventListener("click", loadDemo));
  all("[data-close-project]").forEach((button) => button.addEventListener("click", () => projectDialog.close()));
  all("[data-close-impact]").forEach((button) => button.addEventListener("click", () => impactDialog.close()));
  all("[data-open-privacy]").forEach((button) => button.addEventListener("click", () => privacyDialog.showModal()));
  all("[data-close-privacy]").forEach((button) => button.addEventListener("click", () => privacyDialog.close()));
  all("[data-dimension], [name='severityOverride']", impactForm).forEach((control) => control.addEventListener("change", updateSeverityPreview));
  all("[data-filter-search], [data-filter-severity], [data-filter-evidence]").forEach((control) => control.addEventListener("input", renderRegister));

  projectForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!projectForm.reportValidity()) return;
    const data = new FormData(projectForm);
    Object.keys(state.project).forEach((key) => { state.project[key] = formValue(data, key); });
    saveState("Project updated"); render(); projectDialog.close(); showNotice("Project settings saved.");
  });

  impactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!impactForm.reportValidity()) return;
    if (submitImpact()) { impactDialog.close(); switchView("register"); showNotice("Impact saved to the register."); }
  });

  by("[data-register-body]").addEventListener("click", (event) => {
    const edit = event.target.closest("[data-edit-id]");
    const remove = event.target.closest("[data-delete-id]");
    if (edit) openImpact(edit.dataset.editId);
    if (remove) removeImpact(remove.dataset.deleteId);
  });

  by("[data-export-json]").addEventListener("click", () => download(JSON.stringify(state, null, 2), "application/json", `${safeFilename()}.json`));
  by("[data-export-csv]").addEventListener("click", exportCsv);
  by("[data-print-report]").addEventListener("click", () => { renderReport(); window.print(); });
  by("[data-import-file]").addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    try {
      const imported = JSON.parse(await file.text());
      if (!validateState(imported)) throw new Error("Unsupported or incomplete Change Impact Canvas file.");
      state = imported; saveState("Assessment imported"); render(); switchView("overview"); showNotice("Assessment imported successfully.");
    } catch (error) {
      showNotice(error.message, "error");
    } finally {
      event.target.value = "";
    }
  });
  by("[data-clear-data]").addEventListener("click", () => {
    if (!confirm("Delete the current assessment and all impact records from this browser?")) return;
    localStorage.removeItem(STORAGE_KEY); state = blankState(); render(); privacyDialog.close(); switchView("overview"); showNotice("Local assessment data deleted.");
  });

  render();
})();
