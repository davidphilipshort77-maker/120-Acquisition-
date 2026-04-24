import AppLayout from "@/components/AppLayout";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { toast } from "sonner";
import { useEffect, useState } from "react";

type FormData = {
  industryBackground: string; coreSkills: string; leadershipYears: string; teamSizeManaged: string;
  preferredIndustries: string; avoidIndustries: string; preferredLocation: string;
  willingToRelocate: boolean; targetRevenue: string; targetEbitda: string;
  preferredDealSize: string; ownerInvolvement: string; riskTolerance: string;
  workHoursPerWeek: string; timelineToClose: string; whyAcquiring: string;
};

const empty: FormData = {
  industryBackground: "", coreSkills: "", leadershipYears: "", teamSizeManaged: "",
  preferredIndustries: "", avoidIndustries: "", preferredLocation: "",
  willingToRelocate: false, targetRevenue: "", targetEbitda: "",
  preferredDealSize: "", ownerInvolvement: "", riskTolerance: "moderate",
  workHoursPerWeek: "", timelineToClose: "", whyAcquiring: "",
};

const AU_INDUSTRIES = [
  "Trade Services (plumbing, electrical, HVAC)",
  "Commercial Cleaning & Facilities",
  "Healthcare & Allied Health",
  "Childcare & Education",
  "Food Manufacturing & Distribution",
  "Transport & Logistics",
  "Business Services (accounting, IT, consulting)",
  "Retail (non-fashion)",
  "Manufacturing (light industrial)",
  "Aged Care & NDIS Services",
  "Construction & Building",
  "Automotive Services",
];

const AVOID_INDUSTRIES = [
  "Hospitality (cafes, restaurants)",
  "Fashion Retail",
  "Nightclubs & Entertainment",
  "Tobacco & Vaping",
  "Highly regulated (pharmacy, financial services)",
];

const DEAL_SIZES = [
  "Under $500k",
  "$500k – $1M",
  "$1M – $2M",
  "$2M – $5M",
  "$5M – $10M",
  "Over $10M",
];

const INVOLVEMENT = [
  "Owner-operator (hands-on, full time)",
  "Active owner (strategic, 3–4 days/week)",
  "Semi-passive (GM in place, oversight only)",
];

const TIMELINES = [
  "3–6 months",
  "6–12 months",
  "12–18 months",
  "18+ months",
];

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1">{label}</label>
      {hint && <p className="text-xs text-muted-foreground mb-1.5">{hint}</p>}
      {children}
    </div>
  );
}

function Input({ value, onChange, placeholder, type = "text" }: {
  value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-lg border border-border bg-input text-foreground text-sm px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground"
    />
  );
}

function Textarea({ value, onChange, placeholder, rows = 3 }: {
  value: string; onChange: (v: string) => void; placeholder?: string; rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full rounded-lg border border-border bg-input text-foreground text-sm px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground resize-none"
    />
  );
}

function Select({ value, onChange, options }: {
  value: string; onChange: (v: string) => void; options: { value: string; label: string }[];
}) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full rounded-lg border border-border bg-input text-foreground text-sm px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-primary"
    >
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}

function CheckboxGroup({ options, selected, onChange }: {
  options: string[]; selected: string; onChange: (v: string) => void;
}) {
  const sel = selected ? selected.split("|") : [];
  const toggle = (opt: string) => {
    const next = sel.includes(opt) ? sel.filter(s => s !== opt) : [...sel, opt];
    onChange(next.join("|"));
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {options.map(opt => (
        <label key={opt} className="flex items-start gap-2 cursor-pointer group">
          <input
            type="checkbox"
            checked={sel.includes(opt)}
            onChange={() => toggle(opt)}
            className="mt-0.5 accent-primary"
          />
          <span className="text-sm text-foreground leading-snug">{opt}</span>
        </label>
      ))}
    </div>
  );
}

export default function BusinessFitPage() {
  const { isAuthenticated } = useAuth();
  const { data: saved, isLoading } = trpc.businessFit.get.useQuery(undefined, { enabled: isAuthenticated });
  const save = trpc.businessFit.save.useMutation({ onSuccess: () => toast.success("Business fit saved") });
  const [form, setForm] = useState<FormData>(empty);

  useEffect(() => {
    if (saved) {
      setForm({
        industryBackground: saved.industryBackground || "",
        coreSkills: saved.coreSkills || "",
        leadershipYears: saved.leadershipYears?.toString() || "",
        teamSizeManaged: saved.teamSizeManaged || "",
        preferredIndustries: saved.preferredIndustries || "",
        avoidIndustries: saved.avoidIndustries || "",
        preferredLocation: saved.preferredLocation || "",
        willingToRelocate: saved.willingToRelocate ?? false,
        targetRevenue: saved.targetRevenue || "",
        targetEbitda: saved.targetEbitda || "",
        preferredDealSize: saved.preferredDealSize || "",
        ownerInvolvement: saved.ownerInvolvement || "",
        riskTolerance: saved.riskTolerance || "moderate",
        workHoursPerWeek: saved.workHoursPerWeek?.toString() || "",
        timelineToClose: saved.timelineToClose || "",
        whyAcquiring: saved.whyAcquiring || "",
      });
    }
  }, [saved]);

  const set = (k: keyof FormData) => (v: string | boolean) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = () => {
    if (!isAuthenticated) { window.location.href = getLoginUrl(); return; }
    save.mutate({
      industryBackground: form.industryBackground || undefined,
      coreSkills: form.coreSkills || undefined,
      leadershipYears: form.leadershipYears ? parseInt(form.leadershipYears) : undefined,
      teamSizeManaged: form.teamSizeManaged || undefined,
      preferredIndustries: form.preferredIndustries || undefined,
      avoidIndustries: form.avoidIndustries || undefined,
      preferredLocation: form.preferredLocation || undefined,
      willingToRelocate: form.willingToRelocate,
      targetRevenue: form.targetRevenue || undefined,
      targetEbitda: form.targetEbitda || undefined,
      preferredDealSize: form.preferredDealSize || undefined,
      ownerInvolvement: form.ownerInvolvement || undefined,
      riskTolerance: (form.riskTolerance as "conservative" | "moderate" | "growth") || undefined,
      workHoursPerWeek: form.workHoursPerWeek ? parseInt(form.workHoursPerWeek) : undefined,
      timelineToClose: form.timelineToClose || undefined,
      whyAcquiring: form.whyAcquiring || undefined,
    });
  };

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-mono font-bold">2</div>
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Step 2 of 5</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-foreground">Business Fit</h1>
          <p className="text-muted-foreground mt-1 text-sm">What type of business suits your skills, experience, lifestyle and goals?</p>
        </div>

        {isLoading ? (
          <div className="text-muted-foreground text-sm">Loading your saved answers...</div>
        ) : (
          <div className="space-y-8">
            {/* Background */}
            <section>
              <h2 className="font-serif text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border">Your Background</h2>
              <div className="space-y-4">
                <Field label="Industry background" hint="What industries have you worked in during your corporate career?">
                  <Textarea value={form.industryBackground} onChange={set("industryBackground") as (v: string) => void} placeholder="e.g. Financial services, banking, insurance — 15 years in risk and compliance leadership" />
                </Field>
                <Field label="Core skills & strengths" hint="What are you genuinely excellent at? Think operations, sales, finance, people, systems...">
                  <Textarea value={form.coreSkills} onChange={set("coreSkills") as (v: string) => void} placeholder="e.g. P&L management, team leadership, process improvement, client relationships, regulatory compliance" />
                </Field>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Years in leadership roles">
                    <Input value={form.leadershipYears} onChange={set("leadershipYears") as (v: string) => void} placeholder="12" type="number" />
                  </Field>
                  <Field label="Largest team managed" hint="Headcount">
                    <Input value={form.teamSizeManaged} onChange={set("teamSizeManaged") as (v: string) => void} placeholder="e.g. 45 direct + 120 indirect" />
                  </Field>
                </div>
              </div>
            </section>

            {/* Industry preferences */}
            <section>
              <h2 className="font-serif text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border">Industry Preferences</h2>
              <div className="space-y-5">
                <Field label="Industries I am interested in" hint="Select all that appeal to you">
                  <CheckboxGroup options={AU_INDUSTRIES} selected={form.preferredIndustries} onChange={set("preferredIndustries") as (v: string) => void} />
                </Field>
                <Field label="Industries I want to avoid" hint="Select all that do not suit you">
                  <CheckboxGroup options={AVOID_INDUSTRIES} selected={form.avoidIndustries} onChange={set("avoidIndustries") as (v: string) => void} />
                </Field>
              </div>
            </section>

            {/* Deal preferences */}
            <section>
              <h2 className="font-serif text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border">Deal Preferences</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Preferred deal size (purchase price)">
                  <Select
                    value={form.preferredDealSize}
                    onChange={set("preferredDealSize") as (v: string) => void}
                    options={[{ value: "", label: "Select..." }, ...DEAL_SIZES.map(d => ({ value: d, label: d }))]}
                  />
                </Field>
                <Field label="Target annual revenue">
                  <Input value={form.targetRevenue} onChange={set("targetRevenue") as (v: string) => void} placeholder="e.g. $2M – $5M" />
                </Field>
                <Field label="Target EBITDA / SDE">
                  <Input value={form.targetEbitda} onChange={set("targetEbitda") as (v: string) => void} placeholder="e.g. $400k – $800k" />
                </Field>
                <Field label="Owner involvement model">
                  <Select
                    value={form.ownerInvolvement}
                    onChange={set("ownerInvolvement") as (v: string) => void}
                    options={[{ value: "", label: "Select..." }, ...INVOLVEMENT.map(i => ({ value: i, label: i }))]}
                  />
                </Field>
                <Field label="Preferred location (state/city)">
                  <Input value={form.preferredLocation} onChange={set("preferredLocation") as (v: string) => void} placeholder="e.g. Sydney metro, NSW" />
                </Field>
                <Field label="Willing to relocate?">
                  <div className="flex items-center gap-3 mt-1">
                    {[{ v: true, l: "Yes" }, { v: false, l: "No" }].map(({ v, l }) => (
                      <label key={l} className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" checked={form.willingToRelocate === v} onChange={() => set("willingToRelocate")(v)} className="accent-primary" />
                        <span className="text-sm text-foreground">{l}</span>
                      </label>
                    ))}
                  </div>
                </Field>
              </div>
            </section>

            {/* Lifestyle */}
            <section>
              <h2 className="font-serif text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border">Lifestyle & Risk</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Hours per week willing to work">
                  <Input value={form.workHoursPerWeek} onChange={set("workHoursPerWeek") as (v: string) => void} placeholder="40" type="number" />
                </Field>
                <Field label="Timeline to close first deal">
                  <Select
                    value={form.timelineToClose}
                    onChange={set("timelineToClose") as (v: string) => void}
                    options={[{ value: "", label: "Select..." }, ...TIMELINES.map(t => ({ value: t, label: t }))]}
                  />
                </Field>
                <Field label="Risk tolerance">
                  <Select
                    value={form.riskTolerance}
                    onChange={set("riskTolerance") as (v: string) => void}
                    options={[
                      { value: "conservative", label: "Conservative — proven business, stable cash flow" },
                      { value: "moderate", label: "Moderate — some growth potential, manageable risk" },
                      { value: "growth", label: "Growth — turnaround or high-growth opportunity" },
                    ]}
                  />
                </Field>
              </div>
              <div className="mt-4">
                <Field label="Why are you acquiring a business?" hint="What does business ownership mean to you? What does success look like in 3 years?">
                  <Textarea value={form.whyAcquiring} onChange={set("whyAcquiring") as (v: string) => void} rows={4} placeholder="e.g. I want to build lasting wealth and legacy outside of corporate employment. I want to leverage my 20 years of operational expertise in a business I own and control..." />
                </Field>
              </div>
            </section>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleSave}
                disabled={save.isPending}
                className="px-6 py-2.5 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 text-sm"
              >
                {save.isPending ? "Saving..." : "Save Business Fit"}
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
