import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  BookOpen,
  Building2,
  Calculator,
  ChevronRight,
  CircleDollarSign,
  LayoutDashboard,
  Link2,
  LogOut,
  Menu,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard, step: null },
  { path: "/profile", label: "Step 1 — My Profile", icon: User, step: 1 },
  { path: "/business-fit", label: "Step 2 — Business Fit", icon: Building2, step: 2 },
  { path: "/borrowing-capacity", label: "Step 3 — Borrowing Capacity", icon: Calculator, step: 3 },
  { path: "/deal-metrics", label: "Step 4 — Deal Metrics", icon: BarChart3, step: 4 },
  { path: "/resources", label: "Step 5 — Resources", icon: Link2, step: 5 },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [location, navigate] = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogin = () => { window.location.href = getLoginUrl(); };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <CircleDollarSign size={16} className="text-primary-foreground" />
          </div>
          <div>
            <div className="font-serif text-base font-semibold text-foreground leading-tight">120% Acquisition</div>
            <div className="text-xs text-muted-foreground">Australian Edition</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ path, label, icon: Icon, step }) => {
          const active = location === path || (path !== "/dashboard" && location.startsWith(path));
          return (
            <button
              key={path}
              onClick={() => { navigate(path); setMobileOpen(false); }}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 text-left",
                active
                  ? "bg-primary/15 text-primary border border-primary/30"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              {step !== null ? (
                <div className={cn(
                  "w-5 h-5 rounded-full flex items-center justify-center text-xs font-mono font-medium shrink-0",
                  active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                )}>
                  {step}
                </div>
              ) : (
                <Icon size={16} className="shrink-0" />
              )}
              <span className="flex-1 truncate">{label}</span>
              {active && <ChevronRight size={14} className="shrink-0 text-primary" />}
            </button>
          );
        })}
      </nav>

      {/* User */}
      <div className="px-3 py-4 border-t border-border">
        {isAuthenticated && user ? (
          <div className="space-y-2">
            <div className="px-3 py-2 rounded-lg bg-muted">
              <div className="text-xs text-muted-foreground">Signed in as</div>
              <div className="text-sm font-medium text-foreground truncate">{user.name || user.email || "Client"}</div>
            </div>
            <button
              onClick={logout}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            >
              <LogOut size={14} />
              Sign out
            </button>
          </div>
        ) : (
          <button
            onClick={handleLogin}
            className="w-full px-3 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Sign in to save progress
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 shrink-0 border-r border-border bg-card">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-card border-r border-border flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <span className="font-serif text-sm font-semibold">Navigation</span>
              <button onClick={() => setMobileOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X size={18} />
              </button>
            </div>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile topbar */}
        <header className="md:hidden flex items-center gap-3 px-4 py-3 border-b border-border bg-card shrink-0">
          <button onClick={() => setMobileOpen(true)} className="text-muted-foreground hover:text-foreground">
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2">
            <CircleDollarSign size={16} className="text-primary" />
            <span className="font-serif text-sm font-semibold">120% Acquisition</span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
