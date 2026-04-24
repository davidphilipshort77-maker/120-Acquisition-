import AppLayout from "@/components/AppLayout";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { useState, useEffect } from "react";
import { Info } from "lucide-react";

type Inputs = {
  cashAvailable: number;
  superAvailable: number;
  redundancyPayout: number;
  otherEquity: number;
  depositPercent: number;
  interestRate: number;
  loanTermYears: number;
  targetDscr: number;
  annualEbitda: number;
  annualDebtService: number;
};

const defaults: Inputs = {
  cashAvailable: 250000,
  superAvailable: 0,
  redundancyPayout: 150000,
  otherEquity: 0,
  depositPercent: 30,
  interestRate: 8.5,
  loanTermYears: 7,
  targetDscr: 1.25,
  annualEbitda: 0,
  annualDebtService: 0,
};

function calcPMT(rate: number, nper: number, pv: number): number {
  if (rate === 0) return pv / nper;
  return (pv * rate * Math.pow(1 + rate, nper)) / (Math.pow(1 + rate, nper) - 1);
}

function Metric({ label, value, sub, highlight }: { label: string; value: string; sub?: string; highlight?: boolean }) {
  return (
    <div className={`p-4 rounded-lg border ${highlight ? "border-primary/40 bg-primary/5" : "border-border bg-card"}`}>
      <div className="text-xs text-muted-foreground mb-1">{label}</div>
      <div className={`font-mono font-bold text-lg ${highlight ? "text-primary" : "text-foreground"}`}>{value}</div>
      {sub && <div className="text-xs text-muted-foreground mt-0.5">{sub}</div>}
    </div>
  );
}

function SliderInput({ label, hint, value, onChange, min, max, step, prefix, suffix }: {
  label: string; hint?: string; value: number; onChange: (v: number) => void;
  min: number; max: number; step: number; prefix?: string; suffix?: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="text-sm font-medium text-foreground">{label}</label>
        <span className="font-mono text-sm text-primary font-semibold">
          {prefix}{value.toLocaleString("en-AU")}{suffix}
        </span>
      </div>
      {hint && <p className="text-xs text-muted-foreground mb-1.5">{hint}</p>}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        className="w-full accent-primary"
      />
      <div className="flex justify-between text-xs text-muted-foreground mt-0.5">
        <span>{prefix}{min.toLocaleString("en-AU")}{suffix}</span>
        <span>{prefix}{max.toLocaleString("en-AU")}{suffix}</span>
      </div>
    </div>
  );
}

export default function BorrowingCapacityPage() {
  const { isAuthenticated } = useAuth();
  const { data: profile } = trpc.profile.get.useQuery(undefined, { enabled: isAuthenticated });
  const [inp, setInp] = useState<Inputs>(defaults);

  // Pre-fill from profile
  useEffect(() => {
    if (profile) {
      setInp(prev => ({
        ...prev,
        cashAvailable: parseFloat(profile.cashSavings || "0") || prev.cashAvailable,
        superAvailable: parseFloat(profile.superBalance || "0") * 0.2 || prev.superAvailable,
        redundancyPayout: parseFloat(profile.redundancyPayout || "0") || prev.redundancyPayout,
        otherEquity: parseFloat(profile.propertyEquity || "0") * 0.1 || prev.otherEquity,
      }));
    }
  }, [profile]);

  const set = (k: keyof Inputs) => (v: number) => setInp(prev => ({ ...prev, [k]: v }));

  // Calculations
  const totalEquity = inp.cashAvailable + inp.superAvailable + inp.redundancyPayout + inp.otherEquity;
  const maxDealFromDeposit = totalEquity / (inp.depositPercent / 100);
  const maxLoanFromDeposit = maxDealFromDeposit - totalEquity;

  const monthlyRate = inp.interestRate / 100 / 12;
  const nper = inp.loanTermYears * 12;
  const annualRepayment = calcPMT(monthlyRate, nper, maxLoanFromDeposit) * 12;

  const dscrOnMaxDeal = inp.annualEbitda > 0 ? inp.annualEbitda / annualRepayment : null;

  // If EBITDA known, compute max loan from DSCR
  const maxLoanFromDscr = inp.annualEbitda > 0
    ? (() => {
        const maxAnnualDebt = inp.annualEbitda / inp.targetDscr;
        const maxAnnualDebtMonthly = maxAnnualDebt / 12;
        const r = monthlyRate;
        const n = nper;
        if (r === 0) return maxAnnualDebtMonthly * n;
        return maxAnnualDebtMonthly * (Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n));
      })()
    : null;

  const maxDealFromDscr = maxLoanFromDscr !== null ? maxLoanFromDscr + totalEquity : null;
  const bindingMax = maxLoanFromDscr !== null ? Math.min(maxLoanFromDeposit, maxLoanFromDscr) : maxLoanFromDeposit;
  const bindingDeal = bindingMax + totalEquity;

  const fmt = (n: number) => `$${Math.round(n).toLocaleString("en-AU")}`;
  const fmtM = (n: number) => n >= 1000000 ? `$${(n / 1000000).toFixed(2)}M` : fmt(n);

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-mono font-bold">3</div>
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Step 3 of 5</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-foreground">Borrowing Capacity</h1>
          <p className="text-muted-foreground mt-1 text-sm">Calculate how much you can borrow using the Judo Bank DSCR framework. Adjust the sliders to model different scenarios.</p>
        </div>

        <div className="space-y-8">
          {/* Equity inputs */}
          <section>
            <h2 className="font-serif text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border">Available Equity (Deposit Pool)</h2>
            <div className="space-y-5">
              <SliderInput label="Cash & savings available" hint="Amount you are willing to commit from cash/savings" value={inp.cashAvailable} onChange={set("cashAvailable")} min={0} max={2000000} step={10000} prefix="$" />
              <SliderInput label="Super available (SMSF / LRBA)" hint="Portion of super accessible for acquisition (typically 20–30% of balance)" value={inp.superAvailable} onChange={set("superAvailable")} min={0} max={1000000} step={10000} prefix="$" />
              <SliderInput label="Redundancy payout" value={inp.redundancyPayout} onChange={set("redundancyPayout")} min={0} max={1000000} step={5000} prefix="$" />
              <SliderInput label="Other equity (property, shares)" hint="Equity you can access via refinance or liquidation" value={inp.otherEquity} onChange={set("otherEquity")} min={0} max={2000000} step={10000} prefix="$" />
            </div>

            <div className="mt-4 p-4 rounded-lg bg-primary/5 border border-primary/20">
              <div className="text-xs text-muted-foreground mb-1">Total equity / deposit pool</div>
              <div className="font-mono font-bold text-2xl text-primary">{fmtM(totalEquity)}</div>
            </div>
          </section>

          {/* Loan structure */}
          <section>
            <h2 className="font-serif text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border">Loan Structure</h2>
            <div className="space-y-5">
              <SliderInput label="Deposit percentage required" hint="Judo Bank typically requires 30–40% deposit for business acquisition" value={inp.depositPercent} onChange={set("depositPercent")} min={20} max={50} step={5} suffix="%" />
              <SliderInput label="Interest rate (p.a.)" hint="Judo Bank indicative rate 2025: 7.5–9.5% p.a." value={inp.interestRate} onChange={set("interestRate")} min={5} max={15} step={0.25} suffix="%" />
              <SliderInput label="Loan term" value={inp.loanTermYears} onChange={set("loanTermYears")} min={3} max={15} step={1} suffix=" years" />
            </div>
          </section>

          {/* DSCR inputs */}
          <section>
            <h2 className="font-serif text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border">
              <span>DSCR Check</span>
              <span className="ml-2 text-xs font-sans font-normal text-muted-foreground">(Debt Service Coverage Ratio)</span>
            </h2>
            <div className="p-3 rounded-lg bg-muted/30 border border-border mb-4 flex gap-2">
              <Info size={14} className="text-muted-foreground shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                Judo Bank requires a minimum DSCR of 1.25x. This means the business must generate at least $1.25 of EBITDA for every $1.00 of annual debt repayment. Enter the target business's EBITDA below to check serviceability.
              </p>
            </div>
            <div className="space-y-5">
              <SliderInput label="Target business EBITDA / SDE (AUD p.a.)" hint="Leave at $0 if you don't have a specific deal in mind yet" value={inp.annualEbitda} onChange={set("annualEbitda")} min={0} max={3000000} step={10000} prefix="$" />
              <SliderInput label="Minimum DSCR required" hint="Judo Bank minimum: 1.25x. Conservative: 1.5x" value={inp.targetDscr} onChange={set("targetDscr")} min={1.0} max={2.5} step={0.05} suffix="x" />
            </div>
          </section>

          {/* Results */}
          <section>
            <h2 className="font-serif text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border">Your Capacity Summary</h2>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <Metric label="Max deal size (deposit-limited)" value={fmtM(maxDealFromDeposit)} sub={`${inp.depositPercent}% deposit rule`} />
              <Metric label="Max bank loan (deposit-limited)" value={fmtM(maxLoanFromDeposit)} />
              {maxDealFromDscr !== null && (
                <>
                  <Metric label="Max deal size (DSCR-limited)" value={fmtM(maxDealFromDscr)} sub={`At ${inp.targetDscr}x DSCR`} />
                  <Metric label="DSCR on max deal" value={dscrOnMaxDeal !== null ? `${dscrOnMaxDeal.toFixed(2)}x` : "—"} sub={dscrOnMaxDeal !== null && dscrOnMaxDeal >= inp.targetDscr ? "✓ Passes" : "✗ Fails"} />
                </>
              )}
              <Metric label="Annual debt repayment" value={fmt(annualRepayment)} sub={`${inp.loanTermYears} yr @ ${inp.interestRate}%`} />
              <Metric label="Monthly repayment" value={fmt(annualRepayment / 12)} />
            </div>

            <div className="p-5 rounded-xl border border-primary/40 bg-primary/5">
              <div className="text-xs text-primary uppercase tracking-widest font-semibold mb-1">Binding Maximum Deal Size</div>
              <div className="font-mono font-bold text-3xl text-primary">{fmtM(bindingDeal)}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {maxLoanFromDscr !== null
                  ? `Limited by: ${bindingMax === maxLoanFromDeposit ? "deposit requirement" : "DSCR serviceability"}`
                  : "Based on deposit requirement only — enter EBITDA above for DSCR check"}
              </div>
            </div>

            <div className="mt-4 p-3 rounded-lg bg-muted/30 border border-border">
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong className="text-foreground/60">Note:</strong> These calculations are indicative only. Judo Bank and other lenders will conduct their own credit assessment. Actual borrowing capacity depends on business cash flow verification, security offered, and lender credit policy at time of application. Always obtain a formal pre-approval before committing to a deal.
              </p>
            </div>
          </section>
        </div>
      </div>
    </AppLayout>
  );
}
