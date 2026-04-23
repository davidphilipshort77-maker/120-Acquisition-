// 120% Business Acquisition Toolkit — Australian Edition
// Complete data for all 10 units and 30 tools

export type Priority = 'Critical' | 'High' | 'Medium';
export type Phase = 'Phase 1: Diagnose & Profile' | 'Phase 2: Clarify Direction' | 'Phase 3: Market Readiness' | 'Phase 4: Execute' | 'Phase 5: Support';

export interface ChecklistItem {
  item: string;
  detail: string;
  auContext?: string;
}

export interface TableRow {
  [key: string]: string;
}

export interface ToolSection {
  title: string;
  description?: string;
  type: 'checklist' | 'table' | 'text' | 'scripts' | 'form';
  columns?: string[];
  rows?: TableRow[];
  items?: ChecklistItem[];
  content?: string;
  scripts?: { title: string; content: string }[];
  fields?: { label: string; placeholder: string; type?: string }[];
}

export interface Tool {
  id: number;
  name: string;
  corporateTranslation: string;
  description: string;
  phase: Phase;
  priority: Priority;
  sections: ToolSection[];
  auNote: string;
}

export interface Unit {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
  phase: Phase;
  tools: Tool[];
  color: string;
}

export const units: Unit[] = [
  {
    id: 1,
    title: 'Foundation',
    subtitle: 'Mindset, lifecycle & self-assessment',
    icon: '🏛',
    phase: 'Phase 1: Diagnose & Profile',
    color: '#C9A84C',
    tools: [
      {
        id: 1,
        name: 'Action Steps Checklist',
        corporateTranslation: 'Executive First 90 Days Plan',
        description: 'Your structured governance framework for the entire acquisition journey — from profiling to Day Zero.',
        phase: 'Phase 1: Diagnose & Profile',
        priority: 'Critical',
        auNote: 'Aligned with Milo Wilkinson behavioural profiling and Judo Bank/NAB financial capacity screening.',
        sections: [
          {
            title: 'Phase 1: Diagnose & Profile (Weeks 1–4)',
            type: 'checklist',
            items: [
              { item: 'Complete Milo Wilkinson behavioural profiling session', detail: 'Confirms owner-operator fit; shapes all 3 pathways', auContext: 'Included in all 120% tiers' },
              { item: 'Review 120% Offering Pack and select tier (Core/Signature/Apex)', detail: 'Apex recommended for exec clients — concierge + broker intros', auContext: 'Apex: $24,500 ex GST' },
              { item: 'Complete Acquisition Self-Reflection Worksheet (Tool 3)', detail: 'Honest assessment: do you want to run a business or find a job?', auContext: '' },
              { item: 'Submit financial documents to NAB/Judo Bank for capacity screen', detail: 'Required for DSCR calculation — 2 yrs tax returns, super balance', auContext: 'Judo Bank DSCR requirement: >1.25x' },
              { item: 'Book suitability conversation with David Short', detail: 'Covers sector appetite, deal size, lifestyle expectations', auContext: '120% Pathway 3' },
              { item: 'Review exemplar Australian deal library provided by 120%', detail: 'Understand realistic multiples for AU SMEs (2–4x EBITDA typical)', auContext: 'Comparable.com.au benchmarks' },
            ]
          },
          {
            title: 'Phase 2: Clarify Direction (Weeks 5–8)',
            type: 'checklist',
            items: [
              { item: 'Complete Zone of Genius Worksheet (Tool 4)', detail: 'Identify transferable skills from corporate career to SME ops', auContext: '' },
              { item: 'Complete Deal Clarity Worksheet (Tool 5)', detail: 'Define minimum EBITDA, geography, team size, sector', auContext: '' },
              { item: 'Use Industries Database Selector to shortlist 3 target sectors', detail: 'Focus on fragmented AU sectors: trades, B2B services, distribution', auContext: 'IBISWorld AU sector data' },
              { item: 'Build Personalized Deal Box (Tool 7)', detail: 'This becomes the brief for 120% concierge & broker outreach', auContext: 'Signature/Apex: 3-month active scan' },
              { item: 'Review 21 Financing Options Sheet (Tool 25)', detail: 'Understand seller finance, Judo/NAB SME loans, equity partners', auContext: 'Judo Bank: specialist SME lender' },
              { item: 'Confirm indicative serviceability with Judo Bank relationship contact', detail: 'Get written indicative approval before making offers', auContext: 'Named Judo contact provided in Apex tier' },
            ]
          },
          {
            title: 'Phase 3: Build Market Readiness (Weeks 9–16)',
            type: 'checklist',
            items: [
              { item: 'Build Buyer Profile PDF (Tool 11)', detail: 'Your credibility document for sellers and brokers', auContext: '' },
              { item: 'Set up Deal Sourcing CRM (Tool 10)', detail: 'Track all opportunities from first contact to LOI', auContext: '' },
              { item: 'Identify 3–5 target brokers from Business Broker List (Tool 9)', detail: 'Key AU brokers: LINK, Finn Business Sales, Benchmark Business Sales', auContext: 'AIBB member brokers preferred' },
              { item: 'Sign up on BizBuySell AU, Seek Business, BusinessForSale.com.au', detail: 'Set alerts for your Deal Box criteria', auContext: 'AU-specific platforms' },
              { item: 'Draft Cold Email Outreach Scripts (Tool 12)', detail: 'Off-market outreach = less competition, better terms', auContext: '' },
              { item: 'Begin active market scanning (on-market + off-market)', detail: 'Target 10+ initial enquiries per week during active search', auContext: 'Signature/Apex: concierge runs campaign' },
            ]
          },
          {
            title: 'Phase 4 & 5: Execute & Close (Weeks 17+)',
            type: 'checklist',
            items: [
              { item: 'Submit NDA and request Information Memorandum from seller', detail: 'Standard AU NDA — see Tool 14 for template', auContext: '' },
              { item: 'Run Deal Calculator on shortlisted opportunities (Tool 17)', detail: 'Quick screen before investing time in full DD', auContext: '' },
              { item: 'Submit LOI / NBIO (Non-Binding Indicative Offer)', detail: 'Use LOI templates (Tools 21–22); 120% NBIO coaching included', auContext: 'Signature/Apex: NBIO coaching' },
              { item: 'Engage 120% SP-led commercial DD team (Signature/Apex)', detail: 'Preferential rates; covers financial, legal, operational DD', auContext: 'Georgia Davies leads DD' },
              { item: 'Secure final Judo/NAB financing approval', detail: 'Formal credit approval required before exchange of contracts', auContext: 'Judo Bank: relationship-based lending' },
              { item: 'Execute Closing Checklist (Tool 28) and Day Zero Checklist (Tool 29)', detail: 'Settlement, escrow, license transfers, staff comms, Day 1 priorities', auContext: 'Apex: 60-day post-close support' },
            ]
          }
        ]
      },
      {
        id: 2,
        name: 'Acquisition Journey Reference Sheet',
        corporateTranslation: 'The M&A Deal Lifecycle Blueprint',
        description: 'The complete Australian SME acquisition journey mapped across 6 stages with timelines, benchmarks, and 120% program touchpoints.',
        phase: 'Phase 1: Diagnose & Profile',
        priority: 'High',
        auNote: 'All benchmarks reference Australian market data: Comparable.com.au, IBISWorld, Judo Bank, ATO, and AIBB.',
        sections: [
          {
            title: 'The 6-Stage Australian SME Acquisition Journey',
            type: 'table',
            columns: ['Stage', 'Key Activities', 'Australian Specifics', 'Typical Timeline', '120% Support'],
            rows: [
              { Stage: '1. Search & Origination', 'Key Activities': 'Define Deal Box; scan BizBuySell AU, Seek Business; off-market outreach; broker relationships', 'Australian Specifics': 'AU market: ~50,000 SMEs listed for sale annually; baby boomer exit wave; LINK, Finn, Benchmark are major brokers', 'Typical Timeline': '4–12 weeks', '120% Support': 'Signature/Apex: Active 3-month market scan + off-market campaign' },
              { Stage: '2. Initial Evaluation', 'Key Activities': 'Sign NDA; review IM/teaser; run Deal Calculator; apply 10 Value Markers; Go/No-Go decision', 'Australian Specifics': 'Request 3 yrs financials (P&L, Balance Sheet, Cash Flow); check ATO compliance; ASIC director search', 'Typical Timeline': '1–2 weeks per deal', '120% Support': 'Advisor sounding-board; NBIO coaching' },
              { Stage: '3. Offer & Negotiation', 'Key Activities': 'Submit LOI/NBIO; negotiate price, structure, terms; agree on DD period and exclusivity', 'Australian Specifics': 'AU standard: 30–60 day DD period; exclusivity clause; deposit typically 5–10% of purchase price', 'Typical Timeline': '2–4 weeks', '120% Support': 'NBIO coaching; SP deal structuring advice' },
              { Stage: '4. Due Diligence', 'Key Activities': 'Financial, legal, operational DD; build your deal team; identify red flags', 'Australian Specifics': 'Key AU checks: ASIC, PPSR, Fair Work compliance, lease assignment, BAS/GST history, staff entitlements', 'Typical Timeline': '4–8 weeks', '120% Support': 'SP-led commercial DD at preferential rates (Signature/Apex)' },
              { Stage: '5. Financing & Closing', 'Key Activities': 'Finalise capital stack; formal bank approval; execute APA; escrow; settlement; license transfers', 'Australian Specifics': 'Judo Bank: SME acquisition specialist; NAB: Business acquisition loans; DSCR typically >1.25x required', 'Typical Timeline': '4–6 weeks', '120% Support': 'Warm Judo/NAB introductions; 60-day post-close support (Apex)' },
              { Stage: '6. Day Zero & Transition', 'Key Activities': 'Take possession; staff communication; bank account access; supplier/customer notifications; working capital management', 'Australian Specifics': 'AU requirement: update ABN/ACN registration; notify ATO of ownership change; Fair Work obligations from Day 1', 'Typical Timeline': 'Day 1–30', '120% Support': '60-day post-close support (Apex tier)' },
            ]
          },
          {
            title: 'Key Australian Market Benchmarks',
            type: 'table',
            columns: ['Metric', 'Typical Range (AU SME)', 'Notes', 'Source'],
            rows: [
              { Metric: 'EBITDA Multiple (Service)', 'Typical Range (AU SME)': '2.5x – 4.5x', Notes: 'Higher for recurring revenue, strong management team', Source: 'Comparable.com.au / IBISWorld' },
              { Metric: 'EBITDA Multiple (Trade/Distribution)', 'Typical Range (AU SME)': '1.5x – 3.0x', Notes: 'Lower due to asset intensity and key-person risk', Source: 'Comparable.com.au' },
              { Metric: 'Seller Finance Prevalence', 'Typical Range (AU SME)': '30–50% of AU deals', Notes: 'Common for retiring owners; typically 20–40% of purchase price', Source: 'AIBB / Finn Business Sales' },
              { Metric: 'Judo Bank DSCR Requirement', 'Typical Range (AU SME)': '>1.25x', Notes: 'Debt Service Coverage Ratio = EBITDA / Annual Debt Service', Source: 'Judo Bank Lending Policy' },
              { Metric: 'Typical Deposit (AU)', 'Typical Range (AU SME)': '5–10% of purchase price', Notes: 'Held in solicitor trust account during DD period', Source: 'Standard AU practice' },
              { Metric: 'DD Period (AU)', 'Typical Range (AU SME)': '30–60 days', Notes: 'Exclusivity typically granted during this period', Source: 'Standard AU practice' },
              { Metric: 'GST on Business Sale', 'Typical Range (AU SME)': 'Usually GST-free', Notes: 'If sold as going concern (s38-325 GST Act); confirm with tax advisor', Source: 'ATO' },
              { Metric: 'Stamp Duty (Asset Purchase)', 'Typical Range (AU SME)': 'Varies by state', Notes: 'NSW: ~$500 flat for goodwill; VIC: up to 5.5% on plant/equipment', Source: 'State Revenue Offices' },
            ]
          }
        ]
      },
      {
        id: 3,
        name: 'Acquisition Self-Reflection Worksheet',
        corporateTranslation: 'Leadership & Risk Mandate',
        description: 'A structured self-assessment to determine if you are genuinely suited to the owner-operator life — not just seeking replacement income.',
        phase: 'Phase 1: Diagnose & Profile',
        priority: 'Critical',
        auNote: 'Works in tandem with Milo Wilkinson behavioural profiling. Scoring guides pathway recommendation (Employment / Consulting / Acquisition).',
        sections: [
          {
            title: 'Section 1: Motivation Clarity',
            type: 'table',
            columns: ['Question', 'Your Honest Answer', 'Score (1–5)', 'Advisor Notes'],
            rows: [
              { Question: 'Why do you want to own a business — and is it different from wanting a new job?', 'Your Honest Answer': '', 'Score (1–5)': '', 'Advisor Notes': '' },
              { Question: 'What does financial freedom look like for you in 5 years? (Specific AUD figure)', 'Your Honest Answer': '', 'Score (1–5)': '', 'Advisor Notes': '' },
              { Question: 'Are you comfortable with variable income replacing your $300k–$800k salary?', 'Your Honest Answer': '', 'Score (1–5)': '', 'Advisor Notes': '' },
              { Question: 'What is the minimum annual income you need to maintain your current lifestyle?', 'Your Honest Answer': '', 'Score (1–5)': '', 'Advisor Notes': '' },
              { Question: 'How would you feel if the business had a bad month and you could not pay yourself?', 'Your Honest Answer': '', 'Score (1–5)': '', 'Advisor Notes': '' },
              { Question: 'Is your partner/family fully supportive of this transition?', 'Your Honest Answer': '', 'Score (1–5)': '', 'Advisor Notes': '' },
            ]
          },
          {
            title: 'Section 2: Operational Readiness',
            type: 'table',
            columns: ['Question', 'Your Honest Answer', 'Score (1–5)', 'Advisor Notes'],
            rows: [
              { Question: 'Have you ever managed a P&L with full accountability (not just a budget)?', 'Your Honest Answer': '', 'Score (1–5)': '', 'Advisor Notes': '' },
              { Question: 'Are you comfortable managing staff who earn $50k–$80k (not $150k+)?', 'Your Honest Answer': '', 'Score (1–5)': '', 'Advisor Notes': '' },
              { Question: 'Can you read a BAS statement without an accountant?', 'Your Honest Answer': '', 'Score (1–5)': '', 'Advisor Notes': '' },
              { Question: 'Are you prepared to be the sales person, the HR manager, and the cleaner if needed?', 'Your Honest Answer': '', 'Score (1–5)': '', 'Advisor Notes': '' },
              { Question: 'Are you prepared to work IN the business for the first 6–12 months?', 'Your Honest Answer': '', 'Score (1–5)': '', 'Advisor Notes': '' },
              { Question: 'Do you want a business you can run yourself, or one with a management team?', 'Your Honest Answer': '', 'Score (1–5)': '', 'Advisor Notes': '' },
            ]
          },
          {
            title: 'Section 3: Risk Tolerance & Financial Capacity',
            type: 'table',
            columns: ['Question', 'Your Honest Answer', 'Score (1–5)', 'Advisor Notes'],
            rows: [
              { Question: 'How much personal capital are you willing to deploy as a deposit? (AUD)', 'Your Honest Answer': '', 'Score (1–5)': '', 'Advisor Notes': '' },
              { Question: 'Do you have 6 months of living expenses in reserve AFTER the deposit?', 'Your Honest Answer': '', 'Score (1–5)': '', 'Advisor Notes': '' },
              { Question: 'What is your superannuation balance? (SMSF may be used for commercial property)', 'Your Honest Answer': '', 'Score (1–5)': '', 'Advisor Notes': '' },
              { Question: 'Are you comfortable with personal guarantees on business loans?', 'Your Honest Answer': '', 'Score (1–5)': '', 'Advisor Notes': '' },
              { Question: 'What is your risk appetite: conservative (stable cash flow) or growth (turnaround)?', 'Your Honest Answer': '', 'Score (1–5)': '', 'Advisor Notes': '' },
              { Question: 'What is the maximum deal size you are comfortable with? (AUD)', 'Your Honest Answer': '', 'Score (1–5)': '', 'Advisor Notes': '' },
            ]
          },
          {
            title: 'Scoring Guide & Pathway Recommendation',
            type: 'table',
            columns: ['Score Range', 'Recommendation', 'Next Step'],
            rows: [
              { 'Score Range': '4.0 – 5.0', Recommendation: 'Ready for Pathway 3 (Acquisition)', 'Next Step': 'Proceed to Deal Clarity Worksheet (Tool 5)' },
              { 'Score Range': '3.0 – 3.9', Recommendation: 'Borderline — consider Pathway 2 (Consulting) first to build confidence', 'Next Step': 'Discuss with 120% advisor before committing to Pathway 3' },
              { 'Score Range': '2.0 – 2.9', Recommendation: 'Not ready for acquisition — Pathway 1 (Employment) recommended', 'Next Step': 'Focus on Pathway 1 with 120% team; revisit in 12 months' },
              { 'Score Range': 'Below 2.0', Recommendation: 'Significant gaps — do not proceed to acquisition at this stage', 'Next Step': 'Deep-dive coaching with Milo Wilkinson team' },
            ]
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Deal Clarity',
    subtitle: 'Criteria, sectors & your Deal Box',
    icon: '🎯',
    phase: 'Phase 2: Clarify Direction',
    color: '#2A5F8F',
    tools: [
      {
        id: 4,
        name: 'Zone of Genius Worksheet',
        corporateTranslation: 'Core Competency & Alpha Mapping',
        description: 'Isolate your individual, transferable alpha — the specific operational, financial, or strategic levers you can pull to drive value in a lower-mid-market business.',
        phase: 'Phase 2: Clarify Direction',
        priority: 'Critical',
        auNote: 'Shifts your narrative from "I ran a $50M P&L" to "I can professionalise sales operations and optimise supply chain margins" — the language that resonates with AU SME sellers.',
        sections: [
          {
            title: 'Section 1: Corporate Skills Inventory',
            type: 'table',
            columns: ['Corporate Skill / Experience', 'How It Translates to SME Ownership', 'Strength Level (1–5)', 'SME Application Example'],
            rows: [
              { 'Corporate Skill / Experience': 'P&L Management / Financial Reporting', 'How It Translates to SME Ownership': 'Ability to read, interpret and improve SME financials', 'Strength Level (1–5)': '', 'SME Application Example': 'Identify cost reduction opportunities within 30 days of ownership' },
              { 'Corporate Skill / Experience': 'Sales Leadership / Business Development', 'How It Translates to SME Ownership': 'Drive revenue growth without a corporate sales team', 'Strength Level (1–5)': '', 'SME Application Example': 'Build direct client relationships; introduce CRM discipline' },
              { 'Corporate Skill / Experience': 'Operations / Supply Chain Management', 'How It Translates to SME Ownership': 'Streamline processes; reduce waste; improve margins', 'Strength Level (1–5)': '', 'SME Application Example': 'Implement lean operations in a trades or distribution business' },
              { 'Corporate Skill / Experience': 'People Management / HR', 'How It Translates to SME Ownership': 'Recruit, retain and develop SME staff on lower budgets', 'Strength Level (1–5)': '', 'SME Application Example': 'Professionalise HR in a business with informal practices' },
              { 'Corporate Skill / Experience': 'Strategy & Business Planning', 'How It Translates to SME Ownership': 'Set direction; build 3-year growth plan', 'Strength Level (1–5)': '', 'SME Application Example': 'Create first formal strategic plan for a lifestyle business' },
              { 'Corporate Skill / Experience': 'Technology / Digital Transformation', 'How It Translates to SME Ownership': 'Modernise systems; improve efficiency', 'Strength Level (1–5)': '', 'SME Application Example': 'Introduce cloud accounting, CRM, or e-commerce capability' },
              { 'Corporate Skill / Experience': 'Finance / Capital Raising / M&A', 'How It Translates to SME Ownership': 'Understand deal structures; manage lender relationships', 'Strength Level (1–5)': '', 'SME Application Example': 'Negotiate seller finance terms; manage Judo Bank relationship' },
              { 'Corporate Skill / Experience': 'Marketing / Brand Management', 'How It Translates to SME Ownership': 'Build brand equity; attract new customers', 'Strength Level (1–5)': '', 'SME Application Example': 'Launch first digital marketing strategy for a word-of-mouth business' },
              { 'Corporate Skill / Experience': 'Compliance / Risk Management', 'How It Translates to SME Ownership': 'Ensure Fair Work, WHS, ATO compliance', 'Strength Level (1–5)': '', 'SME Application Example': 'Implement compliance framework in a non-compliant business' },
            ]
          },
          {
            title: 'Section 2: Your Zone of Genius (Top 3 Transferable Skills)',
            type: 'table',
            columns: ['Rank', 'Your Genius Skill', 'Why This Creates Value in an SME', 'Target Business Type That Needs This'],
            rows: [
              { Rank: '#1 — Primary Genius', 'Your Genius Skill': '', 'Why This Creates Value in an SME': '', 'Target Business Type That Needs This': '' },
              { Rank: '#2 — Secondary Genius', 'Your Genius Skill': '', 'Why This Creates Value in an SME': '', 'Target Business Type That Needs This': '' },
              { Rank: '#3 — Supporting Skill', 'Your Genius Skill': '', 'Why This Creates Value in an SME': '', 'Target Business Type That Needs This': '' },
            ]
          }
        ]
      },
      {
        id: 5,
        name: 'Deal Clarity Worksheet',
        corporateTranslation: 'The Acquisition Investment Mandate',
        description: 'Build the business case for your own life. Define strict financial and operational parameters that integrate directly with your NAB/Judo Bank financial capacity screening.',
        phase: 'Phase 2: Clarify Direction',
        priority: 'Critical',
        auNote: 'The minimum EBITDA target must be sufficient to service Judo/NAB debt (DSCR >1.25x) AND replace your $300k–$800k lifestyle income.',
        sections: [
          {
            title: 'Section 1: Financial Parameters',
            type: 'table',
            columns: ['Parameter', 'Your Target / Minimum', 'Rationale', 'Judo/NAB Alignment'],
            rows: [
              { Parameter: 'Minimum Annual EBITDA Required (AUD)', 'Your Target / Minimum': '$', Rationale: 'Must replace $300k–$800k salary + debt service', 'Judo/NAB Alignment': 'DSCR >1.25x required by Judo Bank' },
              { Parameter: 'Maximum Purchase Price (AUD)', 'Your Target / Minimum': '$', Rationale: 'Based on Judo/NAB pre-approval + personal equity', 'Judo/NAB Alignment': 'Typically 3–5x EBITDA for AU SMEs' },
              { Parameter: 'Maximum Personal Equity Contribution (AUD)', 'Your Target / Minimum': '$', Rationale: 'Cash available after maintaining 6-month reserve', 'Judo/NAB Alignment': 'Judo: typically 20–30% equity required' },
              { Parameter: 'Target Annual Revenue Range (AUD)', 'Your Target / Minimum': '$ – $', Rationale: 'Revenue as a proxy for business scale/complexity', 'Judo/NAB Alignment': '' },
              { Parameter: 'Minimum Net Profit Margin (%)', 'Your Target / Minimum': '%', Rationale: 'Ensures adequate cash flow after debt service', 'Judo/NAB Alignment': '' },
              { Parameter: 'Target Cash-on-Cash Return (Year 1)', 'Your Target / Minimum': '%', Rationale: 'Net profit after debt service / equity invested', 'Judo/NAB Alignment': 'Target: >15% for AU SME acquisitions' },
            ]
          },
          {
            title: 'Section 2: Operational Parameters',
            type: 'table',
            columns: ['Parameter', 'Your Target / Preference', 'Rationale', 'Notes'],
            rows: [
              { Parameter: 'Maximum Number of Staff (FTE)', 'Your Target / Preference': '', Rationale: 'Complexity of people management', Notes: '' },
              { Parameter: 'Preferred Business Model', 'Your Target / Preference': 'B2B / B2C / Mixed', Rationale: 'B2B typically more stable cash flow', Notes: '' },
              { Parameter: 'Revenue Concentration (Max % from 1 customer)', 'Your Target / Preference': '< %', Rationale: 'High concentration = key-man risk', Notes: 'Recommend <30% from any single customer' },
              { Parameter: 'Physical Location Requirement', 'Your Target / Preference': 'State / City / Remote OK', Rationale: 'Proximity to your home / lifestyle preference', Notes: '' },
              { Parameter: 'Owner Involvement Required (Hours/Week)', 'Your Target / Preference': '< hrs/week', Rationale: 'How much time do you want to spend in the business?', Notes: '' },
              { Parameter: 'Existing Management Team Required?', 'Your Target / Preference': 'Yes / No / Preferred', Rationale: 'Management team = premium price but lower risk', Notes: '' },
              { Parameter: 'Lease / Property Situation', 'Your Target / Preference': 'Own / Lease / Flexible', Rationale: 'Lease assignment is a key DD item in AU', Notes: 'Check lease term remaining at purchase' },
            ]
          }
        ]
      },
      {
        id: 6,
        name: 'Industries Database Selector',
        corporateTranslation: 'Sector Strategy & TAM Analysis',
        description: 'Apply your corporate analytical skills to identify fragmented, "boring" Australian industries with high margins and retiring baby-boomer owners.',
        phase: 'Phase 2: Clarify Direction',
        priority: 'High',
        auNote: 'Sector multiples sourced from Comparable.com.au and IBISWorld AU. Sectors to avoid are based on David Short\'s guidance and AIBB data.',
        sections: [
          {
            title: 'Recommended Sectors for Executive Acquirers (Australian Market)',
            type: 'table',
            columns: ['Industry Sector', 'Typical EBITDA Multiple', 'Avg. Revenue Range (AUD)', 'Key Risks', 'Key Advantages'],
            rows: [
              { 'Industry Sector': 'B2B Professional Services (Accounting, HR, IT Managed Services)', 'Typical EBITDA Multiple': '3.0x–5.0x', 'Avg. Revenue Range (AUD)': '$1M–$10M', 'Key Risks': 'Key-person dependency; client concentration', 'Key Advantages': 'Recurring revenue; low capex; scalable' },
              { 'Industry Sector': 'Trade Services (Plumbing, Electrical, HVAC, Pest Control)', 'Typical EBITDA Multiple': '2.0x–3.5x', 'Avg. Revenue Range (AUD)': '$500k–$5M', 'Key Risks': 'Licensing requirements; staff retention', 'Key Advantages': 'Essential services; strong cash flow; fragmented market' },
              { 'Industry Sector': 'Healthcare & Allied Health (Physio, Dental, Optometry)', 'Typical EBITDA Multiple': '3.5x–6.0x', 'Avg. Revenue Range (AUD)': '$500k–$3M', 'Key Risks': 'Regulatory; practitioner dependency', 'Key Advantages': 'Recession-resistant; growing demand; NDIS opportunities' },
              { 'Industry Sector': 'Distribution & Logistics (B2B, last-mile, specialised)', 'Typical EBITDA Multiple': '2.0x–3.5x', 'Avg. Revenue Range (AUD)': '$2M–$15M', 'Key Risks': 'Fuel costs; driver shortage; margin pressure', 'Key Advantages': 'Essential; scalable; acquisition roll-up potential' },
              { 'Industry Sector': 'Childcare & Education (Private tutoring, RTO, early learning)', 'Typical EBITDA Multiple': '3.0x–5.0x', 'Avg. Revenue Range (AUD)': '$500k–$5M', 'Key Risks': 'Regulatory; staff ratios; funding changes', 'Key Advantages': 'Government subsidies; strong demand; community asset' },
              { 'Industry Sector': 'Waste Management & Environmental Services', 'Typical EBITDA Multiple': '3.0x–5.0x', 'Avg. Revenue Range (AUD)': '$1M–$10M', 'Key Risks': 'Regulatory; capex-heavy equipment', 'Key Advantages': 'Recession-proof; ESG tailwinds; government contracts' },
              { 'Industry Sector': 'Aged Care & Disability Services (NDIS providers)', 'Typical EBITDA Multiple': '3.5x–5.5x', 'Avg. Revenue Range (AUD)': '$500k–$5M', 'Key Risks': 'NDIS pricing reform risk; staff compliance', 'Key Advantages': 'Growing demand; government-backed revenue' },
              { 'Industry Sector': 'Commercial Cleaning & Facilities Management', 'Typical EBITDA Multiple': '2.0x–3.0x', 'Avg. Revenue Range (AUD)': '$500k–$5M', 'Key Risks': 'Labour-intensive; margin pressure', 'Key Advantages': 'Recurring contracts; low capex; scalable' },
              { 'Industry Sector': 'Building & Construction (Specialist subcontractors)', 'Typical EBITDA Multiple': '1.5x–3.0x', 'Avg. Revenue Range (AUD)': '$1M–$10M', 'Key Risks': 'Payment terms; project risk; licensing', 'Key Advantages': 'Strong pipeline; government infrastructure spend' },
            ]
          },
          {
            title: 'Sectors to Avoid (High Risk for First-Time Acquirers)',
            type: 'table',
            columns: ['Sector', 'Reason to Avoid'],
            rows: [
              { Sector: 'Hospitality (Restaurants, Cafes, Bars)', 'Reason to Avoid': 'Thin margins (<5%); high failure rate; lease risk; lifestyle trap' },
              { Sector: 'Early-Stage Technology / SaaS', 'Reason to Avoid': 'No cash flow; high burn; complex valuation; not a "boring business"' },
              { Sector: 'Mining / Resources Services', 'Reason to Avoid': 'Cyclical; capex-heavy; remote operations; commodity price risk' },
              { Sector: 'Fashion / Apparel Retail', 'Reason to Avoid': 'E-commerce disruption; inventory risk; seasonal cash flow' },
              { Sector: 'Print / Traditional Media', 'Reason to Avoid': 'Structural decline; advertising revenue collapse' },
            ]
          }
        ]
      },
      {
        id: 7,
        name: 'Personalised Deal Box',
        corporateTranslation: 'The M&A Target Screen',
        description: 'Your strict filter for the market — the exact brief handed to the 120% concierge team and brokers for the 3-month active market exploration and off-market campaigns.',
        phase: 'Phase 2: Clarify Direction',
        priority: 'Critical',
        auNote: 'Complete Tools 4, 5, and 6 before building your Deal Box. This document is shared with Judo/NAB, 120% concierge, and business brokers.',
        sections: [
          {
            title: 'Your Deal Box — Non-Negotiable Criteria',
            type: 'table',
            columns: ['Criteria', 'Your Requirement', 'Must-Have or Nice-to-Have', 'Notes'],
            rows: [
              { Criteria: 'Target Industry / Sector', 'Your Requirement': '', 'Must-Have or Nice-to-Have': 'Must-Have', Notes: 'From Tool 6 — top 2–3 sectors' },
              { Criteria: 'Minimum EBITDA (AUD p.a.)', 'Your Requirement': '$', 'Must-Have or Nice-to-Have': 'Must-Have', Notes: 'Minimum to service debt + replace income' },
              { Criteria: 'Maximum Purchase Price (AUD)', 'Your Requirement': '$', 'Must-Have or Nice-to-Have': 'Must-Have', Notes: 'Based on Judo/NAB pre-approval' },
              { Criteria: 'Geographic Location', 'Your Requirement': '', 'Must-Have or Nice-to-Have': 'Must-Have', Notes: 'State / metro / regional preference' },
              { Criteria: 'Business Model', 'Your Requirement': 'B2B / B2C / Mixed', 'Must-Have or Nice-to-Have': 'Must-Have', Notes: '' },
              { Criteria: 'Minimum Years in Operation', 'Your Requirement': 'yrs', 'Must-Have or Nice-to-Have': 'Must-Have', Notes: 'Recommend 5+ years for stability' },
              { Criteria: 'Maximum Staff (FTE)', 'Your Requirement': '', 'Must-Have or Nice-to-Have': 'Nice-to-Have', Notes: '' },
              { Criteria: 'Recurring Revenue %', 'Your Requirement': '> %', 'Must-Have or Nice-to-Have': 'Nice-to-Have', Notes: 'Higher = lower risk' },
              { Criteria: 'Owner Involvement Post-Sale', 'Your Requirement': '', 'Must-Have or Nice-to-Have': 'Must-Have', Notes: 'Transition period requirement' },
              { Criteria: 'Seller Finance Required?', 'Your Requirement': 'Yes / No / Preferred', 'Must-Have or Nice-to-Have': 'Nice-to-Have', Notes: '' },
              { Criteria: 'Maximum Customer Concentration', 'Your Requirement': '< % from top customer', 'Must-Have or Nice-to-Have': 'Must-Have', Notes: '' },
              { Criteria: 'Exclusions (sectors/models to avoid)', 'Your Requirement': '', 'Must-Have or Nice-to-Have': 'Must-Have', Notes: 'From Tool 6 avoid list' },
            ]
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'Origination',
    subtitle: 'Deal sourcing, brokers & CRM',
    icon: '🔍',
    phase: 'Phase 3: Market Readiness',
    color: '#1E4A72',
    tools: [
      {
        id: 8,
        name: 'Business Sourcing List',
        corporateTranslation: 'Market Scanning Protocol',
        description: 'Australian on-market and off-market deal origination channels. Supplements the 120% concierge team\'s active off-market campaign.',
        phase: 'Phase 3: Market Readiness',
        priority: 'High',
        auNote: 'Off-market deals typically offer 10–20% better pricing and less competition. The 120% Signature/Apex concierge team runs a dedicated off-market campaign on your behalf.',
        sections: [
          {
            title: 'On-Market Channels (Australia)',
            type: 'table',
            columns: ['Platform / Channel', 'URL', 'Sectors Covered', 'Deal Size Range', 'Priority'],
            rows: [
              { 'Platform / Channel': 'BizBuySell Australia', URL: 'bizbuysell.com.au', 'Sectors Covered': 'All sectors', 'Deal Size Range': '$100k–$10M+', Priority: 'High' },
              { 'Platform / Channel': 'Seek Business', URL: 'seekbusiness.com.au', 'Sectors Covered': 'All sectors', 'Deal Size Range': '$100k–$5M', Priority: 'High' },
              { 'Platform / Channel': 'BusinessForSale.com.au', URL: 'businessforsale.com.au', 'Sectors Covered': 'All sectors', 'Deal Size Range': '$50k–$5M', Priority: 'Medium' },
              { 'Platform / Channel': 'LINK Business Brokers', URL: 'linkbusiness.com.au', 'Sectors Covered': 'All sectors; strong in services', 'Deal Size Range': '$200k–$10M+', Priority: 'High' },
              { 'Platform / Channel': 'Finn Business Sales', URL: 'finnbusinesssales.com.au', 'Sectors Covered': 'All sectors; strong in hospitality/retail', 'Deal Size Range': '$100k–$5M', Priority: 'High' },
              { 'Platform / Channel': 'Benchmark Business Sales', URL: 'benchmarkbusiness.com.au', 'Sectors Covered': 'All sectors', 'Deal Size Range': '$200k–$10M', Priority: 'High' },
              { 'Platform / Channel': 'Xcllusive Business Sales', URL: 'xcllusive.com.au', 'Sectors Covered': 'All sectors; strong in NSW', 'Deal Size Range': '$200k–$5M', Priority: 'Medium' },
              { 'Platform / Channel': 'Bsale Australia', URL: 'bsale.com.au', 'Sectors Covered': 'Online marketplace + broker network', 'Deal Size Range': '$50k–$5M', Priority: 'Medium' },
            ]
          },
          {
            title: 'Off-Market Channels (Australia) — Higher Value, Less Competition',
            type: 'table',
            columns: ['Channel', 'How to Execute', 'Best For', 'Effort Level', 'Expected Response Rate'],
            rows: [
              { Channel: 'Direct Outreach (Cold Email/LinkedIn)', 'How to Execute': 'Use Tool 12 scripts; target owners aged 55–70', 'Best For': 'Any sector in your Deal Box', 'Effort Level': 'High', 'Expected Response Rate': '2–5%' },
              { Channel: 'Accountant Referral Network', 'How to Execute': 'Brief your accountant; ask for introductions to retiring clients', 'Best For': 'Professional services; trades; distribution', 'Effort Level': 'Medium', 'Expected Response Rate': '10–20%' },
              { Channel: 'Business Broker Off-Market Lists', 'How to Execute': 'Ask brokers for "quiet listings" not yet on portals', 'Best For': 'All sectors', 'Effort Level': 'Low', 'Expected Response Rate': 'Variable' },
              { Channel: 'Industry Association Networks', 'How to Execute': 'Join target sector associations; attend events', 'Best For': 'Sector-specific', 'Effort Level': 'Medium', 'Expected Response Rate': '5–15%' },
              { Channel: 'LinkedIn Direct Outreach', 'How to Execute': 'Target business owners aged 55+ in your sector; use Buyer Profile PDF', 'Best For': 'Professional services; B2B', 'Effort Level': 'High', 'Expected Response Rate': '3–8%' },
              { Channel: '120% Off-Market Campaign (Apex)', 'How to Execute': '120% concierge runs dedicated campaign on your behalf', 'Best For': 'All sectors in your Deal Box', 'Effort Level': 'Low (outsourced)', 'Expected Response Rate': 'Variable' },
              { Channel: 'Succession Planning Advisors', 'How to Execute': 'Engage succession planners who work with retiring business owners', 'Best For': 'All sectors; baby boomer focus', 'Effort Level': 'Medium', 'Expected Response Rate': '15–30%' },
            ]
          }
        ]
      },
      {
        id: 9,
        name: 'Business Broker List',
        corporateTranslation: 'Intermediary Relationship Matrix',
        description: 'Key Australian business brokers by state and sector. Remember: brokers work for the seller, not you.',
        phase: 'Phase 3: Market Readiness',
        priority: 'High',
        auNote: 'Register as a buyer with top 5 brokers. Send your Buyer Profile PDF (Tool 11). Ask for "quiet listings" not yet on portals. Follow up monthly.',
        sections: [
          {
            title: 'National Brokers (Australia)',
            type: 'table',
            columns: ['Brokerage', 'Website', 'Specialisation', 'Typical Deal Size', 'Notes'],
            rows: [
              { Brokerage: 'LINK Business Brokers', Website: 'linkbusiness.com.au', Specialisation: 'All sectors; strong in services & retail', 'Typical Deal Size': '$200k–$10M+', Notes: 'Largest AU network; register as buyer' },
              { Brokerage: 'Finn Business Sales', Website: 'finnbusinesssales.com.au', Specialisation: 'Hospitality; retail; services', 'Typical Deal Size': '$100k–$5M', Notes: 'Strong in QLD, VIC, NSW' },
              { Brokerage: 'Benchmark Business Sales', Website: 'benchmarkbusiness.com.au', Specialisation: 'All sectors', 'Typical Deal Size': '$200k–$10M', Notes: 'Good off-market pipeline' },
              { Brokerage: 'Transact Business Brokers', Website: 'transactbusiness.com.au', Specialisation: 'Professional services; B2B; technology', 'Typical Deal Size': '$500k–$10M', Notes: 'Strong in professional services' },
              { Brokerage: 'Xcllusive Business Sales', Website: 'xcllusive.com.au', Specialisation: 'All sectors; strong in NSW', 'Typical Deal Size': '$200k–$5M', Notes: 'Award-winning; strong DD support' },
              { Brokerage: 'AIBB Members (various)', Website: 'aibb.com.au/find-a-broker', Specialisation: 'All sectors', 'Typical Deal Size': 'All sizes', Notes: 'AIBB = Australian Institute of Business Brokers' },
              { Brokerage: 'Succession Plus', Website: 'successionplus.com.au', Specialisation: 'Professional services; accounting firms', 'Typical Deal Size': '$500k–$10M', Notes: 'Specialist in succession planning' },
              { Brokerage: 'Lloyds Business Brokers', Website: 'lloydsbusiness.com.au', Specialisation: 'All sectors', 'Typical Deal Size': '$100k–$5M', Notes: 'Strong in NSW, QLD' },
            ]
          },
          {
            title: 'Broker Engagement Protocol',
            type: 'checklist',
            items: [
              { item: 'Register as a buyer on all relevant platforms with your Deal Box criteria', detail: 'Include your Buyer Profile PDF (Tool 11) with every registration', auContext: '' },
              { item: 'Send Buyer Profile PDF to top 5 brokers — establish credibility', detail: 'Position yourself as a serious, well-funded buyer — not a tyre-kicker', auContext: '' },
              { item: 'Request "quiet listings" — off-market deals not yet on portals', detail: 'Ask directly: "Do you have any businesses matching my criteria that are not yet listed?"', auContext: '' },
              { item: 'Follow up monthly — brokers prioritise buyers who stay in contact', detail: 'A 5-minute monthly call is more effective than a quarterly email', auContext: '' },
              { item: 'REMEMBER: Brokers work for the SELLER. Always conduct your own DD.', detail: 'Never rely solely on information provided by the seller\'s broker', auContext: '' },
            ]
          }
        ]
      },
      {
        id: 10,
        name: 'Deal Sourcing CRM',
        corporateTranslation: 'Pipeline Management Dashboard',
        description: 'Track every acquisition opportunity from first contact to close. Imposes corporate discipline on a fragmented, informal market.',
        phase: 'Phase 3: Market Readiness',
        priority: 'High',
        auNote: 'Use this CRM alongside the 120% Signature/Apex 3-month active market scan. Track all opportunities in one place to avoid losing momentum.',
        sections: [
          {
            title: 'Active Deal Pipeline',
            type: 'table',
            columns: ['Business Name / Sector', 'Source', 'Asking Price (AUD)', 'EBITDA (AUD)', 'EBITDA Multiple', 'Stage', 'Next Action', 'Priority'],
            rows: Array.from({ length: 10 }, (_, i) => ({
              'Business Name / Sector': '', Source: '', 'Asking Price (AUD)': '', 'EBITDA (AUD)': '', 'EBITDA Multiple': '', Stage: '1-Initial Contact', 'Next Action': '', Priority: ''
            }))
          },
          {
            title: 'Pipeline Stage Definitions',
            type: 'table',
            columns: ['Stage', 'Definition', 'Key Action Required'],
            rows: [
              { Stage: '1-Initial Contact', Definition: 'First enquiry or broker registration', 'Key Action Required': 'Request IM / teaser document' },
              { Stage: '2-NDA Signed', Definition: 'NDA executed; full financials requested', 'Key Action Required': 'Review IM and run Deal Calculator (Tool 17)' },
              { Stage: '3-IM Reviewed', Definition: 'Information Memorandum reviewed', 'Key Action Required': 'Complete Deal Decision Tree (Tool 15)' },
              { Stage: '4-Deal Calc Run', Definition: 'Deal Calculator and Value Markers completed', 'Key Action Required': 'Book seller meeting (FROG Method)' },
              { Stage: '5-LOI Submitted', Definition: 'Letter of Intent submitted to seller', 'Key Action Required': 'Negotiate terms; agree on DD period' },
              { Stage: '6-DD Active', Definition: 'Due diligence period underway', 'Key Action Required': 'Complete 60+ Item DD Checklist (Tool 24)' },
              { Stage: '7-Financing', Definition: 'Formal finance application submitted', 'Key Action Required': 'Await Judo/NAB formal credit approval' },
              { Stage: '8-Closed', Definition: 'Settlement completed', 'Key Action Required': 'Complete Day Zero Checklist (Tool 29)' },
              { Stage: '9-Dead', Definition: 'Deal did not proceed', 'Key Action Required': 'Document reason; apply learnings to next deal' },
            ]
          }
        ]
      }
    ]
  },
  {
    id: 4,
    title: 'Outreach',
    subtitle: 'Buyer positioning, scripts & seller questions',
    icon: '📣',
    phase: 'Phase 3: Market Readiness',
    color: '#9A7A30',
    tools: [
      {
        id: 11,
        name: 'Buyer Profile PDF',
        corporateTranslation: 'Acquirer Credential Presentation',
        description: 'Your new "brand" as an individual buyer. Translates 10+ years of executive experience into a compelling narrative for retiring SME owners.',
        phase: 'Phase 3: Market Readiness',
        priority: 'Critical',
        auNote: 'This document differentiates you from "tyre kickers" and positions you as a safe pair of hands for the seller\'s life\'s work. Include your Judo/NAB pre-approval amount.',
        sections: [
          {
            title: 'Buyer Profile — Key Sections',
            type: 'table',
            columns: ['Section', 'What to Include', 'Why It Matters to AU Sellers'],
            rows: [
              { Section: 'Personal Introduction', 'What to Include': 'Name, former role, years of experience, key industries', 'Why It Matters to AU Sellers': 'Establishes credibility and professionalism' },
              { Section: 'Why You Are Acquiring', 'What to Include': 'Genuine motivation (not "I was made redundant"); vision for the business', 'Why It Matters to AU Sellers': 'Sellers want to know their business is in good hands' },
              { Section: 'What You Bring (Value-Add)', 'What to Include': 'Specific operational, financial, or strategic skills you will apply', 'Why It Matters to AU Sellers': 'Demonstrates you can grow the business, not just maintain it' },
              { Section: 'Acquisition Criteria (Deal Box)', 'What to Include': 'Sector, size, geography, business model preferences', 'Why It Matters to AU Sellers': 'Shows you are serious and focused, not opportunistic' },
              { Section: 'Financial Capacity', 'What to Include': 'Indicative Judo/NAB pre-approval amount; personal equity available', 'Why It Matters to AU Sellers': 'Eliminates wasted time on unqualified buyers' },
              { Section: 'Transition Preference', 'What to Include': 'Desired transition period; commitment to staff and customer continuity', 'Why It Matters to AU Sellers': 'Addresses the seller\'s biggest fear: disruption to their legacy' },
              { Section: 'References', 'What to Include': 'Former employer, accountant, legal advisor available on request', 'Why It Matters to AU Sellers': 'Builds trust; signals transparency' },
              { Section: 'Contact Details', 'What to Include': 'Email, phone, LinkedIn profile', 'Why It Matters to AU Sellers': 'Makes it easy to respond' },
            ]
          }
        ]
      },
      {
        id: 12,
        name: 'Cold Email Outreach Scripts',
        corporateTranslation: 'Strategic Off-Market Origination Campaign',
        description: 'Three proven scripts for direct off-market outreach to Australian business owners, brokers, and accountants.',
        phase: 'Phase 3: Market Readiness',
        priority: 'High',
        auNote: 'Off-market outreach bypasses the broker market, reducing competition and improving deal terms. Personalise [BRACKETS] before sending.',
        sections: [
          {
            title: 'Outreach Scripts',
            type: 'scripts',
            scripts: [
              {
                title: 'Script 1: Direct Email to Business Owner (Off-Market)',
                content: `Subject: Potential Acquisition Enquiry — [BUSINESS NAME]

Dear [OWNER FIRST NAME],

My name is [YOUR NAME], and I am a [FORMER ROLE] with [X] years of experience in [INDUSTRY/SECTOR]. I am currently seeking to acquire a business in [TARGET SECTOR] in [STATE/REGION].

I came across [BUSINESS NAME] and was impressed by [SPECIFIC THING — e.g., your reputation in the local market / your Google Reviews / your tenure in the industry].

I am a serious, well-funded buyer with financing pre-approval from [Judo Bank / NAB] and am not working through a broker, which means there are no commissions involved for either party.

If you have ever considered transitioning out of the business — whether now or in the next 1–3 years — I would welcome a confidential, no-obligation conversation.

I am happy to sign an NDA before any discussion of financials.

Kind regards,
[YOUR NAME]
[PHONE] | [EMAIL] | [LINKEDIN]`
              },
              {
                title: 'Script 2: LinkedIn Message to Business Owner',
                content: `Hi [FIRST NAME],

I came across your profile and was impressed by [BUSINESS NAME]'s track record in [SECTOR].

I'm a [FORMER ROLE] with [X] years in [INDUSTRY], currently looking to acquire a business in [SECTOR] in [STATE].

I'm not a broker — I'm a direct buyer with financing in place. If you've ever thought about transitioning out of the business, I'd welcome a confidential chat.

No pressure, no obligation.

[YOUR NAME]`
              },
              {
                title: 'Script 3: Accountant Referral Request',
                content: `Subject: Confidential — Business Acquisition Referral Request

Dear [ACCOUNTANT NAME],

I hope this finds you well. As you know, I am currently seeking to acquire a business in [SECTOR] in [STATE/REGION], with a budget of up to $[X].

I understand that you work with a number of business owners who may be considering their exit options. I am a serious, well-funded buyer with financing pre-approval from [Judo Bank / NAB].

If any of your clients are open to a confidential, no-obligation conversation about a potential sale, I would welcome an introduction. I am happy to pay a referral fee of [$X or X%] upon successful completion of a transaction.

I have attached my Buyer Profile for your reference.

Kind regards,
[YOUR NAME]`
              }
            ]
          }
        ]
      },
      {
        id: 13,
        name: 'Questions To Ask Sellers',
        corporateTranslation: 'Initial Due Diligence Framework',
        description: 'Structured questions for your first and second seller meetings. Designed to quickly uncover true motivations, key-person risks, and hidden operational issues.',
        phase: 'Phase 3: Market Readiness',
        priority: 'High',
        auNote: 'Use the FROG Method (Family, Recreation, Occupation, Goals) to build rapport before asking financial questions. Fair Work compliance and ATO status are critical AU-specific flags.',
        sections: [
          {
            title: 'Category 1: Motivation & Timing',
            type: 'table',
            columns: ['Question', 'What You Are Looking For', 'Red Flag Indicator'],
            rows: [
              { Question: 'Why are you selling the business?', 'What You Are Looking For': 'Retirement / lifestyle change = good. Financial distress / burnout = investigate further.', 'Red Flag Indicator': 'Vague answer; reluctance to explain; recent major customer loss' },
              { Question: 'How long have you been thinking about selling?', 'What You Are Looking For': 'Long-planned = more prepared seller; recent decision = may be reactive', 'Red Flag Indicator': 'Decision made in last 3 months without clear reason' },
              { Question: 'What will you do after the sale?', 'What You Are Looking For': 'Retirement = motivated seller; starting competitor = major red flag', 'Red Flag Indicator': 'Starting a similar business; staying in the same industry' },
              { Question: 'Have you had the business on the market before?', 'What You Are Looking For': 'Previous failed sale = investigate why deal fell over', 'Red Flag Indicator': 'Multiple failed sales; price reductions over time' },
              { Question: 'What is your timeline for completing a sale?', 'What You Are Looking For': 'Urgency may indicate distress; patience may mean price flexibility', 'Red Flag Indicator': 'Extreme urgency without clear reason' },
            ]
          },
          {
            title: 'Category 2: Financial Health',
            type: 'table',
            columns: ['Question', 'What You Are Looking For', 'Red Flag Indicator'],
            rows: [
              { Question: 'What is the annual revenue and EBITDA for the last 3 years?', 'What You Are Looking For': 'Consistent or growing = good; declining = investigate cause', 'Red Flag Indicator': 'Declining revenue; inability to provide 3-year figures' },
              { Question: 'Are the financials prepared by an external accountant?', 'What You Are Looking For': 'Yes = more reliable; owner-prepared only = verify carefully', 'Red Flag Indicator': 'No external accountant; cash-heavy business with no records' },
              { Question: 'Are there any outstanding ATO debts or payment plans?', 'What You Are Looking For': 'No outstanding ATO debt at settlement', 'Red Flag Indicator': 'ATO payment plan; BAS lodgements not up to date' },
              { Question: 'What is the current debtor book? Any bad debts?', 'What You Are Looking For': 'Clean debtor book; debtor days <45', 'Red Flag Indicator': 'Large % of debtors >90 days; major customer in financial difficulty' },
              { Question: 'Are there any loans, leases, or liabilities attached to the business?', 'What You Are Looking For': 'All liabilities disclosed; check PPSR', 'Red Flag Indicator': 'Undisclosed liabilities; PPSR encumbrances' },
            ]
          },
          {
            title: 'Category 3: Operations & Key Person Risk',
            type: 'table',
            columns: ['Question', 'What You Are Looking For', 'Red Flag Indicator'],
            rows: [
              { Question: 'How many hours per week do you work in the business?', 'What You Are Looking For': 'Business runs without owner = good; owner works 60+ hrs/week = risk', 'Red Flag Indicator': 'Owner is the business; no delegation; no documented processes' },
              { Question: 'What would happen to the business if you were away for 3 months?', 'What You Are Looking For': 'Business runs fine = good; collapses = major risk', 'Red Flag Indicator': '"I can\'t take holidays" — extreme key-person dependency' },
              { Question: 'Are any staff on Award wages? Are they paid correctly?', 'What You Are Looking For': 'Fair Work compliance; no underpayment issues', 'Red Flag Indicator': 'Casual staff paid flat rates; no payslips; super not paid on time' },
              { Question: 'Who are your top 3 customers? What % of revenue do they represent?', 'What You Are Looking For': 'No single customer >30% of revenue', 'Red Flag Indicator': 'Top customer >50% of revenue; verbal-only contracts' },
              { Question: 'Is there a lease on the premises? When does it expire?', 'What You Are Looking For': 'Minimum 3 years remaining or renewal option; assignable lease', 'Red Flag Indicator': 'Lease expires within 12 months; landlord unlikely to assign' },
            ]
          }
        ]
      }
    ]
  },
  {
    id: 5,
    title: 'Evaluation',
    subtitle: 'Valuation, financial modelling & decision tools',
    icon: '⚖️',
    phase: 'Phase 4: Execute',
    color: '#C9A84C',
    tools: [
      {
        id: 14,
        name: 'NDA Template',
        corporateTranslation: 'Pre-Diligence Confidentiality Agreement',
        description: 'Standard Australian NDA for accessing sensitive financial and operational data from SME owners.',
        phase: 'Phase 4: Execute',
        priority: 'Critical',
        auNote: 'Always have your Australian solicitor review and execute the final NDA. This template reflects standard Australian practice. Governed by the laws of your state.',
        sections: [
          {
            title: 'Key NDA Clauses (Australian Standard)',
            type: 'table',
            columns: ['Clause', 'Standard AU Language', 'Included?'],
            rows: [
              { Clause: 'Definition of Confidential Information', 'Standard AU Language': 'Includes all financial, operational, customer, and employee data disclosed in connection with the proposed transaction', 'Included?': '☐' },
              { Clause: 'Permitted Use', 'Standard AU Language': 'Confidential Information may only be used for the purpose of evaluating the proposed acquisition', 'Included?': '☐' },
              { Clause: 'Non-Disclosure Obligation', 'Standard AU Language': 'Receiving party must not disclose to any third party without prior written consent', 'Included?': '☐' },
              { Clause: 'Permitted Disclosures', 'Standard AU Language': 'May disclose to professional advisors (accountant, solicitor, lender) on need-to-know basis', 'Included?': '☐' },
              { Clause: 'Return / Destruction of Information', 'Standard AU Language': 'All materials to be returned or destroyed if transaction does not proceed', 'Included?': '☐' },
              { Clause: 'Non-Solicitation of Employees', 'Standard AU Language': 'Buyer agrees not to solicit key employees for 12 months post-disclosure', 'Included?': '☐' },
              { Clause: 'Duration', 'Standard AU Language': '2 years from date of agreement (standard AU practice)', 'Included?': '☐' },
              { Clause: 'Governing Law', 'Standard AU Language': 'Laws of [State], Australia', 'Included?': '☐' },
              { Clause: 'Remedies', 'Standard AU Language': 'Breach entitles disclosing party to injunctive relief and damages', 'Included?': '☐' },
              { Clause: 'Exclusions', 'Standard AU Language': 'Does not apply to information already in public domain or independently developed', 'Included?': '☐' },
            ]
          }
        ]
      },
      {
        id: 15,
        name: 'Deal Decision Tree',
        corporateTranslation: 'Go / No-Go Decision Matrix',
        description: 'A 3-stage logical framework to remove emotion from the evaluation process and ensure only deals meeting your strict criteria proceed.',
        phase: 'Phase 4: Execute',
        priority: 'Critical',
        auNote: 'Stage 2 includes Judo Bank DSCR check (>1.25x). Stage 3 includes Fair Work compliance and PPSR checks — critical Australian requirements.',
        sections: [
          {
            title: 'Stage 1: Initial Screen (Before NDA)',
            type: 'table',
            columns: ['Criterion', 'Minimum Requirement', 'Pass / Fail', 'Notes'],
            rows: [
              { Criterion: 'Is the business in my target sector?', 'Minimum Requirement': 'Yes — matches Deal Box (Tool 7)', 'Pass / Fail': '', Notes: '' },
              { Criterion: 'Is the asking price within my budget?', 'Minimum Requirement': '≤ Maximum purchase price (Tool 5)', 'Pass / Fail': '', Notes: '' },
              { Criterion: 'Is the EBITDA above my minimum?', 'Minimum Requirement': '≥ Minimum EBITDA (Tool 5)', 'Pass / Fail': '', Notes: '' },
              { Criterion: 'Is the location acceptable?', 'Minimum Requirement': 'Within my geographic preference', 'Pass / Fail': '', Notes: '' },
              { Criterion: 'Has the business been operating for 5+ years?', 'Minimum Requirement': 'Yes — established track record', 'Pass / Fail': '', Notes: '' },
              { Criterion: 'Is the EBITDA multiple reasonable?', 'Minimum Requirement': '≤ 5x EBITDA for AU SME', 'Pass / Fail': '', Notes: '' },
            ]
          },
          {
            title: 'Stage 2: Financial Screen (After NDA & IM Review)',
            type: 'table',
            columns: ['Criterion', 'Minimum Requirement', 'Pass / Fail', 'Notes'],
            rows: [
              { Criterion: 'Is revenue stable or growing over 3 years?', 'Minimum Requirement': 'Flat or growing (not declining >10% p.a.)', 'Pass / Fail': '', Notes: '' },
              { Criterion: 'Is EBITDA margin acceptable?', 'Minimum Requirement': '>10% for services; >8% for distribution', 'Pass / Fail': '', Notes: '' },
              { Criterion: 'Is SDE sufficient to service debt + lifestyle?', 'Minimum Requirement': 'SDE > Annual debt service + $150k personal draw', 'Pass / Fail': '', Notes: '' },
              { Criterion: 'Is customer concentration acceptable?', 'Minimum Requirement': 'No single customer >30% of revenue', 'Pass / Fail': '', Notes: '' },
              { Criterion: 'Is the DSCR acceptable to Judo/NAB?', 'Minimum Requirement': '>1.25x (Judo Bank standard)', 'Pass / Fail': '', Notes: '' },
              { Criterion: 'Are there any ATO debts or payment plans?', 'Minimum Requirement': 'No outstanding ATO debt at settlement', 'Pass / Fail': '', Notes: '' },
            ]
          },
          {
            title: 'Stage 3: Operational Screen (After Seller Meeting)',
            type: 'table',
            columns: ['Criterion', 'Minimum Requirement', 'Pass / Fail', 'Notes'],
            rows: [
              { Criterion: 'Can the business operate without the owner?', 'Minimum Requirement': 'Yes — or manageable transition plan exists', 'Pass / Fail': '', Notes: '' },
              { Criterion: 'Are key staff likely to stay post-acquisition?', 'Minimum Requirement': 'Yes — no known flight risk', 'Pass / Fail': '', Notes: '' },
              { Criterion: 'Is the lease assignable and of sufficient term?', 'Minimum Requirement': 'Yes — minimum 3 years remaining or renewal option', 'Pass / Fail': '', Notes: '' },
              { Criterion: 'Are staff paid correctly under Fair Work awards?', 'Minimum Requirement': 'No known underpayment issues', 'Pass / Fail': '', Notes: 'Fair Work underpayment = significant liability' },
              { Criterion: 'Is the PPSR clear of undisclosed encumbrances?', 'Minimum Requirement': 'Yes — PPSR search confirms', 'Pass / Fail': '', Notes: 'ppsr.gov.au — free search' },
              { Criterion: 'Is the seller willing to provide a transition period?', 'Minimum Requirement': 'Minimum 4 weeks; 12 weeks preferred', 'Pass / Fail': '', Notes: '' },
            ]
          }
        ]
      },
      {
        id: 16,
        name: 'Contrarian Deal Navigator',
        corporateTranslation: 'Acquisition Project Plan',
        description: 'Your central project plan for the entire acquisition lifecycle — 18 milestones from NDA to Day Zero.',
        phase: 'Phase 4: Execute',
        priority: 'High',
        auNote: 'Integrates with the 120% program\'s concierge support at key milestones. Apex clients have direct-line advisor access throughout.',
        sections: [
          {
            title: 'Deal Navigator — 18 Milestone Tracker',
            type: 'table',
            columns: ['Milestone', 'Description', 'Target Date', 'Owner', 'Status'],
            rows: [
              { Milestone: '1. NDA Executed', Description: 'Both parties sign NDA; request full IM and 3 yrs financials', 'Target Date': '', Owner: 'Buyer', Status: 'Not Started' },
              { Milestone: '2. IM & Financials Reviewed', Description: 'Review Information Memorandum; run Deal Calculator (Tool 17)', 'Target Date': '', Owner: 'Buyer', Status: 'Not Started' },
              { Milestone: '3. Deal Decision Tree Complete', Description: 'Complete Tool 15; confirm Go/No-Go', 'Target Date': '', Owner: 'Buyer', Status: 'Not Started' },
              { Milestone: '4. Seller Meeting #1 (FROG Method)', Description: 'Initial meeting; use Tool 13 questions; build rapport', 'Target Date': '', Owner: 'Buyer', Status: 'Not Started' },
              { Milestone: '5. SDE Calculation Complete', Description: 'Complete Tool 18; verify add-backs with accountant', 'Target Date': '', Owner: 'Buyer + Accountant', Status: 'Not Started' },
              { Milestone: '6. 10 Value Markers Assessment', Description: 'Complete Tool 19; score business on all 10 markers', 'Target Date': '', Owner: 'Buyer', Status: 'Not Started' },
              { Milestone: '7. Indicative Financing Confirmed', Description: 'Confirm Judo/NAB indicative approval for this deal', 'Target Date': '', Owner: 'Buyer + Lender', Status: 'Not Started' },
              { Milestone: '8. LOI / NBIO Submitted', Description: 'Submit LOI using Tool 21 or 22; include exclusivity request', 'Target Date': '', Owner: 'Buyer + Advisor', Status: 'Not Started' },
              { Milestone: '9. LOI Accepted / Negotiated', Description: 'Negotiate terms; agree on price, structure, DD period', 'Target Date': '', Owner: 'Buyer + Seller', Status: 'Not Started' },
              { Milestone: '10. DD Team Engaged', Description: 'Engage accountant, solicitor, industry advisor; brief 120% SP DD team', 'Target Date': '', Owner: 'Buyer + 120%', Status: 'Not Started' },
              { Milestone: '11. DD Commenced', Description: 'Begin 60+ item DD checklist (Tool 24); 30–60 day period', 'Target Date': '', Owner: 'DD Team', Status: 'Not Started' },
              { Milestone: '12. DD Complete / Issues Resolved', Description: 'All DD items cleared; any price adjustments negotiated', 'Target Date': '', Owner: 'DD Team + Buyer', Status: 'Not Started' },
              { Milestone: '13. Formal Finance Application', Description: 'Submit formal loan application to Judo/NAB with DD package', 'Target Date': '', Owner: 'Buyer + Lender', Status: 'Not Started' },
              { Milestone: '14. Finance Approved', Description: 'Formal credit approval received from Judo/NAB', 'Target Date': '', Owner: 'Lender', Status: 'Not Started' },
              { Milestone: '15. APA / Share Sale Agreement Executed', Description: 'Final legal documents signed; deposit released from trust', 'Target Date': '', Owner: 'Solicitors', Status: 'Not Started' },
              { Milestone: '16. Settlement / Closing', Description: 'Complete Closing Checklist (Tool 28); funds transferred', 'Target Date': '', Owner: 'Solicitors + Buyer', Status: 'Not Started' },
              { Milestone: '17. Day Zero', Description: 'Complete Day Zero Checklist (Tool 29); take possession', 'Target Date': '', Owner: 'Buyer', Status: 'Not Started' },
              { Milestone: '18. 60-Day Post-Close Review (Apex)', Description: 'Review with 120% team; address any transition issues', 'Target Date': '', Owner: 'Buyer + 120%', Status: 'Not Started' },
            ]
          }
        ]
      },
      {
        id: 17,
        name: 'Deal Calculator',
        corporateTranslation: 'Initial Financial Model',
        description: 'Quick-screen any SME acquisition for viability, return on investment, and Judo Bank DSCR compliance — all in AUD.',
        phase: 'Phase 4: Execute',
        priority: 'Critical',
        auNote: 'Judo Bank DSCR requirement: >1.25x. Target cash-on-cash return for AU SME acquisitions: >15%. All figures in AUD.',
        sections: [
          {
            title: 'Section 1: Business Financials (From Seller)',
            type: 'table',
            columns: ['Item', 'Year 1 (AUD)', 'Year 2 (AUD)', 'Year 3 (AUD)', 'Average (AUD)', 'Notes'],
            rows: [
              { Item: 'Total Revenue', 'Year 1 (AUD)': '', 'Year 2 (AUD)': '', 'Year 3 (AUD)': '', 'Average (AUD)': '', Notes: 'From seller\'s P&L' },
              { Item: 'Cost of Goods Sold (COGS)', 'Year 1 (AUD)': '', 'Year 2 (AUD)': '', 'Year 3 (AUD)': '', 'Average (AUD)': '', Notes: '' },
              { Item: 'Gross Profit', 'Year 1 (AUD)': '', 'Year 2 (AUD)': '', 'Year 3 (AUD)': '', 'Average (AUD)': '', Notes: '= Revenue - COGS' },
              { Item: 'Operating Expenses (excl. owner salary)', 'Year 1 (AUD)': '', 'Year 2 (AUD)': '', 'Year 3 (AUD)': '', 'Average (AUD)': '', Notes: '' },
              { Item: 'Owner\'s Salary / Drawings', 'Year 1 (AUD)': '', 'Year 2 (AUD)': '', 'Year 3 (AUD)': '', 'Average (AUD)': '', Notes: 'Add back to calculate SDE' },
              { Item: 'EBITDA (before owner add-backs)', 'Year 1 (AUD)': '', 'Year 2 (AUD)': '', 'Year 3 (AUD)': '', 'Average (AUD)': '', Notes: '' },
              { Item: 'Add-Backs (non-business expenses)', 'Year 1 (AUD)': '', 'Year 2 (AUD)': '', 'Year 3 (AUD)': '', 'Average (AUD)': '', Notes: 'See Tool 18 for detail' },
              { Item: 'Seller\'s Discretionary Earnings (SDE)', 'Year 1 (AUD)': '', 'Year 2 (AUD)': '', 'Year 3 (AUD)': '', 'Average (AUD)': '', Notes: 'EBITDA + Add-Backs' },
            ]
          },
          {
            title: 'Section 2: Valuation & Deal Structure',
            type: 'table',
            columns: ['Item', 'Your Input', 'Result', 'Notes'],
            rows: [
              { Item: 'Average SDE (3-year)', 'Your Input': '$', Result: '', Notes: 'Key valuation input' },
              { Item: 'EBITDA Multiple Applied', 'Your Input': 'x (typical AU range: 2.0x–4.5x)', Result: '', Notes: 'From Tool 19 Value Markers' },
              { Item: 'Indicative Business Value (SDE × Multiple)', 'Your Input': '', Result: '$', Notes: '' },
              { Item: 'Asking Price', 'Your Input': '$', Result: '', Notes: 'From seller / broker' },
              { Item: 'Target Purchase Price', 'Your Input': '$', Result: '', Notes: 'Target 10–20% below asking' },
              { Item: 'Bank Loan (Judo/NAB)', 'Your Input': '$', Result: '% of purchase price', Notes: 'Typically 70–80% LVR' },
              { Item: 'Seller Finance', 'Your Input': '$', Result: '% of purchase price', Notes: 'Negotiate 20–30%' },
              { Item: 'Personal Equity / Cash', 'Your Input': '$', Result: '% of purchase price', Notes: '' },
              { Item: 'Working Capital Reserve', 'Your Input': '$', Result: '', Notes: 'Minimum 3 months opex' },
            ]
          },
          {
            title: 'Section 3: Return on Investment Analysis',
            type: 'table',
            columns: ['Item', 'Calculation', 'Result (AUD)', 'Notes'],
            rows: [
              { Item: 'Annual Loan Repayment (P+I)', Calculation: 'Bank loan × (interest rate + principal)', 'Result (AUD)': '$', Notes: 'Judo Bank: typically 7–9% p.a. over 5–7 yrs' },
              { Item: 'Annual Seller Finance Repayment', Calculation: 'Seller finance × agreed rate', 'Result (AUD)': '$', Notes: 'Typically 5–7% p.a.' },
              { Item: 'Total Annual Debt Service', Calculation: 'Bank + Seller Finance repayments', 'Result (AUD)': '$', Notes: '' },
              { Item: 'DSCR (Debt Service Coverage Ratio)', Calculation: 'SDE / Total Annual Debt Service', 'Result (AUD)': 'x (must be >1.25x for Judo)', Notes: 'Critical Judo Bank requirement' },
              { Item: 'Net Cash Flow After Debt Service', Calculation: 'SDE - Total Debt Service', 'Result (AUD)': '$', Notes: 'Your annual income from the business' },
              { Item: 'Cash-on-Cash Return', Calculation: 'Net Cash Flow / Personal Equity Invested', 'Result (AUD)': '%', Notes: 'Target: >15% for AU SME' },
              { Item: 'Payback Period (Years)', Calculation: 'Personal Equity / Net Cash Flow', 'Result (AUD)': 'yrs', Notes: 'Target: <5 years' },
            ]
          }
        ]
      },
      {
        id: 18,
        name: 'SDE Calculation Worksheet',
        corporateTranslation: 'Adjusted EBITDA Reconciliation',
        description: 'Calculate Seller\'s Discretionary Earnings — the true cash flow available to a new owner — by adding back owner compensation and non-business expenses.',
        phase: 'Phase 4: Execute',
        priority: 'Critical',
        auNote: 'SDE is the standard valuation basis for AU SMEs under $5M purchase price. Always verify add-backs with an independent accountant.',
        sections: [
          {
            title: 'SDE Calculation — Step by Step',
            type: 'table',
            columns: ['Item', 'Year 1 (AUD)', 'Year 2 (AUD)', 'Year 3 (AUD)', 'Avg (AUD)', 'Verified?', 'Notes'],
            rows: [
              { Item: 'Net Profit (from P&L / Tax Return)', 'Year 1 (AUD)': '', 'Year 2 (AUD)': '', 'Year 3 (AUD)': '', 'Avg (AUD)': '', 'Verified?': '☐', Notes: 'Starting point' },
              { Item: '+ Depreciation', 'Year 1 (AUD)': '', 'Year 2 (AUD)': '', 'Year 3 (AUD)': '', 'Avg (AUD)': '', 'Verified?': '☐', Notes: 'Non-cash expense; add back' },
              { Item: '+ Amortisation', 'Year 1 (AUD)': '', 'Year 2 (AUD)': '', 'Year 3 (AUD)': '', 'Avg (AUD)': '', 'Verified?': '☐', Notes: 'Non-cash expense; add back' },
              { Item: '+ Interest Expense', 'Year 1 (AUD)': '', 'Year 2 (AUD)': '', 'Year 3 (AUD)': '', 'Avg (AUD)': '', 'Verified?': '☐', Notes: 'Financing cost; add back' },
              { Item: '+ Tax (if applicable)', 'Year 1 (AUD)': '', 'Year 2 (AUD)': '', 'Year 3 (AUD)': '', 'Avg (AUD)': '', 'Verified?': '☐', Notes: 'Pre-tax basis for SDE' },
              { Item: '= EBITDA', 'Year 1 (AUD)': '', 'Year 2 (AUD)': '', 'Year 3 (AUD)': '', 'Avg (AUD)': '', 'Verified?': '', Notes: 'Subtotal before owner add-backs' },
              { Item: '+ Owner\'s Salary / Drawings', 'Year 1 (AUD)': '', 'Year 2 (AUD)': '', 'Year 3 (AUD)': '', 'Avg (AUD)': '', 'Verified?': '☐', Notes: 'What the owner pays themselves' },
              { Item: '+ Owner\'s Superannuation Contributions', 'Year 1 (AUD)': '', 'Year 2 (AUD)': '', 'Year 3 (AUD)': '', 'Avg (AUD)': '', 'Verified?': '☐', Notes: 'Employer super on owner\'s salary' },
              { Item: '+ Owner\'s Personal Vehicle (business-registered)', 'Year 1 (AUD)': '', 'Year 2 (AUD)': '', 'Year 3 (AUD)': '', 'Avg (AUD)': '', 'Verified?': '☐', Notes: 'If run through business' },
              { Item: '+ Owner\'s Personal Phone / Travel', 'Year 1 (AUD)': '', 'Year 2 (AUD)': '', 'Year 3 (AUD)': '', 'Avg (AUD)': '', 'Verified?': '☐', Notes: 'Non-business expenses' },
              { Item: '+ Family Members\' Salaries (above market rate)', 'Year 1 (AUD)': '', 'Year 2 (AUD)': '', 'Year 3 (AUD)': '', 'Avg (AUD)': '', 'Verified?': '☐', Notes: 'Excess above market rate only' },
              { Item: '+ One-Time / Non-Recurring Expenses', 'Year 1 (AUD)': '', 'Year 2 (AUD)': '', 'Year 3 (AUD)': '', 'Avg (AUD)': '', 'Verified?': '☐', Notes: 'Legal disputes; fit-out; redundancies' },
              { Item: '- One-Time / Non-Recurring Revenue', 'Year 1 (AUD)': '', 'Year 2 (AUD)': '', 'Year 3 (AUD)': '', 'Avg (AUD)': '', 'Verified?': '☐', Notes: 'Remove windfall revenue' },
              { Item: '= SELLER\'S DISCRETIONARY EARNINGS (SDE)', 'Year 1 (AUD)': '', 'Year 2 (AUD)': '', 'Year 3 (AUD)': '', 'Avg (AUD)': '', 'Verified?': '', Notes: 'TRUE CASH FLOW TO NEW OWNER' },
            ]
          }
        ]
      },
      {
        id: 19,
        name: '10 Contrarian Acquisition Value Markers',
        corporateTranslation: 'Strategic Value Assessment Framework',
        description: 'Score any SME acquisition across 10 dimensions of intrinsic value — beyond the financials.',
        phase: 'Phase 4: Execute',
        priority: 'High',
        auNote: 'A score of 4.0–5.0 = premium business; expect to pay full multiple. Below 3.0 = significant risks; negotiate price accordingly.',
        sections: [
          {
            title: 'The 10 Value Markers (Score 1–5 each)',
            type: 'table',
            columns: ['Value Marker', 'What to Look For (Australian Context)', 'Score (1–5)', 'Weight', 'Notes'],
            rows: [
              { 'Value Marker': '1. Recurring Revenue', 'What to Look For (Australian Context)': '% of revenue from contracts, subscriptions, or repeat customers. Target: >50% recurring.', 'Score (1–5)': '', Weight: '15%', Notes: '' },
              { 'Value Marker': '2. Customer Diversification', 'What to Look For (Australian Context)': 'No single customer >30% of revenue. Spread across 10+ customers ideal.', 'Score (1–5)': '', Weight: '15%', Notes: '' },
              { 'Value Marker': '3. Management Team Independence', 'What to Look For (Australian Context)': 'Business can operate without the owner for 3+ months. Management team in place.', 'Score (1–5)': '', Weight: '15%', Notes: '' },
              { 'Value Marker': '4. Barriers to Entry / Competitive Moat', 'What to Look For (Australian Context)': 'Licences, certifications, long-term contracts, proprietary systems, or brand reputation.', 'Score (1–5)': '', Weight: '10%', Notes: '' },
              { 'Value Marker': '5. Growth Potential', 'What to Look For (Australian Context)': 'Untapped markets, geographic expansion, product line extension, or digital opportunity.', 'Score (1–5)': '', Weight: '10%', Notes: '' },
              { 'Value Marker': '6. Financial Health & Trend', 'What to Look For (Australian Context)': '3-year revenue and EBITDA growth. Clean books. ATO and Fair Work compliant.', 'Score (1–5)': '', Weight: '10%', Notes: '' },
              { 'Value Marker': '7. Operational Systems & Processes', 'What to Look For (Australian Context)': 'Documented SOPs, CRM, accounting software (Xero/MYOB), staff training manuals.', 'Score (1–5)': '', Weight: '10%', Notes: '' },
              { 'Value Marker': '8. Asset Quality', 'What to Look For (Australian Context)': 'Plant, equipment, and inventory in good condition. Lease with sufficient term remaining.', 'Score (1–5)': '', Weight: '5%', Notes: '' },
              { 'Value Marker': '9. Supplier Diversification', 'What to Look For (Australian Context)': 'No single supplier >40% of COGS. Multiple supplier relationships.', 'Score (1–5)': '', Weight: '5%', Notes: '' },
              { 'Value Marker': '10. Industry Tailwinds', 'What to Look For (Australian Context)': 'Is the industry growing? Favourable demographics, government spending, or technology adoption.', 'Score (1–5)': '', Weight: '5%', Notes: '' },
            ]
          },
          {
            title: 'Score Interpretation',
            type: 'table',
            columns: ['Score Range', 'Recommendation', 'Action'],
            rows: [
              { 'Score Range': '4.0–5.0', Recommendation: 'Premium business — expect to pay full multiple', Action: 'Proceed to LOI immediately' },
              { 'Score Range': '3.0–3.9', Recommendation: 'Good business with some risks', Action: 'Negotiate price; address risks in DD' },
              { 'Score Range': '2.0–2.9', Recommendation: 'Below average — significant risks', Action: 'Only proceed if price reflects risk' },
              { 'Score Range': 'Below 2.0', Recommendation: 'High risk — do not proceed', Action: 'Walk away unless turnaround specialist' },
            ]
          }
        ]
      }
    ]
  },
  {
    id: 6,
    title: 'Offer & Negotiation',
    subtitle: 'LOI, APA & deal structuring',
    icon: '🤝',
    phase: 'Phase 4: Execute',
    color: '#2A5F8F',
    tools: [
      {
        id: 20,
        name: 'Offer Checklist',
        corporateTranslation: 'Term Sheet Pre-Flight Checklist',
        description: 'Ensure all critical components are addressed before submitting your LOI — price, structure, contingencies, and transition requirements.',
        phase: 'Phase 4: Execute',
        priority: 'Critical',
        auNote: 'Complete 120% NBIO coaching before submitting your first offer. Judo/NAB indicative approval must be confirmed before LOI submission.',
        sections: [
          {
            title: 'Pre-Offer Preparation Checklist',
            type: 'checklist',
            items: [
              { item: 'Deal Calculator completed (Tool 17)', detail: 'Confirm viability and target price', auContext: '' },
              { item: '10 Value Markers scored (Tool 19)', detail: 'Understand premium/discount to asking price', auContext: '' },
              { item: 'SDE verified with accountant (Tool 18)', detail: 'Confirm add-backs are legitimate', auContext: '' },
              { item: 'Judo/NAB indicative approval confirmed for this deal', detail: 'Get written indicative approval before submitting LOI', auContext: 'Named Judo contact provided in Apex tier' },
              { item: 'Capital stack confirmed (Tool 25)', detail: 'Bank + Seller Finance + Equity = Total Purchase Price', auContext: '' },
              { item: 'Target price determined (10–20% below asking)', detail: 'Based on Deal Calculator and Value Markers', auContext: '' },
              { item: 'Deal structure decided (Asset vs Share Purchase)', detail: 'Asset purchase preferred for most AU SME deals', auContext: 'Confirm with tax advisor re: CGT implications' },
              { item: 'Seller finance terms prepared (if applicable)', detail: 'Amount, interest rate, repayment period, security', auContext: '' },
              { item: 'Transition period requirement confirmed', detail: 'Minimum 4 weeks; 12 weeks preferred', auContext: '' },
              { item: 'Non-compete clause terms prepared', detail: '2–5 years; defined geography; defined activities', auContext: 'Standard AU practice' },
              { item: 'DD period and exclusivity terms prepared', detail: '30–60 days DD; exclusivity during DD period', auContext: '' },
              { item: 'Deposit amount confirmed', detail: 'Typically 5–10% of purchase price; held in solicitor trust', auContext: '' },
              { item: 'Solicitor briefed and available', detail: 'Solicitor ready to review and execute LOI', auContext: '' },
              { item: '120% advisor / NBIO coaching completed', detail: 'Debrief with 120% team before submitting offer', auContext: 'Included in Signature and Apex tiers' },
            ]
          },
          {
            title: 'Key Negotiation Principles (Australian Context)',
            type: 'table',
            columns: ['Principle', 'How to Apply'],
            rows: [
              { Principle: 'Lead with price, but win on terms', 'How to Apply': 'Sellers often fixate on headline price. Offer full price with favourable terms (seller finance, long transition) rather than a low cash offer.' },
              { Principle: 'Understand the seller\'s "why"', 'How to Apply': 'A seller motivated by legacy will value staff protection. A seller motivated by speed will value certainty of close.' },
              { Principle: 'Never make your first offer your best offer', 'How to Apply': 'Leave room to negotiate. Start 15–20% below asking; expect to settle at 5–10% below.' },
              { Principle: 'Use the Judo/NAB pre-approval as credibility', 'How to Apply': 'Showing written pre-approval signals you are a serious, funded buyer — not a tyre-kicker.' },
              { Principle: 'Seller finance reduces your risk, not theirs', 'How to Apply': 'Frame seller finance as "you believe in the business enough to let the business pay for itself".' },
            ]
          }
        ]
      },
      {
        id: 21,
        name: 'LOI Template (Advanced)',
        corporateTranslation: 'Complex Term Sheet',
        description: 'Advanced Letter of Intent for structured transactions with earn-outs, seller finance, and detailed conditions precedent.',
        phase: 'Phase 4: Execute',
        priority: 'Critical',
        auNote: 'This template is for reference only. Always have your Australian solicitor review and execute the final LOI. Governed by the laws of your state.',
        sections: [
          {
            title: 'Part A: Parties & Business Details',
            type: 'table',
            columns: ['Field', 'Detail'],
            rows: [
              { Field: 'Buyer Full Name / Entity', Detail: '' },
              { Field: 'Buyer ABN / ACN', Detail: '' },
              { Field: 'Seller Full Name / Entity', Detail: '' },
              { Field: 'Seller ABN / ACN', Detail: '' },
              { Field: 'Business Name', Detail: '' },
              { Field: 'Business ABN', Detail: '' },
              { Field: 'Date of LOI', Detail: '' },
              { Field: 'Governing Law (State)', Detail: 'NSW / VIC / QLD / Other' },
            ]
          },
          {
            title: 'Part B: Purchase Price & Structure',
            type: 'table',
            columns: ['Field', 'Detail'],
            rows: [
              { Field: 'Total Purchase Price (AUD)', Detail: '$' },
              { Field: 'Purchase Structure', Detail: 'Asset Purchase / Share Purchase (circle one)' },
              { Field: 'Bank Finance (Judo/NAB) (AUD)', Detail: '$ (  % of purchase price)' },
              { Field: 'Seller Finance Amount (AUD)', Detail: '$ (  % of purchase price)' },
              { Field: 'Seller Finance Interest Rate', Detail: '  % per annum' },
              { Field: 'Seller Finance Repayment Period', Detail: '  months / years' },
              { Field: 'Buyer Equity / Cash (AUD)', Detail: '$ (  % of purchase price)' },
              { Field: 'Deposit Amount (AUD)', Detail: '$ (held in [Solicitor] trust account)' },
            ]
          },
          {
            title: 'Part C: Key Terms',
            type: 'table',
            columns: ['Term', 'Detail'],
            rows: [
              { Term: 'Due Diligence Period', Detail: '  days from execution of LOI' },
              { Term: 'Exclusivity Period', Detail: '  days (no other offers to be solicited or accepted)' },
              { Term: 'Settlement Date', Detail: '  days after all conditions precedent satisfied' },
              { Term: 'Transition Period', Detail: '  weeks of seller involvement post-settlement' },
              { Term: 'Non-Compete Period', Detail: '  years from settlement date' },
              { Term: 'Non-Compete Geography', Detail: '[State] / [Defined radius] / [Defined market]' },
              { Term: 'Non-Solicitation of Staff', Detail: '  years from settlement date' },
              { Term: 'Earn-Out (if applicable)', Detail: 'Amount: $  ; KPIs: [describe] ; Period:   months' },
              { Term: 'Binding / Non-Binding', Detail: 'This LOI is NON-BINDING except for clauses: Exclusivity, Confidentiality, Governing Law' },
            ]
          }
        ]
      },
      {
        id: 22,
        name: 'LOI Template (Simple)',
        corporateTranslation: 'Standard Term Sheet',
        description: 'Simplified Letter of Intent for straightforward asset purchases — clean, concise, and fast to execute.',
        phase: 'Phase 4: Execute',
        priority: 'High',
        auNote: 'Use this template for straightforward asset purchases. For complex deals with earn-outs or seller finance, use Tool 21 (Advanced LOI).',
        sections: [
          {
            title: 'LOI Details',
            type: 'table',
            columns: ['Field', 'Detail'],
            rows: [
              { Field: 'Date', Detail: '' },
              { Field: 'Buyer Name', Detail: '' },
              { Field: 'Seller Name', Detail: '' },
              { Field: 'Business Name', Detail: '' },
              { Field: 'Purchase Price (AUD)', Detail: '$' },
              { Field: 'Purchase Structure', Detail: 'Asset Purchase' },
              { Field: 'Deposit (AUD)', Detail: '$ (held in solicitor trust)' },
              { Field: 'Finance Condition', Detail: 'Subject to Judo Bank / NAB approval within   days' },
              { Field: 'Due Diligence Period', Detail: '  days from execution' },
              { Field: 'Exclusivity', Detail: 'Seller agrees not to negotiate with other parties during DD period' },
              { Field: 'Settlement Date', Detail: '  days after all conditions satisfied' },
              { Field: 'Transition Period', Detail: '  weeks post-settlement' },
              { Field: 'Non-Compete', Detail: '  years;   km radius; [defined activities]' },
              { Field: 'Governing Law', Detail: 'Laws of [State], Australia' },
              { Field: 'Binding Nature', Detail: 'Non-binding except for Exclusivity and Confidentiality clauses' },
            ]
          }
        ]
      },
      {
        id: 23,
        name: 'Asset Purchase Agreement Template',
        corporateTranslation: 'Definitive Acquisition Agreement',
        description: 'Key terms and clauses checklist for the Asset Purchase Agreement — the definitive legal document for most Australian SME acquisitions.',
        phase: 'Phase 4: Execute',
        priority: 'Critical',
        auNote: 'Your Australian solicitor must draft the final binding APA. Most AU SME deals use Asset Purchase (not Share Purchase) to avoid inheriting unknown liabilities.',
        sections: [
          {
            title: 'Assets Being Purchased',
            type: 'table',
            columns: ['Asset Category', 'Included?', 'Value (AUD)', 'Notes'],
            rows: [
              { 'Asset Category': 'Goodwill', 'Included?': '☐ Yes / ☐ No', 'Value (AUD)': '$', Notes: 'Core intangible value of the business' },
              { 'Asset Category': 'Plant & Equipment', 'Included?': '☐ Yes / ☐ No', 'Value (AUD)': '$', Notes: 'List in schedule; confirm condition' },
              { 'Asset Category': 'Stock / Inventory', 'Included?': '☐ Yes / ☐ No', 'Value (AUD)': '$', Notes: 'Valued at cost; stocktake at settlement' },
              { 'Asset Category': 'Intellectual Property (trademarks, domain, software)', 'Included?': '☐ Yes / ☐ No', 'Value (AUD)': '$', Notes: 'Ensure IP is registered in business name' },
              { 'Asset Category': 'Customer Contracts & Lists', 'Included?': '☐ Yes / ☐ No', 'Value (AUD)': '$', Notes: 'Confirm assignability; notify customers' },
              { 'Asset Category': 'Lease (premises)', 'Included?': '☐ Yes / ☐ No', 'Value (AUD)': '$', Notes: 'Landlord consent required; check term' },
              { 'Asset Category': 'Website & Social Media Accounts', 'Included?': '☐ Yes / ☐ No', 'Value (AUD)': '$', Notes: 'Transfer login credentials at settlement' },
              { 'Asset Category': 'Debtors (receivables)', 'Included?': '☐ No (standard) / ☐ Yes', 'Value (AUD)': '$', Notes: 'Usually excluded; seller retains debtors' },
              { 'Asset Category': 'Cash in Bank', 'Included?': '☐ No (standard) / ☐ Yes', 'Value (AUD)': '$', Notes: 'Usually excluded; seller retains cash' },
              { 'Asset Category': 'Liabilities / Debts', 'Included?': '☐ No (standard) / ☐ Yes', 'Value (AUD)': '$', Notes: 'Usually excluded; seller retains liabilities' },
            ]
          },
          {
            title: 'Key APA Clauses Checklist',
            type: 'table',
            columns: ['Clause', 'Australian Standard', 'Included?', 'Notes'],
            rows: [
              { Clause: 'Representations & Warranties', 'Australian Standard': 'Seller warrants accuracy of financials, no undisclosed liabilities, compliance with all laws', 'Included?': '☐', Notes: '' },
              { Clause: 'Indemnification', 'Australian Standard': 'Seller indemnifies buyer for pre-settlement liabilities and warranty breaches', 'Included?': '☐', Notes: '' },
              { Clause: 'GST Treatment', 'Australian Standard': 'Sale structured as going concern (GST-free under s38-325 GST Act)', 'Included?': '☐', Notes: 'Confirm with tax advisor' },
              { Clause: 'Stamp Duty', 'Australian Standard': 'Buyer pays stamp duty on applicable assets (varies by state)', 'Included?': '☐', Notes: 'NSW: ~$500 for goodwill' },
              { Clause: 'Employee Entitlements', 'Australian Standard': 'Seller pays out all accrued leave, super, and entitlements at settlement', 'Included?': '☐', Notes: 'Fair Work obligation' },
              { Clause: 'PAYG Withholding', 'Australian Standard': 'Seller up to date with all PAYG obligations', 'Included?': '☐', Notes: 'ATO clearance required' },
              { Clause: 'Restraint of Trade', 'Australian Standard': 'Non-compete: [X] years; [geography]; [defined activities]', 'Included?': '☐', Notes: '' },
              { Clause: 'Training & Handover', 'Australian Standard': 'Seller provides [X] weeks of training and handover', 'Included?': '☐', Notes: '' },
            ]
          }
        ]
      }
    ]
  },
  {
    id: 7,
    title: 'Due Diligence',
    subtitle: '60+ item enterprise risk audit',
    icon: '🔬',
    phase: 'Phase 4: Execute',
    color: '#1B3A5C',
    tools: [
      {
        id: 24,
        name: '60+ Item Due Diligence Checklist',
        corporateTranslation: 'Enterprise Risk & Compliance Audit',
        description: 'Comprehensive Australian SME due diligence covering financial, legal, operational, and commercial dimensions.',
        phase: 'Phase 4: Execute',
        priority: 'Critical',
        auNote: 'For 120% Signature and Apex clients, this checklist aligns with the SP-led commercial DD at preferential rates. Key AU checks: ASIC, PPSR, Fair Work, ATO, WHS.',
        sections: [
          {
            title: 'Financial Due Diligence',
            type: 'checklist',
            items: [
              { item: '3 years of P&L statements (accountant-prepared)', detail: 'Cross-check with tax returns', auContext: 'ATO portal access or accountant confirmation' },
              { item: '3 years of Balance Sheets', detail: 'Check for undisclosed liabilities', auContext: '' },
              { item: '3 years of Cash Flow statements', detail: 'Verify operating cash flow trend', auContext: '' },
              { item: '3 years of BAS / GST returns', detail: 'Confirm lodgements are up to date', auContext: 'ATO portal printout required' },
              { item: '3 years of income tax returns', detail: 'Cross-check with P&L figures', auContext: '' },
              { item: 'Management accounts (current year to date)', detail: 'Understand current year performance', auContext: '' },
              { item: 'Aged debtors report (current)', detail: 'Any debts >90 days?', auContext: '' },
              { item: 'ATO tax portal printout (no outstanding debts)', detail: 'Request from seller; critical', auContext: 'ATO clearance required at settlement' },
              { item: 'Payroll tax compliance confirmation (state-based)', detail: 'Varies by state; check threshold', auContext: 'NSW: $1.2M threshold (2025)' },
              { item: 'Bank statements (12 months)', detail: 'Cross-check with P&L', auContext: '' },
              { item: 'Loan and finance agreements', detail: 'All liabilities to be disclosed', auContext: '' },
              { item: 'Asset register (plant, equipment, vehicles)', detail: 'Confirm condition and ownership', auContext: '' },
              { item: 'Inventory valuation and stocktake', detail: 'Independent stocktake at settlement', auContext: '' },
            ]
          },
          {
            title: 'Legal Due Diligence',
            type: 'checklist',
            items: [
              { item: 'ASIC company search (directors, shareholders, charges)', detail: 'asic.gov.au — free search', auContext: 'Check director history and company charges' },
              { item: 'PPSR search (Personal Property Securities Register)', detail: 'ppsr.gov.au — check all assets', auContext: 'Identify any encumbrances on business assets' },
              { item: 'Business name registration confirmation', detail: 'Ensure name is transferable', auContext: 'ASIC business name register' },
              { item: 'Trademark and IP searches (IP Australia)', detail: 'ipaustralia.gov.au', auContext: 'Confirm IP is in business name, not owner\'s personal name' },
              { item: 'Lease agreement (premises)', detail: 'Check term, options, assignment clause', auContext: 'Landlord consent to assignment required' },
              { item: 'All material contracts (customers, suppliers)', detail: 'Confirm assignability', auContext: '' },
              { item: 'Employment contracts (all staff)', detail: 'Check terms; Fair Work compliance', auContext: 'Fair Work Act compliance' },
              { item: 'Any litigation, disputes, or claims (current or threatened)', detail: 'Statutory declaration from seller', auContext: '' },
              { item: 'Regulatory licences and permits', detail: 'Confirm transferability', auContext: 'Trades, healthcare, childcare, food' },
              { item: 'Insurance policies (current)', detail: 'Public liability, professional indemnity, workers comp', auContext: 'State WorkCover authority' },
            ]
          },
          {
            title: 'Operational Due Diligence',
            type: 'checklist',
            items: [
              { item: 'Organisational chart and staff list', detail: 'Identify key persons', auContext: '' },
              { item: 'Staff entitlements (annual leave, LSL, super)', detail: 'Seller must pay out at settlement', auContext: 'Fair Work Act; Long Service Leave Act' },
              { item: 'Fair Work award compliance audit', detail: 'fairwork.gov.au pay calculator', auContext: 'Underpayment = significant liability' },
              { item: 'Superannuation payment history (ATO portal)', detail: 'Confirm no super debt', auContext: 'Super Guarantee: 11.5% (2025)' },
              { item: 'Workers compensation history and claims', detail: 'State WorkCover authority', auContext: '' },
              { item: 'Key staff retention confirmation', detail: 'Written commitment preferred', auContext: '' },
              { item: 'Customer list and contract terms', detail: 'Concentration risk analysis', auContext: '' },
              { item: 'Top 10 customers (revenue, tenure, contract status)', detail: 'Identify churn risk', auContext: '' },
              { item: 'Operational processes and SOPs', detail: 'Documented or undocumented?', auContext: '' },
              { item: 'WHS (Work Health & Safety) compliance', detail: 'State WHS authority; incident register', auContext: 'Significant liability if non-compliant' },
            ]
          },
          {
            title: 'Commercial Due Diligence',
            type: 'checklist',
            items: [
              { item: 'Market and industry analysis (IBISWorld)', detail: '120% SP team can assist', auContext: 'IBISWorld AU industry reports' },
              { item: 'Competitive landscape assessment', detail: 'Who are the top 3 competitors?', auContext: '' },
              { item: 'Revenue trend analysis (3-year)', detail: 'Organic growth vs one-off?', auContext: '' },
              { item: 'Customer acquisition and retention analysis', detail: 'How are new customers won?', auContext: '' },
              { item: 'Growth opportunities identified', detail: 'Untapped markets, products, channels', auContext: '' },
              { item: 'Key person dependency assessment', detail: 'What happens if owner leaves Day 1?', auContext: '' },
              { item: 'Reference checks (key customers, suppliers)', detail: 'Call 2–3 key customers directly', auContext: '' },
            ]
          }
        ]
      }
    ]
  },
  {
    id: 8,
    title: 'Financing',
    subtitle: '21 options, equity & seller finance',
    icon: '💰',
    phase: 'Phase 4: Execute',
    color: '#9A7A30',
    tools: [
      {
        id: 25,
        name: '21 Financing Options Sheet',
        corporateTranslation: 'Capital Stack Matrix',
        description: 'All 21 Australian SME acquisition financing options — from Judo Bank to SMSF, seller finance, and creative equity structures.',
        phase: 'Phase 4: Execute',
        priority: 'Critical',
        auNote: 'Judo Bank is the specialist SME acquisition lender in Australia. NAB is the preferred big-4 option. SMSF can be used for commercial property (not goodwill). Always confirm with your accountant.',
        sections: [
          {
            title: 'Primary Financing Options (Australia)',
            type: 'table',
            columns: ['Option', 'How It Works (AU Context)', 'Typical Amount', 'Cost / Rate', 'Pros', 'Cons'],
            rows: [
              { Option: '1. Judo Bank SME Acquisition Loan', 'How It Works (AU Context)': 'Specialist SME lender; relationship-based; DSCR >1.25x required', 'Typical Amount': 'Up to 80% LVR', 'Cost / Rate': '7–9% p.a. (2025)', Pros: 'Specialist SME focus; fast decisions; relationship manager', Cons: 'Higher rate than big 4; personal guarantee required' },
              { Option: '2. NAB Business Acquisition Loan', 'How It Works (AU Context)': 'Big 4 bank; strong for established businesses with property', 'Typical Amount': 'Up to 70% LVR', 'Cost / Rate': '6.5–8.5% p.a.', Pros: 'Lower rate; brand trust; property security preferred', Cons: 'Slower process; less flexible on SME cash flow' },
              { Option: '3. Seller Finance (Vendor Finance)', 'How It Works (AU Context)': 'Seller accepts deferred payment; typically 20–30% of price', 'Typical Amount': '20–40% of purchase price', 'Cost / Rate': '5–7% p.a. (negotiated)', Pros: 'Reduces upfront cash; aligns seller incentives; flexible terms', Cons: 'Seller must trust buyer; may require personal guarantee' },
              { Option: '4. SMSF (Self-Managed Super Fund)', 'How It Works (AU Context)': 'SMSF can purchase commercial property used by your business', 'Typical Amount': 'Up to 100% of property value', 'Cost / Rate': 'Super fund returns', Pros: 'Tax-effective; leverage super for business property', Cons: 'Cannot use SMSF to buy business goodwill; complex rules' },
              { Option: '5. Private Equity Partner', 'How It Works (AU Context)': 'Bring in a PE or angel investor for equity stake', 'Typical Amount': 'Varies', 'Cost / Rate': 'Equity dilution (20–49%)', Pros: 'Access to capital + expertise; shared risk', Cons: 'Loss of control; profit sharing; exit pressure' },
              { Option: '6. Sweat Equity', 'How It Works (AU Context)': 'Negotiate equity stake in exchange for your expertise/time', 'Typical Amount': 'Negotiated', 'Cost / Rate': 'Time and expertise', Pros: 'No cash required; earn equity through performance', Cons: 'Complex to structure; requires trust; no immediate income' },
              { Option: '7. Earn-Out Structure', 'How It Works (AU Context)': 'Pay portion of price from future business profits', 'Typical Amount': '20–40% of price', 'Cost / Rate': 'No interest', Pros: 'Reduces upfront cash; aligns price with performance', Cons: 'Risk if business underperforms; complex KPI setting' },
              { Option: '8. Equipment Finance (Chattel Mortgage)', 'How It Works (AU Context)': 'Finance specific plant/equipment as part of deal', 'Typical Amount': 'Value of equipment', 'Cost / Rate': '6–10% p.a.', Pros: 'Preserves cash; tax-deductible interest', Cons: 'Only for tangible assets; not goodwill' },
              { Option: '9. Invoice Finance / Debtor Finance', 'How It Works (AU Context)': 'Advance against debtors book (if included in purchase)', 'Typical Amount': 'Up to 80% of debtors', 'Cost / Rate': '1–3% per month', Pros: 'Immediate working capital; no property security', Cons: 'Ongoing cost; not suitable for all businesses' },
              { Option: '10. Franchise Finance', 'How It Works (AU Context)': 'Specialist finance for franchise resales', 'Typical Amount': 'Up to 80% LVR', 'Cost / Rate': '7–9% p.a.', Pros: 'Lender familiarity with franchise system', Cons: 'Only for franchise businesses' },
              { Option: '11. Government Grants / Incentives', 'How It Works (AU Context)': 'State/Federal grants for specific sectors or regions', 'Typical Amount': 'Varies', 'Cost / Rate': 'Free (non-repayable)', Pros: 'No repayment; reduces equity required', Cons: 'Competitive; specific criteria; slow' },
              { Option: '12. Combination / Creative Stack', 'How It Works (AU Context)': 'Combine 2–3 options above for optimal capital structure', 'Typical Amount': 'Varies', 'Cost / Rate': 'Blended rate', Pros: 'Minimises personal cash; optimises DSCR', Cons: 'Complex to structure; requires experienced advisor' },
            ]
          }
        ]
      },
      {
        id: 26,
        name: 'Expertise to Equity Terms Worksheet',
        corporateTranslation: 'Sweat Equity & Vesting Schedule',
        description: 'Framework for negotiating equity in a business in exchange for your strategic input and leadership — formalising the value of your corporate background.',
        phase: 'Phase 4: Execute',
        priority: 'High',
        auNote: 'Your operational expertise as a $300k–$800k executive is a highly valuable asset. This worksheet quantifies it and structures a formal equity arrangement.',
        sections: [
          {
            title: 'Section 1: Value of Your Expertise',
            type: 'table',
            columns: ['Expertise / Contribution', 'Market Value (AUD p.a.)', 'Duration', 'Total Value (AUD)', 'Notes'],
            rows: [
              { 'Expertise / Contribution': 'CEO / General Management (replacing external hire)', 'Market Value (AUD p.a.)': '$150,000–$300,000', Duration: '12 months', 'Total Value (AUD)': '$', Notes: 'Market rate for equivalent GM role' },
              { 'Expertise / Contribution': 'Sales & Business Development', 'Market Value (AUD p.a.)': '$100,000–$200,000', Duration: '12 months', 'Total Value (AUD)': '$', Notes: 'Commission-equivalent value' },
              { 'Expertise / Contribution': 'Financial Management / CFO Function', 'Market Value (AUD p.a.)': '$120,000–$250,000', Duration: '12 months', 'Total Value (AUD)': '$', Notes: 'Replacing external CFO or accountant' },
              { 'Expertise / Contribution': 'Technology / Digital Transformation', 'Market Value (AUD p.a.)': '$120,000–$200,000', Duration: '12 months', 'Total Value (AUD)': '$', Notes: 'Modernising systems' },
              { 'Expertise / Contribution': 'Industry Network / Customer Introductions', 'Market Value (AUD p.a.)': '$50,000–$200,000', Duration: '12 months', 'Total Value (AUD)': '$', Notes: 'Value of new business generated' },
              { 'Expertise / Contribution': 'TOTAL EXPERTISE VALUE (Year 1)', 'Market Value (AUD p.a.)': '', Duration: '', 'Total Value (AUD)': '$', Notes: 'Sum of above' },
            ]
          },
          {
            title: 'Section 2: Equity Negotiation Framework',
            type: 'table',
            columns: ['Parameter', 'Your Position', 'Agreed Terms', 'Notes'],
            rows: [
              { Parameter: 'Equity Percentage Sought', 'Your Position': '  % of business', 'Agreed Terms': '', Notes: 'Based on expertise value vs business value' },
              { Parameter: 'Vesting Schedule', 'Your Position': '4-year vest; 1-year cliff', 'Agreed Terms': '', Notes: 'Standard: 25% after year 1; 6.25%/quarter thereafter' },
              { Parameter: 'Performance KPIs for Vesting', 'Your Position': 'Revenue targets; EBITDA targets', 'Agreed Terms': '', Notes: 'Define clearly to avoid disputes' },
              { Parameter: 'Buy-Out Rights', 'Your Position': 'Right to buy remaining equity at agreed multiple', 'Agreed Terms': '', Notes: 'Define trigger events and price formula' },
              { Parameter: 'Dividend / Distribution Rights', 'Your Position': 'Pro-rata to equity stake', 'Agreed Terms': '', Notes: '' },
              { Parameter: 'Board / Management Rights', 'Your Position': 'Board seat; management authority', 'Agreed Terms': '', Notes: 'Define decision-making authority' },
            ]
          }
        ]
      },
      {
        id: 27,
        name: 'Seller Financing Avatar Checklist',
        corporateTranslation: 'Vendor Motivation Profiler',
        description: 'Profile the seller to determine their likelihood of accepting deferred payments — using your executive EQ to assess their post-sale plans and tax implications.',
        phase: 'Phase 4: Execute',
        priority: 'High',
        auNote: 'Seller finance is available in 30–50% of Australian SME deals. A retiring baby-boomer owner with CGT spread benefits is the ideal seller finance candidate.',
        sections: [
          {
            title: 'Section 1: Seller Profile Assessment',
            type: 'table',
            columns: ['Question', 'Seller\'s Response', 'Indicator', 'Score (1–5)'],
            rows: [
              { Question: 'How long have you owned the business?', 'Seller\'s Response': '', Indicator: '10+ years = higher trust in buyer', 'Score (1–5)': '' },
              { Question: 'What are your plans after the sale?', 'Seller\'s Response': '', Indicator: 'Retirement = patient; urgent need = less flexible', 'Score (1–5)': '' },
              { Question: 'Do you need all the cash at settlement?', 'Seller\'s Response': '', Indicator: 'No = open to seller finance', 'Score (1–5)': '' },
              { Question: 'What is your tax situation on the sale proceeds?', 'Seller\'s Response': '', Indicator: 'CGT spread over years = tax incentive for seller finance', 'Score (1–5)': '' },
              { Question: 'How important is it that the business succeeds after you sell?', 'Seller\'s Response': '', Indicator: 'Legacy-focused = more likely to support buyer', 'Score (1–5)': '' },
              { Question: 'Are you aware of the CGT discount on seller finance?', 'Seller\'s Response': '', Indicator: 'No = opportunity to educate; may increase openness', 'Score (1–5)': '' },
            ]
          },
          {
            title: 'Section 2: Seller Finance Proposal Template',
            type: 'table',
            columns: ['Field', 'Detail'],
            rows: [
              { Field: 'Total Purchase Price (AUD)', Detail: '$' },
              { Field: 'Bank Finance Amount (AUD)', Detail: '$ (  % of purchase price)' },
              { Field: 'Seller Finance Amount Proposed (AUD)', Detail: '$ (  % of purchase price)' },
              { Field: 'Interest Rate on Seller Finance', Detail: '  % per annum (suggest 5–7%)' },
              { Field: 'Repayment Period', Detail: '  years (suggest 3–5 years)' },
              { Field: 'Security Offered to Seller', Detail: 'Personal guarantee / charge over business assets / other' },
              { Field: 'CGT Benefit to Seller (if applicable)', Detail: 'Spread capital gain over repayment period — confirm with seller\'s tax advisor' },
            ]
          }
        ]
      }
    ]
  },
  {
    id: 9,
    title: 'Closing',
    subtitle: 'Settlement protocol & deal execution',
    icon: '🔐',
    phase: 'Phase 5: Support',
    color: '#C9A84C',
    tools: [
      {
        id: 28,
        name: 'Closing Checklist',
        corporateTranslation: 'Deal Execution & Settlement Protocol',
        description: 'Rigorous governance for the final days of a transaction — pre-settlement, settlement day, and post-settlement actions.',
        phase: 'Phase 5: Support',
        priority: 'Critical',
        auNote: 'Apex clients receive 60-day post-close support from the 120% team. ATO notification of ownership change must be completed within required timeframes.',
        sections: [
          {
            title: 'Pre-Settlement (1–2 Weeks Before)',
            type: 'checklist',
            items: [
              { item: 'All conditions precedent confirmed satisfied', detail: 'Solicitor confirmation in writing', auContext: '' },
              { item: 'Final finance approval received from Judo/NAB', detail: 'Written credit approval letter', auContext: '' },
              { item: 'Settlement statement prepared by solicitor', detail: 'Confirms final purchase price, adjustments, funds required', auContext: '' },
              { item: 'Final stocktake completed (if applicable)', detail: 'Independent stocktake; adjust price if material variance', auContext: '' },
              { item: 'All assets confirmed in seller\'s name (PPSR clear)', detail: 'Final PPSR search 48 hours before settlement', auContext: 'ppsr.gov.au' },
              { item: 'Lease assignment executed by landlord', detail: 'Written consent from landlord', auContext: '' },
              { item: 'All licences and permits confirmed transferable', detail: 'Regulatory authority confirmation', auContext: '' },
              { item: 'Key staff confirmed retained', detail: 'Written employment offer accepted by key staff', auContext: '' },
              { item: 'Insurance arranged from settlement date', detail: 'Public liability; workers comp; business interruption', auContext: '' },
              { item: 'Bank accounts set up in new entity name', detail: 'Business transaction account; payroll account', auContext: '' },
              { item: 'ABN / ACN registered (if new entity)', detail: 'ATO registration; may take 24–48 hours', auContext: 'business.gov.au' },
              { item: 'GST registration confirmed (if applicable)', detail: 'Required if turnover >$75k p.a.', auContext: 'ATO' },
              { item: 'Payroll system set up', detail: 'Xero Payroll / MYOB / Employment Hero', auContext: '' },
            ]
          },
          {
            title: 'Settlement Day',
            type: 'checklist',
            items: [
              { item: 'Funds transferred to solicitor trust account', detail: 'Confirm receipt with solicitor', auContext: '' },
              { item: 'APA / Share Sale Agreement executed by all parties', detail: 'Wet signatures or DocuSign', auContext: '' },
              { item: 'Balance of purchase price released to seller', detail: 'Solicitor instruction', auContext: '' },
              { item: 'Keys, access codes, and passwords transferred', detail: 'Physical handover', auContext: '' },
              { item: 'Domain and website access transferred', detail: 'Login credentials; DNS transfer', auContext: '' },
              { item: 'Social media account access transferred', detail: 'All platforms', auContext: '' },
              { item: 'Supplier accounts transferred to new owner', detail: 'Email/call all key suppliers', auContext: '' },
              { item: 'Customer notification plan executed', detail: 'Email / letter to all customers', auContext: '' },
              { item: 'Staff meeting held (Day 1)', detail: 'Introduce yourself; confirm employment continuity', auContext: '' },
              { item: 'Seller begins transition period', detail: 'Agreed handover schedule commences', auContext: '' },
            ]
          },
          {
            title: 'Post-Settlement (First 30 Days)',
            type: 'checklist',
            items: [
              { item: 'ATO notification of ownership change', detail: 'Business Portal; update ABN details', auContext: 'business.gov.au' },
              { item: 'ASIC notification (if share purchase)', detail: 'Update director/shareholder details', auContext: 'asic.gov.au' },
              { item: 'State revenue office notification (stamp duty)', detail: 'Pay stamp duty within required timeframe', auContext: 'Varies by state' },
              { item: 'Payroll set up and first pay run completed', detail: 'All staff paid correctly under Fair Work awards', auContext: 'fairwork.gov.au' },
              { item: 'Superannuation guarantee payments set up', detail: 'ATO SuperStream; quarterly payments', auContext: 'Super rate: 11.5% (2025)' },
              { item: 'Workers compensation policy in force', detail: 'State WorkCover authority', auContext: '' },
              { item: 'First BAS lodgement date confirmed', detail: 'ATO Business Portal', auContext: '' },
              { item: 'Accountant briefed and engaged', detail: 'Provide all financial records to date', auContext: '' },
              { item: '120% post-close support session booked (Apex)', detail: '60-day post-close support with 120% team', auContext: 'Apex tier only' },
            ]
          }
        ]
      }
    ]
  },
  {
    id: 10,
    title: 'Day Zero',
    subtitle: 'First 100 days as owner-operator',
    icon: '🚀',
    phase: 'Phase 5: Support',
    color: '#1B3A5C',
    tools: [
      {
        id: 29,
        name: 'Day Zero Checklist',
        corporateTranslation: 'First 100 Days Integration Plan',
        description: 'Day Zero of SME ownership is different from a corporate transition — there is no HR department or IT support desk. This checklist covers the immediate tactical priorities.',
        phase: 'Phase 5: Support',
        priority: 'Critical',
        auNote: 'Apex clients receive 60-day post-close support. ATO and ASIC notifications must be completed promptly. Fair Work obligations begin from Day 1.',
        sections: [
          {
            title: 'Day 1: Immediate Priorities',
            type: 'checklist',
            items: [
              { item: 'Hold all-staff meeting (introduce yourself)', detail: 'Confirm employment continuity; set tone; listen first', auContext: '' },
              { item: 'Secure all physical keys, access codes, alarm codes', detail: 'Safe, vehicle, premises, server room', auContext: '' },
              { item: 'Secure all digital access (email, accounting, POS, CRM)', detail: 'Change passwords; add 2FA; remove seller access', auContext: '' },
              { item: 'Confirm bank account access (business accounts)', detail: 'Ensure you are the authorised signatory', auContext: '' },
              { item: 'Review cash position and immediate liabilities', detail: 'Know your cash balance and what is due this week', auContext: '' },
              { item: 'Identify the most important customer relationship', detail: 'Call them personally to introduce yourself', auContext: '' },
              { item: 'Identify the most important staff member', detail: 'Have a private 1:1; understand their concerns', auContext: '' },
              { item: 'Confirm seller is available for transition support', detail: 'Agree on daily check-in schedule for first 2 weeks', auContext: '' },
            ]
          },
          {
            title: 'Week 1: Operational Foundation',
            type: 'checklist',
            items: [
              { item: 'Meet all staff individually (1:1 conversations)', detail: 'Listen; do not change anything yet', auContext: '' },
              { item: 'Review all open customer orders / jobs / projects', detail: 'Understand current commitments', auContext: '' },
              { item: 'Review all supplier accounts and payment terms', detail: 'Know what is owed and when', auContext: '' },
              { item: 'Review payroll and upcoming pay run', detail: 'Confirm all staff are paid correctly under Fair Work awards', auContext: 'fairwork.gov.au pay calculator' },
              { item: 'Review BAS / GST obligations', detail: 'Know next lodgement date and amount', auContext: 'ATO Business Portal' },
              { item: 'Identify the top 3 operational risks', detail: 'What could go wrong in the first 30 days?', auContext: '' },
              { item: 'Shadow the seller in all key activities', detail: 'Learn by doing; do not assume', auContext: '' },
            ]
          },
          {
            title: 'Month 1: Strategic Assessment',
            type: 'checklist',
            items: [
              { item: 'Complete a full P&L review (first month as owner)', detail: 'Compare to historical; identify variances', auContext: '' },
              { item: 'Identify quick wins (revenue or cost)', detail: 'What can you improve in 90 days?', auContext: '' },
              { item: 'Assess technology and systems', detail: 'What needs upgrading? What is working well?', auContext: '' },
              { item: 'Review pricing strategy', detail: 'Is there room to increase prices?', auContext: '' },
              { item: 'Identify key person dependencies', detail: 'Who is critical? What is the retention plan?', auContext: '' },
              { item: 'Build your 90-day plan', detail: '3 priorities; 3 metrics; 3 actions', auContext: '' },
              { item: 'Book 120% post-close support session (Apex)', detail: 'Review with 120% team; address issues', auContext: 'Apex tier: 60-day post-close support' },
              { item: 'Engage accountant for first month review', detail: 'Set up management reporting cadence', auContext: '' },
            ]
          }
        ]
      },
      {
        id: 30,
        name: 'Working Capital Needs Worksheet',
        corporateTranslation: 'Post-Acquisition Liquidity Forecast',
        description: 'Calculate the exact working capital required to operate the business in the critical first months — do not undercapitalise at closing.',
        phase: 'Phase 5: Support',
        priority: 'Critical',
        auNote: 'Undercapitalising at settlement is one of the most common mistakes in SME acquisition. Super rate is 11.5% (2025). Always maintain a minimum 3-month operating reserve.',
        sections: [
          {
            title: 'Section 1: Monthly Operating Expenses',
            type: 'table',
            columns: ['Expense Category', 'Monthly Amount (AUD)', 'Annual Amount (AUD)', 'Notes'],
            rows: [
              { 'Expense Category': 'Payroll (all staff, incl. super)', 'Monthly Amount (AUD)': '$', 'Annual Amount (AUD)': '$', Notes: 'Super = 11.5% of gross wages (2025 rate)' },
              { 'Expense Category': 'Rent / Lease Payments', 'Monthly Amount (AUD)': '$', 'Annual Amount (AUD)': '$', Notes: 'Monthly lease obligation' },
              { 'Expense Category': 'Utilities (electricity, gas, water, internet)', 'Monthly Amount (AUD)': '$', 'Annual Amount (AUD)': '$', Notes: '' },
              { 'Expense Category': 'Insurance (public liability, workers comp, etc.)', 'Monthly Amount (AUD)': '$', 'Annual Amount (AUD)': '$', Notes: 'Monthly equivalent of annual premium' },
              { 'Expense Category': 'Loan Repayments (bank + seller finance)', 'Monthly Amount (AUD)': '$', 'Annual Amount (AUD)': '$', Notes: 'Principal + interest' },
              { 'Expense Category': 'Accounting / Bookkeeping', 'Monthly Amount (AUD)': '$', 'Annual Amount (AUD)': '$', Notes: 'Monthly retainer' },
              { 'Expense Category': 'Marketing / Advertising', 'Monthly Amount (AUD)': '$', 'Annual Amount (AUD)': '$', Notes: '' },
              { 'Expense Category': 'IT / Software Subscriptions', 'Monthly Amount (AUD)': '$', 'Annual Amount (AUD)': '$', Notes: 'Xero, Office 365, POS, CRM' },
              { 'Expense Category': 'Supplier / COGS Payments', 'Monthly Amount (AUD)': '$', 'Annual Amount (AUD)': '$', Notes: 'Cost of goods sold / materials' },
              { 'Expense Category': 'Other Operating Expenses', 'Monthly Amount (AUD)': '$', 'Annual Amount (AUD)': '$', Notes: '' },
              { 'Expense Category': 'TOTAL MONTHLY OPERATING EXPENSES', 'Monthly Amount (AUD)': '$', 'Annual Amount (AUD)': '$', Notes: '' },
            ]
          },
          {
            title: 'Section 2: Working Capital Requirement',
            type: 'table',
            columns: ['Item', 'Calculation', 'Amount (AUD)', 'Notes'],
            rows: [
              { Item: 'Minimum Working Capital (3 months)', Calculation: 'Total Monthly Expenses x 3', 'Amount (AUD)': '$', Notes: 'Absolute minimum; 6 months preferred' },
              { Item: 'Recommended Working Capital (6 months)', Calculation: 'Total Monthly Expenses x 6', 'Amount (AUD)': '$', Notes: 'Recommended for first-time acquirers' },
              { Item: 'Debtors Collection Gap', Calculation: 'Avg debtor days x (Annual Revenue / 365)', 'Amount (AUD)': '$', Notes: 'Cash tied up in debtors during transition' },
              { Item: 'Contingency Reserve (10% of purchase price)', Calculation: 'Purchase Price x 10%', 'Amount (AUD)': '$', Notes: 'Unexpected costs in first 6 months' },
              { Item: 'TOTAL WORKING CAPITAL REQUIRED', Calculation: 'Sum of above', 'Amount (AUD)': '$', Notes: 'Have this AVAILABLE at settlement' },
              { Item: 'Working Capital Available (personal funds)', Calculation: 'Cash available after deposit', 'Amount (AUD)': '$', Notes: '' },
              { Item: 'Working Capital SHORTFALL / SURPLUS', Calculation: 'Available - Required', 'Amount (AUD)': '$', Notes: 'Positive = safe; Negative = problem' },
            ]
          },
          {
            title: 'Section 3: Cash Flow Forecast (Months 1-6)',
            type: 'table',
            columns: ['Item', 'Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'],
            rows: [
              { Item: 'Opening Cash Balance', 'Month 1': '$', 'Month 2': '$', 'Month 3': '$', 'Month 4': '$', 'Month 5': '$', 'Month 6': '$' },
              { Item: 'Revenue (Forecast)', 'Month 1': '$', 'Month 2': '$', 'Month 3': '$', 'Month 4': '$', 'Month 5': '$', 'Month 6': '$' },
              { Item: 'Total Expenses', 'Month 1': '$', 'Month 2': '$', 'Month 3': '$', 'Month 4': '$', 'Month 5': '$', 'Month 6': '$' },
              { Item: 'Loan Repayments', 'Month 1': '$', 'Month 2': '$', 'Month 3': '$', 'Month 4': '$', 'Month 5': '$', 'Month 6': '$' },
              { Item: 'Net Cash Flow', 'Month 1': '$', 'Month 2': '$', 'Month 3': '$', 'Month 4': '$', 'Month 5': '$', 'Month 6': '$' },
              { Item: 'Closing Cash Balance', 'Month 1': '$', 'Month 2': '$', 'Month 3': '$', 'Month 4': '$', 'Month 5': '$', 'Month 6': '$' },
            ]
          }
        ]
      }
    ]
  }
];

export const totalTools = units.reduce((sum, u) => sum + u.tools.length, 0);
export const phaseColors: Record<Phase, string> = {
  'Phase 1: Diagnose & Profile': '#C9A84C',
  'Phase 2: Clarify Direction': '#2A5F8F',
  'Phase 3: Market Readiness': '#1E4A72',
  'Phase 4: Execute': '#9A7A30',
  'Phase 5: Support': '#1B3A5C',
};
