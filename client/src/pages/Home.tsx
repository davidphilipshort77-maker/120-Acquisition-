import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { ArrowRight, BarChart3, Building2, Calculator, CheckCircle2, CircleDollarSign, Link2, User } from "lucide-react";
import { useLocation } from "wouter";

const steps = [
  { num: 1, icon: User, title: "My Profile", desc: "Personal background, income history, assets and liabilities", path: "/profile", color: "oklch(0.78 0.12 75)" },
  { num: 2, icon: Building2, title: "Business Fit", desc: "What type of business suits your skills, lifestyle and goals", path: "/business-fit", color: "oklch(0.65 0.15 220)" },
  { num: 3, icon: Calculator, title: "Borrowing Capacity", desc: "How much you can borrow — DSCR, maximum deal size, deposit", path: "/borrowing-capacity", color: "oklch(0.65 0.15 145)" },
  { num: 4, icon: BarChart3, title: "Deal Metrics", desc: "Full deal calculator — SDE, multiples, structure, serviceability", path: "/deal-metrics", color: "oklch(0.70 0.15 30)" },
  { num: 5, icon: Link2, title: "Resources", desc: "Curated links to ASIC, Fair Work, Judo Bank, brokers and tools", path: "/resources", color: "oklch(0.68 0.12 280)" },
];

const facts = [
  "Designed for executives earning $300k–$800k for 10+ years",
  "Aligned with the 120% Business Acquisition program",
  "Australian market — ASIC, Fair Work, ATO, Judo Bank",
  "Judo Bank DSCR framework built in",
];

export default function Home() {
  const [, navigate] = useLocation();
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <CircleDollarSign size={16} className="text-primary-foreground" />
            </div>
            <span className="text-primary text-xs font-semibold tracking-widest uppercase">
              120% Program · Pathway 3 · Business Acquisition
            </span>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">
            Your Business Acquisition
            <span className="block text-primary">Pathway Tool</span>
          </h1>

          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed mb-8">
            A simple, guided tool to help you work through whether buying a business is right for you,
            what type of business suits you, how much you can borrow, and how to structure a deal —
            all tailored to the Australian market.
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <button
              onClick={() => navigate(isAuthenticated ? "/dashboard" : "/profile")}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              {isAuthenticated ? "Go to Dashboard" : "Start Your Assessment"}
              <ArrowRight size={16} />
            </button>
            {!isAuthenticated && (
              <button
                onClick={() => { window.location.href = getLoginUrl(); }}
                className="flex items-center gap-2 px-6 py-3 bg-card text-foreground border border-border font-medium rounded-lg hover:bg-accent transition-colors"
              >
                Sign in to save progress
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {facts.map(f => (
              <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 size={14} className="text-primary shrink-0" />
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="font-serif text-2xl font-semibold text-foreground mb-2">The 5-Step Journey</h2>
        <p className="text-muted-foreground text-sm mb-8">Work through each step in order. Your answers build on each other.</p>

        <div className="space-y-3">
          {steps.map(({ num, icon: Icon, title, desc, path, color }) => (
            <button
              key={num}
              onClick={() => navigate(path)}
              className="w-full group flex items-center gap-4 p-5 rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-accent/30 transition-all duration-200 text-left"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-mono font-bold text-sm"
                style={{ backgroundColor: `${color}20`, color }}
              >
                {num}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <Icon size={14} style={{ color }} />
                  <span className="font-semibold text-foreground text-sm">{title}</span>
                </div>
                <p className="text-muted-foreground text-xs leading-relaxed">{desc}</p>
              </div>
              <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* Footer note */}
      <div className="max-w-4xl mx-auto px-6 pb-12">
        <div className="p-4 rounded-lg bg-muted/30 border border-border">
          <p className="text-muted-foreground text-xs leading-relaxed">
            <strong className="text-foreground/60">Disclaimer:</strong> All tools and calculators in this platform are for educational and reference purposes only.
            Always engage qualified Australian legal, financial, and tax advisors before executing any business acquisition.
            Judo Bank and NAB lending criteria are indicative and subject to change.
          </p>
        </div>
      </div>
    </div>
  );
}
