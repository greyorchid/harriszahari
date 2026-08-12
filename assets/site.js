const menuButton = document.querySelector('[data-menu-button]');
const menu = document.querySelector('[data-menu]');

if (menuButton && menu) {
  menuButton.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

document.querySelectorAll('[data-year]').forEach((node) => {
  node.textContent = new Date().getFullYear();
});

const diagnosticModels = {
  service: {
    title: 'Service performance recovery',
    method: 'DMAIC with BPM process governance',
    rationale: 'Use data-led root-cause analysis while establishing clear end-to-end process ownership.',
    supporting: 'Voice of Customer, service blueprinting, control plans, and change leadership',
    risk: 'Symptoms may be treated as isolated incidents',
    riskDetail: 'Define one end-to-end problem boundary before teams start designing local solutions.',
    priorities: ['Confirm the customer and operational problem statement.', 'Map the end-to-end process and ownership gaps.', 'Establish the baseline, failure demand, and data-quality gaps.', 'Approve the charter, decision rights, and review cadence.']
  },
  cost: {
    title: 'Cost and productivity transformation',
    method: 'Lean value-stream improvement with benefit governance',
    rationale: 'Expose non-value work, constraints, rework, and capacity losses before committing to automation or workforce action.',
    supporting: 'Value-stream mapping, work measurement, standard work, and automation assessment',
    risk: 'Savings may be claimed without operational removal',
    riskDetail: 'Separate hard savings, capacity release, cost avoidance, and workload transfer in the value case.',
    priorities: ['Confirm demand, workload, capacity, and cost baselines.', 'Identify material waste and constraint categories.', 'Assign operational and Finance benefit owners.', 'Prioritize changes by value, feasibility, risk, and adoption effort.']
  },
  quality: {
    title: 'Quality and defect reduction',
    method: 'DMAIC with statistical and control-plan discipline',
    rationale: 'Use verified defect definitions, measurement analysis, causal testing, and process controls to reduce variation.',
    supporting: 'Measurement-system analysis, Pareto analysis, FMEA, root-cause verification, and SPC',
    risk: 'Unverified causes may drive ineffective countermeasures',
    riskDetail: 'Require evidence linking causes to defects before approving permanent solutions.',
    priorities: ['Agree the operational defect definition and customer impact.', 'Validate the measurement system and baseline.', 'Stratify defects by process, product, time, and cause category.', 'Establish the DMAIC tollgate and solution-approval criteria.']
  },
  fragmentation: {
    title: 'End-to-end process integration',
    method: 'BPM redesign with accountable process ownership',
    rationale: 'Create one process view across functions, systems, handoffs, controls, and customer outcomes.',
    supporting: 'SIPOC, process architecture, service design, RACI, and Lean flow analysis',
    risk: 'Functions may optimize their own steps while preserving total lead time',
    riskDetail: 'Appoint one end-to-end process owner with authority over handoffs and performance measures.',
    priorities: ['Define process start, end, customer, and outcome measures.', 'Map handoffs, queues, controls, and technology dependencies.', 'Confirm process ownership and decision rights.', 'Design the future-state operating model and implementation roadmap.']
  },
  digital: {
    title: 'Governed digital adoption',
    method: 'Agile delivery with process and change governance',
    rationale: 'Test user value iteratively while controlling process risk, data handling, adoption, and operational readiness.',
    supporting: 'Design Thinking, process redesign, risk zoning, user testing, and adoption planning',
    risk: 'Technology may digitize a weak process',
    riskDetail: 'Confirm the process problem and control requirements before selecting or building the solution.',
    priorities: ['Define the user problem and operational outcome.', 'Assess process, data, control, and adoption readiness.', 'Select a minimum viable use case with measurable value.', 'Approve build, validation, deployment, and sustainment controls.']
  },
  strategy: {
    title: 'Strategy-to-execution mobilization',
    method: 'Transformation PMO with portfolio and benefits governance',
    rationale: 'Translate strategic priorities into governed initiatives, accountable outcomes, dependencies, and decision forums.',
    supporting: 'True North alignment, portfolio prioritization, RAID management, change leadership, and benefits realization',
    risk: 'A large activity portfolio may form without measurable strategic value',
    riskDetail: 'Require each initiative to show strategic alignment, outcome ownership, readiness, dependencies, and benefit evidence.',
    priorities: ['Translate strategic priorities into measurable outcome themes.', 'Assess the current initiative portfolio and remove duplication.', 'Establish sponsors, workstream owners, and decision forums.', 'Approve portfolio criteria, reporting standards, and benefit gates.']
  }
};

const governanceModels = {
  team: ['Team-led delivery with sponsor checkpoints', 'Use weekly team reviews, clear action ownership, and milestone-based sponsor decisions.'],
  functions: ['Cross-functional PMO with formal tollgates', 'Use fortnightly delivery reviews, a monthly sponsor forum, dependency tracking, and named process ownership.'],
  regional: ['Regional transformation office with local ownership', 'Use common standards, monthly regional governance, local implementation owners, and cross-market dependency escalation.'],
  enterprise: ['Enterprise portfolio governance', 'Use executive portfolio boards, workstream PMOs, standardized health reporting, benefit gates, and formal dependency management.']
};

const benefitModels = {
  savings: ['Finance-validated financial value', 'Confirm cost baselines, calculation logic, implementation evidence, Finance ownership, and when value enters the accounts.'],
  capacity: ['Operationally validated capacity release', 'Measure hours or equipment time released, confirm demand assumptions, and document how capacity will be redeployed.'],
  experience: ['Service and customer outcome validation', 'Connect service measures with customer outcomes, demand patterns, failure demand, and sustained operating performance.'],
  control: ['Control-effectiveness evidence', 'Define the control failure, risk exposure, ownership, testing method, and post-implementation effectiveness review.'],
  revenue: ['Revenue-protection evidence', 'Validate the causal link between operational performance, availability, contractual exposure, and realized or protected revenue.'],
  capability: ['Capability and adoption evidence', 'Measure practitioner readiness, application quality, behavior adoption, governance maturity, and sustained use in operational work.']
};

const evidenceAdjustments = {
  reliable: ['Evidence ready for causal analysis', 'Use the available baseline, then confirm definitions and measurement stability before solution approval.'],
  partial: ['Baseline completeness is the first assurance gate', 'Close the material data gaps and document assumptions before recognizing benefits.'],
  uncertain: ['Measurement risk may invalidate the value case', 'Validate definitions, sources, collection methods, and ownership before selecting countermeasures.'],
  observations: ['Diagnostic evidence must be established', 'Treat interviews as hypotheses. Build an operational baseline before committing to a solution or financial claim.']
};

function setText(selector, value) {
  const node = document.querySelector(selector);
  if (node) node.textContent = value;
}

function renderDiagnostic(form, focusOutput = false) {
  const data = new FormData(form);
  const model = diagnosticModels[data.get('challenge')] || diagnosticModels.service;
  const governance = governanceModels[data.get('complexity')] || governanceModels.functions;
  const benefits = benefitModels[data.get('outcome')] || benefitModels.experience;
  const evidence = evidenceAdjustments[data.get('evidence')] || evidenceAdjustments.partial;

  setText('[data-output-title]', model.title);
  setText('[data-output-method]', model.method);
  setText('[data-output-rationale]', model.rationale);
  setText('[data-output-governance]', governance[0]);
  setText('[data-output-governance-detail]', governance[1]);
  setText('[data-output-benefits]', benefits[0]);
  setText('[data-output-benefits-detail]', `${benefits[1]} ${evidence[1]}`);
  setText('[data-output-risk]', model.risk);
  setText('[data-output-risk-detail]', model.riskDetail);
  setText('[data-output-supporting]', model.supporting);

  const priorities = document.querySelector('[data-output-priorities]');
  if (priorities) {
    priorities.replaceChildren(...model.priorities.map((priority) => {
      const item = document.createElement('li');
      item.textContent = priority;
      return item;
    }));
  }

  if (focusOutput) {
    const title = document.querySelector('[data-output-title]');
    if (title) title.focus();
  }
}

const diagnosticForm = document.querySelector('[data-diagnostic-form]');
if (diagnosticForm) {
  diagnosticForm.addEventListener('submit', (event) => {
    event.preventDefault();
    renderDiagnostic(diagnosticForm, true);
  });
  renderDiagnostic(diagnosticForm);
}

const contactModes = {
  resume: {
    heading: "Request Harris Zahari's executive resume.",
    intro: 'Copy the email address or prepared request below. This works even when your device has no default email application.',
    message: `Hello Harris,

I would like to request your executive resume and discuss a relevant senior transformation leadership opportunity.

Regards,`
  },
  opportunity: {
    heading: 'Let’s discuss a transformation leadership opportunity.',
    intro: 'I am open to senior transformation, operational excellence, strategy execution, Transformation PMO, and selected advisory opportunities.',
    message: `Hello Harris,

I would like to discuss a senior transformation leadership opportunity with you. Please let me know a suitable time to connect.

Regards,`
  }
};

const messageTemplate = document.querySelector('[data-message-template]');
if (messageTemplate) {
  const reason = new URLSearchParams(window.location.search).get('reason') || 'opportunity';
  const mode = contactModes[reason] || contactModes.opportunity;
  setText('[data-contact-heading]', mode.heading);
  setText('[data-contact-intro]', mode.intro);
  messageTemplate.value = mode.message;
}

async function copyContactText(value, successMessage, button) {
  let copied = false;
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      copied = true;
    }
  } catch (error) {
    copied = false;
  }

  if (!copied) {
    const fallback = document.createElement('textarea');
    fallback.value = value;
    fallback.setAttribute('readonly', '');
    fallback.style.position = 'fixed';
    fallback.style.opacity = '0';
    document.body.appendChild(fallback);
    fallback.select();
    try {
      copied = document.execCommand('copy');
    } catch (error) {
      copied = false;
    }
    fallback.remove();
  }

  const feedback = button.closest('.contact-card')?.querySelector('[data-copy-feedback]');
  if (feedback) {
    feedback.textContent = copied
      ? successMessage
      : 'Copy was blocked. Select the text and copy it manually.';
  }
}

document.querySelectorAll('[data-copy-value]').forEach((button) => {
  button.addEventListener('click', () => {
    copyContactText(button.dataset.copyValue, button.dataset.copyLabel || 'Copied', button);
  });
});

const copyTemplateButton = document.querySelector('[data-copy-template]');
if (copyTemplateButton && messageTemplate) {
  copyTemplateButton.addEventListener('click', () => {
    copyContactText(messageTemplate.value, copyTemplateButton.dataset.copyLabel || 'Message copied', copyTemplateButton);
  });
}
