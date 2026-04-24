import AppLayout from "@/components/AppLayout";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { toast } from "sonner";
import { useEffect, useState } from "react";

type FormData = {
  fullName: string; email: string; phone: string; location: string;
  avgAnnualIncome: string; yearsAtIncome: string; redundancyDate: string; redundancyPayout: string;
  cashSavings: string; superBalance: string; propertyEquity: string; otherAssets: string;
  totalLiabilities: string; monthlyLivingExpenses: string; dependants: string;
};

const empty: FormData = {
  fullName: "", email: "", phone: "", location: "",
  avgAnnualIncome: "", yearsAtIncome: "", redundancyDate: "", redundancyPayout: "",
  cashSavings: "", superBalance: "", propertyEquity: "", otherAssets: "",
  totalLiabilities: "", monthlyLivingExpenses: "", dependants: "",
};

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1">{label}</label>
      {hint && <p className="text-xs text-muted-foreground mb-1.5">{hint}</p>}
      {children}
    </div>
  );
}

function Input({ value, onChange, placeholder, type = "text", prefix }: {
  value: string; onChange: (v: string) => void; placeholder?: string; type?: string; prefix?: string;
}) {
  return (
    <div className="relative">
      {prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">{prefix}</span>}
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-lg border border-border bg-input text-foreground text-sm px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground ${prefix ? "pl-7" : ""}`}
      />
    </div>
  );
}

export default function ProfilePage() {
  const { isAuthenticated } = useAuth();
  const { data: saved, isLoading } = trpc.profile.get.useQuery(undefined, { enabled: isAuthenticated });
  const save = trpc.profile.save.useMutation({ onSuccess: () => toast.success("Profile saved") });
  const [form, setForm] = useState<FormData>(empty);

  useEffect(() => {
    if (saved) {
      setForm({
        fullName: saved.fullName || "",
        email: saved.email || "",
        phone: saved.phone || "",
        location: saved.location || "",
        avgAnnualIncome: saved.avgAnnualIncome?.toString() || "",
        yearsAtIncome: saved.yearsAtIncome?.toString() || "",
        redundancyDate: saved.redundancyDate || "",
        redundancyPayout: saved.redundancyPayout?.toString() || "",
        cashSavings: saved.cashSavings?.toString() || "",
        superBalance: saved.superBalance?.toString() || "",
        propertyEquity: saved.propertyEquity?.toString() || "",
        otherAssets: saved.otherAssets?.toString() || "",
        totalLiabilities: saved.totalLiabilities?.toString() || "",
        monthlyLivingExpenses: saved.monthlyLivingExpenses?.toString() || "",
        dependants: saved.dependants?.toString() || "",
      });
    }
  }, [saved]);

  const set = (k: keyof FormData) => (v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = () => {
    if (!isAuthenticated) { window.location.href = getLoginUrl(); return; }
    save.mutate({
      fullName: form.fullName || undefined,
      email: form.email || undefined,
      phone: form.phone || undefined,
      location: form.location || undefined,
      avgAnnualIncome: form.avgAnnualIncome || undefined,
      yearsAtIncome: form.yearsAtIncome ? parseInt(form.yearsAtIncome) : undefined,
      redundancyDate: form.redundancyDate || undefined,
      redundancyPayout: form.redundancyPayout || undefined,
      cashSavings: form.cashSavings || undefined,
      superBalance: form.superBalance || undefined,
      propertyEquity: form.propertyEquity || undefined,
      otherAssets: form.otherAssets || undefined,
      totalLiabilities: form.totalLiabilities || undefined,
      monthlyLivingExpenses: form.monthlyLivingExpenses || undefined,
      dependants: form.dependants ? parseInt(form.dependants) : undefined,
    });
  };

  // Computed totals
  const totalAssets = [form.cashSavings, form.superBalance, form.propertyEquity, form.otherAssets]
    .map(v => parseFloat(v) || 0).reduce((a, b) => a + b, 0);
  const netWorth = totalAssets - (parseFloat(form.totalLiabilities) || 0);
  const fmt = (n: number) => n > 0 ? `$${n.toLocaleString("en-AU", { maximumFractionDigits: 0 })}` : "—";

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-mono font-bold">1</div>
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Step 1 of 5</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-foreground">My Profile</h1>
          <p className="text-muted-foreground mt-1 text-sm">Your personal and financial background. This information helps determine your borrowing capacity and deal size.</p>
        </div>

        {isLoading ? (
          <div className="text-muted-foreground text-sm">Loading your saved profile...</div>
        ) : (
          <div className="space-y-8">
            {/* Personal */}
            <section>
              <h2 className="font-serif text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border">Personal Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Full Name"><Input value={form.fullName} onChange={set("fullName")} placeholder="David Short" /></Field>
                <Field label="Email"><Input value={form.email} onChange={set("email")} placeholder="david@email.com" type="email" /></Field>
                <Field label="Phone"><Input value={form.phone} onChange={set("phone")} placeholder="+61 4XX XXX XXX" /></Field>
                <Field label="Location (City, State)"><Input value={form.location} onChange={set("location")} placeholder="Sydney, NSW" /></Field>
              </div>
            </section>

            {/* Income */}
            <section>
              <h2 className="font-serif text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border">Income History</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Average Annual Income (AUD)" hint="Your average total remuneration package over the past 10 years">
                  <Input value={form.avgAnnualIncome} onChange={set("avgAnnualIncome")} placeholder="500000" prefix="$" />
                </Field>
                <Field label="Years at this income level">
                  <Input value={form.yearsAtIncome} onChange={set("yearsAtIncome")} placeholder="10" type="number" />
                </Field>
                <Field label="Redundancy date">
                  <Input value={form.redundancyDate} onChange={set("redundancyDate")} placeholder="March 2025" />
                </Field>
                <Field label="Redundancy payout received (AUD)">
                  <Input value={form.redundancyPayout} onChange={set("redundancyPayout")} placeholder="150000" prefix="$" />
                </Field>
              </div>
            </section>

            {/* Assets */}
            <section>
              <h2 className="font-serif text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border">Assets & Liabilities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <Field label="Cash & Savings (AUD)" hint="Bank accounts, term deposits, managed funds">
                  <Input value={form.cashSavings} onChange={set("cashSavings")} placeholder="250000" prefix="$" />
                </Field>
                <Field label="Superannuation Balance (AUD)">
                  <Input value={form.superBalance} onChange={set("superBalance")} placeholder="800000" prefix="$" />
                </Field>
                <Field label="Property Equity (AUD)" hint="Current market value minus mortgage balance">
                  <Input value={form.propertyEquity} onChange={set("propertyEquity")} placeholder="600000" prefix="$" />
                </Field>
                <Field label="Other Assets (AUD)" hint="Shares, vehicles, business interests">
                  <Input value={form.otherAssets} onChange={set("otherAssets")} placeholder="100000" prefix="$" />
                </Field>
                <Field label="Total Liabilities (AUD)" hint="Mortgages, car loans, credit cards, HECS">
                  <Input value={form.totalLiabilities} onChange={set("totalLiabilities")} placeholder="400000" prefix="$" />
                </Field>
              </div>

              {/* Computed summary */}
              {totalAssets > 0 && (
                <div className="p-4 rounded-lg bg-muted/30 border border-border grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-xs text-muted-foreground mb-0.5">Total Assets</div>
                    <div className="font-mono font-semibold text-foreground text-sm">{fmt(totalAssets)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-0.5">Total Liabilities</div>
                    <div className="font-mono font-semibold text-foreground text-sm">{fmt(parseFloat(form.totalLiabilities) || 0)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-0.5">Net Worth</div>
                    <div className={`font-mono font-semibold text-sm ${netWorth >= 0 ? "text-primary" : "text-destructive"}`}>{fmt(netWorth)}</div>
                  </div>
                </div>
              )}
            </section>

            {/* Lifestyle */}
            <section>
              <h2 className="font-serif text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border">Lifestyle & Obligations</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Monthly living expenses (AUD)" hint="Mortgage/rent, food, school fees, utilities, etc.">
                  <Input value={form.monthlyLivingExpenses} onChange={set("monthlyLivingExpenses")} placeholder="8000" prefix="$" />
                </Field>
                <Field label="Number of dependants">
                  <Input value={form.dependants} onChange={set("dependants")} placeholder="2" type="number" />
                </Field>
              </div>
            </section>

            {/* Save */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleSave}
                disabled={save.isPending}
                className="px-6 py-2.5 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 text-sm"
              >
                {save.isPending ? "Saving..." : "Save Profile"}
              </button>
              {!isAuthenticated && (
                <p className="text-xs text-muted-foreground">
                  <button onClick={() => { window.location.href = getLoginUrl(); }} className="text-primary underline">Sign in</button> to save your progress
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
