window.BBC_DMI_CASE = {
  id: "bbc-dmi-2011",
  title: "BBC Digital Media Initiative",
  subtitle: "Blinded retrospective diagnostic pilot",
  diagnosticCutoff: "15 February 2011",
  contradictionCutoff: "31 December 2011",
  outcomeEmbargo: "The historical result and later findings are excluded from this application.",
  instructions: [
    "Score the organization and transformation conditions supported by the evidence available at the stated cutoff.",
    "Do not search for later information about the case until your submission is locked.",
    "Treat leadership statements as assertions unless independently corroborated.",
    "A lower Evidence Confidence Index does not mechanically lower a capability score. Change a capability score only when new evidence changes the supported maturity judgment.",
    "Record missing evidence. Do not infer that an undocumented practice is absent unless the evidence supports that conclusion."
  ],
  evidenceStatuses: [
    "Verified fact",
    "Corroborated finding",
    "Stakeholder assertion",
    "Assumption",
    "Contradiction",
    "Missing evidence"
  ],
  round1: [
    {
      id: "A01",
      date: "2008-01",
      sourceClass: "Independent public audit",
      authority: "High",
      status: "Corroborated finding",
      title: "Original business case and intended transformation",
      text: "DMI was intended to change how BBC staff created, shared, managed, and archived audio and video content. The proposition combined technology delivery with production-process change, efficiency, creativity, and external partnership benefits.",
      elements: ["N1", "N3", "C1", "C3", "C5", "R2"],
      sourceLabel: "NAO, The BBC's management of its Digital Media Initiative",
      sourceUrl: "https://www.nao.org.uk/reports/the-bbcs-management-of-its-digital-media-initiative/"
    },
    {
      id: "A02",
      date: "2009-07",
      sourceClass: "Independent public audit",
      authority: "High",
      status: "Verified fact",
      title: "Contracted delivery ended after substantial delay",
      text: "The BBC and Siemens ended the development contract by mutual agreement in July 2009. The early phase had accumulated a 21-month delay and £26 million of planned benefits had not been achieved during 2009 and 2010.",
      elements: ["N2", "C2", "C3", "C5", "C6", "R3", "R4", "R5"],
      sourceLabel: "NAO, February 2011 report",
      sourceUrl: "https://www.nao.org.uk/reports/the-bbcs-management-of-its-digital-media-initiative/"
    },
    {
      id: "A03",
      date: "2009-09",
      sourceClass: "Independent public audit",
      authority: "High",
      status: "Corroborated finding",
      title: "In-house delivery decision lacked option testing",
      text: "The BBC took delivery in-house without testing whether this was the best delivery option or demonstrating value for money for that approach. The decision moved substantial delivery risk back to the BBC.",
      elements: ["C2", "C5", "R2", "R3", "R4", "R5"],
      sourceLabel: "NAO, February 2011 report",
      sourceUrl: "https://www.nao.org.uk/reports/the-bbcs-management-of-its-digital-media-initiative/"
    },
    {
      id: "A04",
      date: "2010-06",
      sourceClass: "Independent public audit",
      authority: "High",
      status: "Corroborated finding",
      title: "Revised investment case improved but assurance remained incomplete",
      text: "The revised investment case compared scope options and a stop option and described benefit realization more rigorously. The NAO found that independent assurance of system design and costs would have strengthened the case because delivery remained difficult and risky.",
      elements: ["C2", "C6", "R2", "R3", "R4"],
      sourceLabel: "NAO executive summary, February 2011",
      sourceUrl: "https://www.nao.org.uk/wp-content/uploads/2011/02/1011_bbc_digital_media_es.pdf"
    },
    {
      id: "A05",
      date: "2010-06",
      sourceClass: "Approved investment case described by auditor",
      authority: "Medium",
      status: "Stakeholder assertion",
      title: "Financial and non-financial benefits remained central",
      text: "The case emphasized efficiency, creativity, partnership working, and potential public access to archives. Some non-financial benefits depended on other organizations and were outside the BBC's direct control.",
      elements: ["N2", "C1", "C6", "R2", "R4", "R6"],
      sourceLabel: "NAO executive summary, February 2011",
      sourceUrl: "https://www.nao.org.uk/wp-content/uploads/2011/02/1011_bbc_digital_media_es.pdf"
    },
    {
      id: "A06",
      date: "2011-02-01",
      sourceClass: "Independent public audit",
      authority: "High",
      status: "Corroborated finding",
      title: "Complex integration with no schedule contingency",
      text: "The program still had substantial work remaining. Several interdependent technical elements had to be integrated, and the plan contained no time contingency. Success also depended on adoption across the BBC and by external users.",
      elements: ["C1", "C3", "C5", "R4", "R5", "R6"],
      sourceLabel: "NAO executive summary, February 2011",
      sourceUrl: "https://www.nao.org.uk/wp-content/uploads/2011/02/1011_bbc_digital_media_es.pdf"
    },
    {
      id: "A07",
      date: "2011-02-01",
      sourceClass: "Independent public audit",
      authority: "High",
      status: "Corroborated finding",
      title: "Initial releases and early user response",
      text: "Four technology releases had been delivered after the work moved in-house. Users consulted by the review responded positively to the elements available at that point, while the auditor stated that overall value for money could not yet be determined.",
      elements: ["C1", "C5", "C6", "R4", "R6"],
      sourceLabel: "NAO and Public Accounts Committee, 2011",
      sourceUrl: "https://publications.parliament.uk/pa/cm201011/cmselect/cmpubacc/808/80804.htm"
    },
    {
      id: "A08",
      date: "2011-02-01",
      sourceClass: "Governing-body statement",
      authority: "Medium",
      status: "Stakeholder assertion",
      title: "BBC Trust expressed confidence in in-house progress",
      text: "The BBC Trust stated that in-house delivery was progressing as planned and described DMI as important to future production efficiency and creativity. It also accepted that the program was high risk and that final value depended on adoption.",
      elements: ["N1", "C2", "R1", "R2", "R3", "R6"],
      sourceLabel: "BBC Trust response published with the NAO report",
      sourceUrl: "https://www.nao.org.uk/wp-content/uploads/2011/02/1011_bbc_digital_media.pdf"
    },
    {
      id: "A09",
      date: "2011-02-15",
      sourceClass: "Parliamentary oral evidence",
      authority: "Medium",
      status: "Stakeholder assertion",
      title: "Management confidence in internal delivery capability",
      text: "BBC leadership cited internal capability and prior recovery of major digital projects as reasons for confidence in taking DMI in-house. The delivery plan was presented as on course for completion during 2011.",
      elements: ["C4", "C5", "R1", "R4", "R5"],
      sourceLabel: "Public Accounts Committee oral evidence, 15 February 2011",
      sourceUrl: "https://publications.parliament.uk/pa/cm201011/cmselect/cmpubacc/808/11021502.htm"
    },
    {
      id: "A10",
      date: "2011-02-15",
      sourceClass: "Evidence gap identified by independent audit",
      authority: "High",
      status: "Missing evidence",
      title: "Outcome and adoption evidence remained immature",
      text: "The available reports did not establish broad operational adoption, sustained production outcomes, or realized program-level value. The auditor explicitly considered it too early to conclude whether the overall program represented value for money.",
      elements: ["N2", "C1", "C6", "R2", "R6"],
      sourceLabel: "NAO, February 2011 report",
      sourceUrl: "https://www.nao.org.uk/reports/the-bbcs-management-of-its-digital-media-initiative/"
    }
  ],
  round2: [
    {
      id: "B01",
      date: "2010-12",
      sourceClass: "Independent technical assessment, existence later confirmed by Parliament",
      authority: "High",
      status: "Contradiction",
      title: "Previously withheld technical assessment",
      text: "An Accenture draft assessment available to the BBC before the February 2011 hearing found that the DMI elements it examined were not robust enough for program-making and required significant remedial work. The findings were not supplied to the NAO before publication or disclosed at the hearing.",
      elements: ["C2", "C5", "C6", "R3", "R4", "R5"],
      sourceLabel: "Public Accounts Committee findings, 2014",
      sourceUrl: ""
    },
    {
      id: "B02",
      date: "2011-02",
      sourceClass: "Parliamentary finding based on later evidence",
      authority: "High",
      status: "Contradiction",
      title: "Deployment assertion overstated actual use",
      text: "BBC leadership told Parliament that DMI was being used to make many programs. Later examination found that it had been used to make one program at the time relevant to that assertion.",
      elements: ["C1", "C2", "C5", "C6", "R1", "R3", "R6"],
      sourceLabel: "Public Accounts Committee findings, 2014",
      sourceUrl: ""
    },
    {
      id: "B03",
      date: "2011-12",
      sourceClass: "Program risk record described by Parliament",
      authority: "High",
      status: "Contradiction",
      title: "Material risk escalation was delayed in governance reporting",
      text: "The project-management office raised the program risk rating to red for the quarter ending December 2011. The Executive Board did not receive that status until June 2012 and the BBC Trust did not receive it until July 2012.",
      elements: ["C2", "C6", "R1", "R3", "R4"],
      sourceLabel: "Public Accounts Committee findings, 2014",
      sourceUrl: ""
    },
    {
      id: "B04",
      date: "2011",
      sourceClass: "Parliamentary retrospective finding",
      authority: "High",
      status: "Corroborated finding",
      title: "No single accountable senior owner",
      text: "Responsibility for technology delivery and responsibility for achieving operational benefits were split. No senior responsible owner held end-to-end accountability for system delivery, user adoption, and benefits realization.",
      elements: ["C2", "C3", "R1", "R3", "R6"],
      sourceLabel: "Public Accounts Committee findings, 2014",
      sourceUrl: ""
    },
    {
      id: "B05",
      date: "2011",
      sourceClass: "Parliamentary retrospective finding",
      authority: "High",
      status: "Corroborated finding",
      title: "Developer and user expectations were not reconciled",
      text: "The teams developing DMI and the intended business users held different views about the system's effectiveness and engagement. Governance did not resolve those differences, increasing the risk that delivered technology would not meet operational needs.",
      elements: ["C1", "C2", "C3", "C4", "C5", "R2", "R3", "R6"],
      sourceLabel: "Public Accounts Committee findings, 2014",
      sourceUrl: ""
    }
  ],
  eciDimensions: [
    { id: "authority", label: "Authority", help: "How authoritative are the sources for the claims being scored?", anchors: ["Unknown or non-credible source", "Unverified interested-party assertion", "Documented source with material authority limits", "Credible operational or management source", "Authoritative source with direct access or mandate", "Authoritative primary or independent source with verified provenance"] },
    { id: "corroboration", label: "Corroboration", help: "How consistently are material claims supported by independent sources?", anchors: ["No corroboration", "Single unsupported source", "Partial support from related sources", "Material claims supported by at least two sources", "Independent sources corroborate most material claims", "Multiple independent methods and sources converge"] },
    { id: "recency", label: "Recency", help: "Was the evidence current at the assessment cutoff?", anchors: ["Date unknown or unusable", "Materially outdated", "Mixed periods with important stale evidence", "Current enough for most judgments", "Current for all material judgments", "Current evidence plus appropriate leading indicators"] },
    { id: "relevance", label: "Relevance", help: "Does the evidence directly address the element and decision?", anchors: ["Not relevant", "Indirect contextual relevance", "Partially addresses the judgment", "Directly addresses most material claims", "Directly addresses the element and decision", "Direct evidence covers claims, segments, dependencies, and decision consequences"] },
    { id: "completeness", label: "Completeness", help: "Are material gaps, stakeholders, periods, and dependencies covered?", anchors: ["Material evidence is absent", "Major claims or groups are uncovered", "Several important gaps remain", "Most material claims and groups are covered", "Material claims, groups, periods, and dependencies are covered", "Coverage is complete with documented search and missing-evidence boundaries"] },
    { id: "consistency", label: "Consistency", help: "Do sources agree, and are contradictions resolved?", anchors: ["Critical unresolved contradictions undermine the judgment", "Material unresolved contradictions", "Important tensions remain unexplained", "Minor tensions are bounded and disclosed", "Sources are materially consistent or contradictions are resolved", "Consistency is tested across sources, methods, groups, and time"] }
  ],
  contradictionStatuses: [
    { id: "none", label: "No material contradiction", cap: 100 },
    { id: "resolved", label: "Material contradiction resolved with traceable evidence", cap: 100 },
    { id: "material-unresolved", label: "Material contradiction unresolved", cap: 60 },
    { id: "critical-unresolved", label: "Critical contradiction unresolved", cap: 40 }
  ],
  eciRules: {
    minimumDimensions: 6,
    materialConsistencyMaximum: 2,
    criticalConsistencyMaximum: 1,
    method: "Effective ECI equals the lower of the six-dimension arithmetic mean and the unresolved-contradiction cap. The six dimensions remain visible and must be interpreted separately."
  },
  outcomeChoices: ["Likely success", "Mixed or materially compromised", "Likely failure or termination", "Insufficient evidence"]
};
