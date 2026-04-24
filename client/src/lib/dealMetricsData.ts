// Deal Metrics dropdown data — sourced directly from 20260314DealMetrics.xlsx
// All options are verbatim from the Menus CSV

export const dealMetricsMenus = {
  // ── INTENTIONS & DEAL STRUCTURE ──────────────────────────────────────────
  whyBuying: [
    "Arbitrage", "Boredom", "Capability", "Cash Generation", "Commercial",
    "Consolidation", "Diversification", "Dividend Yield",
    "Excess Capital on Balance Sheet", "Horizontal Expansion",
    "Market Consolidation", "Return", "Roll-Up", "Self-Operate",
    "Share uplift", "Strategic", "Supplement Organic Growth",
    "Value Uplift", "Vertical Expansion", "Specific Reason", "Other",
  ],

  idealPurchaseStructure: [
    "Hard Assets Only", "Net Asset Business Value",
    "Net Asset Business Value + Hard Assets", "Share Sale",
    "Share Sale + Hard Assets", "Alternative",
  ],

  purchaseStake: [
    ">25%", ">50%", ">25% + Operational Control",
    ">50% + Operational Control", "100%", "Custom Stake",
  ],

  dealStructure: [
    "Earnings X multiple", "Earnings X multiple + Earn-out",
    "Earnings X multiple + Earn-up", "Net Asset Value",
    "Net Asset Value + Earn-out", "Net Asset Value + Earn-up",
    "Custom Structure",
  ],

  dealFunding: [
    "100% Equity", "Debt", "Equity + Debt", "Equity + Hybrid",
    "Equity + Debt + Vendor Finance", "Equity + Hybrid + Vendor Finance",
    "Hybrid/Leverage Funded", "Vendor Funded", "New Funded",
  ],

  overallMultiple: [">3", ">4", ">5", ">6", "Other"],

  completionDateMultiple: [
    "Day 1 Settlement >2", "Day 1 Settlement >3",
    "Day 1 Settlement >4", "Day 1 Settlement >5", "Other",
  ],

  futureIntentions: ["Acquire", "Exit", "Growth", "Options", "Retain", "Other Intention"],

  integration: [
    "Stand Alone", "Federation Model", "Full Integration",
    "Part Integration", "Other",
  ],

  mainSynergy: [
    "Additional Revenue Streams", "Licencing", "Partnership Selling",
    "Project Returns vs Investment", "Revenue", "Savings",
    "Savings + Integration Costs", "Up-Selling", "X-Selling",
    "Additional KPI", "Other",
  ],

  postDealKPIs: [
    "Cost Savings - 12 Month", "Cash Utilisation Ratio - 12 Month",
    "EBITDA Retention/Increase - 12 Month", "Net Profit/Increase - 12 Month",
    "Employee Retention Rate - 12 Month", "Customer Retention Rate - 12 Month",
    "Revenue Retention / Increase - 12 Month", "Other",
  ],

  shareholderMetrics: [
    "IRR% [Internal Rate of Return]", "Cash Flow Generative",
    "DCF vs Headline Price", "EV/EBITDA Discount",
    "Leverage Coverage = Debt/EBITDA", "Payback Period",
    "Working Capital Efficiency", "Other Metric",
  ],

  // ── EXTERNALS ─────────────────────────────────────────────────────────────
  industryTarget: [
    "AI Enhancement", "Fractional", "Industry Characteristics",
    "Low Concentration", "Regulated + Compliance Driven", "Other",
  ],

  marketFocus: [
    "B to B", "B to B + C", "B to C", "Market Characteristics",
    "Market size", "Target Segments", "New Focus",
  ],

  customerBase: [
    "Customer Characteristics", "Customer Churn", "Customer quality",
    "Demand Cycle Stable", "Durability of Customer", "Strong Customer Base",
    "Top 10 Customers >20%", "Top 10 Customers >50%",
    "Top 10 Customers >80%", "Alternative Base",
  ],

  location: [
    "Cloud Based", "Geographic", "International", "National",
    "Physical Location", "Specific Location", "Web Presence",
  ],

  // ── BUSINESS INTERNALS ───────────────────────────────────────────────────
  businessMetrics: [
    "Break Even", "Capex Spend", "Contribution Margin",
    "Dividends Paid Regularly", "EBITDA", "Free Cash Flow",
    "Gross Margin %", "Net Margin %", "Net Profit Before Tax",
    "Not Capex Intensive", "Operational Leverage", "Additional Metric",
  ],

  businessCharacteristics: [
    "AI", "Cash Management", "Clear Business Plan",
    "Clear Ownership Structure", "Clear Sales Plan", "Community Plan",
    "Compliance", "Debt Level", "Digital Presence",
    "External Intellectual Property", "Functional Continuity",
    "Governance in Place", "Growth Metrics", "Internal Intellectual Property",
    "Investable Team", "IT Ecosystem is Scalable", "KPIs for Success",
    "Leadership can Grow Business", "Operating > 5 Years",
    "People Retention", "People Dependency", "Regulatory Dependency",
    "Related Party Dependencies", "Reporting in Place",
    "Systems + Procedures", "Transition Plan", "Workforce Plan",
    "Additional Characteristic",
  ],

  scalable: [
    "Additional Product/Service/Solution", "Geographic",
    "No geographical Constraints", "Product", "Service", "Solution", "Other",
  ],

  operationalCharacteristics: [
    "Capability", "Commercial Leverage Opportunity",
    "Enchancable Business Model", "Owner Operated",
    "Process Optimisation", "Professional Management Team",
    "Succession Issues", "Turn-key vs outsourced components",
    "Workflow Inefficiency", "Additional Characteristic",
  ],

  revenue: [
    "Business Service", "Contracted Revenue", "Pricing",
    "Repeat Revenue >70%", "Repeat Revenue >90%", "Revenue Mix", "Other",
  ],

  keyCycles: [
    "Business Support", "Cash Generation", "Customer Acquisition + Retention",
    "Delivery Service", "Governance + Planning", "Additional Cycle",
  ],
};

// Australian industry multiples (EBITDA) — sourced from IBISWorld / Comparable.com.au benchmarks
export const auIndustryMultiples: Record<string, { low: number; mid: number; high: number; label: string }> = {
  "Accounting & Professional Services": { low: 2.5, mid: 3.5, high: 5.0, label: "Accounting & Professional Services" },
  "Building & Construction": { low: 2.0, mid: 3.0, high: 4.5, label: "Building & Construction" },
  "Childcare & Education": { low: 3.0, mid: 4.5, high: 7.0, label: "Childcare & Education" },
  "Digital & Technology": { low: 3.5, mid: 5.0, high: 8.0, label: "Digital & Technology" },
  "Distribution & Logistics": { low: 2.5, mid: 3.5, high: 5.0, label: "Distribution & Logistics" },
  "Food & Beverage": { low: 2.0, mid: 3.0, high: 4.5, label: "Food & Beverage" },
  "Healthcare & Allied Health": { low: 3.5, mid: 5.0, high: 7.5, label: "Healthcare & Allied Health" },
  "Hospitality": { low: 1.5, mid: 2.5, high: 3.5, label: "Hospitality" },
  "Industrial & Manufacturing": { low: 2.5, mid: 3.5, high: 5.0, label: "Industrial & Manufacturing" },
  "IT Services & MSP": { low: 3.5, mid: 5.5, high: 8.0, label: "IT Services & MSP" },
  "Legal Services": { low: 2.5, mid: 3.5, high: 5.0, label: "Legal Services" },
  "Media & Marketing": { low: 2.5, mid: 4.0, high: 6.0, label: "Media & Marketing" },
  "NDIS & Disability Services": { low: 3.0, mid: 4.5, high: 7.0, label: "NDIS & Disability Services" },
  "Property & Real Estate Services": { low: 2.5, mid: 3.5, high: 5.5, label: "Property & Real Estate Services" },
  "Recruitment & Staffing": { low: 2.0, mid: 3.0, high: 4.5, label: "Recruitment & Staffing" },
  "Retail": { low: 1.5, mid: 2.5, high: 3.5, label: "Retail" },
  "Security Services": { low: 2.5, mid: 3.5, high: 5.0, label: "Security Services" },
  "Transport & Fleet": { low: 2.0, mid: 3.0, high: 4.5, label: "Transport & Fleet" },
  "Waste Management & Environmental": { low: 3.0, mid: 4.5, high: 6.5, label: "Waste Management & Environmental" },
  "Wholesale Trade": { low: 2.0, mid: 3.0, high: 4.5, label: "Wholesale Trade" },
};

export type DealMetricsMenuKey = keyof typeof dealMetricsMenus;
