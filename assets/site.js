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

const portfolioData = {
  balanced: {
    title: 'Portfolio health requires targeted intervention',
    copy: 'Two initiatives need executive action. Protect benefit validation for FIN-104, resolve the cross-functional dependency affecting OPS-218, and retain the current cadence for the remaining portfolio.',
    rows: [
      ['FIN-104', 'Finance controls', 'Amber', 'Medium', 'High'],
      ['OPS-218', 'Operational capacity', 'Red', 'Low', 'High'],
      ['HR-305', 'Service experience', 'Green', 'High', 'Low'],
      ['DIG-412', 'Workflow enablement', 'Green', 'Medium', 'Medium']
    ]
  },
  benefits: {
    title: 'Benefits confidence is the primary exposure',
    copy: 'Reconfirm baselines and Finance ownership before recognizing value. FIN-104 and DIG-412 have delivery progress, but their evidence chains need stronger validation.',
    rows: [
      ['FIN-104', 'Finance controls', 'Amber', 'Low', 'Medium'],
      ['OPS-218', 'Operational capacity', 'Amber', 'Medium', 'High'],
      ['HR-305', 'Service experience', 'Green', 'High', 'Low'],
      ['DIG-412', 'Workflow enablement', 'Amber', 'Low', 'Medium']
    ]
  },
  risk: {
    title: 'Dependencies are concentrating delivery risk',
    copy: 'Escalate OPS-218 to the portfolio board. Sequence the technology dependency before the next tollgate and assign one accountable owner for the operational readiness decision.',
    rows: [
      ['FIN-104', 'Finance controls', 'Green', 'Medium', 'Low'],
      ['OPS-218', 'Operational capacity', 'Red', 'Medium', 'High'],
      ['HR-305', 'Service experience', 'Green', 'High', 'Low'],
      ['DIG-412', 'Workflow enablement', 'Amber', 'Medium', 'High']
    ]
  }
};

function badgeClass(status) {
  return status.toLowerCase() === 'green' ? 'green' : status.toLowerCase() === 'red' ? 'red' : 'amber';
}

function renderCockpit() {
  const scenario = document.querySelector('[data-scenario]');
  const tbody = document.querySelector('[data-portfolio-rows]');
  const title = document.querySelector('[data-brief-title]');
  const copy = document.querySelector('[data-brief-copy]');
  if (!scenario || !tbody || !title || !copy) return;

  const dataset = portfolioData[scenario.value] || portfolioData.balanced;
  tbody.innerHTML = dataset.rows.map((row) => `
    <tr>
      <td><strong>${row[0]}</strong></td>
      <td>${row[1]}</td>
      <td><span class="badge ${badgeClass(row[2])}">${row[2]}</span></td>
      <td>${row[3]}</td>
      <td>${row[4]}</td>
    </tr>`).join('');
  title.textContent = dataset.title;
  copy.textContent = dataset.copy;
}

const scenario = document.querySelector('[data-scenario]');
if (scenario) {
  scenario.addEventListener('change', renderCockpit);
  renderCockpit();
}
