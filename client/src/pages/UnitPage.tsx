// Design: Obsidian Vault — Dark Premium Dashboard
// Unit page: header, unit description, tool cards grid

import Layout from "@/components/Layout";
import { units } from "@/lib/toolkitData";
import { useLocation, useParams } from "wouter";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const priorityConfig = {
  Critical: { label: 'Critical', className: 'badge-critical' },
  High: { label: 'High', className: 'badge-high' },
  Medium: { label: 'Medium', className: 'badge-medium' },
};

export default function UnitPage() {
  const params = useParams<{ unitId: string }>();
  const [, navigate] = useLocation();

  const unitId = parseInt(params.unitId || '1');
  const unit = units.find(u => u.id === unitId);

  if (!unit) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-white/50 text-lg mb-4">Unit not found</p>
            <button onClick={() => navigate('/')} className="text-[#C9A84C] hover:underline">
              Back to Overview
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  const prevUnit = units.find(u => u.id === unitId - 1);
  const nextUnit = units.find(u => u.id === unitId + 1);

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="px-8 py-4 border-b border-white/8 flex items-center gap-2 text-sm">
        <button
          onClick={() => navigate('/')}
          className="text-white/40 hover:text-white transition-colors flex items-center gap-1"
        >
          <ArrowLeft size={14} />
          Overview
        </button>
        <ChevronRight size={14} className="text-white/20" />
        <span className="text-white/60">Unit {unit.id}</span>
        <ChevronRight size={14} className="text-white/20" />
        <span className="text-[#C9A84C]">{unit.title}</span>
      </div>

      {/* Unit Header */}
      <div
        className="px-8 py-10 border-b border-white/8"
        style={{ background: `linear-gradient(135deg, ${unit.color}15, transparent)` }}
      >
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">{unit.icon}</span>
            <div>
              <div className="text-white/30 text-xs font-mono tracking-widest uppercase">
                Unit {unit.id} of 10
              </div>
              <h1
                className="text-4xl font-bold text-white"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                {unit.title}
              </h1>
            </div>
          </div>

          <p className="text-white/60 text-lg mb-4">{unit.subtitle}</p>

          <div className="flex items-center gap-3">
            <span
              className="text-sm px-3 py-1 rounded-full font-medium"
              style={{
                backgroundColor: `${unit.color}20`,
                color: unit.color,
                border: `1px solid ${unit.color}40`
              }}
            >
              {unit.phase}
            </span>
            <span className="text-white/30 text-sm">
              {unit.tools.length} tool{unit.tools.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="px-8 py-8">
        <h2 className="text-white/40 text-xs font-semibold tracking-widest uppercase mb-6">
          Tools in this unit
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {unit.tools.map((tool) => {
            const priority = priorityConfig[tool.priority];
            return (
              <button
                key={tool.id}
                onClick={() => navigate(`/tool/${tool.id}`)}
                className="group text-left p-6 rounded-xl border border-white/8 bg-[#1B3A5C]/10 hover:bg-[#1B3A5C]/25 hover:border-white/15 transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0 pr-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white/25 text-xs font-mono">Tool {tool.id}</span>
                      <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", priority.className)}>
                        {priority.label}
                      </span>
                    </div>
                    <h3
                      className="text-white font-semibold text-lg leading-tight"
                      style={{ fontFamily: 'Cormorant Garamond, serif' }}
                    >
                      {tool.name}
                    </h3>
                    <p className="text-[#C9A84C]/80 text-xs mt-0.5 font-medium">
                      ↳ {tool.corporateTranslation}
                    </p>
                  </div>
                  <ArrowRight
                    size={18}
                    className="text-white/20 group-hover:text-[#C9A84C] group-hover:translate-x-1 transition-all duration-200 mt-1 shrink-0"
                  />
                </div>

                <p className="text-white/55 text-sm leading-relaxed mb-4">
                  {tool.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {tool.sections.map((s, i) => (
                      <span key={i} className="text-xs px-2 py-0.5 rounded bg-white/5 text-white/30 truncate max-w-[120px]">
                        {s.title.length > 20 ? s.title.substring(0, 20) + '…' : s.title}
                      </span>
                    ))}
                  </div>
                  <span className="text-white/25 text-xs shrink-0 ml-2">
                    {tool.sections.length} section{tool.sections.length !== 1 ? 's' : ''}
                  </span>
                </div>

                {tool.auNote && (
                  <div className="mt-3 pt-3 border-t border-white/8">
                    <p className="text-white/35 text-xs leading-relaxed">
                      <span className="text-[#C9A84C]/60 font-semibold">AU Note: </span>
                      {tool.auNote}
                    </p>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Unit Navigation */}
      <div className="px-8 py-6 border-t border-white/8 flex items-center justify-between">
        {prevUnit ? (
          <button
            onClick={() => navigate(`/unit/${prevUnit.id}`)}
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
            <div className="text-left">
              <div className="text-xs text-white/30">Previous</div>
              <div className="text-sm font-medium">{prevUnit.icon} Unit {prevUnit.id}: {prevUnit.title}</div>
            </div>
          </button>
        ) : <div />}

        {nextUnit ? (
          <button
            onClick={() => navigate(`/unit/${nextUnit.id}`)}
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors"
          >
            <div className="text-right">
              <div className="text-xs text-white/30">Next</div>
              <div className="text-sm font-medium">{nextUnit.icon} Unit {nextUnit.id}: {nextUnit.title}</div>
            </div>
            <ArrowRight size={16} />
          </button>
        ) : <div />}
      </div>
    </Layout>
  );
}
