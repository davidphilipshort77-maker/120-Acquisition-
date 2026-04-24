import AppLayout from "@/components/AppLayout";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { ArrowRight, BarChart3, Building2, Calculator, CheckCircle2, Circle, Link2, User } from "lucide-react";
import { useLocation } from "wouter";

const steps = [
  { num: 1, icon: User, title: "My Profile", desc: "Personal & financial background", path: "/profile", color: "oklch(0.78 0.12 75)" },
  { num: 2, icon: Building2, title: "Business Fit", desc: "Industry, skills & lifestyle match", path: "/business-fit", color: "oklch(0.65 0.15 220)" },
  { num: 3, icon: Calculator, title: "Borrowing Capacity", desc: "DSCR, max loan & deal size", path: "/borrowing-capacity", color: "oklch(0.65 0.15 145)" },
  { num: 4, icon: BarChart3, title: "Deal Metrics", desc: "Deal calculator & structure", path: "/deal-metrics", color: "oklch(0.70 0.15 30)" },
  { num: 5, icon: Link2, title: "Resources", desc: "Tools, links & due diligence", path: "/resources", color: "oklch(0.68 0.12 280)" },
];

export default function DashboardPage() {
  const [, navigate] = useLocation();
  const { user, isAuthenticated } = useAuth();

  const { data: profile } = trpc.profile.get.useQuery(undefined, { enabled: isAuthenticated });
  const { data: fit } = trpc.businessFit.get.useQuery(undefined, { enabled: isAuthenticated });
  const { data: deals } = trpc.deals.list.useQuery(undefined, { enabled: isAuthenticated });

  if (!isAuthenticated) {
    return (
      <AppLayout>
        <div className="max-w-2xl mx-auto px-6 py-20 text-center">
          <h1 className="font-serif text-3xl font-bold text-foreground mb-4">Sign in to view your dashboard</h1>
          <p className="text-muted-foreground mb-8">Your progress is saved securely and accessible across devices.</p>
          <button
            onClick={() => { window.location.href = getLoginUrl(); }}
            className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
          >
            Sign in
          </button>
        </div>
      </AppLayout>
    );
  }

  const completionMap: Record<number, boolean> = {
    1: !!(profile?.fullName),
    2: !!(fit?.industryBackground || fit?.preferredIndustries),
    3: !!(profile?.cashSavings || profile?.avgAnnualIncome),
    4: !!(deals && deals.length > 0),
    5: true,
  };

  const completedCount = Object.values(completionMap).filter(Boolean).length;
  const pct = Math.round((completedCount / 5) * 100);

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Welcome back</div>
          <h1 className="font-serif text-3xl font-bold text-foreground">{user?.name || "Your Dashboard"}</h1>
          <p className="text-muted-foreground mt-1 text-sm">120% Business Acquisition · Pathway 3 · Australian Edition</p>
        </div>

        {/* Progress */}
        <div className="p-5 rounded-xl border border-border bg-card mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-foreground">Overall Progress</span>
            <span className="text-primary font-mono text-sm font-semibold">{pct}%</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="mt-2 text-xs text-muted-foreground">{completedCount} of 5 steps started</div>
        </div>

        {/* Steps */}
        <div className="space-y-3">
          {steps.map(({ num, icon: Icon, title, desc, path, color }) => {
            const done = completionMap[num];
            return (
              <button
                key={num}
                onClick={() => navigate(path)}
                className="w-full group flex items-center gap-4 p-5 rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-accent/30 transition-all duration-200 text-left"
              >
                <div className="shrink-0">
                  {done
                    ? <CheckCircle2 size={22} style={{ color }} />
                    : <Circle size={22} className="text-muted-foreground" />
                  }
                </div>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-mono font-bold text-xs"
                  style={{ backgroundColor: `${color}20`, color }}
                >
                  {num}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <Icon size={13} style={{ color }} />
                    <span className="font-semibold text-foreground text-sm">{title}</span>
                    {done && <span className="text-xs px-1.5 py-0.5 rounded-full bg-primary/15 text-primary">Started</span>}
                  </div>
                  <p className="text-muted-foreground text-xs">{desc}</p>
                </div>
                <ArrowRight size={15} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
              </button>
            );
          })}
        </div>

        {/* Next step CTA */}
        {completedCount < 5 && (
          <div className="mt-8 p-5 rounded-xl border border-primary/30 bg-primary/5">
            <div className="text-xs text-primary uppercase tracking-widest mb-1 font-semibold">Recommended next step</div>
            {(() => {
              const next = steps.find(s => !completionMap[s.num]);
              if (!next) return null;
              const Icon = next.icon;
              return (
                <button
                  onClick={() => navigate(next.path)}
                  className="flex items-center gap-3 mt-2 group"
                >
                  <Icon size={16} className="text-primary" />
                  <span className="font-semibold text-foreground">{next.title}</span>
                  <ArrowRight size={14} className="text-primary group-hover:translate-x-1 transition-transform" />
                </button>
              );
            })()}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
