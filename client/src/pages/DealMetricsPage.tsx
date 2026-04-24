import AppLayout from "@/components/AppLayout";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { toast } from "sonner";
import { useState } from "react";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";

type Deal = {
  id?: number;
  dealName: string; businessType: string; industry: string;
  annualRevenue: string; grossProfit: string; ebitda: string; sde: string; ownerSalaryAddback: string;
  multipleUsed: string; askingPrice: string; negotiatedPrice: string;
  depositPercent: string; depositAmount: string; bankLoanAmount: string;
  sellerFinanceAmount: string; sellerFinanceTerm: number; sellerFinanceRate: string;
  loanTerm: number; interestRate: string; annualDebtService: string; dscr: string;
  workingCapitalRequired: string; notes: string; status: "draft" | "active" | "closed" | "passed";
};

const emptyDeal = (): Deal => ({
  dealName: "", businessType: "", industry: "",
  annualRevenue: "", grossProfit: "", ebitda: "", sde: "", ownerSalaryAddback: "",
  multipleUsed: "", askingPrice: "", negotiatedPrice: "",
  depositPercent: "30", depositAmount: "", bankLoanAmount: "",
  sellerFinanceAmount: "0", sellerFinanceTerm: 3, sellerFinanceRate: "5",
  loanTerm: 7, interestRate: "8.5", annualDebtService: "", dscr: "",
  workingCapitalRequired: "", notes: "", status: "draft",
});

const AU_INDUSTRIES = [
  "Trade Services", "Commercial Cleaning", "Healthcare & Allied Health",
  "Childcare & Education", "Food Manufacturing", "Transport & Logistics",
  "Business Services", "Retail", "Manufacturing", "Aged Care & NDIS",
  "Construction", "Automotive", "Other",
];

const MULTIPLES: Record<string, string> = {
  "Trade Services": "2.5–4x SDE",
  "Commercial Cleaning": "2–3x SDE",
  "Healthcare & Allied Health": "3–5x EBITDA",
  "Childcare & Education": "4–6x EBITDA",
  "Food Manufacturing": "3–4.5x EBITDA",
  "Transport & Logistics": "2.5–4x EBITDA",
  "Business Services": "3–5x EBITDA",
  "Retail": "1.5–2.5x SDE",
  "Manufacturing": "3–5x EBITDA",
  "Aged Care & NDIS": "4–7x EBITDA",
  "Construction": "2–3.5x SDE",
  "Automotive": "2–3x SDE",
};

function calcPMT(rate: number, nper: number, pv: number): number {
  if (rate === 0 || pv === 0) return 0;
  return (pv * rate * Math.pow(1 + rate, nper)) / (Math.pow(1 + rate, nper) - 1);
}

function fmt(v: string | number) {
  const n = typeof v === "string" ? parseFloat(v) : v;
  if (!n || isNaN(n)) return "—";
  return `$${Math.round(n).toLocaleString("en-AU")}`;
}

function DealCard({ deal, onSave, onDelete }: {
  deal: Deal;
  onSave: (d: Deal) => void;
  onDelete: () => void;
}) {
  const [d, setD] = useState<Deal>(deal);
  const [open, setOpen] = useState(!deal.id);
  const set = (k: keyof Deal) => (v: string | number) => setD(prev => ({ ...prev, [k]: v }));

  // Auto-calculations
  const ebitda = parseFloat(d.ebitda) || 0;
  const sde = parseFloat(d.sde) || 0;
  const multiple = parseFloat(d.multipleUsed) || 0;
  const negotiated = parseFloat(d.negotiatedPrice) || parseFloat(d.askingPrice) || 0;
  const depositPct = parseFloat(d.depositPercent) || 30;
  const depositAmt = negotiated * (depositPct / 100);
  const bankLoan = negotiated - depositAmt - (parseFloat(d.sellerFinanceAmount) || 0);
  const monthlyRate = (parseFloat(d.interestRate) || 8.5) / 100 / 12;
  const nper = (d.loanTerm || 7) * 12;
  const annualDebt = calcPMT(monthlyRate, nper, bankLoan) * 12;
  const sellerDebt = parseFloat(d.sellerFinanceAmount) > 0
    ? calcPMT((parseFloat(d.sellerFinanceRate) || 5) / 100 / 12, (d.sellerFinanceTerm || 3) * 12, parseFloat(d.sellerFinanceAmount)) * 12
    : 0;
  const totalDebt = annualDebt + sellerDebt;
  const dscrVal = ebitda > 0 && totalDebt > 0 ? ebitda / totalDebt : (sde > 0 && totalDebt > 0 ? sde / totalDebt : 0);

  const statusColors: Record<string, string> = {
    draft: "text-muted-foreground bg-muted",
    active: "text-primary bg-primary/10",
    closed: "text-green-400 bg-green-400/10",
    passed: "text-destructive bg-destructive/10",
  };

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 cursor-pointer hover:bg-accent/20 transition-colors" onClick={() => setOpen(o => !o)}>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-foreground truncate">{d.dealName || "Untitled Deal"}</div>
          <div className="text-xs text-muted-foreground">{d.industry || "No industry set"} · {d.businessType || "No type"}</div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {negotiated > 0 && <span className="font-mono text-sm text-primary font-semibold">{fmt(negotiated)}</span>}
          {dscrVal > 0 && (
            <span className={`text-xs px-2 py-0.5 rounded-full font-mono ${dscrVal >= 1.25 ? "text-green-400 bg-green-400/10" : "text-destructive bg-destructive/10"}`}>
              {dscrVal.toFixed(2)}x
            </span>
          )}
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[d.status]}`}>{d.status}</span>
          {open ? <ChevronUp size={16} className="text-muted-foreground" /> : <ChevronDown size={16} className="text-muted-foreground" />}
        </div>
      </div>

      {open && (
        <div className="px-5 pb-5 border-t border-border space-y-6">
          {/* Basic info */}
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-1">
              <label className="block text-xs text-muted-foreground mb-1">Deal Name</label>
              <input value={d.dealName} onChange={e => set("dealName")(e.target.value)} placeholder="e.g. Sydney Plumbing Co" className="w-full rounded-lg border border-border bg-input text-foreground text-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Industry</label>
              <select value={d.industry} onChange={e => set("industry")(e.target.value)} className="w-full rounded-lg border border-border bg-input text-foreground text-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary">
                <option value="">Select...</option>
                {AU_INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Business Type</label>
              <input value={d.businessType} onChange={e => set("businessType")(e.target.value)} placeholder="e.g. Trade services" className="w-full rounded-lg border border-border bg-input text-foreground text-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
          </div>

          {/* Financials */}
          <div>
            <h3 className="text-xs text-muted-foreground uppercase tracking-widest mb-3">Business Financials</h3>
            {d.industry && MULTIPLES[d.industry] && (
              <div className="mb-3 px-3 py-2 rounded-lg bg-primary/5 border border-primary/20 text-xs text-muted-foreground">
                <span className="text-primary font-semibold">AU benchmark multiple for {d.industry}:</span> {MULTIPLES[d.industry]}
              </div>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { k: "annualRevenue", label: "Annual Revenue" },
                { k: "grossProfit", label: "Gross Profit" },
                { k: "ebitda", label: "EBITDA" },
                { k: "ownerSalaryAddback", label: "Owner Salary Add-back" },
                { k: "sde", label: "SDE (EBITDA + Add-backs)" },
              ].map(({ k, label }) => (
                <div key={k}>
                  <label className="block text-xs text-muted-foreground mb-1">{label}</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">$</span>
                    <input
                      value={(d as Record<string, string | number>)[k] as string}
                      onChange={e => set(k as keyof Deal)(e.target.value)}
                      placeholder="0"
                      className="w-full rounded-lg border border-border bg-input text-foreground text-sm pl-6 pr-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>
              ))}
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Multiple used</label>
                <input value={d.multipleUsed} onChange={e => set("multipleUsed")(e.target.value)} placeholder="e.g. 3.5" className="w-full rounded-lg border border-border bg-input text-foreground text-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div>
            <h3 className="text-xs text-muted-foreground uppercase tracking-widest mb-3">Pricing & Structure</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { k: "askingPrice", label: "Asking Price" },
                { k: "negotiatedPrice", label: "Negotiated Price" },
                { k: "workingCapitalRequired", label: "Working Capital Required" },
              ].map(({ k, label }) => (
                <div key={k}>
                  <label className="block text-xs text-muted-foreground mb-1">{label}</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">$</span>
                    <input value={(d as Record<string, string | number>)[k] as string} onChange={e => set(k as keyof Deal)(e.target.value)} placeholder="0" className="w-full rounded-lg border border-border bg-input text-foreground text-sm pl-6 pr-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary" />
                  </div>
                </div>
              ))}
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Deposit %</label>
                <div className="relative">
                  <input value={d.depositPercent} onChange={e => set("depositPercent")(e.target.value)} placeholder="30" className="w-full rounded-lg border border-border bg-input text-foreground text-sm px-3 pr-6 py-2 focus:outline-none focus:ring-1 focus:ring-primary" />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">%</span>
                </div>
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Interest Rate (p.a.)</label>
                <div className="relative">
                  <input value={d.interestRate} onChange={e => set("interestRate")(e.target.value)} placeholder="8.5" className="w-full rounded-lg border border-border bg-input text-foreground text-sm px-3 pr-6 py-2 focus:outline-none focus:ring-1 focus:ring-primary" />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">%</span>
                </div>
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Loan Term</label>
                <div className="relative">
                  <input type="number" value={d.loanTerm} onChange={e => set("loanTerm")(parseInt(e.target.value))} placeholder="7" className="w-full rounded-lg border border-border bg-input text-foreground text-sm px-3 pr-10 py-2 focus:outline-none focus:ring-1 focus:ring-primary" />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">yrs</span>
                </div>
              </div>
            </div>
          </div>

          {/* Seller finance */}
          <div>
            <h3 className="text-xs text-muted-foreground uppercase tracking-widest mb-3">Seller Finance (if applicable)</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Seller Finance Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">$</span>
                  <input value={d.sellerFinanceAmount} onChange={e => set("sellerFinanceAmount")(e.target.value)} placeholder="0" className="w-full rounded-lg border border-border bg-input text-foreground text-sm pl-6 pr-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Seller Finance Rate</label>
                <div className="relative">
                  <input value={d.sellerFinanceRate} onChange={e => set("sellerFinanceRate")(e.target.value)} placeholder="5" className="w-full rounded-lg border border-border bg-input text-foreground text-sm px-3 pr-6 py-2 focus:outline-none focus:ring-1 focus:ring-primary" />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">%</span>
                </div>
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Seller Finance Term</label>
                <div className="relative">
                  <input type="number" value={d.sellerFinanceTerm} onChange={e => set("sellerFinanceTerm")(parseInt(e.target.value))} placeholder="3" className="w-full rounded-lg border border-border bg-input text-foreground text-sm px-3 pr-10 py-2 focus:outline-none focus:ring-1 focus:ring-primary" />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">yrs</span>
                </div>
              </div>
            </div>
          </div>

          {/* Computed summary */}
          {negotiated > 0 && (
            <div className="rounded-lg border border-border bg-muted/20 p-4">
              <h3 className="text-xs text-muted-foreground uppercase tracking-widest mb-3">Deal Summary (Auto-calculated)</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div><div className="text-xs text-muted-foreground mb-0.5">Deposit Required</div><div className="font-mono text-sm font-semibold text-foreground">{fmt(depositAmt)}</div></div>
                <div><div className="text-xs text-muted-foreground mb-0.5">Bank Loan</div><div className="font-mono text-sm font-semibold text-foreground">{fmt(bankLoan)}</div></div>
                <div><div className="text-xs text-muted-foreground mb-0.5">Annual Debt Service</div><div className="font-mono text-sm font-semibold text-foreground">{fmt(totalDebt)}</div></div>
                <div>
                  <div className="text-xs text-muted-foreground mb-0.5">DSCR</div>
                  <div className={`font-mono text-sm font-bold ${dscrVal >= 1.25 ? "text-green-400" : dscrVal > 0 ? "text-destructive" : "text-muted-foreground"}`}>
                    {dscrVal > 0 ? `${dscrVal.toFixed(2)}x` : "—"}
                    {dscrVal > 0 && <span className="ml-1 text-xs">{dscrVal >= 1.25 ? "✓ Pass" : "✗ Fail"}</span>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notes & status */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs text-muted-foreground mb-1">Notes</label>
              <textarea value={d.notes} onChange={e => set("notes")(e.target.value)} rows={2} placeholder="Key observations, red flags, next steps..." className="w-full rounded-lg border border-border bg-input text-foreground text-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary resize-none" />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Status</label>
              <select value={d.status} onChange={e => set("status")(e.target.value)} className="w-full rounded-lg border border-border bg-input text-foreground text-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary">
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="closed">Closed</option>
                <option value="passed">Passed</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-1">
            <button onClick={() => onSave({ ...d, depositAmount: String(depositAmt), bankLoanAmount: String(bankLoan), annualDebtService: String(totalDebt), dscr: String(dscrVal) })} className="px-5 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors">
              Save Deal
            </button>
            <button onClick={onDelete} className="flex items-center gap-1.5 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
              <Trash2 size={14} />
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DealMetricsPage() {
  const { isAuthenticated } = useAuth();
  const { data: deals = [], refetch } = trpc.deals.list.useQuery(undefined, { enabled: isAuthenticated });
  const saveDeal = trpc.deals.save.useMutation({ onSuccess: () => { toast.success("Deal saved"); refetch(); } });
  const deleteDeal = trpc.deals.delete.useMutation({ onSuccess: () => { toast.success("Deal deleted"); refetch(); } });
  const [localDeals, setLocalDeals] = useState<Deal[]>([]);

  const handleSave = (d: Deal) => {
    if (!isAuthenticated) { window.location.href = getLoginUrl(); return; }
    saveDeal.mutate({
      id: d.id,
      dealName: d.dealName || undefined,
      businessType: d.businessType || undefined,
      industry: d.industry || undefined,
      annualRevenue: d.annualRevenue || undefined,
      grossProfit: d.grossProfit || undefined,
      ebitda: d.ebitda || undefined,
      sde: d.sde || undefined,
      ownerSalaryAddback: d.ownerSalaryAddback || undefined,
      multipleUsed: d.multipleUsed || undefined,
      askingPrice: d.askingPrice || undefined,
      negotiatedPrice: d.negotiatedPrice || undefined,
      depositPercent: d.depositPercent || undefined,
      depositAmount: d.depositAmount || undefined,
      bankLoanAmount: d.bankLoanAmount || undefined,
      sellerFinanceAmount: d.sellerFinanceAmount || undefined,
      sellerFinanceTerm: d.sellerFinanceTerm || undefined,
      sellerFinanceRate: d.sellerFinanceRate || undefined,
      loanTerm: d.loanTerm || undefined,
      interestRate: d.interestRate || undefined,
      annualDebtService: d.annualDebtService || undefined,
      dscr: d.dscr || undefined,
      workingCapitalRequired: d.workingCapitalRequired || undefined,
      notes: d.notes || undefined,
      status: d.status || undefined,
    });
  };

  const allDeals: Deal[] = isAuthenticated
    ? deals.map(d => ({
        id: d.id,
        dealName: d.dealName || "",
        businessType: d.businessType || "",
        industry: d.industry || "",
        annualRevenue: d.annualRevenue || "",
        grossProfit: d.grossProfit || "",
        ebitda: d.ebitda || "",
        sde: d.sde || "",
        ownerSalaryAddback: d.ownerSalaryAddback || "",
        multipleUsed: d.multipleUsed || "",
        askingPrice: d.askingPrice || "",
        negotiatedPrice: d.negotiatedPrice || "",
        depositPercent: d.depositPercent || "30",
        depositAmount: d.depositAmount || "",
        bankLoanAmount: d.bankLoanAmount || "",
        sellerFinanceAmount: d.sellerFinanceAmount || "0",
        sellerFinanceTerm: d.sellerFinanceTerm || 3,
        sellerFinanceRate: d.sellerFinanceRate || "5",
        loanTerm: d.loanTerm || 7,
        interestRate: d.interestRate || "8.5",
        annualDebtService: d.annualDebtService || "",
        dscr: d.dscr || "",
        workingCapitalRequired: d.workingCapitalRequired || "",
        notes: d.notes || "",
        status: (d.status as "draft" | "active" | "closed" | "passed") || "draft",
      }))
    : localDeals;

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-mono font-bold">4</div>
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Step 4 of 5</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-foreground">Deal Metrics</h1>
          <p className="text-muted-foreground mt-1 text-sm">Model and compare deals. Enter business financials to calculate deal structure, DSCR, and serviceability.</p>
        </div>

        {!isAuthenticated && (
          <div className="mb-6 p-4 rounded-lg bg-primary/5 border border-primary/20 text-sm text-muted-foreground">
            <button onClick={() => { window.location.href = getLoginUrl(); }} className="text-primary underline font-medium">Sign in</button> to save your deals across sessions.
          </div>
        )}

        <div className="space-y-4">
          {allDeals.map((deal, i) => (
            <DealCard
              key={deal.id || i}
              deal={deal}
              onSave={handleSave}
              onDelete={() => {
                if (deal.id) deleteDeal.mutate({ id: deal.id });
                else setLocalDeals(prev => prev.filter((_, j) => j !== i));
              }}
            />
          ))}
        </div>

        <button
          onClick={() => {
            if (!isAuthenticated) setLocalDeals(prev => [...prev, emptyDeal()]);
            else handleSave(emptyDeal());
          }}
          className="mt-4 w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors text-sm"
        >
          <Plus size={16} />
          Add New Deal
        </button>
      </div>
    </AppLayout>
  );
}
