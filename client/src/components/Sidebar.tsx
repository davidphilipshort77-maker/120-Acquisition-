// Design: Obsidian Vault — Dark Premium Dashboard
// Fixed left sidebar with expandable unit navigation and direct tool worksheet links

import { units } from "@/lib/toolkitData";
import { useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ChevronDown, ChevronRight, FileText } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [location, navigate] = useLocation();
  const [expandedUnits, setExpandedUnits] = useState<number[]>([]);

  const isHome = location === "/";
  const activeToolId = location.startsWith("/tool/") ? parseInt(location.split("/tool/")[1], 10) : null;
  const activeUnitId = location.startsWith("/unit/") ? parseInt(location.split("/unit/")[1], 10) : null;

  const isUnitActive = (unitId: number) => {
    return activeUnitId === unitId || units.find(u => u.id === unitId)?.tools.some(t => t.id === activeToolId);
  };

  const toggleUnit = (unitId: number) => {
    setExpandedUnits(prev =>
      prev.includes(unitId) ? prev.filter(id => id !== unitId) : [...prev, unitId]
    );
  };

  const isExpanded = (unitId: number) =>
    expandedUnits.includes(unitId) || isUnitActive(unitId) || false;

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 z-30 lg:hidden" onClick={onClose} />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-72 z-40 flex flex-col",
          "transition-transform duration-300 ease-out",
          "bg-[#0D1B2A] border-r border-white/8",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Brand */}
        <div className="px-6 py-5 border-b border-white/8 shrink-0">
          <button
            onClick={() => { navigate("/"); onClose(); }}
            className="flex flex-col gap-1 text-left w-full"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-[#C9A84C]/20 border border-[#C9A84C]/40 flex items-center justify-center shrink-0">
                <span className="text-[#C9A84C] font-bold text-sm" style={{ fontFamily: 'Cormorant Garamond, serif' }}>120</span>
              </div>
              <span className="text-white font-semibold text-sm tracking-wide">120% TOOLKIT</span>
            </div>
            <p className="text-white/35 text-xs leading-tight mt-1">Business Acquisition · Australian Edition</p>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3 px-2">
          <button
            onClick={() => { navigate("/"); onClose(); }}
            className={cn(
              "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left mb-1 transition-all duration-200",
              isHome
                ? "bg-[#C9A84C]/15 text-[#C9A84C] border-l-2 border-[#C9A84C]"
                : "text-white/60 hover:text-white hover:bg-white/5 border-l-2 border-transparent"
            )}
          >
            <span className="text-sm">🏠</span>
            <span className="text-sm font-medium">Overview & Index</span>
          </button>

          <div className="my-2 border-t border-white/8" />
          <p className="px-3 mb-2 text-white/25 text-[10px] font-bold tracking-widest uppercase">
            10 Units · 30 Tools
          </p>

          {units.map((unit) => {
            const active = isUnitActive(unit.id);
            const expanded = isExpanded(unit.id);

            return (
              <div key={unit.id} className="mb-0.5">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => { navigate(`/unit/${unit.id}`); onClose(); }}
                    className={cn(
                      "flex-1 flex items-center gap-2 px-2 py-2 rounded-lg text-left transition-all duration-200 min-w-0",
                      active
                        ? "bg-[#C9A84C]/12 border-l-2 border-[#C9A84C]"
                        : "hover:bg-white/5 border-l-2 border-transparent"
                    )}
                  >
                    <span className="text-sm shrink-0">{unit.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className={cn(
                        "text-xs font-semibold leading-tight truncate",
                        active ? "text-[#C9A84C]" : "text-white/75"
                      )}>
                        <span className="text-white/25 mr-1">U{unit.id}</span>
                        {unit.title}
                      </div>
                    </div>
                    <span className={cn(
                      "text-[10px] shrink-0 font-mono",
                      active ? "text-[#C9A84C]/60" : "text-white/20"
                    )}>
                      {unit.tools.length}
                    </span>
                  </button>

                  <button
                    onClick={() => toggleUnit(unit.id)}
                    className="p-1.5 rounded text-white/30 hover:text-white/60 hover:bg-white/5 transition-colors shrink-0"
                    aria-label={expanded ? "Collapse" : "Expand"}
                  >
                    {expanded ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                  </button>
                </div>

                {expanded && (
                  <div className="ml-4 mt-0.5 mb-1 border-l border-white/8 pl-2">
                    {unit.tools.map(tool => {
                      const isToolActive = activeToolId === tool.id;
                      return (
                        <button
                          key={tool.id}
                          onClick={() => { navigate(`/tool/${tool.id}`); onClose(); }}
                          className={cn(
                            "w-full flex items-center gap-2 px-2 py-1.5 rounded text-left transition-all duration-150 group",
                            isToolActive
                              ? "bg-[#C9A84C]/15 text-[#C9A84C]"
                              : "text-white/45 hover:text-white/80 hover:bg-white/5"
                          )}
                        >
                          <FileText size={11} className={cn(
                            "shrink-0",
                            isToolActive ? "text-[#C9A84C]" : "text-white/20 group-hover:text-white/40"
                          )} />
                          <span className="text-[11px] leading-tight truncate">
                            <span className={cn("font-mono mr-1", isToolActive ? "text-[#C9A84C]/70" : "text-white/20")}>
                              T{tool.id}
                            </span>
                            {tool.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-white/8 shrink-0">
          <div className="text-white/25 text-xs leading-relaxed">
            <p className="font-semibold text-white/35 mb-1">120% Program — Pathway 3</p>
            <p>Business Acquisition · AU Edition</p>
            <p className="mt-1 text-white/15">Powered by Contrarian Thinking MSA</p>
          </div>
        </div>
      </aside>
    </>
  );
}
