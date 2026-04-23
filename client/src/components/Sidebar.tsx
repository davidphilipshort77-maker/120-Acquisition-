// Design: Obsidian Vault — Dark Premium Dashboard
// Fixed left sidebar with unit navigation, gold accent on active items

import { units } from "@/lib/toolkitData";
import { useLocation } from "wouter";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [location, navigate] = useLocation();

  const isUnitActive = (unitId: number) => {
    return location.startsWith(`/unit/${unitId}`);
  };

  const isHome = location === "/";

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-72 z-40 flex flex-col",
          "transition-transform duration-300 ease-out",
          "bg-[#0D1B2A] border-r border-white/8",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo / Brand */}
        <div className="px-6 py-6 border-b border-white/8">
          <button
            onClick={() => { navigate("/"); onClose(); }}
            className="flex flex-col gap-1 text-left w-full"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-[#C9A84C]/20 border border-[#C9A84C]/40 flex items-center justify-center">
                <span className="text-[#C9A84C] font-bold text-sm" style={{ fontFamily: 'Cormorant Garamond, serif' }}>120</span>
              </div>
              <span className="text-white font-semibold text-sm tracking-wide">120% TOOLKIT</span>
            </div>
            <p className="text-white/40 text-xs leading-tight mt-1">Business Acquisition · Australian Edition</p>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {/* Home */}
          <button
            onClick={() => { navigate("/"); onClose(); }}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left mb-1 transition-all duration-200",
              isHome
                ? "bg-[#C9A84C]/15 text-[#C9A84C] border-l-2 border-[#C9A84C]"
                : "text-white/60 hover:text-white hover:bg-white/5"
            )}
          >
            <span className="text-base">🏠</span>
            <span className="text-sm font-medium">Overview & Index</span>
          </button>

          <div className="my-3 border-t border-white/8" />

          <p className="px-3 mb-2 text-white/30 text-xs font-semibold tracking-widest uppercase">
            10 Units · 30 Tools
          </p>

          {units.map((unit) => {
            const active = isUnitActive(unit.id);
            return (
              <button
                key={unit.id}
                onClick={() => { navigate(`/unit/${unit.id}`); onClose(); }}
                className={cn(
                  "w-full flex items-start gap-3 px-3 py-2.5 rounded-lg text-left mb-0.5 transition-all duration-200",
                  active
                    ? "bg-[#C9A84C]/15 border-l-2 border-[#C9A84C]"
                    : "hover:bg-white/5 border-l-2 border-transparent"
                )}
              >
                <span className="text-base mt-0.5 shrink-0">{unit.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className={cn(
                    "text-sm font-medium leading-tight",
                    active ? "text-[#C9A84C]" : "text-white/80"
                  )}>
                    <span className="text-white/30 text-xs mr-1">U{unit.id}</span>
                    {unit.title}
                  </div>
                  <div className="text-white/35 text-xs mt-0.5 truncate">{unit.subtitle}</div>
                </div>
                <span className={cn(
                  "text-xs shrink-0 mt-0.5 font-mono",
                  active ? "text-[#C9A84C]/70" : "text-white/20"
                )}>
                  {unit.tools.length}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/8">
          <div className="text-white/25 text-xs leading-relaxed">
            <p className="font-medium text-white/40 mb-1">120% Program</p>
            <p>Pathway 3: Business Acquisition</p>
            <p className="mt-1">Powered by Contrarian Thinking MSA</p>
          </div>
        </div>
      </aside>
    </>
  );
}
