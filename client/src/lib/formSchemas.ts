// Form schemas for all 30 tools — each tool defines its fillable sections
// Every field has a unique key (used for localStorage), label, type, and optional helper text

export type FieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'currency'
  | 'select'
  | 'date'
  | 'percentage'
  | 'email'
  | 'phone'
  | 'url'
  | 'calculated';

export interface FormField {
  key: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  helper?: string;
  options?: string[];       // for select fields
  calcFrom?: string[];      // keys of fields to sum/calculate from
  calcType?: 'sum' | 'subtract' | 'multiply' | 'dscr';
  prefix?: string;          // e.g. '$' or '%'
  required?: boolean;
}

export interface FormSection {
  title: string;
  description?: string;
  fields: FormField[];
}

export interface ToolFormSchema {
  toolId: number;
  sections: FormSection[];
}

export const formSchemas: ToolFormSchema[] = [

  // ─── TOOL 1: Action Steps Checklist ─────────────────────────────────────────
  {
    toolId: 1,
    sections: [
      {
        title: 'Client Information',
        fields: [
          { key: 't1_client_name', label: 'Client Full Name', type: 'text', placeholder: 'e.g. Jane Smith', required: true },
          { key: 't1_client_email', label: 'Client Email', type: 'email', placeholder: 'jane.smith@email.com' },
          { key: 't1_client_phone', label: 'Client Mobile', type: 'phone', placeholder: '04XX XXX XXX' },
          { key: 't1_program_tier', label: '120% Program Tier Selected', type: 'select', options: ['Core ($9,500 ex GST)', 'Signature ($15,500 ex GST)', 'Apex ($24,500 ex GST)'] },
          { key: 't1_start_date', label: 'Program Start Date', type: 'date' },
          { key: 't1_advisor', label: 'Assigned 120% Advisor', type: 'text', placeholder: 'e.g. David Short' },
        ]
      },
      {
        title: 'Phase 1: Diagnose & Profile (Weeks 1–4)',
        description: 'Tick off each milestone as completed. Record completion dates and notes.',
        fields: [
          { key: 't1_p1_milo', label: 'Milo Wilkinson Behavioural Profile Completed', type: 'select', options: ['Not Started', 'Booked', 'Completed'], helper: 'Confirms owner-operator fit; shapes all 3 pathways' },
          { key: 't1_p1_milo_date', label: 'Milo Profile Date', type: 'date' },
          { key: 't1_p1_milo_notes', label: 'Milo Profile Key Findings', type: 'textarea', placeholder: 'Summarise key behavioural insights and recommended pathway...' },
          { key: 't1_p1_offering', label: 'Offering Pack Reviewed & Tier Selected', type: 'select', options: ['Not Started', 'In Review', 'Completed'] },
          { key: 't1_p1_self_reflect', label: 'Self-Reflection Worksheet (Tool 3) Completed', type: 'select', options: ['Not Started', 'In Progress', 'Completed'] },
          { key: 't1_p1_bank_docs', label: 'Financial Documents Submitted to Judo/NAB', type: 'select', options: ['Not Started', 'Gathering Docs', 'Submitted', 'Approved'], helper: '2 yrs tax returns, super balance, personal balance sheet' },
          { key: 't1_p1_bank_notes', label: 'Bank Capacity Screen Notes', type: 'textarea', placeholder: 'Pre-approval amount, DSCR result, conditions...' },
          { key: 't1_p1_suitability', label: 'Suitability Conversation with David Short Completed', type: 'select', options: ['Not Started', 'Booked', 'Completed'] },
          { key: 't1_p1_deal_library', label: 'Exemplar AU Deal Library Reviewed', type: 'select', options: ['Not Started', 'In Progress', 'Completed'], helper: 'Comparable.com.au benchmarks — 2–4x EBITDA typical' },
        ]
      },
      {
        title: 'Phase 2: Clarify Direction (Weeks 5–8)',
        fields: [
          { key: 't1_p2_deal_box', label: 'Deal Box Criteria Defined (Tool 7)', type: 'select', options: ['Not Started', 'Draft', 'Finalised'] },
          { key: 't1_p2_sectors', label: 'Target Sectors Shortlisted (Tool 6)', type: 'select', options: ['Not Started', 'In Progress', 'Finalised'] },
          { key: 't1_p2_genius', label: 'Zone of Genius Mapped (Tool 4)', type: 'select', options: ['Not Started', 'In Progress', 'Completed'] },
          { key: 't1_p2_finance_model', label: 'Personal Finance Model Built (Tool 5)', type: 'select', options: ['Not Started', 'In Progress', 'Completed'] },
          { key: 't1_p2_notes', label: 'Phase 2 Notes', type: 'textarea', placeholder: 'Key decisions, blockers, next actions...' },
        ]
      },
      {
        title: 'Phase 3: Market Readiness (Weeks 9–16)',
        fields: [
          { key: 't1_p3_crm', label: 'Deal Sourcing CRM Set Up (Tool 10)', type: 'select', options: ['Not Started', 'In Progress', 'Active'] },
          { key: 't1_p3_brokers', label: 'Broker Relationships Established (Tool 9)', type: 'select', options: ['Not Started', 'Contacted', 'Active'] },
          { key: 't1_p3_outreach', label: 'Outreach Scripts Personalised (Tools 11–13)', type: 'select', options: ['Not Started', 'Drafted', 'Active'] },
          { key: 't1_p3_nda', label: 'NDA Template Reviewed with Solicitor (Tool 14)', type: 'select', options: ['Not Started', 'In Review', 'Approved'] },
          { key: 't1_p3_deals_reviewed', label: 'Number of Deals Reviewed to Date', type: 'number', placeholder: '0', helper: 'Target: 20+ reviewed before making first offer' },
          { key: 't1_p3_notes', label: 'Phase 3 Notes', type: 'textarea', placeholder: 'Pipeline status, broker feedback, deal quality...' },
        ]
      },
      {
        title: 'Phase 4: Execute (Weeks 17–26)',
        fields: [
          { key: 't1_p4_offers_made', label: 'Number of Offers / LOIs Submitted', type: 'number', placeholder: '0' },
          { key: 't1_p4_dd_commenced', label: 'Due Diligence Commenced (Tool 24)', type: 'select', options: ['Not Started', 'In Progress', 'Completed'] },
          { key: 't1_p4_finance_approved', label: 'Finance Formally Approved', type: 'select', options: ['Not Started', 'Conditional', 'Unconditional'] },
          { key: 't1_p4_settlement', label: 'Settlement Date', type: 'date' },
          { key: 't1_p4_notes', label: 'Phase 4 Notes', type: 'textarea', placeholder: 'Deal status, conditions, key dates...' },
        ]
      },
      {
        title: 'Phase 5: Day Zero & Beyond',
        fields: [
          { key: 't1_p5_100days', label: 'First 100 Days Plan Activated (Tool 29)', type: 'select', options: ['Not Started', 'In Progress', 'Active'] },
          { key: 't1_p5_working_capital', label: 'Working Capital Forecast Completed (Tool 30)', type: 'select', options: ['Not Started', 'In Progress', 'Completed'] },
          { key: 't1_p5_notes', label: 'Post-Acquisition Notes', type: 'textarea', placeholder: 'Key wins, challenges, support needed...' },
        ]
      },
    ]
  },

  // ─── TOOL 2: Deal Lifecycle Map ──────────────────────────────────────────────
  {
    toolId: 2,
    sections: [
      {
        title: 'Client & Deal Overview',
        fields: [
          { key: 't2_client', label: 'Client Name', type: 'text', placeholder: 'Full name', required: true },
          { key: 't2_target_business', label: 'Target Business Name (if known)', type: 'text', placeholder: 'e.g. ABC Plumbing Pty Ltd' },
          { key: 't2_target_abn', label: 'Target ABN', type: 'text', placeholder: '12 345 678 901' },
          { key: 't2_current_stage', label: 'Current Deal Stage', type: 'select', options: ['1. Sourcing', '2. Initial Review', '3. NDA Signed', '4. Deep Evaluation', '5. Offer / LOI', '6. Due Diligence', '7. Finance', '8. Contracts', '9. Settlement', '10. Day Zero'] },
          { key: 't2_target_close', label: 'Target Close Date', type: 'date' },
        ]
      },
      {
        title: 'Stage 1–3: Sourcing to NDA',
        fields: [
          { key: 't2_s1_source', label: 'How was this deal sourced?', type: 'select', options: ['Business broker (LINK/Finn/Benchmark)', 'Direct outreach', 'Accountant referral', 'Solicitor referral', 'Online listing (BizBuySell/Seek Business)', 'Network/personal contact', 'Other'] },
          { key: 't2_s1_source_other', label: 'Source Detail / Broker Name', type: 'text', placeholder: 'e.g. John Smith at LINK Business' },
          { key: 't2_s1_listing_price', label: 'Asking Price (AUD)', type: 'currency', placeholder: '0', prefix: '$' },
          { key: 't2_s1_revenue', label: 'Stated Annual Revenue (AUD)', type: 'currency', placeholder: '0', prefix: '$' },
          { key: 't2_s1_ebitda', label: 'Stated EBITDA (AUD)', type: 'currency', placeholder: '0', prefix: '$' },
          { key: 't2_s1_multiple', label: 'Implied EBITDA Multiple (x)', type: 'number', placeholder: '0.0', helper: 'Asking Price ÷ EBITDA — AU SME typical range: 2–4x' },
          { key: 't2_s1_nda_date', label: 'NDA Signed Date', type: 'date' },
          { key: 't2_s1_nda_notes', label: 'NDA Notes / Conditions', type: 'textarea', placeholder: 'Any unusual NDA terms, exclusivity clauses...' },
        ]
      },
      {
        title: 'Stage 4–5: Evaluation & Offer',
        fields: [
          { key: 't2_s4_go_nogo', label: 'Go / No-Go Decision', type: 'select', options: ['Go — proceeding', 'Conditional Go — pending info', 'No-Go — exiting deal', 'On Hold'] },
          { key: 't2_s4_reason', label: 'Decision Rationale', type: 'textarea', placeholder: 'Key reasons for Go/No-Go decision...' },
          { key: 't2_s5_offer_price', label: 'Offer Price Submitted (AUD)', type: 'currency', placeholder: '0', prefix: '$' },
          { key: 't2_s5_offer_structure', label: 'Offer Structure', type: 'select', options: ['100% cash at settlement', 'Cash + seller finance', 'Cash + earn-out', 'Cash + seller finance + earn-out', 'Equity roll + cash', 'Other'] },
          { key: 't2_s5_loi_date', label: 'LOI Submitted Date', type: 'date' },
          { key: 't2_s5_loi_accepted', label: 'LOI Accepted?', type: 'select', options: ['Pending', 'Accepted', 'Counter-offered', 'Rejected'] },
          { key: 't2_s5_counter', label: 'Counter-Offer Details (if applicable)', type: 'textarea', placeholder: 'Counter price, structure changes, conditions...' },
        ]
      },
      {
        title: 'Stage 6–7: Due Diligence & Finance',
        fields: [
          { key: 't2_s6_dd_start', label: 'Due Diligence Start Date', type: 'date' },
          { key: 't2_s6_dd_end', label: 'Due Diligence End Date', type: 'date' },
          { key: 't2_s6_solicitor', label: 'Solicitor Engaged', type: 'text', placeholder: 'Firm name and contact' },
          { key: 't2_s6_accountant', label: 'Accountant / QoE Advisor Engaged', type: 'text', placeholder: 'Firm name and contact' },
          { key: 't2_s6_major_flags', label: 'Major DD Flags / Issues Found', type: 'textarea', placeholder: 'List any red flags, adjustments required, risks identified...' },
          { key: 't2_s7_lender', label: 'Finance Lender', type: 'select', options: ['Judo Bank', 'NAB', 'ANZ', 'CBA', 'Westpac', 'Macquarie', 'Non-bank lender', 'Seller finance only', 'Self-funded (SMSF)', 'Other'] },
          { key: 't2_s7_loan_amount', label: 'Loan Amount Approved (AUD)', type: 'currency', placeholder: '0', prefix: '$' },
          { key: 't2_s7_dscr', label: 'DSCR (Debt Service Coverage Ratio)', type: 'number', placeholder: '0.00', helper: 'Judo Bank minimum: 1.25x. EBITDA ÷ Annual Debt Service' },
          { key: 't2_s7_finance_conditions', label: 'Finance Conditions / Special Terms', type: 'textarea', placeholder: 'Any conditions on approval, personal guarantees, security...' },
        ]
      },
      {
        title: 'Stage 8–10: Contracts, Settlement & Day Zero',
        fields: [
          { key: 't2_s8_apa_date', label: 'Asset Purchase Agreement Signed Date', type: 'date' },
          { key: 't2_s8_settlement_date', label: 'Settlement Date', type: 'date' },
          { key: 't2_s8_final_price', label: 'Final Agreed Purchase Price (AUD)', type: 'currency', placeholder: '0', prefix: '$' },
          { key: 't2_s8_adjustments', label: 'Settlement Adjustments (AUD)', type: 'currency', placeholder: '0', helper: 'Working capital, stock, prepaid expenses, etc.' },
          { key: 't2_s9_day_zero', label: 'Day Zero Date (First Day of Ownership)', type: 'date' },
          { key: 't2_s9_key_wins', label: 'Key Wins / Lessons from This Deal', type: 'textarea', placeholder: 'What worked well, what would you do differently...' },
        ]
      },
    ]
  },

  // ─── TOOL 3: Acquisition Self-Reflection Worksheet ──────────────────────────
  {
    toolId: 3,
    sections: [
      {
        title: 'Client Details',
        fields: [
          { key: 't3_client', label: 'Client Name', type: 'text', required: true },
          { key: 't3_date', label: 'Date Completed', type: 'date' },
          { key: 't3_advisor', label: 'Advisor / Coach', type: 'text' },
        ]
      },
      {
        title: 'Career & Identity',
        description: 'These questions help identify whether the client is ready to transition from employee to owner-operator.',
        fields: [
          { key: 't3_career_years', label: 'Years in Corporate / Executive Role', type: 'number', placeholder: '0' },
          { key: 't3_last_role', label: 'Last Corporate Role / Title', type: 'text', placeholder: 'e.g. CFO, National Sales Director' },
          { key: 't3_last_salary', label: 'Last Annual Package (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't3_redundancy_date', label: 'Date of Redundancy / Departure', type: 'date' },
          { key: 't3_identity', label: 'How much of your identity is tied to your corporate title?', type: 'select', options: ['Very little — I am ready to move on', 'Somewhat — I still value the status', 'Significantly — this is a real challenge for me', 'Completely — this is my biggest fear'] },
          { key: 't3_identity_notes', label: 'Explain your relationship with your corporate identity', type: 'textarea', placeholder: 'How do you feel about no longer having a title, a team, or a corporate brand behind you?' },
        ]
      },
      {
        title: 'Motivation & Purpose',
        fields: [
          { key: 't3_why', label: 'Why do you want to own a business?', type: 'textarea', placeholder: 'Be honest — is it financial freedom, legacy, control, fear of re-employment, or something else?' },
          { key: 't3_lifestyle', label: 'What does your ideal lifestyle look like in 3 years?', type: 'textarea', placeholder: 'Hours worked, income, travel, family time, location...' },
          { key: 't3_non_negotiables', label: 'What are your absolute non-negotiables in a business?', type: 'textarea', placeholder: 'e.g. No retail, no hospitality, must be B2B, must be within 30 mins of home...' },
          { key: 't3_fear', label: 'What is your biggest fear about buying a business?', type: 'textarea', placeholder: 'Be specific — failure, debt, staff management, unknown unknowns...' },
          { key: 't3_fear_mitigation', label: 'How will you mitigate that fear?', type: 'textarea', placeholder: 'What support, structures, or safeguards will you put in place?' },
        ]
      },
      {
        title: 'Readiness Assessment',
        fields: [
          { key: 't3_operator', label: 'Are you ready to be an operator (not just an investor)?', type: 'select', options: ['Yes — I want to be hands-on from Day 1', 'Mostly — I will hire a GM within 12 months', 'Unsure — I need to think about this more', 'No — I want a passive investment (wrong program)'] },
          { key: 't3_risk_tolerance', label: 'Risk Tolerance Level', type: 'select', options: ['Conservative — I need high certainty', 'Moderate — I can tolerate some uncertainty', 'Aggressive — I am comfortable with significant risk'] },
          { key: 't3_timeline', label: 'Target Timeline to Complete Acquisition', type: 'select', options: ['3–6 months', '6–12 months', '12–18 months', '18+ months'] },
          { key: 't3_support', label: 'Who is your support network?', type: 'textarea', placeholder: 'Spouse/partner views, family support, financial advisors, mentors...' },
          { key: 't3_partner_aligned', label: 'Is your partner / family fully aligned with this decision?', type: 'select', options: ['Yes — fully supportive', 'Mostly — some reservations', 'No — this is a significant tension point'] },
          { key: 't3_readiness_score', label: 'Self-Rated Readiness Score (1–10)', type: 'number', placeholder: '7', helper: '1 = Not ready at all, 10 = Fully ready to proceed today' },
          { key: 't3_advisor_notes', label: 'Advisor Assessment Notes', type: 'textarea', placeholder: 'Advisor observations, recommended next steps, concerns to address...' },
        ]
      },
    ]
  },

  // ─── TOOL 4: Zone of Genius Identifier ──────────────────────────────────────
  {
    toolId: 4,
    sections: [
      {
        title: 'Client Details',
        fields: [
          { key: 't4_client', label: 'Client Name', type: 'text', required: true },
          { key: 't4_date', label: 'Date', type: 'date' },
        ]
      },
      {
        title: 'Core Competencies (What You Are Exceptional At)',
        description: 'List the skills and capabilities where you consistently outperform peers and feel energised.',
        fields: [
          { key: 't4_competency_1', label: 'Core Competency 1', type: 'text', placeholder: 'e.g. Building and leading high-performance sales teams' },
          { key: 't4_competency_1_evidence', label: 'Evidence / Proof Point', type: 'textarea', placeholder: 'Specific achievement that demonstrates this competency...' },
          { key: 't4_competency_2', label: 'Core Competency 2', type: 'text', placeholder: 'e.g. P&L management and financial discipline' },
          { key: 't4_competency_2_evidence', label: 'Evidence / Proof Point', type: 'textarea', placeholder: 'Specific achievement...' },
          { key: 't4_competency_3', label: 'Core Competency 3', type: 'text', placeholder: 'e.g. Client relationship management and retention' },
          { key: 't4_competency_3_evidence', label: 'Evidence / Proof Point', type: 'textarea', placeholder: 'Specific achievement...' },
          { key: 't4_competency_4', label: 'Core Competency 4 (optional)', type: 'text', placeholder: 'e.g. Operational systems and process improvement' },
          { key: 't4_competency_5', label: 'Core Competency 5 (optional)', type: 'text', placeholder: 'e.g. Strategic partnerships and M&A integration' },
        ]
      },
      {
        title: 'Energy Audit (What Energises vs Drains You)',
        fields: [
          { key: 't4_energises', label: 'Activities that energise you (do more of these)', type: 'textarea', placeholder: 'e.g. Coaching staff, closing deals, strategic planning, customer presentations...' },
          { key: 't4_drains', label: 'Activities that drain you (avoid or delegate these)', type: 'textarea', placeholder: 'e.g. Admin, compliance paperwork, IT troubleshooting, manual data entry...' },
          { key: 't4_genius_statement', label: 'Your Zone of Genius Statement', type: 'textarea', placeholder: 'I am at my best when I am... [complete this sentence with specificity]' },
        ]
      },
      {
        title: 'Business Type Fit',
        description: 'Based on your Zone of Genius, what type of business is the best fit?',
        fields: [
          { key: 't4_best_fit_sector', label: 'Best-Fit Sector(s)', type: 'textarea', placeholder: 'e.g. B2B services, professional services, trade services, manufacturing...' },
          { key: 't4_best_fit_size', label: 'Ideal Business Size (Revenue)', type: 'select', options: ['$500K–$1M', '$1M–$2M', '$2M–$5M', '$5M–$10M', '$10M+'] },
          { key: 't4_best_fit_team', label: 'Ideal Team Size', type: 'select', options: ['1–5 staff', '6–15 staff', '16–30 staff', '31–50 staff', '50+ staff'] },
          { key: 't4_avoid', label: 'Business Types to Avoid (and why)', type: 'textarea', placeholder: 'e.g. Retail — requires weekend work and I have young children. Hospitality — margins too thin...' },
          { key: 't4_transferable', label: 'How does your corporate expertise transfer to SME ownership?', type: 'textarea', placeholder: 'Specifically, what will you bring to a business that a typical SME owner does not have?' },
        ]
      },
    ]
  },

  // ─── TOOL 5: Deal Clarity Worksheet ─────────────────────────────────────────
  {
    toolId: 5,
    sections: [
      {
        title: 'Client & Financial Capacity',
        fields: [
          { key: 't5_client', label: 'Client Name', type: 'text', required: true },
          { key: 't5_date', label: 'Date', type: 'date' },
          { key: 't5_liquid_cash', label: 'Available Liquid Cash / Equity (AUD)', type: 'currency', prefix: '$', placeholder: '0', helper: 'Cash savings, investment accounts, home equity accessible' },
          { key: 't5_super_balance', label: 'Superannuation Balance (AUD)', type: 'currency', prefix: '$', placeholder: '0', helper: 'SMSF may be usable for business acquisition — seek SMSF advice' },
          { key: 't5_bank_preapproval', label: 'Judo/NAB Pre-Approval Amount (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't5_seller_finance', label: 'Potential Seller Finance (AUD)', type: 'currency', prefix: '$', placeholder: '0', helper: 'Typically 10–30% of purchase price held by vendor' },
          { key: 't5_total_capacity', label: 'Total Acquisition Capacity (AUD)', type: 'currency', prefix: '$', placeholder: '0', helper: 'Sum of all above — this is your maximum deal size' },
        ]
      },
      {
        title: 'Deal Parameters',
        fields: [
          { key: 't5_min_revenue', label: 'Minimum Target Revenue (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't5_max_revenue', label: 'Maximum Target Revenue (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't5_min_ebitda', label: 'Minimum Target EBITDA (AUD)', type: 'currency', prefix: '$', placeholder: '0', helper: 'Must cover debt service + your salary + buffer' },
          { key: 't5_max_multiple', label: 'Maximum EBITDA Multiple You Will Pay (x)', type: 'number', placeholder: '3.5', helper: 'AU SME typical: 2–4x. Premium businesses 4–6x.' },
          { key: 't5_max_price', label: 'Maximum Purchase Price (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't5_target_salary', label: 'Target Owner Salary from Day 1 (AUD)', type: 'currency', prefix: '$', placeholder: '0', helper: 'What you need to draw to cover personal expenses' },
          { key: 't5_dscr_calc', label: 'Estimated DSCR at Target Deal Size', type: 'number', placeholder: '0.00', helper: 'EBITDA ÷ Annual Debt Service. Judo Bank minimum: 1.25x' },
        ]
      },
      {
        title: 'Sector & Geography Preferences',
        fields: [
          { key: 't5_preferred_sectors', label: 'Preferred Sectors (Top 3)', type: 'textarea', placeholder: 'e.g. 1. B2B trade services\n2. Professional services\n3. Healthcare services' },
          { key: 't5_excluded_sectors', label: 'Sectors to Exclude (and reason)', type: 'textarea', placeholder: 'e.g. Retail — lifestyle mismatch. Hospitality — margin risk.' },
          { key: 't5_geography', label: 'Preferred Geography', type: 'select', options: ['Sydney Metro', 'Melbourne Metro', 'Brisbane Metro', 'Perth Metro', 'Adelaide Metro', 'Regional NSW', 'Regional VIC', 'Regional QLD', 'National (open to any state)', 'Other'] },
          { key: 't5_geography_notes', label: 'Geography Notes / Flexibility', type: 'text', placeholder: 'e.g. Prefer within 45 mins of CBD, open to regional if right deal' },
        ]
      },
      {
        title: 'Business Quality Criteria',
        fields: [
          { key: 't5_recurring_revenue', label: 'Minimum % Recurring / Contracted Revenue', type: 'percentage', placeholder: '0', helper: 'Higher recurring revenue = lower risk. Target 40%+' },
          { key: 't5_customer_concentration', label: 'Maximum Single Customer Concentration (%)', type: 'percentage', placeholder: '30', helper: 'No single customer should represent more than 30% of revenue' },
          { key: 't5_staff_count_min', label: 'Minimum Staff Count', type: 'number', placeholder: '3' },
          { key: 't5_staff_count_max', label: 'Maximum Staff Count', type: 'number', placeholder: '50' },
          { key: 't5_owner_dependency', label: 'Maximum Acceptable Owner Dependency', type: 'select', options: ['Low — business runs without owner (ideal)', 'Medium — owner involved but replaceable', 'High — acceptable if price reflects risk'] },
          { key: 't5_years_trading', label: 'Minimum Years in Business', type: 'number', placeholder: '5', helper: 'Prefer 5+ years of trading history for AU SME acquisition' },
          { key: 't5_other_criteria', label: 'Other Must-Have Criteria', type: 'textarea', placeholder: 'e.g. Must have Xero/MYOB, must have documented SOPs, must have transferable contracts...' },
        ]
      },
    ]
  },

  // ─── TOOL 6: Industry Selector ───────────────────────────────────────────────
  {
    toolId: 6,
    sections: [
      {
        title: 'Client Details',
        fields: [
          { key: 't6_client', label: 'Client Name', type: 'text', required: true },
          { key: 't6_date', label: 'Date', type: 'date' },
        ]
      },
      {
        title: 'Sector Scoring Matrix',
        description: 'Score each sector 1–5 across four dimensions. Higher = better fit.',
        fields: [
          { key: 't6_sector1_name', label: 'Sector 1 Name', type: 'text', placeholder: 'e.g. B2B Trade Services' },
          { key: 't6_sector1_fit', label: 'Sector 1 — Skills Fit (1–5)', type: 'number', placeholder: '0' },
          { key: 't6_sector1_market', label: 'Sector 1 — Market Tailwinds (1–5)', type: 'number', placeholder: '0' },
          { key: 't6_sector1_margin', label: 'Sector 1 — Margin Profile (1–5)', type: 'number', placeholder: '0' },
          { key: 't6_sector1_lifestyle', label: 'Sector 1 — Lifestyle Fit (1–5)', type: 'number', placeholder: '0' },
          { key: 't6_sector1_notes', label: 'Sector 1 — Notes', type: 'text', placeholder: 'Key reasons for/against...' },

          { key: 't6_sector2_name', label: 'Sector 2 Name', type: 'text', placeholder: 'e.g. Professional Services' },
          { key: 't6_sector2_fit', label: 'Sector 2 — Skills Fit (1–5)', type: 'number', placeholder: '0' },
          { key: 't6_sector2_market', label: 'Sector 2 — Market Tailwinds (1–5)', type: 'number', placeholder: '0' },
          { key: 't6_sector2_margin', label: 'Sector 2 — Margin Profile (1–5)', type: 'number', placeholder: '0' },
          { key: 't6_sector2_lifestyle', label: 'Sector 2 — Lifestyle Fit (1–5)', type: 'number', placeholder: '0' },
          { key: 't6_sector2_notes', label: 'Sector 2 — Notes', type: 'text', placeholder: 'Key reasons for/against...' },

          { key: 't6_sector3_name', label: 'Sector 3 Name', type: 'text', placeholder: 'e.g. Healthcare Services' },
          { key: 't6_sector3_fit', label: 'Sector 3 — Skills Fit (1–5)', type: 'number', placeholder: '0' },
          { key: 't6_sector3_market', label: 'Sector 3 — Market Tailwinds (1–5)', type: 'number', placeholder: '0' },
          { key: 't6_sector3_margin', label: 'Sector 3 — Margin Profile (1–5)', type: 'number', placeholder: '0' },
          { key: 't6_sector3_lifestyle', label: 'Sector 3 — Lifestyle Fit (1–5)', type: 'number', placeholder: '0' },
          { key: 't6_sector3_notes', label: 'Sector 3 — Notes', type: 'text', placeholder: 'Key reasons for/against...' },

          { key: 't6_sector4_name', label: 'Sector 4 Name (optional)', type: 'text', placeholder: 'e.g. Aged Care / NDIS Services' },
          { key: 't6_sector4_fit', label: 'Sector 4 — Skills Fit (1–5)', type: 'number', placeholder: '0' },
          { key: 't6_sector4_market', label: 'Sector 4 — Market Tailwinds (1–5)', type: 'number', placeholder: '0' },
          { key: 't6_sector4_margin', label: 'Sector 4 — Margin Profile (1–5)', type: 'number', placeholder: '0' },
          { key: 't6_sector4_lifestyle', label: 'Sector 4 — Lifestyle Fit (1–5)', type: 'number', placeholder: '0' },
        ]
      },
      {
        title: 'Final Sector Ranking & Decision',
        fields: [
          { key: 't6_rank1', label: '#1 Ranked Sector (Primary Focus)', type: 'text', placeholder: 'Sector name' },
          { key: 't6_rank2', label: '#2 Ranked Sector (Secondary)', type: 'text', placeholder: 'Sector name' },
          { key: 't6_rank3', label: '#3 Ranked Sector (Opportunistic)', type: 'text', placeholder: 'Sector name' },
          { key: 't6_avoid', label: 'Sectors Explicitly Excluded (and why)', type: 'textarea', placeholder: 'e.g. Retail — lifestyle mismatch. Hospitality — margin risk. Mining — too capital intensive.' },
          { key: 't6_ibisworld_notes', label: 'IBISWorld / ABS Research Notes', type: 'textarea', placeholder: 'Key market data, growth rates, industry risks from IBISWorld research...' },
        ]
      },
    ]
  },

  // ─── TOOL 7: Personalised Deal Box ──────────────────────────────────────────
  {
    toolId: 7,
    sections: [
      {
        title: 'Client & Deal Box Summary',
        fields: [
          { key: 't7_client', label: 'Client Name', type: 'text', required: true },
          { key: 't7_date', label: 'Date Created', type: 'date' },
          { key: 't7_version', label: 'Deal Box Version', type: 'text', placeholder: 'v1.0', helper: 'Update version number each time criteria are revised' },
        ]
      },
      {
        title: 'Financial Parameters (Hard Limits)',
        fields: [
          { key: 't7_min_price', label: 'Minimum Deal Size (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't7_max_price', label: 'Maximum Deal Size (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't7_min_ebitda', label: 'Minimum EBITDA (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't7_max_multiple', label: 'Maximum EBITDA Multiple (x)', type: 'number', placeholder: '3.5' },
          { key: 't7_min_revenue', label: 'Minimum Revenue (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't7_equity_available', label: 'Equity Available for Deposit (AUD)', type: 'currency', prefix: '$', placeholder: '0', helper: 'Typically 30–40% of purchase price required as equity' },
          { key: 't7_dscr_min', label: 'Minimum DSCR Required', type: 'number', placeholder: '1.25', helper: 'Judo Bank: 1.25x minimum. Aim for 1.5x+ for buffer.' },
        ]
      },
      {
        title: 'Business Quality Criteria (Must-Haves)',
        fields: [
          { key: 't7_sectors', label: 'Target Sectors', type: 'textarea', placeholder: 'List 2–3 primary sectors from your Industry Selector (Tool 6)' },
          { key: 't7_geography', label: 'Geographic Preference', type: 'text', placeholder: 'e.g. Sydney Metro, within 45 mins of CBD' },
          { key: 't7_years_trading', label: 'Minimum Years Trading', type: 'number', placeholder: '5' },
          { key: 't7_recurring_revenue_pct', label: 'Minimum Recurring Revenue (%)', type: 'percentage', placeholder: '40' },
          { key: 't7_customer_conc_max', label: 'Maximum Customer Concentration (%)', type: 'percentage', placeholder: '30' },
          { key: 't7_staff_min', label: 'Minimum Staff Count', type: 'number', placeholder: '3' },
          { key: 't7_staff_max', label: 'Maximum Staff Count', type: 'number', placeholder: '50' },
          { key: 't7_owner_dep', label: 'Acceptable Owner Dependency Level', type: 'select', options: ['Low only', 'Low to Medium', 'Any — price must reflect risk'] },
        ]
      },
      {
        title: 'Lifestyle & Operational Criteria',
        fields: [
          { key: 't7_hours', label: 'Maximum Weekly Hours You Will Work', type: 'number', placeholder: '50' },
          { key: 't7_travel', label: 'Maximum Travel Required', type: 'select', options: ['None — office/home based only', 'Local only (within 1 hour)', 'State-based travel acceptable', 'National travel acceptable'] },
          { key: 't7_lifestyle_notes', label: 'Other Lifestyle Requirements', type: 'textarea', placeholder: 'e.g. No weekend work, school hours flexibility, work from home capability...' },
        ]
      },
      {
        title: 'Deal Breakers (Automatic No-Go)',
        fields: [
          { key: 't7_dealbreakers', label: 'Absolute Deal Breakers', type: 'textarea', placeholder: 'e.g. Any ATO debt outstanding\nFair Work underpayment history\nSingle customer >50% of revenue\nNo financial records for 3+ years\nOwner unwilling to do handover period' },
        ]
      },
      {
        title: 'Ideal Deal Description',
        fields: [
          { key: 't7_ideal_deal', label: 'Describe Your Ideal Deal in One Paragraph', type: 'textarea', placeholder: 'Write a clear, specific description of the perfect business for you. Be as specific as possible — this becomes your sourcing brief.' },
          { key: 't7_advisor_sign_off', label: 'Advisor Sign-Off Notes', type: 'textarea', placeholder: 'Advisor comments, suggested refinements, approval notes...' },
        ]
      },
    ]
  },

  // ─── TOOL 8: AU Sourcing Channels ───────────────────────────────────────────
  {
    toolId: 8,
    sections: [
      {
        title: 'Client Details',
        fields: [
          { key: 't8_client', label: 'Client Name', type: 'text', required: true },
          { key: 't8_date', label: 'Date', type: 'date' },
        ]
      },
      {
        title: 'Online Listing Platforms',
        description: 'Track which platforms you have registered on and are actively monitoring.',
        fields: [
          { key: 't8_bizbuysell', label: 'BizBuySell Australia — Status', type: 'select', options: ['Not registered', 'Registered — passive', 'Active — checking weekly', 'Active — alerts set up'] },
          { key: 't8_bizbuysell_alerts', label: 'BizBuySell Alert Criteria Set', type: 'textarea', placeholder: 'Sector, price range, geography filters applied...' },
          { key: 't8_seek_biz', label: 'Seek Business — Status', type: 'select', options: ['Not registered', 'Registered — passive', 'Active — checking weekly', 'Active — alerts set up'] },
          { key: 't8_businessforsale', label: 'BusinessForSale.com.au — Status', type: 'select', options: ['Not registered', 'Registered — passive', 'Active'] },
          { key: 't8_other_platforms', label: 'Other Platforms Being Monitored', type: 'textarea', placeholder: 'e.g. Gumtree Business, industry-specific platforms, LinkedIn...' },
        ]
      },
      {
        title: 'Broker Relationships',
        fields: [
          { key: 't8_broker1_firm', label: 'Broker 1 — Firm Name', type: 'text', placeholder: 'e.g. LINK Business Brokers' },
          { key: 't8_broker1_contact', label: 'Broker 1 — Contact Name', type: 'text' },
          { key: 't8_broker1_phone', label: 'Broker 1 — Phone', type: 'phone' },
          { key: 't8_broker1_email', label: 'Broker 1 — Email', type: 'email' },
          { key: 't8_broker1_status', label: 'Broker 1 — Relationship Status', type: 'select', options: ['Not contacted', 'Initial contact made', 'Brief sent', 'Active relationship — receiving deals'] },
          { key: 't8_broker2_firm', label: 'Broker 2 — Firm Name', type: 'text', placeholder: 'e.g. Finn Business Sales' },
          { key: 't8_broker2_contact', label: 'Broker 2 — Contact Name', type: 'text' },
          { key: 't8_broker2_status', label: 'Broker 2 — Relationship Status', type: 'select', options: ['Not contacted', 'Initial contact made', 'Brief sent', 'Active relationship — receiving deals'] },
          { key: 't8_broker3_firm', label: 'Broker 3 — Firm Name', type: 'text', placeholder: 'e.g. Benchmark Business Sales' },
          { key: 't8_broker3_contact', label: 'Broker 3 — Contact Name', type: 'text' },
          { key: 't8_broker3_status', label: 'Broker 3 — Relationship Status', type: 'select', options: ['Not contacted', 'Initial contact made', 'Brief sent', 'Active relationship — receiving deals'] },
        ]
      },
      {
        title: 'Professional Network Sourcing',
        fields: [
          { key: 't8_accountants', label: 'Accountants Contacted (firms that act for SME owners)', type: 'textarea', placeholder: 'List firms/contacts and status...' },
          { key: 't8_solicitors', label: 'Solicitors Contacted (commercial / business law)', type: 'textarea', placeholder: 'List firms/contacts and status...' },
          { key: 't8_financial_planners', label: 'Financial Planners / Advisors Contacted', type: 'textarea', placeholder: 'List firms/contacts and status...' },
          { key: 't8_direct_outreach', label: 'Direct Outreach Campaigns Active', type: 'select', options: ['Not started', 'LinkedIn outreach active', 'Email outreach active', 'Both LinkedIn and email active', 'Letter campaign active'] },
          { key: 't8_outreach_notes', label: 'Outreach Campaign Notes', type: 'textarea', placeholder: 'Target list size, response rates, conversations started...' },
        ]
      },
      {
        title: 'Sourcing Activity Tracker',
        fields: [
          { key: 't8_deals_reviewed', label: 'Total Deals Reviewed to Date', type: 'number', placeholder: '0' },
          { key: 't8_ndas_signed', label: 'NDAs Signed to Date', type: 'number', placeholder: '0' },
          { key: 't8_active_pipeline', label: 'Deals Currently in Active Pipeline', type: 'number', placeholder: '0' },
          { key: 't8_best_lead', label: 'Most Promising Current Lead', type: 'textarea', placeholder: 'Brief description of the best deal currently being evaluated...' },
        ]
      },
    ]
  },

  // ─── TOOL 9: Broker List ─────────────────────────────────────────────────────
  {
    toolId: 9,
    sections: [
      {
        title: 'Client Details',
        fields: [
          { key: 't9_client', label: 'Client Name', type: 'text', required: true },
          { key: 't9_date', label: 'Date', type: 'date' },
          { key: 't9_target_sectors', label: 'Target Sectors (for broker briefing)', type: 'textarea', placeholder: 'Copy from your Deal Box (Tool 7)' },
          { key: 't9_deal_size', label: 'Deal Size Range (for broker briefing)', type: 'text', placeholder: 'e.g. $1M–$3M purchase price' },
        ]
      },
      {
        title: 'National Broker Networks',
        fields: [
          { key: 't9_link_contact', label: 'LINK Business Brokers — Contact Name', type: 'text' },
          { key: 't9_link_email', label: 'LINK — Email', type: 'email' },
          { key: 't9_link_status', label: 'LINK — Status', type: 'select', options: ['Not contacted', 'Brief sent', 'Meeting booked', 'Active — receiving deals'] },
          { key: 't9_link_notes', label: 'LINK — Notes', type: 'text', placeholder: 'Any deals received, quality of relationship...' },

          { key: 't9_finn_contact', label: 'Finn Business Sales — Contact Name', type: 'text' },
          { key: 't9_finn_email', label: 'Finn — Email', type: 'email' },
          { key: 't9_finn_status', label: 'Finn — Status', type: 'select', options: ['Not contacted', 'Brief sent', 'Meeting booked', 'Active — receiving deals'] },

          { key: 't9_benchmark_contact', label: 'Benchmark Business Sales — Contact Name', type: 'text' },
          { key: 't9_benchmark_email', label: 'Benchmark — Email', type: 'email' },
          { key: 't9_benchmark_status', label: 'Benchmark — Status', type: 'select', options: ['Not contacted', 'Brief sent', 'Meeting booked', 'Active — receiving deals'] },

          { key: 't9_transact_contact', label: 'Transact Business Brokers — Contact Name', type: 'text' },
          { key: 't9_transact_status', label: 'Transact — Status', type: 'select', options: ['Not contacted', 'Brief sent', 'Active'] },
        ]
      },
      {
        title: 'Specialist / Boutique Brokers',
        fields: [
          { key: 't9_specialist1_firm', label: 'Specialist Broker 1 — Firm', type: 'text', placeholder: 'e.g. Healthcare Business Sales' },
          { key: 't9_specialist1_sector', label: 'Specialist Broker 1 — Sector Focus', type: 'text' },
          { key: 't9_specialist1_contact', label: 'Specialist Broker 1 — Contact', type: 'text' },
          { key: 't9_specialist1_status', label: 'Specialist Broker 1 — Status', type: 'select', options: ['Not contacted', 'Brief sent', 'Active'] },

          { key: 't9_specialist2_firm', label: 'Specialist Broker 2 — Firm', type: 'text' },
          { key: 't9_specialist2_sector', label: 'Specialist Broker 2 — Sector Focus', type: 'text' },
          { key: 't9_specialist2_contact', label: 'Specialist Broker 2 — Contact', type: 'text' },
          { key: 't9_specialist2_status', label: 'Specialist Broker 2 — Status', type: 'select', options: ['Not contacted', 'Brief sent', 'Active'] },

          { key: 't9_other_brokers', label: 'Other Brokers / M&A Advisors', type: 'textarea', placeholder: 'Any other brokers, M&A firms, or deal intermediaries being engaged...' },
        ]
      },
      {
        title: 'Buyer Profile / Brief (to send to brokers)',
        fields: [
          { key: 't9_buyer_profile', label: 'Buyer Profile Summary', type: 'textarea', placeholder: 'Write a 3–5 sentence buyer profile to send to brokers. Include: who you are, your background, what you are looking for, your capacity, and your timeline.' },
          { key: 't9_brief_sent_date', label: 'Date Buyer Brief Last Sent to Brokers', type: 'date' },
        ]
      },
    ]
  },

  // ─── TOOL 10: Deal Sourcing CRM ─────────────────────────────────────────────
  {
    toolId: 10,
    sections: [
      {
        title: 'Client Details',
        fields: [
          { key: 't10_client', label: 'Client Name', type: 'text', required: true },
          { key: 't10_date', label: 'Date', type: 'date' },
        ]
      },
      {
        title: 'Deal 1',
        fields: [
          { key: 't10_d1_name', label: 'Deal 1 — Business Name', type: 'text', placeholder: 'Business name or "Confidential"' },
          { key: 't10_d1_sector', label: 'Deal 1 — Sector', type: 'text' },
          { key: 't10_d1_source', label: 'Deal 1 — Source', type: 'select', options: ['Broker', 'Direct outreach', 'Referral', 'Online listing', 'Other'] },
          { key: 't10_d1_revenue', label: 'Deal 1 — Revenue (AUD)', type: 'currency', prefix: '$' },
          { key: 't10_d1_ebitda', label: 'Deal 1 — EBITDA (AUD)', type: 'currency', prefix: '$' },
          { key: 't10_d1_price', label: 'Deal 1 — Asking Price (AUD)', type: 'currency', prefix: '$' },
          { key: 't10_d1_stage', label: 'Deal 1 — Current Stage', type: 'select', options: ['Initial review', 'NDA signed', 'Deep evaluation', 'Offer made', 'DD', 'Dead — exited'] },
          { key: 't10_d1_notes', label: 'Deal 1 — Notes', type: 'textarea', placeholder: 'Key observations, next steps, concerns...' },
        ]
      },
      {
        title: 'Deal 2',
        fields: [
          { key: 't10_d2_name', label: 'Deal 2 — Business Name', type: 'text' },
          { key: 't10_d2_sector', label: 'Deal 2 — Sector', type: 'text' },
          { key: 't10_d2_source', label: 'Deal 2 — Source', type: 'select', options: ['Broker', 'Direct outreach', 'Referral', 'Online listing', 'Other'] },
          { key: 't10_d2_revenue', label: 'Deal 2 — Revenue (AUD)', type: 'currency', prefix: '$' },
          { key: 't10_d2_ebitda', label: 'Deal 2 — EBITDA (AUD)', type: 'currency', prefix: '$' },
          { key: 't10_d2_price', label: 'Deal 2 — Asking Price (AUD)', type: 'currency', prefix: '$' },
          { key: 't10_d2_stage', label: 'Deal 2 — Current Stage', type: 'select', options: ['Initial review', 'NDA signed', 'Deep evaluation', 'Offer made', 'DD', 'Dead — exited'] },
          { key: 't10_d2_notes', label: 'Deal 2 — Notes', type: 'textarea' },
        ]
      },
      {
        title: 'Deal 3',
        fields: [
          { key: 't10_d3_name', label: 'Deal 3 — Business Name', type: 'text' },
          { key: 't10_d3_sector', label: 'Deal 3 — Sector', type: 'text' },
          { key: 't10_d3_revenue', label: 'Deal 3 — Revenue (AUD)', type: 'currency', prefix: '$' },
          { key: 't10_d3_ebitda', label: 'Deal 3 — EBITDA (AUD)', type: 'currency', prefix: '$' },
          { key: 't10_d3_price', label: 'Deal 3 — Asking Price (AUD)', type: 'currency', prefix: '$' },
          { key: 't10_d3_stage', label: 'Deal 3 — Current Stage', type: 'select', options: ['Initial review', 'NDA signed', 'Deep evaluation', 'Offer made', 'DD', 'Dead — exited'] },
          { key: 't10_d3_notes', label: 'Deal 3 — Notes', type: 'textarea' },
        ]
      },
      {
        title: 'Pipeline Summary',
        fields: [
          { key: 't10_total_reviewed', label: 'Total Deals Reviewed (cumulative)', type: 'number', placeholder: '0' },
          { key: 't10_active_deals', label: 'Active Deals in Pipeline', type: 'number', placeholder: '0' },
          { key: 't10_best_deal', label: 'Current Best Deal / Priority Focus', type: 'textarea', placeholder: 'Which deal are you most excited about and why?' },
          { key: 't10_next_actions', label: 'Next 3 Actions This Week', type: 'textarea', placeholder: '1.\n2.\n3.' },
        ]
      },
    ]
  },

  // ─── TOOL 11: Buyer Profile ──────────────────────────────────────────────────
  {
    toolId: 11,
    sections: [
      {
        title: 'Personal & Professional Background',
        fields: [
          { key: 't11_name', label: 'Full Name', type: 'text', required: true },
          { key: 't11_email', label: 'Email', type: 'email' },
          { key: 't11_phone', label: 'Mobile', type: 'phone' },
          { key: 't11_linkedin', label: 'LinkedIn Profile URL', type: 'url' },
          { key: 't11_location', label: 'Location (Suburb / City)', type: 'text', placeholder: 'e.g. North Sydney, NSW' },
          { key: 't11_background', label: 'Professional Background Summary', type: 'textarea', placeholder: 'Write 3–4 sentences summarising your career — industry, seniority, key achievements. This is what you send to brokers and sellers.' },
          { key: 't11_years_exp', label: 'Years of Executive / Senior Management Experience', type: 'number', placeholder: '0' },
          { key: 't11_industries', label: 'Industries You Have Worked In', type: 'textarea', placeholder: 'e.g. Financial services, FMCG, professional services, healthcare...' },
          { key: 't11_key_skills', label: 'Top 3 Transferable Skills', type: 'textarea', placeholder: '1. P&L management ($50M+)\n2. Sales team leadership (20+ people)\n3. Operational systems and process improvement' },
        ]
      },
      {
        title: 'Acquisition Criteria (for Broker / Seller Conversations)',
        fields: [
          { key: 't11_target_sectors', label: 'Target Sectors', type: 'textarea', placeholder: 'From your Industry Selector (Tool 6)' },
          { key: 't11_deal_size', label: 'Target Deal Size Range (AUD)', type: 'text', placeholder: 'e.g. $1M–$3M purchase price' },
          { key: 't11_timeline', label: 'Target Acquisition Timeline', type: 'select', options: ['3–6 months', '6–12 months', '12–18 months'] },
          { key: 't11_finance_ready', label: 'Finance Pre-Approval Status', type: 'select', options: ['Not yet commenced', 'In progress with Judo/NAB', 'Pre-approved — conditional', 'Pre-approved — unconditional'] },
          { key: 't11_operator', label: 'Intended Role Post-Acquisition', type: 'select', options: ['Hands-on operator from Day 1', 'Active owner with GM in place within 12 months', 'Strategic owner — hire management team', 'Other'] },
        ]
      },
      {
        title: 'Credibility Statement (for Seller Conversations)',
        fields: [
          { key: 't11_credibility', label: 'Why Should a Seller Choose You?', type: 'textarea', placeholder: 'Write 2–3 sentences on what makes you a credible, serious buyer. Include your financial capacity, your relevant experience, and your commitment to the business and its staff.' },
          { key: 't11_references', label: 'Professional References Available', type: 'select', options: ['Yes — 2+ references ready', 'Yes — 1 reference ready', 'Not yet arranged'] },
        ]
      },
    ]
  },

  // ─── TOOL 12: Outreach Scripts ───────────────────────────────────────────────
  {
    toolId: 12,
    sections: [
      {
        title: 'Client Details',
        fields: [
          { key: 't12_client', label: 'Client Name', type: 'text', required: true },
          { key: 't12_date', label: 'Date', type: 'date' },
        ]
      },
      {
        title: 'LinkedIn Connection Request Script',
        description: 'Personalise this script for each target business owner. Keep it under 300 characters.',
        fields: [
          { key: 't12_linkedin_script', label: 'LinkedIn Connection Message', type: 'textarea', placeholder: 'Hi [Name], I came across [Business Name] and was impressed by [specific observation]. I am a senior executive exploring business acquisition in [sector] and would value connecting. [Your Name]' },
          { key: 't12_linkedin_notes', label: 'LinkedIn Campaign Notes', type: 'textarea', placeholder: 'Target list size, response rate, follow-up approach...' },
        ]
      },
      {
        title: 'Cold Email Script — Initial Outreach',
        fields: [
          { key: 't12_email_subject', label: 'Email Subject Line', type: 'text', placeholder: 'e.g. Serious buyer inquiry — [Business Name]' },
          { key: 't12_email_body', label: 'Email Body', type: 'textarea', placeholder: 'Subject: [Subject line]\n\nDear [Name],\n\nMy name is [Your Name]. I am a [role] with [X] years of experience in [sector]. I am actively seeking to acquire a business in [sector] and [Business Name] caught my attention.\n\nI am a serious, pre-approved buyer with capacity to move quickly. I would welcome a confidential conversation at your convenience.\n\nWould you be open to a brief call this week?\n\nKind regards,\n[Your Name]\n[Phone] | [LinkedIn]' },
          { key: 't12_email_notes', label: 'Email Campaign Notes', type: 'textarea', placeholder: 'Target list, send dates, response rates, follow-up schedule...' },
        ]
      },
      {
        title: 'Follow-Up Script (7 Days After Initial Contact)',
        fields: [
          { key: 't12_followup_script', label: 'Follow-Up Message', type: 'textarea', placeholder: 'Hi [Name], I wanted to follow up on my message from [date]. I understand you are busy running your business — I will keep this brief. I am genuinely interested in [Business Name] and would welcome even a 15-minute call. If timing is not right now, I am happy to reconnect in [timeframe]. Kind regards, [Your Name]' },
        ]
      },
      {
        title: 'Broker Introduction Script',
        fields: [
          { key: 't12_broker_intro', label: 'Broker Introduction Email', type: 'textarea', placeholder: 'Dear [Broker Name],\n\nI am [Your Name], a senior executive with [X] years in [sector], currently seeking to acquire a business through the 120% Business Acquisition Program.\n\nI am a pre-approved buyer with capacity of [deal size range]. My target criteria are:\n- Sector: [sectors]\n- Revenue: [range]\n- Geography: [location]\n- Timeline: [timeframe]\n\nI would welcome the opportunity to brief you on my criteria and be added to your buyer register. Are you available for a 20-minute call this week?\n\nKind regards,\n[Your Name]' },
        ]
      },
    ]
  },

  // ─── TOOL 13: Seller Questions ───────────────────────────────────────────────
  {
    toolId: 13,
    sections: [
      {
        title: 'Meeting Details',
        fields: [
          { key: 't13_client', label: 'Client (Buyer) Name', type: 'text', required: true },
          { key: 't13_seller_name', label: 'Seller Name', type: 'text' },
          { key: 't13_business_name', label: 'Business Name', type: 'text' },
          { key: 't13_meeting_date', label: 'Meeting Date', type: 'date' },
          { key: 't13_meeting_type', label: 'Meeting Type', type: 'select', options: ['Phone call', 'Video call', 'In-person at business', 'In-person — neutral venue'] },
        ]
      },
      {
        title: 'Business Fundamentals',
        fields: [
          { key: 't13_q1', label: 'Why are you selling?', type: 'textarea', placeholder: 'Record seller\'s answer verbatim where possible...' },
          { key: 't13_q2', label: 'How long have you owned the business?', type: 'text' },
          { key: 't13_q3', label: 'What does the business do and who are your main customers?', type: 'textarea' },
          { key: 't13_q4', label: 'What is the revenue and EBITDA for the last 3 years?', type: 'textarea', placeholder: 'FY22: $X / $X\nFY23: $X / $X\nFY24: $X / $X' },
          { key: 't13_q5', label: 'What is your owner\'s salary and any add-backs?', type: 'textarea', helper: 'Owner salary, super, personal expenses run through business, one-off costs' },
        ]
      },
      {
        title: 'People & Operations',
        fields: [
          { key: 't13_q6', label: 'How many staff do you have and what are their roles?', type: 'textarea' },
          { key: 't13_q7', label: 'Are staff on awards or contracts? Any Fair Work issues?', type: 'textarea', helper: 'AU: Check Fair Work compliance — underpayment is a major risk' },
          { key: 't13_q8', label: 'What happens to the business if you are not there for 4 weeks?', type: 'textarea', helper: 'Tests owner dependency — critical for acquisition risk assessment' },
          { key: 't13_q9', label: 'Are there any key person dependencies (staff who could leave)?', type: 'textarea' },
          { key: 't13_q10', label: 'What systems and software does the business use?', type: 'textarea', placeholder: 'Accounting (Xero/MYOB), CRM, operations, scheduling...' },
        ]
      },
      {
        title: 'Customers & Contracts',
        fields: [
          { key: 't13_q11', label: 'Who are your top 5 customers and what % of revenue do they represent?', type: 'textarea' },
          { key: 't13_q12', label: 'Are customer relationships transferable to a new owner?', type: 'textarea' },
          { key: 't13_q13', label: 'Do you have written contracts with customers?', type: 'select', options: ['Yes — all customers on contract', 'Mostly — some on contract', 'Rarely — mostly informal', 'No contracts'] },
          { key: 't13_q14', label: 'Are there any supplier agreements or exclusive arrangements?', type: 'textarea' },
        ]
      },
      {
        title: 'Legal, Financial & Compliance',
        fields: [
          { key: 't13_q15', label: 'Are there any outstanding ATO debts, payment plans, or disputes?', type: 'textarea', helper: 'AU: ATO debt is a major red flag — must be disclosed and resolved' },
          { key: 't13_q16', label: 'Are there any PPSR registrations over business assets?', type: 'textarea', helper: 'AU: Search PPSR.gov.au before proceeding' },
          { key: 't13_q17', label: 'Have there been any legal disputes, litigation, or Fair Work claims?', type: 'textarea' },
          { key: 't13_q18', label: 'Is the business ASIC registered and up to date?', type: 'select', options: ['Yes — confirmed', 'Not yet checked', 'Issues identified'] },
          { key: 't13_q19', label: 'What are the lease terms (if applicable)?', type: 'textarea', helper: 'Length remaining, rent, options to renew, landlord consent for assignment' },
          { key: 't13_q20', label: 'What is included in the sale (assets, IP, goodwill, stock)?', type: 'textarea' },
        ]
      },
      {
        title: 'Deal Structure & Transition',
        fields: [
          { key: 't13_q21', label: 'What is your asking price and how did you arrive at it?', type: 'textarea' },
          { key: 't13_q22', label: 'Are you open to seller finance or an earn-out arrangement?', type: 'select', options: ['Yes — open to discussion', 'Possibly — depends on terms', 'No — cash only'] },
          { key: 't13_q23', label: 'How long are you willing to stay on for handover?', type: 'select', options: ['1–4 weeks', '1–3 months', '3–6 months', '6–12 months', 'Ongoing consulting role'] },
          { key: 't13_overall_impression', label: 'Overall Impression of Seller & Business', type: 'textarea', placeholder: 'Honest assessment — is the seller credible, motivated, transparent? Any red flags?' },
          { key: 't13_next_step', label: 'Agreed Next Step', type: 'textarea', placeholder: 'e.g. Seller to provide 3 years of financials by [date]. NDA to be signed. Second meeting booked for [date].' },
        ]
      },
    ]
  },

  // ─── TOOL 14: NDA ────────────────────────────────────────────────────────────
  {
    toolId: 14,
    sections: [
      {
        title: 'NDA Details',
        fields: [
          { key: 't14_client', label: 'Buyer Name (Party A)', type: 'text', required: true },
          { key: 't14_buyer_abn', label: 'Buyer ABN / ACN (if applicable)', type: 'text' },
          { key: 't14_seller', label: 'Seller / Disclosing Party Name', type: 'text' },
          { key: 't14_business', label: 'Business Name', type: 'text' },
          { key: 't14_date', label: 'NDA Date', type: 'date' },
          { key: 't14_jurisdiction', label: 'Governing Jurisdiction', type: 'select', options: ['New South Wales', 'Victoria', 'Queensland', 'Western Australia', 'South Australia', 'Tasmania', 'ACT', 'Northern Territory'] },
          { key: 't14_confidentiality_period', label: 'Confidentiality Period', type: 'select', options: ['12 months', '18 months', '24 months', '36 months', 'Indefinite'] },
          { key: 't14_exclusivity', label: 'Exclusivity Period (if included)', type: 'text', placeholder: 'e.g. 30 days from NDA execution, or N/A' },
          { key: 't14_solicitor_reviewed', label: 'Reviewed by Solicitor?', type: 'select', options: ['Yes — approved', 'Yes — with amendments', 'No — using standard template', 'Pending review'] },
          { key: 't14_solicitor_name', label: 'Solicitor Name / Firm', type: 'text' },
          { key: 't14_special_terms', label: 'Special Terms or Amendments', type: 'textarea', placeholder: 'Any non-standard terms, carve-outs, or specific conditions...' },
          { key: 't14_signed_date', label: 'Date NDA Executed (Both Parties)', type: 'date' },
          { key: 't14_notes', label: 'Notes', type: 'textarea', placeholder: 'Any issues with NDA negotiation, seller concerns, broker involvement...' },
        ]
      },
    ]
  },

  // ─── TOOL 15: Decision Tree ──────────────────────────────────────────────────
  {
    toolId: 15,
    sections: [
      {
        title: 'Deal Being Evaluated',
        fields: [
          { key: 't15_client', label: 'Client Name', type: 'text', required: true },
          { key: 't15_business', label: 'Business Name', type: 'text' },
          { key: 't15_date', label: 'Evaluation Date', type: 'date' },
          { key: 't15_asking_price', label: 'Asking Price (AUD)', type: 'currency', prefix: '$' },
          { key: 't15_revenue', label: 'Revenue (AUD)', type: 'currency', prefix: '$' },
          { key: 't15_ebitda', label: 'EBITDA (AUD)', type: 'currency', prefix: '$' },
        ]
      },
      {
        title: 'Stage 1: Preliminary Screen (Go / No-Go in 60 Minutes)',
        description: 'Answer each question. Any "No" is a potential deal-breaker — note your reasoning.',
        fields: [
          { key: 't15_s1_sector', label: 'Is the sector within your Deal Box?', type: 'select', options: ['Yes', 'No', 'Borderline'] },
          { key: 't15_s1_price', label: 'Is the price within your financial capacity?', type: 'select', options: ['Yes', 'No', 'Borderline'] },
          { key: 't15_s1_multiple', label: 'Is the EBITDA multiple acceptable (<4x for most AU SMEs)?', type: 'select', options: ['Yes', 'No', 'Borderline'] },
          { key: 't15_s1_geography', label: 'Is the geography acceptable?', type: 'select', options: ['Yes', 'No', 'Borderline'] },
          { key: 't15_s1_lifestyle', label: 'Does the business fit your lifestyle requirements?', type: 'select', options: ['Yes', 'No', 'Borderline'] },
          { key: 't15_s1_decision', label: 'Stage 1 Decision', type: 'select', options: ['PROCEED to Stage 2', 'NO-GO — exit deal', 'CONDITIONAL — need more info'] },
          { key: 't15_s1_notes', label: 'Stage 1 Notes', type: 'textarea', placeholder: 'Key observations, borderline issues, information needed...' },
        ]
      },
      {
        title: 'Stage 2: Financial & Operational Screen',
        fields: [
          { key: 't15_s2_financials', label: 'Are 3 years of financial statements available and credible?', type: 'select', options: ['Yes', 'No', 'Partially'] },
          { key: 't15_s2_ebitda_trend', label: 'Is EBITDA stable or growing (not declining)?', type: 'select', options: ['Growing', 'Stable', 'Declining — explainable', 'Declining — unexplained'] },
          { key: 't15_s2_recurring', label: 'Is there meaningful recurring/contracted revenue?', type: 'select', options: ['Yes — 40%+', 'Moderate — 20–40%', 'Low — <20%', 'None'] },
          { key: 't15_s2_owner_dep', label: 'Is owner dependency manageable?', type: 'select', options: ['Low — business runs without owner', 'Medium — manageable transition', 'High — significant risk'] },
          { key: 't15_s2_staff', label: 'Is the staff situation stable and compliant (Fair Work)?', type: 'select', options: ['Yes — no issues', 'Minor issues — manageable', 'Major issues — red flag'] },
          { key: 't15_s2_dscr', label: 'Does the DSCR meet Judo/NAB requirements (>1.25x)?', type: 'select', options: ['Yes — comfortably', 'Yes — marginally', 'No — fails DSCR test'] },
          { key: 't15_s2_decision', label: 'Stage 2 Decision', type: 'select', options: ['PROCEED to Stage 3 (Deep DD)', 'NO-GO — exit deal', 'CONDITIONAL — renegotiate price or structure'] },
          { key: 't15_s2_notes', label: 'Stage 2 Notes', type: 'textarea' },
        ]
      },
      {
        title: 'Stage 3: Gut Check & Final Decision',
        fields: [
          { key: 't15_s3_gut', label: 'Gut check: Do you genuinely want to own this business?', type: 'select', options: ['Yes — excited and committed', 'Mostly — some reservations', 'No — proceeding for wrong reasons'] },
          { key: 't15_s3_seller', label: 'Do you trust the seller and believe they are transparent?', type: 'select', options: ['Yes — high trust', 'Moderate trust — some concerns', 'Low trust — significant red flags'] },
          { key: 't15_s3_advisor', label: 'Advisor recommendation', type: 'select', options: ['Proceed — strong deal', 'Proceed with caution', 'Do not proceed'] },
          { key: 't15_s3_final', label: 'FINAL DECISION', type: 'select', options: ['GO — proceed to offer', 'NO-GO — exit deal', 'HOLD — revisit in [timeframe]'] },
          { key: 't15_s3_rationale', label: 'Final Decision Rationale', type: 'textarea', placeholder: 'Document the key reasons for your final decision...' },
        ]
      },
    ]
  },

  // ─── TOOL 16: Deal Navigator ─────────────────────────────────────────────────
  {
    toolId: 16,
    sections: [
      {
        title: 'Deal Overview',
        fields: [
          { key: 't16_client', label: 'Client Name', type: 'text', required: true },
          { key: 't16_business', label: 'Target Business', type: 'text' },
          { key: 't16_date', label: 'Date', type: 'date' },
          { key: 't16_target_close', label: 'Target Settlement Date', type: 'date' },
        ]
      },
      {
        title: 'Milestone Tracker',
        description: 'Record the completion date and notes for each milestone.',
        fields: [
          { key: 't16_m1', label: 'M1: Initial deal review completed', type: 'select', options: ['Not started', 'In progress', 'Completed'] },
          { key: 't16_m1_date', label: 'M1 Completion Date', type: 'date' },
          { key: 't16_m2', label: 'M2: NDA signed', type: 'select', options: ['Not started', 'In progress', 'Completed'] },
          { key: 't16_m2_date', label: 'M2 Completion Date', type: 'date' },
          { key: 't16_m3', label: 'M3: Information memorandum / financials received', type: 'select', options: ['Not started', 'Received', 'Reviewed'] },
          { key: 't16_m3_date', label: 'M3 Completion Date', type: 'date' },
          { key: 't16_m4', label: 'M4: Decision Tree assessment completed (Tool 15)', type: 'select', options: ['Not started', 'In progress', 'Completed — GO'] },
          { key: 't16_m5', label: 'M5: Deal Calculator run (Tool 17)', type: 'select', options: ['Not started', 'Completed'] },
          { key: 't16_m5_date', label: 'M5 Completion Date', type: 'date' },
          { key: 't16_m6', label: 'M6: LOI / Offer submitted', type: 'select', options: ['Not started', 'Drafted', 'Submitted', 'Accepted'] },
          { key: 't16_m6_date', label: 'M6 Completion Date', type: 'date' },
          { key: 't16_m7', label: 'M7: Solicitor engaged', type: 'select', options: ['Not started', 'Engaged'] },
          { key: 't16_m7_solicitor', label: 'Solicitor Firm / Contact', type: 'text' },
          { key: 't16_m8', label: 'M8: Accountant / QoE advisor engaged', type: 'select', options: ['Not started', 'Engaged'] },
          { key: 't16_m9', label: 'M9: Due diligence commenced (Tool 24)', type: 'select', options: ['Not started', 'In progress', 'Completed'] },
          { key: 't16_m9_date', label: 'M9 Start Date', type: 'date' },
          { key: 't16_m10', label: 'M10: Finance application submitted to Judo/NAB', type: 'select', options: ['Not started', 'Submitted', 'Conditional approval', 'Unconditional approval'] },
          { key: 't16_m10_date', label: 'M10 Completion Date', type: 'date' },
          { key: 't16_m11', label: 'M11: Asset Purchase Agreement signed', type: 'select', options: ['Not started', 'In negotiation', 'Signed'] },
          { key: 't16_m11_date', label: 'M11 Completion Date', type: 'date' },
          { key: 't16_m12', label: 'M12: Settlement completed', type: 'select', options: ['Not started', 'Completed'] },
          { key: 't16_m12_date', label: 'Settlement Date', type: 'date' },
          { key: 't16_blockers', label: 'Current Blockers / Issues', type: 'textarea', placeholder: 'What is slowing down the deal? What needs to be resolved?' },
          { key: 't16_next_actions', label: 'Next 3 Priority Actions', type: 'textarea', placeholder: '1.\n2.\n3.' },
        ]
      },
    ]
  },

  // ─── TOOL 17: Deal Calculator ────────────────────────────────────────────────
  {
    toolId: 17,
    sections: [
      {
        title: 'Deal Details',
        fields: [
          { key: 't17_client', label: 'Client Name', type: 'text', required: true },
          { key: 't17_business', label: 'Business Name', type: 'text' },
          { key: 't17_date', label: 'Date', type: 'date' },
        ]
      },
      {
        title: 'Business Financials (from Seller)',
        fields: [
          { key: 't17_revenue_fy22', label: 'Revenue FY22 (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't17_revenue_fy23', label: 'Revenue FY23 (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't17_revenue_fy24', label: 'Revenue FY24 (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't17_ebitda_fy22', label: 'EBITDA FY22 (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't17_ebitda_fy23', label: 'EBITDA FY23 (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't17_ebitda_fy24', label: 'EBITDA FY24 (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't17_addbacks', label: 'Total Add-Backs (AUD)', type: 'currency', prefix: '$', placeholder: '0', helper: 'Owner salary above market, personal expenses, one-off costs' },
          { key: 't17_normalised_ebitda', label: 'Normalised EBITDA (AUD)', type: 'currency', prefix: '$', placeholder: '0', helper: 'EBITDA FY24 + Add-Backs = Normalised EBITDA' },
        ]
      },
      {
        title: 'Valuation & Offer',
        fields: [
          { key: 't17_asking_price', label: 'Seller Asking Price (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't17_asking_multiple', label: 'Asking Price Multiple (x)', type: 'number', placeholder: '0.0', helper: 'Asking Price ÷ Normalised EBITDA' },
          { key: 't17_your_offer', label: 'Your Proposed Offer Price (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't17_your_multiple', label: 'Your Offer Multiple (x)', type: 'number', placeholder: '0.0' },
          { key: 't17_offer_rationale', label: 'Offer Price Rationale', type: 'textarea', placeholder: 'Why is this price justified? Reference AU comparable multiples, risk factors, growth potential...' },
        ]
      },
      {
        title: 'Deal Structure',
        fields: [
          { key: 't17_equity', label: 'Equity / Deposit (AUD)', type: 'currency', prefix: '$', placeholder: '0', helper: 'Your cash contribution — typically 30–40% of purchase price' },
          { key: 't17_bank_debt', label: 'Bank Debt / Judo/NAB Loan (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't17_seller_finance', label: 'Seller Finance (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't17_earnout', label: 'Earn-Out Component (AUD)', type: 'currency', prefix: '$', placeholder: '0', helper: 'Amount payable if performance targets are met post-settlement' },
          { key: 't17_earnout_terms', label: 'Earn-Out Terms', type: 'textarea', placeholder: 'Performance targets, measurement period, payment schedule...' },
        ]
      },
      {
        title: 'DSCR & Serviceability',
        fields: [
          { key: 't17_loan_rate', label: 'Loan Interest Rate (%)', type: 'percentage', placeholder: '7.5', helper: 'Current Judo Bank SME lending rate — check current rates' },
          { key: 't17_loan_term', label: 'Loan Term (years)', type: 'number', placeholder: '7' },
          { key: 't17_annual_debt_service', label: 'Annual Debt Service (AUD)', type: 'currency', prefix: '$', placeholder: '0', helper: 'Principal + interest repayments per year' },
          { key: 't17_owner_salary', label: 'Owner Salary Required (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't17_dscr', label: 'DSCR (Debt Service Coverage Ratio)', type: 'number', placeholder: '0.00', helper: 'Normalised EBITDA ÷ Annual Debt Service. Must be >1.25x for Judo/NAB' },
          { key: 't17_dscr_pass', label: 'DSCR Test Result', type: 'select', options: ['PASS — exceeds 1.25x', 'MARGINAL — between 1.0x and 1.25x', 'FAIL — below 1.0x'] },
          { key: 't17_post_debt_cashflow', label: 'Post-Debt, Post-Salary Cash Flow (AUD)', type: 'currency', prefix: '$', placeholder: '0', helper: 'Normalised EBITDA − Annual Debt Service − Owner Salary = Free Cash Flow' },
        ]
      },
    ]
  },

  // ─── TOOL 18: SDE Worksheet ──────────────────────────────────────────────────
  {
    toolId: 18,
    sections: [
      {
        title: 'Business & Client Details',
        fields: [
          { key: 't18_client', label: 'Client Name', type: 'text', required: true },
          { key: 't18_business', label: 'Business Name', type: 'text' },
          { key: 't18_fy', label: 'Financial Year Being Analysed', type: 'select', options: ['FY2024 (Jul 23–Jun 24)', 'FY2023 (Jul 22–Jun 23)', 'FY2022 (Jul 21–Jun 22)'] },
          { key: 't18_date', label: 'Date', type: 'date' },
        ]
      },
      {
        title: 'Seller Discretionary Earnings Calculation',
        fields: [
          { key: 't18_net_profit', label: 'Net Profit (after tax, per financials) (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't18_add_interest', label: '+ Interest Expense (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't18_add_tax', label: '+ Income Tax (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't18_add_da', label: '+ Depreciation & Amortisation (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't18_ebitda', label: '= EBITDA (AUD)', type: 'currency', prefix: '$', placeholder: '0', helper: 'Net Profit + Interest + Tax + D&A' },
          { key: 't18_add_owner_salary', label: '+ Owner Salary & Super (AUD)', type: 'currency', prefix: '$', placeholder: '0', helper: 'Total owner remuneration including superannuation' },
          { key: 't18_add_personal_exp', label: '+ Personal Expenses Run Through Business (AUD)', type: 'currency', prefix: '$', placeholder: '0', helper: 'e.g. personal vehicle, phone, travel, meals — must be documented' },
          { key: 't18_add_oneoff', label: '+ One-Off / Non-Recurring Expenses (AUD)', type: 'currency', prefix: '$', placeholder: '0', helper: 'e.g. legal dispute, equipment write-off, COVID grants' },
          { key: 't18_add_family', label: '+ Family Member Salaries Above Market Rate (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't18_less_oneoff_income', label: '− One-Off / Non-Recurring Income (AUD)', type: 'currency', prefix: '$', placeholder: '0', helper: 'e.g. insurance payout, government grants, asset sales' },
          { key: 't18_sde', label: '= Seller Discretionary Earnings (SDE) (AUD)', type: 'currency', prefix: '$', placeholder: '0', helper: 'EBITDA + all add-backs − one-off income = SDE' },
          { key: 't18_market_salary', label: '− Market Rate Replacement Salary (AUD)', type: 'currency', prefix: '$', placeholder: '0', helper: 'What you would pay a GM to replace the owner' },
          { key: 't18_normalised_ebitda', label: '= Normalised EBITDA (AUD)', type: 'currency', prefix: '$', placeholder: '0', helper: 'SDE − Market Replacement Salary = Normalised EBITDA (use for valuation)' },
        ]
      },
      {
        title: 'Add-Back Documentation',
        fields: [
          { key: 't18_addback_notes', label: 'Add-Back Justification Notes', type: 'textarea', placeholder: 'Document each add-back with evidence. e.g. "Owner salary $180K per payroll records. Personal vehicle $15K per BAS. Legal dispute $45K per invoice — one-off."' },
          { key: 't18_ato_risk', label: 'ATO Risk Assessment', type: 'textarea', placeholder: 'Any GST, PAYG, or income tax risks identified in the financials? Outstanding ATO debts?' },
        ]
      },
    ]
  },

  // ─── TOOL 19: 10 Value Markers ───────────────────────────────────────────────
  {
    toolId: 19,
    sections: [
      {
        title: 'Deal Details',
        fields: [
          { key: 't19_client', label: 'Client Name', type: 'text', required: true },
          { key: 't19_business', label: 'Business Name', type: 'text' },
          { key: 't19_date', label: 'Date', type: 'date' },
        ]
      },
      {
        title: 'Value Marker Scoring (1–5)',
        description: 'Score each value marker 1–5. Total score guides offer price and negotiation position.',
        fields: [
          { key: 't19_vm1', label: 'VM1: Revenue Trend (1=declining, 5=strong growth)', type: 'number', placeholder: '0' },
          { key: 't19_vm1_notes', label: 'VM1 Notes', type: 'text', placeholder: '3-year revenue trend observation...' },
          { key: 't19_vm2', label: 'VM2: Recurring Revenue (1=none, 5=>60% contracted)', type: 'number', placeholder: '0' },
          { key: 't19_vm2_notes', label: 'VM2 Notes', type: 'text' },
          { key: 't19_vm3', label: 'VM3: Customer Concentration (1=1 customer>50%, 5=well diversified)', type: 'number', placeholder: '0' },
          { key: 't19_vm3_notes', label: 'VM3 Notes', type: 'text' },
          { key: 't19_vm4', label: 'VM4: Owner Dependency (1=cannot operate without owner, 5=fully systemised)', type: 'number', placeholder: '0' },
          { key: 't19_vm4_notes', label: 'VM4 Notes', type: 'text' },
          { key: 't19_vm5', label: 'VM5: Staff Stability (1=high turnover/issues, 5=stable loyal team)', type: 'number', placeholder: '0' },
          { key: 't19_vm5_notes', label: 'VM5 Notes', type: 'text' },
          { key: 't19_vm6', label: 'VM6: Margin Quality (1=<10% EBITDA margin, 5=>25% EBITDA margin)', type: 'number', placeholder: '0' },
          { key: 't19_vm6_notes', label: 'VM6 Notes', type: 'text' },
          { key: 't19_vm7', label: 'VM7: Systems & Documentation (1=no SOPs, 5=fully documented)', type: 'number', placeholder: '0' },
          { key: 't19_vm7_notes', label: 'VM7 Notes', type: 'text' },
          { key: 't19_vm8', label: 'VM8: Market Position (1=no differentiation, 5=clear market leader)', type: 'number', placeholder: '0' },
          { key: 't19_vm8_notes', label: 'VM8 Notes', type: 'text' },
          { key: 't19_vm9', label: 'VM9: Growth Potential (1=declining market, 5=strong tailwinds)', type: 'number', placeholder: '0' },
          { key: 't19_vm9_notes', label: 'VM9 Notes', type: 'text' },
          { key: 't19_vm10', label: 'VM10: Seller Motivation (1=not motivated, 5=highly motivated to sell)', type: 'number', placeholder: '0' },
          { key: 't19_vm10_notes', label: 'VM10 Notes', type: 'text' },
          { key: 't19_total_score', label: 'Total Score (out of 50)', type: 'number', placeholder: '0', helper: '40–50: Premium business (4–5x EBITDA). 30–39: Good (3–4x). 20–29: Fair (2–3x). <20: Distressed (<2x)' },
          { key: 't19_recommended_multiple', label: 'Recommended EBITDA Multiple Based on Score', type: 'number', placeholder: '0.0' },
          { key: 't19_summary', label: 'Value Assessment Summary', type: 'textarea', placeholder: 'Overall assessment of business quality and key value drivers/detractors...' },
        ]
      },
    ]
  },

  // ─── TOOL 20: Offer Checklist ────────────────────────────────────────────────
  {
    toolId: 20,
    sections: [
      {
        title: 'Offer Details',
        fields: [
          { key: 't20_client', label: 'Client Name', type: 'text', required: true },
          { key: 't20_business', label: 'Business Name', type: 'text' },
          { key: 't20_offer_price', label: 'Offer Price (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't20_offer_date', label: 'Offer Date', type: 'date' },
          { key: 't20_offer_type', label: 'Offer Type', type: 'select', options: ['Informal / verbal', 'Letter of Intent (LOI)', 'Heads of Agreement', 'Formal offer via solicitor'] },
        ]
      },
      {
        title: 'Pre-Offer Checklist',
        description: 'Confirm each item is complete before submitting your offer.',
        fields: [
          { key: 't20_c1', label: 'Deal Calculator completed (Tool 17)', type: 'select', options: ['Completed', 'Not completed'] },
          { key: 't20_c2', label: 'SDE / Normalised EBITDA verified (Tool 18)', type: 'select', options: ['Completed', 'Not completed'] },
          { key: 't20_c3', label: '10 Value Markers scored (Tool 19)', type: 'select', options: ['Completed', 'Not completed'] },
          { key: 't20_c4', label: 'DSCR confirmed to meet Judo/NAB requirements', type: 'select', options: ['Confirmed — passes', 'Not yet confirmed'] },
          { key: 't20_c5', label: 'Solicitor briefed on deal structure', type: 'select', options: ['Briefed', 'Not yet briefed'] },
          { key: 't20_c6', label: 'Finance broker / Judo/NAB advisor briefed', type: 'select', options: ['Briefed', 'Not yet briefed'] },
          { key: 't20_c7', label: 'Offer structure agreed (cash, seller finance, earn-out)', type: 'select', options: ['Agreed', 'Still being determined'] },
          { key: 't20_c8', label: 'Conditions precedent identified (finance, DD, lease assignment)', type: 'select', options: ['Identified', 'Not yet identified'] },
          { key: 't20_c9', label: 'Handover period agreed in principle', type: 'select', options: ['Agreed', 'Not yet discussed'] },
          { key: 't20_c10', label: 'Non-compete / restraint of trade discussed', type: 'select', options: ['Discussed', 'Not yet discussed'] },
          { key: 't20_offer_notes', label: 'Offer Strategy Notes', type: 'textarea', placeholder: 'Negotiation strategy, seller motivation, key leverage points, walk-away price...' },
        ]
      },
    ]
  },

  // ─── TOOL 21: LOI Advanced ───────────────────────────────────────────────────
  {
    toolId: 21,
    sections: [
      {
        title: 'LOI Parties & Deal',
        fields: [
          { key: 't21_buyer', label: 'Buyer Full Name / Entity', type: 'text', required: true },
          { key: 't21_buyer_abn', label: 'Buyer ABN / ACN', type: 'text' },
          { key: 't21_seller', label: 'Seller Full Name / Entity', type: 'text' },
          { key: 't21_seller_abn', label: 'Seller ABN / ACN', type: 'text' },
          { key: 't21_business', label: 'Business Name', type: 'text' },
          { key: 't21_loi_date', label: 'LOI Date', type: 'date' },
          { key: 't21_jurisdiction', label: 'Governing Jurisdiction', type: 'select', options: ['New South Wales', 'Victoria', 'Queensland', 'Western Australia', 'South Australia', 'Tasmania', 'ACT', 'Northern Territory'] },
        ]
      },
      {
        title: 'Purchase Price & Structure',
        fields: [
          { key: 't21_purchase_price', label: 'Total Purchase Price (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't21_cash_at_settlement', label: 'Cash at Settlement (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't21_seller_finance_amount', label: 'Seller Finance Amount (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't21_seller_finance_rate', label: 'Seller Finance Interest Rate (%)', type: 'percentage', placeholder: '0' },
          { key: 't21_seller_finance_term', label: 'Seller Finance Term (months)', type: 'number', placeholder: '0' },
          { key: 't21_earnout_amount', label: 'Earn-Out Amount (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't21_earnout_targets', label: 'Earn-Out Performance Targets', type: 'textarea', placeholder: 'e.g. $X payable if revenue exceeds $Y in Year 1 post-settlement...' },
          { key: 't21_earnout_period', label: 'Earn-Out Measurement Period', type: 'text', placeholder: 'e.g. 12 months from settlement date' },
          { key: 't21_deposit', label: 'Deposit Amount (AUD)', type: 'currency', prefix: '$', placeholder: '0', helper: 'Typically 5–10% of purchase price, held in trust' },
          { key: 't21_deposit_refundable', label: 'Is Deposit Refundable if Conditions Not Met?', type: 'select', options: ['Yes — fully refundable', 'Partially refundable', 'Non-refundable'] },
        ]
      },
      {
        title: 'Conditions Precedent',
        fields: [
          { key: 't21_cp_finance', label: 'Finance Condition', type: 'textarea', placeholder: 'e.g. Subject to buyer obtaining unconditional finance approval of $X from Judo Bank by [date]' },
          { key: 't21_cp_dd', label: 'Due Diligence Condition', type: 'textarea', placeholder: 'e.g. Subject to satisfactory completion of financial, legal, and operational due diligence by [date]' },
          { key: 't21_cp_lease', label: 'Lease Assignment Condition', type: 'textarea', placeholder: 'e.g. Subject to landlord consent to assignment of lease on terms acceptable to buyer' },
          { key: 't21_cp_other', label: 'Other Conditions', type: 'textarea', placeholder: 'e.g. PPSR clear, ATO clearance, key staff retention, licence transfer...' },
          { key: 't21_exclusivity', label: 'Exclusivity Period Requested', type: 'text', placeholder: 'e.g. 30 days from LOI execution' },
        ]
      },
      {
        title: 'Transition & Restraint',
        fields: [
          { key: 't21_handover', label: 'Handover Period', type: 'select', options: ['1–4 weeks', '1–3 months', '3–6 months', '6–12 months', 'Ongoing consulting'] },
          { key: 't21_handover_terms', label: 'Handover Terms', type: 'textarea', placeholder: 'Paid or unpaid, hours per week, key activities to be covered...' },
          { key: 't21_restraint', label: 'Non-Compete / Restraint of Trade', type: 'textarea', placeholder: 'e.g. Seller agrees not to operate a competing business within 50km for 3 years from settlement' },
          { key: 't21_solicitor_notes', label: 'Solicitor Review Notes', type: 'textarea', placeholder: 'Any solicitor comments, amendments, or concerns...' },
        ]
      },
    ]
  },

  // ─── TOOL 22: LOI Simple ─────────────────────────────────────────────────────
  {
    toolId: 22,
    sections: [
      {
        title: 'LOI Details',
        fields: [
          { key: 't22_buyer', label: 'Buyer Name', type: 'text', required: true },
          { key: 't22_seller', label: 'Seller Name', type: 'text' },
          { key: 't22_business', label: 'Business Name', type: 'text' },
          { key: 't22_date', label: 'Date', type: 'date' },
          { key: 't22_price', label: 'Proposed Purchase Price (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't22_structure', label: 'Deal Structure Summary', type: 'textarea', placeholder: 'e.g. $1.5M cash at settlement + $200K seller finance over 24 months at 5% p.a.' },
          { key: 't22_conditions', label: 'Key Conditions', type: 'textarea', placeholder: 'Finance, due diligence, lease, other...' },
          { key: 't22_exclusivity', label: 'Exclusivity Period', type: 'text', placeholder: 'e.g. 21 days' },
          { key: 't22_dd_period', label: 'Due Diligence Period', type: 'text', placeholder: 'e.g. 30 days from execution' },
          { key: 't22_target_settlement', label: 'Target Settlement Date', type: 'date' },
          { key: 't22_handover', label: 'Handover Period', type: 'text', placeholder: 'e.g. 4 weeks post-settlement' },
          { key: 't22_notes', label: 'Additional Notes', type: 'textarea', placeholder: 'Any other terms, special conditions, or negotiation points...' },
        ]
      },
    ]
  },

  // ─── TOOL 23: Asset Purchase Agreement ──────────────────────────────────────
  {
    toolId: 23,
    sections: [
      {
        title: 'APA Parties & Business',
        fields: [
          { key: 't23_buyer_entity', label: 'Buyer Legal Entity Name', type: 'text', required: true },
          { key: 't23_buyer_abn', label: 'Buyer ABN', type: 'text' },
          { key: 't23_buyer_address', label: 'Buyer Registered Address', type: 'textarea' },
          { key: 't23_seller_entity', label: 'Seller Legal Entity Name', type: 'text' },
          { key: 't23_seller_abn', label: 'Seller ABN', type: 'text' },
          { key: 't23_business_name', label: 'Business Name', type: 'text' },
          { key: 't23_apa_date', label: 'APA Execution Date', type: 'date' },
          { key: 't23_settlement_date', label: 'Settlement Date', type: 'date' },
          { key: 't23_jurisdiction', label: 'Governing State', type: 'select', options: ['New South Wales', 'Victoria', 'Queensland', 'Western Australia', 'South Australia', 'Tasmania', 'ACT', 'Northern Territory'] },
        ]
      },
      {
        title: 'Assets Being Purchased',
        fields: [
          { key: 't23_assets_included', label: 'Assets Included in Sale', type: 'textarea', placeholder: 'e.g. All plant & equipment, goodwill, IP, customer lists, trade name, website, social media accounts, stock at valuation, work in progress...' },
          { key: 't23_assets_excluded', label: 'Assets Excluded from Sale', type: 'textarea', placeholder: 'e.g. Seller\'s personal vehicle, debtors prior to settlement date, cash in bank...' },
          { key: 't23_stock_value', label: 'Stock Value at Settlement (AUD)', type: 'currency', prefix: '$', placeholder: '0', helper: 'To be confirmed by stocktake at settlement' },
          { key: 't23_plant_equipment', label: 'Plant & Equipment Value (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't23_goodwill', label: 'Goodwill Value (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
        ]
      },
      {
        title: 'GST & Stamp Duty',
        fields: [
          { key: 't23_gst_going_concern', label: 'Is sale structured as GST-free Going Concern?', type: 'select', options: ['Yes — both parties GST registered, enterprise continuing', 'No — GST applies', 'Uncertain — seeking ATO advice'] },
          { key: 't23_gst_notes', label: 'GST Notes', type: 'textarea', placeholder: 'ATO going concern conditions: seller is registered for GST, buyer is registered for GST, enterprise is continuing, written agreement states sale is of going concern...' },
          { key: 't23_stamp_duty', label: 'Stamp Duty Applicable?', type: 'select', options: ['No — asset sale (no stamp duty on goodwill in most states)', 'Yes — on land/property component', 'Seeking advice'] },
          { key: 't23_stamp_duty_amount', label: 'Estimated Stamp Duty (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
        ]
      },
      {
        title: 'Employment & Fair Work',
        fields: [
          { key: 't23_staff_transfer', label: 'Staff Transfer Approach', type: 'select', options: ['All staff offered employment by buyer', 'Selected staff offered employment', 'No staff transfer — buyer hiring fresh'] },
          { key: 't23_entitlements', label: 'Employee Entitlements at Settlement', type: 'textarea', placeholder: 'How are accrued leave, long service leave, and redundancy entitlements being handled? Adjustment to purchase price?' },
          { key: 't23_fairwork_compliance', label: 'Fair Work Compliance Confirmed', type: 'select', options: ['Yes — seller has confirmed compliance', 'Pending — being verified in DD', 'Issues identified'] },
        ]
      },
      {
        title: 'Solicitor & Completion Notes',
        fields: [
          { key: 't23_buyer_solicitor', label: 'Buyer\'s Solicitor', type: 'text' },
          { key: 't23_seller_solicitor', label: 'Seller\'s Solicitor', type: 'text' },
          { key: 't23_key_issues', label: 'Key APA Negotiation Issues', type: 'textarea', placeholder: 'Any contentious terms, amendments, or unresolved issues...' },
          { key: 't23_apa_signed', label: 'APA Signed by Both Parties?', type: 'select', options: ['Not yet', 'Buyer signed', 'Both parties signed'] },
        ]
      },
    ]
  },

  // ─── TOOL 24: Due Diligence Checklist ───────────────────────────────────────
  {
    toolId: 24,
    sections: [
      {
        title: 'DD Overview',
        fields: [
          { key: 't24_client', label: 'Client Name', type: 'text', required: true },
          { key: 't24_business', label: 'Business Name', type: 'text' },
          { key: 't24_dd_start', label: 'DD Start Date', type: 'date' },
          { key: 't24_dd_end', label: 'DD End Date', type: 'date' },
          { key: 't24_solicitor', label: 'Solicitor Conducting Legal DD', type: 'text' },
          { key: 't24_accountant', label: 'Accountant Conducting Financial DD', type: 'text' },
          { key: 't24_overall_status', label: 'Overall DD Status', type: 'select', options: ['Not started', 'In progress', 'Completed — satisfactory', 'Completed — issues found', 'Aborted'] },
        ]
      },
      {
        title: 'Financial Due Diligence',
        fields: [
          { key: 't24_f1', label: 'F1: 3 years P&L statements received and verified', type: 'select', options: ['Not received', 'Received', 'Verified — clean', 'Verified — issues found'] },
          { key: 't24_f1_notes', label: 'F1 Notes', type: 'text' },
          { key: 't24_f2', label: 'F2: Balance sheets reviewed (3 years)', type: 'select', options: ['Not received', 'Received', 'Verified — clean', 'Issues found'] },
          { key: 't24_f3', label: 'F3: BAS statements reviewed (2 years)', type: 'select', options: ['Not received', 'Received', 'Verified'] },
          { key: 't24_f4', label: 'F4: ATO portal access confirmed — no outstanding debt', type: 'select', options: ['Not checked', 'Confirmed — clear', 'Issues — ATO debt found'] },
          { key: 't24_f4_notes', label: 'F4 ATO Notes', type: 'textarea', placeholder: 'Any ATO debt, payment plans, or disputes...' },
          { key: 't24_f5', label: 'F5: Debtors and creditors aged trial balance reviewed', type: 'select', options: ['Not received', 'Received', 'Reviewed — acceptable', 'Issues found'] },
          { key: 't24_f6', label: 'F6: Add-backs and normalised EBITDA agreed with seller', type: 'select', options: ['Not agreed', 'Agreed', 'Disputed'] },
          { key: 't24_f7', label: 'F7: Bank statements reconciled to financials (12 months)', type: 'select', options: ['Not received', 'Received', 'Reconciled — clean', 'Discrepancies found'] },
        ]
      },
      {
        title: 'Legal Due Diligence',
        fields: [
          { key: 't24_l1', label: 'L1: ASIC company search completed', type: 'select', options: ['Not done', 'Completed — clear', 'Issues found'] },
          { key: 't24_l1_notes', label: 'L1 ASIC Notes', type: 'text', placeholder: 'Director history, charges, insolvency flags...' },
          { key: 't24_l2', label: 'L2: PPSR search completed', type: 'select', options: ['Not done', 'Completed — clear', 'Security interests found'] },
          { key: 't24_l2_notes', label: 'L2 PPSR Notes', type: 'text' },
          { key: 't24_l3', label: 'L3: Court records search completed', type: 'select', options: ['Not done', 'Completed — clear', 'Litigation found'] },
          { key: 't24_l4', label: 'L4: Lease reviewed — term, rent, assignment consent', type: 'select', options: ['N/A — no lease', 'Not reviewed', 'Reviewed — acceptable', 'Issues found'] },
          { key: 't24_l4_notes', label: 'L4 Lease Notes', type: 'textarea', placeholder: 'Lease term remaining, rent, options, landlord consent status...' },
          { key: 't24_l5', label: 'L5: Key contracts reviewed (customers, suppliers)', type: 'select', options: ['Not reviewed', 'Reviewed — transferable', 'Issues — non-transferable clauses'] },
          { key: 't24_l6', label: 'L6: IP ownership confirmed (trademarks, domain, brand)', type: 'select', options: ['Not checked', 'Confirmed — owned by seller', 'Issues found'] },
          { key: 't24_l7', label: 'L7: Licences and permits confirmed and transferable', type: 'select', options: ['N/A', 'Confirmed', 'Issues — licence not transferable'] },
        ]
      },
      {
        title: 'Employment & Fair Work',
        fields: [
          { key: 't24_e1', label: 'E1: Employee contracts reviewed', type: 'select', options: ['Not reviewed', 'Reviewed — compliant', 'Issues found'] },
          { key: 't24_e2', label: 'E2: Award wage compliance verified (Fair Work)', type: 'select', options: ['Not checked', 'Verified — compliant', 'Underpayment risk found'] },
          { key: 't24_e2_notes', label: 'E2 Fair Work Notes', type: 'textarea', placeholder: 'Any underpayment risks, award classification issues, penalty rate concerns...' },
          { key: 't24_e3', label: 'E3: Accrued leave entitlements quantified', type: 'select', options: ['Not quantified', 'Quantified', 'Adjustment agreed'] },
          { key: 't24_e3_amount', label: 'E3 Total Accrued Entitlements (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't24_e4', label: 'E4: Superannuation payments up to date', type: 'select', options: ['Not checked', 'Confirmed — up to date', 'Arrears found'] },
          { key: 't24_e5', label: 'E5: Workers compensation insurance current', type: 'select', options: ['Not checked', 'Confirmed', 'Issues found'] },
        ]
      },
      {
        title: 'Operational Due Diligence',
        fields: [
          { key: 't24_o1', label: 'O1: Site visit completed', type: 'select', options: ['Not done', 'Completed'] },
          { key: 't24_o1_notes', label: 'O1 Site Visit Notes', type: 'textarea', placeholder: 'Condition of premises, equipment, stock, overall impression...' },
          { key: 't24_o2', label: 'O2: Plant & equipment condition assessed', type: 'select', options: ['Not assessed', 'Assessed — good condition', 'Issues — maintenance required'] },
          { key: 't24_o3', label: 'O3: Stock count / valuation completed', type: 'select', options: ['N/A', 'Not done', 'Completed'] },
          { key: 't24_o4', label: 'O4: Customer references checked (2–3 key customers)', type: 'select', options: ['Not done', 'Completed — positive', 'Concerns raised'] },
          { key: 't24_o5', label: 'O5: Key staff retention risk assessed', type: 'select', options: ['Not assessed', 'Low risk', 'Medium risk', 'High risk — key staff may leave'] },
          { key: 't24_dd_summary', label: 'DD Summary & Key Findings', type: 'textarea', placeholder: 'Overall DD outcome, key issues found, price adjustments required, conditions to be resolved before settlement...' },
        ]
      },
    ]
  },

  // ─── TOOL 25: Financing Options ──────────────────────────────────────────────
  {
    toolId: 25,
    sections: [
      {
        title: 'Client & Deal Details',
        fields: [
          { key: 't25_client', label: 'Client Name', type: 'text', required: true },
          { key: 't25_business', label: 'Business Being Acquired', type: 'text' },
          { key: 't25_purchase_price', label: 'Purchase Price (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't25_date', label: 'Date', type: 'date' },
        ]
      },
      {
        title: 'Primary Finance — Judo Bank / NAB',
        fields: [
          { key: 't25_lender', label: 'Primary Lender', type: 'select', options: ['Judo Bank', 'NAB', 'ANZ', 'CBA', 'Westpac', 'Macquarie', 'Other major bank'] },
          { key: 't25_loan_amount', label: 'Loan Amount Sought (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't25_loan_term', label: 'Loan Term (years)', type: 'number', placeholder: '7' },
          { key: 't25_interest_rate', label: 'Interest Rate (% p.a.)', type: 'percentage', placeholder: '0.0' },
          { key: 't25_repayment_type', label: 'Repayment Type', type: 'select', options: ['Principal & interest', 'Interest only (initial period)', 'Balloon payment'] },
          { key: 't25_security', label: 'Security Offered', type: 'textarea', placeholder: 'e.g. Residential property, business assets, personal guarantee...' },
          { key: 't25_preapproval_status', label: 'Pre-Approval Status', type: 'select', options: ['Not yet applied', 'Application submitted', 'Conditional approval', 'Unconditional approval'] },
          { key: 't25_preapproval_amount', label: 'Pre-Approved Amount (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't25_broker_name', label: 'Finance Broker / Firm', type: 'text', placeholder: 'Finance broker name and firm' },
          { key: 't25_lender_notes', label: 'Lender Notes / Conditions', type: 'textarea', placeholder: 'Any special conditions, LVR requirements, personal guarantee terms...' },
        ]
      },
      {
        title: 'Equity & Deposit',
        fields: [
          { key: 't25_equity_amount', label: 'Equity Contribution (AUD)', type: 'currency', prefix: '$', placeholder: '0', helper: 'Your cash contribution — typically 30–40% of purchase price' },
          { key: 't25_equity_source', label: 'Equity Source', type: 'textarea', placeholder: 'e.g. Cash savings $X, home equity $X, SMSF $X, redundancy payout $X' },
          { key: 't25_smsf_applicable', label: 'SMSF Being Used?', type: 'select', options: ['No', 'Yes — seeking SMSF advice', 'Yes — SMSF advice obtained', 'Yes — SMSF approved for use'] },
          { key: 't25_smsf_notes', label: 'SMSF Notes', type: 'textarea', placeholder: 'SMSF balance, advisor name, structure being used (LRBA or direct)...' },
        ]
      },
      {
        title: 'Seller Finance',
        fields: [
          { key: 't25_sf_amount', label: 'Seller Finance Amount (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't25_sf_rate', label: 'Seller Finance Interest Rate (% p.a.)', type: 'percentage', placeholder: '0' },
          { key: 't25_sf_term', label: 'Seller Finance Term (months)', type: 'number', placeholder: '0' },
          { key: 't25_sf_security', label: 'Seller Finance Security', type: 'textarea', placeholder: 'e.g. Caveat over property, charge over business assets, personal guarantee...' },
          { key: 't25_sf_notes', label: 'Seller Finance Negotiation Notes', type: 'textarea', placeholder: 'Seller\'s position on vendor finance, any conditions...' },
        ]
      },
      {
        title: 'Finance Summary',
        fields: [
          { key: 't25_total_equity', label: 'Total Equity (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't25_total_debt', label: 'Total Debt (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't25_lvr', label: 'Loan-to-Value Ratio (%)', type: 'percentage', placeholder: '0', helper: 'Total Debt ÷ Purchase Price × 100' },
          { key: 't25_annual_repayments', label: 'Total Annual Debt Repayments (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't25_dscr_final', label: 'Final DSCR', type: 'number', placeholder: '0.00', helper: 'Normalised EBITDA ÷ Annual Debt Service. Must exceed 1.25x for Judo/NAB' },
        ]
      },
    ]
  },

  // ─── TOOL 26: Expertise to Equity ───────────────────────────────────────────
  {
    toolId: 26,
    sections: [
      {
        title: 'Client Details',
        fields: [
          { key: 't26_client', label: 'Client Name', type: 'text', required: true },
          { key: 't26_date', label: 'Date', type: 'date' },
        ]
      },
      {
        title: 'Expertise Inventory',
        description: 'Identify specific expertise that can be offered in lieu of cash equity to reduce the deposit required.',
        fields: [
          { key: 't26_expertise_1', label: 'Expertise Area 1', type: 'text', placeholder: 'e.g. National sales leadership and team building' },
          { key: 't26_expertise_1_value', label: 'Estimated Annual Value to Business (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't26_expertise_1_proof', label: 'Evidence / Proof Point', type: 'textarea', placeholder: 'Specific achievement demonstrating this expertise...' },
          { key: 't26_expertise_2', label: 'Expertise Area 2', type: 'text', placeholder: 'e.g. Financial management and P&L discipline' },
          { key: 't26_expertise_2_value', label: 'Estimated Annual Value to Business (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't26_expertise_3', label: 'Expertise Area 3', type: 'text', placeholder: 'e.g. Digital marketing and customer acquisition' },
          { key: 't26_expertise_3_value', label: 'Estimated Annual Value to Business (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
        ]
      },
      {
        title: 'Equity Contribution Proposal',
        fields: [
          { key: 't26_cash_equity', label: 'Cash Equity Available (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't26_expertise_equity', label: 'Expertise Equity Proposed (AUD)', type: 'currency', prefix: '$', placeholder: '0', helper: 'Capitalised value of expertise contribution — typically 1–3 years of annual value' },
          { key: 't26_total_equity', label: 'Total Equity Offered (Cash + Expertise) (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't26_equity_pct', label: 'Total Equity as % of Purchase Price', type: 'percentage', placeholder: '0' },
          { key: 't26_seller_agreement', label: 'Has seller agreed to expertise equity component?', type: 'select', options: ['Not yet discussed', 'In discussion', 'Agreed in principle', 'Formally agreed'] },
          { key: 't26_structure_notes', label: 'Expertise-to-Equity Structure Notes', type: 'textarea', placeholder: 'How is the expertise equity being documented? Consulting agreement, reduced price, deferred payment? Seek legal advice on structure.' },
        ]
      },
    ]
  },

  // ─── TOOL 27: Seller Finance Avatar ─────────────────────────────────────────
  {
    toolId: 27,
    sections: [
      {
        title: 'Deal Details',
        fields: [
          { key: 't27_client', label: 'Client Name', type: 'text', required: true },
          { key: 't27_seller', label: 'Seller Name', type: 'text' },
          { key: 't27_business', label: 'Business Name', type: 'text' },
          { key: 't27_date', label: 'Date', type: 'date' },
        ]
      },
      {
        title: 'Seller Profile Assessment',
        description: 'Understanding the seller\'s motivation is critical to structuring seller finance.',
        fields: [
          { key: 't27_seller_age', label: 'Seller Age (approximate)', type: 'select', options: ['Under 45', '45–55', '55–65', '65+'] },
          { key: 't27_seller_motivation', label: 'Primary Seller Motivation', type: 'select', options: ['Retirement', 'Health / personal reasons', 'Burnout / lifestyle change', 'Relocating', 'New venture / opportunity', 'Partnership dispute', 'Financial pressure', 'Unsolicited approach — not actively selling'] },
          { key: 't27_seller_urgency', label: 'Seller Urgency to Close', type: 'select', options: ['High — wants to close ASAP', 'Moderate — flexible on timing', 'Low — happy to wait for right buyer'] },
          { key: 't27_seller_income_need', label: 'Does seller need ongoing income post-sale?', type: 'select', options: ['Yes — seller finance income is important', 'Somewhat — would prefer lump sum but open', 'No — prefers full cash at settlement'] },
          { key: 't27_seller_tax', label: 'Seller Tax Position on Lump Sum vs Instalments', type: 'textarea', placeholder: 'Has seller considered CGT implications of lump sum vs instalment payments? Small Business CGT concessions may apply.' },
        ]
      },
      {
        title: 'Seller Finance Proposal',
        fields: [
          { key: 't27_sf_amount', label: 'Proposed Seller Finance Amount (AUD)', type: 'currency', prefix: '$', placeholder: '0', helper: 'Typically 10–30% of purchase price' },
          { key: 't27_sf_pct', label: 'Seller Finance as % of Purchase Price', type: 'percentage', placeholder: '0' },
          { key: 't27_sf_rate', label: 'Proposed Interest Rate (% p.a.)', type: 'percentage', placeholder: '5.0', helper: 'Market rate for seller finance: 4–7% p.a.' },
          { key: 't27_sf_term', label: 'Proposed Term (months)', type: 'number', placeholder: '24' },
          { key: 't27_sf_repayment', label: 'Repayment Structure', type: 'select', options: ['Monthly principal + interest', 'Interest only then balloon', 'Quarterly payments', 'Annual payments', 'Bullet payment at end of term'] },
          { key: 't27_sf_security', label: 'Security for Seller Finance', type: 'textarea', placeholder: 'e.g. Caveat over buyer\'s property, charge over business assets, personal guarantee from buyer...' },
          { key: 't27_sf_default', label: 'Default Provisions', type: 'textarea', placeholder: 'What happens if buyer defaults on seller finance payments?' },
          { key: 't27_sf_seller_response', label: 'Seller\'s Response to Seller Finance Proposal', type: 'select', options: ['Not yet proposed', 'Receptive — in discussion', 'Agreed', 'Rejected — seller wants full cash'] },
          { key: 't27_sf_notes', label: 'Seller Finance Negotiation Notes', type: 'textarea', placeholder: 'Key discussion points, seller concerns, compromise positions...' },
        ]
      },
    ]
  },

  // ─── TOOL 28: Closing Checklist ──────────────────────────────────────────────
  {
    toolId: 28,
    sections: [
      {
        title: 'Settlement Details',
        fields: [
          { key: 't28_client', label: 'Client Name', type: 'text', required: true },
          { key: 't28_business', label: 'Business Name', type: 'text' },
          { key: 't28_settlement_date', label: 'Settlement Date', type: 'date' },
          { key: 't28_solicitor', label: 'Solicitor Handling Settlement', type: 'text' },
          { key: 't28_final_price', label: 'Final Purchase Price (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
        ]
      },
      {
        title: 'Pre-Settlement Checklist (2 Weeks Before)',
        fields: [
          { key: 't28_pre1', label: 'Finance unconditionally approved and funds confirmed', type: 'select', options: ['Not done', 'Completed'] },
          { key: 't28_pre2', label: 'APA signed by both parties', type: 'select', options: ['Not done', 'Completed'] },
          { key: 't28_pre3', label: 'Lease assignment consent from landlord obtained', type: 'select', options: ['N/A', 'Not done', 'Completed'] },
          { key: 't28_pre4', label: 'PPSR search completed — clear', type: 'select', options: ['Not done', 'Completed — clear', 'Issues resolved'] },
          { key: 't28_pre5', label: 'ATO clearance obtained (no outstanding debt)', type: 'select', options: ['Not done', 'Completed — clear', 'Debt resolved'] },
          { key: 't28_pre6', label: 'New entity (Pty Ltd) established for acquisition', type: 'select', options: ['Not done', 'Completed'] },
          { key: 't28_pre6_entity', label: 'New Entity Name & ACN', type: 'text', placeholder: 'e.g. Smith Holdings Pty Ltd ACN 123 456 789' },
          { key: 't28_pre7', label: 'Business bank account opened in new entity name', type: 'select', options: ['Not done', 'Completed'] },
          { key: 't28_pre8', label: 'Business insurance arranged (public liability, PI, workers comp)', type: 'select', options: ['Not done', 'Completed'] },
          { key: 't28_pre9', label: 'Key staff informed and retention confirmed', type: 'select', options: ['Not done', 'Completed'] },
          { key: 't28_pre10', label: 'Stocktake completed (if applicable)', type: 'select', options: ['N/A', 'Not done', 'Completed'] },
          { key: 't28_pre10_value', label: 'Final Stock Value at Settlement (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
        ]
      },
      {
        title: 'Settlement Day Checklist',
        fields: [
          { key: 't28_sd1', label: 'Settlement funds transferred to solicitor trust account', type: 'select', options: ['Not done', 'Completed'] },
          { key: 't28_sd2', label: 'Final settlement statement reviewed and approved', type: 'select', options: ['Not done', 'Completed'] },
          { key: 't28_sd3', label: 'Keys, access codes, and passwords received from seller', type: 'select', options: ['Not done', 'Completed'] },
          { key: 't28_sd4', label: 'Business name / trading name transferred', type: 'select', options: ['Not done', 'Completed'] },
          { key: 't28_sd5', label: 'Domain name and website access transferred', type: 'select', options: ['N/A', 'Not done', 'Completed'] },
          { key: 't28_sd6', label: 'Social media accounts transferred', type: 'select', options: ['N/A', 'Not done', 'Completed'] },
          { key: 't28_sd7', label: 'Phone numbers transferred / redirected', type: 'select', options: ['N/A', 'Not done', 'Completed'] },
          { key: 't28_sd8', label: 'Supplier accounts transferred to new entity', type: 'select', options: ['Not done', 'In progress', 'Completed'] },
          { key: 't28_sd9', label: 'Customer notifications sent (if required)', type: 'select', options: ['N/A', 'Not done', 'Completed'] },
        ]
      },
      {
        title: 'Post-Settlement (Week 1)',
        fields: [
          { key: 't28_ps1', label: 'ASIC business name registration updated', type: 'select', options: ['Not done', 'Completed'] },
          { key: 't28_ps2', label: 'ABN registration updated / new ABN obtained', type: 'select', options: ['Not done', 'Completed'] },
          { key: 't28_ps3', label: 'GST registration confirmed', type: 'select', options: ['Not done', 'Completed'] },
          { key: 't28_ps4', label: 'Payroll system set up in new entity', type: 'select', options: ['Not done', 'Completed'] },
          { key: 't28_ps5', label: 'Superannuation fund set up / transferred', type: 'select', options: ['Not done', 'Completed'] },
          { key: 't28_ps6', label: 'Accounting software (Xero/MYOB) transferred to new entity', type: 'select', options: ['Not done', 'Completed'] },
          { key: 't28_ps7', label: 'First all-staff meeting held', type: 'select', options: ['Not done', 'Completed'] },
          { key: 't28_settlement_notes', label: 'Settlement Notes & Issues', type: 'textarea', placeholder: 'Any issues at settlement, outstanding items, follow-up actions...' },
        ]
      },
    ]
  },

  // ─── TOOL 29: First 100 Days Plan ───────────────────────────────────────────
  {
    toolId: 29,
    sections: [
      {
        title: 'Business & Client Details',
        fields: [
          { key: 't29_client', label: 'New Owner Name', type: 'text', required: true },
          { key: 't29_business', label: 'Business Name', type: 'text' },
          { key: 't29_day_zero', label: 'Day Zero (Settlement Date)', type: 'date' },
          { key: 't29_day100', label: 'Day 100 Target Date', type: 'date' },
        ]
      },
      {
        title: 'Day 1 Priorities',
        fields: [
          { key: 't29_d1_intro', label: 'Staff Introduction Plan', type: 'textarea', placeholder: 'How will you introduce yourself? What will you say? What tone will you set?' },
          { key: 't29_d1_message', label: 'Key Message to Staff on Day 1', type: 'textarea', placeholder: 'Write your Day 1 message to the team — what stays the same, what will change, what you need from them...' },
          { key: 't29_d1_customer', label: 'Customer Communication Plan', type: 'textarea', placeholder: 'Which customers need to be contacted on Day 1? What will you say?' },
          { key: 't29_d1_systems', label: 'Critical Systems to Access on Day 1', type: 'textarea', placeholder: 'Accounting software, CRM, banking, email, phone system...' },
        ]
      },
      {
        title: 'Week 1 Priorities (Days 1–7)',
        fields: [
          { key: 't29_w1_listen', label: 'Listen & Learn Plan', type: 'textarea', placeholder: 'Who will you meet with in Week 1? What questions will you ask? (Staff, key customers, key suppliers)' },
          { key: 't29_w1_quick_wins', label: 'Quick Wins Identified', type: 'textarea', placeholder: 'What can you improve or fix in Week 1 that will build credibility with the team?' },
          { key: 't29_w1_cash', label: 'Cash Position Review', type: 'textarea', placeholder: 'What is the opening cash balance? What are the immediate payment obligations?' },
          { key: 't29_w1_risks', label: 'Immediate Risks to Address', type: 'textarea', placeholder: 'Any urgent operational, staff, or customer risks that need immediate attention?' },
        ]
      },
      {
        title: 'Month 1 Priorities (Days 1–30)',
        fields: [
          { key: 't29_m1_revenue', label: 'Revenue Protection Plan', type: 'textarea', placeholder: 'How will you protect and maintain existing revenue? Which customers are at risk of leaving?' },
          { key: 't29_m1_staff', label: 'Staff Assessment & Retention Plan', type: 'textarea', placeholder: 'Which staff are critical? What retention strategies will you implement?' },
          { key: 't29_m1_financials', label: 'Financial Review Plan', type: 'textarea', placeholder: 'When will you complete your first financial review? What are you looking for?' },
          { key: 't29_m1_kpis', label: 'Key KPIs to Track from Month 1', type: 'textarea', placeholder: 'Revenue, gross margin, cash, debtor days, staff turnover, customer satisfaction...' },
          { key: 't29_m1_seller_handover', label: 'Seller Handover Activities', type: 'textarea', placeholder: 'Key knowledge transfer activities, introductions, and training from the seller...' },
        ]
      },
      {
        title: 'Months 2–3 Priorities (Days 31–90)',
        fields: [
          { key: 't29_m23_strategy', label: 'Strategic Priorities for Months 2–3', type: 'textarea', placeholder: 'What are the 3 most important strategic initiatives in your first 90 days?' },
          { key: 't29_m23_growth', label: 'Growth Initiatives Identified', type: 'textarea', placeholder: 'What growth opportunities have you identified? What will you pursue first?' },
          { key: 't29_m23_systems', label: 'Systems & Process Improvements', type: 'textarea', placeholder: 'What systems or processes need to be improved or implemented?' },
          { key: 't29_m23_team', label: 'Team Development Plan', type: 'textarea', placeholder: 'Any new hires needed? Training? Performance management?' },
          { key: 't29_m23_advisor', label: '90-Day Review with 120% Advisor', type: 'select', options: ['Not scheduled', 'Scheduled', 'Completed'] },
          { key: 't29_m23_review_date', label: '90-Day Review Date', type: 'date' },
        ]
      },
    ]
  },

  // ─── TOOL 30: Working Capital Forecast ──────────────────────────────────────
  {
    toolId: 30,
    sections: [
      {
        title: 'Business & Client Details',
        fields: [
          { key: 't30_client', label: 'Client Name', type: 'text', required: true },
          { key: 't30_business', label: 'Business Name', type: 'text' },
          { key: 't30_date', label: 'Forecast Prepared Date', type: 'date' },
          { key: 't30_opening_cash', label: 'Opening Cash Balance at Settlement (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't30_working_capital_facility', label: 'Working Capital Facility Available (AUD)', type: 'currency', prefix: '$', placeholder: '0', helper: 'Overdraft, line of credit, or working capital loan from Judo/NAB' },
        ]
      },
      {
        title: 'Month 1 Cash Flow',
        fields: [
          { key: 't30_m1_revenue', label: 'Month 1 — Expected Revenue (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't30_m1_cogs', label: 'Month 1 — Cost of Goods Sold (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't30_m1_wages', label: 'Month 1 — Wages & Super (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't30_m1_rent', label: 'Month 1 — Rent (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't30_m1_debt', label: 'Month 1 — Loan Repayments (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't30_m1_other', label: 'Month 1 — Other Operating Costs (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't30_m1_net', label: 'Month 1 — Net Cash Flow (AUD)', type: 'currency', prefix: '$', placeholder: '0', helper: 'Revenue − COGS − Wages − Rent − Debt − Other' },
          { key: 't30_m1_closing', label: 'Month 1 — Closing Cash Balance (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
        ]
      },
      {
        title: 'Month 2 Cash Flow',
        fields: [
          { key: 't30_m2_revenue', label: 'Month 2 — Expected Revenue (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't30_m2_wages', label: 'Month 2 — Wages & Super (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't30_m2_rent', label: 'Month 2 — Rent (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't30_m2_debt', label: 'Month 2 — Loan Repayments (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't30_m2_other', label: 'Month 2 — Other Costs (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't30_m2_net', label: 'Month 2 — Net Cash Flow (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't30_m2_closing', label: 'Month 2 — Closing Cash Balance (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
        ]
      },
      {
        title: 'Month 3 Cash Flow',
        fields: [
          { key: 't30_m3_revenue', label: 'Month 3 — Expected Revenue (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't30_m3_wages', label: 'Month 3 — Wages & Super (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't30_m3_rent', label: 'Month 3 — Rent (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't30_m3_debt', label: 'Month 3 — Loan Repayments (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't30_m3_other', label: 'Month 3 — Other Costs (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't30_m3_net', label: 'Month 3 — Net Cash Flow (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't30_m3_closing', label: 'Month 3 — Closing Cash Balance (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
        ]
      },
      {
        title: 'Months 4–6 Summary',
        fields: [
          { key: 't30_m46_revenue', label: 'Months 4–6 — Total Revenue (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't30_m46_costs', label: 'Months 4–6 — Total Costs (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't30_m46_net', label: 'Months 4–6 — Net Cash Flow (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't30_m6_closing', label: 'Month 6 — Closing Cash Balance (AUD)', type: 'currency', prefix: '$', placeholder: '0' },
          { key: 't30_minimum_cash', label: 'Minimum Cash Balance During 6 Months (AUD)', type: 'currency', prefix: '$', placeholder: '0', helper: 'This is your stress test — must remain positive at all times' },
          { key: 't30_cash_risk', label: 'Cash Flow Risk Assessment', type: 'select', options: ['Low — comfortable buffer throughout', 'Medium — tight in months 1–2', 'High — additional working capital needed'] },
          { key: 't30_contingency', label: 'Contingency Plan if Revenue Below Forecast', type: 'textarea', placeholder: 'What will you do if revenue is 20% below forecast in Month 1? Draw on working capital facility, reduce costs, accelerate collections...' },
          { key: 't30_advisor_notes', label: 'Advisor Notes on Cash Flow Forecast', type: 'textarea', placeholder: 'Advisor comments on assumptions, risks, and recommended buffers...' },
        ]
      },
    ]
  },

];
