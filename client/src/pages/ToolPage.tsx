// Design: Obsidian Vault — Dark Premium Dashboard
// Tool detail page: full content with tables, checklists, and scripts

import Layout from "@/components/Layout";
import { units, type ToolSection } from "@/lib/toolkitData";
import { useLocation, useParams } from "wouter";
import { ArrowLeft, ArrowRight, ChevronRight, CheckSquare, Square, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const priorityConfig = {
  Critical: { label: 'Critical', className: 'badge-critical' },
  High: { label: 'High', className: 'badge-high' },
  Medium: { label: 'Medium', className: 'badge-medium' },
};

function ChecklistSection({ section }: { section: ToolSection }) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  const toggle = (i: number) => setChecked(prev => ({ ...prev, [i]: !prev[i] }));
  const completedCount = Object.values(checked).filter(Boolean).length;
  const total = section.items?.length || 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-semibold" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.05rem' }}>
          {section.title}
        </h3>
        <span className="text-xs text-white/40 font-mono">
          {completedCount}/{total} complete
        </span>
      </div>

      {/* Progress bar */}
      {total > 0 && (
        <div className="h-1 bg-white/8 rounded-full mb-4 overflow-hidden">
          <div
            className="h-full progress-gold rounded-full transition-all duration-300"
            style={{ width: `${(completedCount / total) * 100}%` }}
          />
        </div>
      )}

      <div className="space-y-2">
        {section.items?.map((item, i) => (
          <button
            key={i}
            onClick={() => toggle(i)}
            className={cn(
              "w-full text-left flex items-start gap-3 p-3 rounded-lg border transition-all duration-200",
              checked[i]
                ? "bg-green-500/10 border-green-500/20"
                : "bg-white/3 border-white/8 hover:bg-white/6 hover:border-white/15"
            )}
          >
            <div className="mt-0.5 shrink-0">
              {checked[i]
                ? <CheckSquare size={16} className="text-green-400" />
                : <Square size={16} className="text-white/30" />
              }
            </div>
            <div className="flex-1 min-w-0">
              <p className={cn(
                "text-sm font-medium leading-tight",
                checked[i] ? "text-white/50 line-through" : "text-white/85"
              )}>
                {item.item}
              </p>
              {item.detail && (
                <p className="text-white/40 text-xs mt-1 leading-relaxed">{item.detail}</p>
              )}
              {item.auContext && (
                <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded bg-[#C9A84C]/10 text-[#C9A84C]/70 border border-[#C9A84C]/20">
                  {item.auContext}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function TableSection({ section }: { section: ToolSection }) {
  const cols = section.columns || [];
  const rows = section.rows || [];

  return (
    <div>
      <h3 className="text-white font-semibold mb-3" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.05rem' }}>
        {section.title}
      </h3>
      {section.description && (
        <p className="text-white/50 text-sm mb-3">{section.description}</p>
      )}
      <div className="overflow-x-auto rounded-lg border border-white/8">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 tool-section-header">
              {cols.map((col, i) => (
                <th
                  key={i}
                  className="px-4 py-3 text-left text-xs font-semibold text-[#C9A84C]/80 uppercase tracking-wider whitespace-nowrap"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr
                key={ri}
                className={cn(
                  "border-b border-white/5 transition-colors",
                  ri % 2 === 0 ? "bg-white/2" : "bg-transparent",
                  "hover:bg-[#C9A84C]/5"
                )}
              >
                {cols.map((col, ci) => (
                  <td
                    key={ci}
                    className={cn(
                      "px-4 py-3 text-white/70 align-top leading-relaxed",
                      ci === 0 ? "font-medium text-white/85" : ""
                    )}
                  >
                    {row[col] || '—'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ScriptsSection({ section }: { section: ToolSection }) {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const copyScript = (text: string, idx: number) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 2000);
    });
  };

  return (
    <div>
      <h3 className="text-white font-semibold mb-4" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.05rem' }}>
        {section.title}
      </h3>
      <div className="space-y-4">
        {section.scripts?.map((script, i) => (
          <div key={i} className="rounded-lg border border-white/8 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 tool-section-header">
              <h4 className="text-white/80 text-sm font-semibold">{script.title}</h4>
              <button
                onClick={() => copyScript(script.content, i)}
                className="flex items-center gap-1.5 text-xs text-white/40 hover:text-[#C9A84C] transition-colors"
              >
                {copiedIdx === i ? (
                  <><Check size={12} className="text-green-400" /><span className="text-green-400">Copied</span></>
                ) : (
                  <><Copy size={12} /><span>Copy</span></>
                )}
              </button>
            </div>
            <pre className="px-4 py-4 text-white/65 text-xs leading-relaxed font-mono whitespace-pre-wrap bg-[#0D1B2A]/50 overflow-x-auto">
              {script.content}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}

function ToolSection({ section }: { section: ToolSection }) {
  if (section.type === 'checklist') return <ChecklistSection section={section} />;
  if (section.type === 'table') return <TableSection section={section} />;
  if (section.type === 'scripts') return <ScriptsSection section={section} />;
  return (
    <div>
      <h3 className="text-white font-semibold mb-3" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.05rem' }}>
        {section.title}
      </h3>
      {section.content && <p className="text-white/60 text-sm leading-relaxed">{section.content}</p>}
    </div>
  );
}

export default function ToolPage() {
  const params = useParams<{ unitId: string; toolId: string }>();
  const [, navigate] = useLocation();

  const unitId = parseInt(params.unitId || '1');
  const toolId = parseInt(params.toolId || '1');

  const unit = units.find(u => u.id === unitId);
  const tool = unit?.tools.find(t => t.id === toolId);

  if (!unit || !tool) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-white/50 text-lg mb-4">Tool not found</p>
            <button onClick={() => navigate('/')} className="text-[#C9A84C] hover:underline">
              Back to Overview
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  // Find prev/next tools across all units
  const allTools = units.flatMap(u => u.tools.map(t => ({ ...t, unitId: u.id })));
  const currentIdx = allTools.findIndex(t => t.id === toolId);
  const prevTool = currentIdx > 0 ? allTools[currentIdx - 1] : null;
  const nextTool = currentIdx < allTools.length - 1 ? allTools[currentIdx + 1] : null;

  const priority = priorityConfig[tool.priority];

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="px-8 py-4 border-b border-white/8 flex items-center gap-2 text-sm flex-wrap">
        <button
          onClick={() => navigate('/')}
          className="text-white/40 hover:text-white transition-colors flex items-center gap-1"
        >
          <ArrowLeft size={14} />
          Overview
        </button>
        <ChevronRight size={14} className="text-white/20" />
        <button
          onClick={() => navigate(`/unit/${unit.id}`)}
          className="text-white/40 hover:text-white transition-colors"
        >
          Unit {unit.id}: {unit.title}
        </button>
        <ChevronRight size={14} className="text-white/20" />
        <span className="text-[#C9A84C]">Tool {tool.id}: {tool.name}</span>
      </div>

      {/* Tool Header */}
      <div
        className="px-8 py-8 border-b border-white/8"
        style={{ background: `linear-gradient(135deg, ${unit.color}12, transparent)` }}
      >
        <div className="max-w-4xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-white/25 text-xs font-mono">Tool {tool.id} of 30</span>
            <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", priority.className)}>
              {priority.label}
            </span>
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: `${unit.color}20`,
                color: unit.color,
                border: `1px solid ${unit.color}40`
              }}
            >
              {tool.phase.split(':')[0]}
            </span>
          </div>

          <h1
            className="text-4xl font-bold text-white mb-1"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            {tool.name}
          </h1>

          <p className="text-[#C9A84C] text-sm font-medium mb-3">
            Corporate Translation: {tool.corporateTranslation}
          </p>

          <p className="text-white/60 text-base leading-relaxed mb-4 max-w-3xl">
            {tool.description}
          </p>

          {tool.auNote && (
            <div className="flex items-start gap-3 p-4 rounded-lg bg-[#C9A84C]/8 border border-[#C9A84C]/20">
              <div className="w-1 h-full min-h-[20px] bg-[#C9A84C] rounded-full shrink-0 mt-0.5" />
              <p className="text-white/65 text-sm leading-relaxed">
                <span className="text-[#C9A84C] font-semibold">Australian Market Note: </span>
                {tool.auNote}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Tool Sections */}
      <div className="px-8 py-8 max-w-6xl">
        <div className="space-y-10">
          {tool.sections.map((section, i) => (
            <div key={i} className="pb-10 border-b border-white/8 last:border-0 last:pb-0">
              <ToolSection section={section} />
            </div>
          ))}
        </div>
      </div>

      {/* Tool Navigation */}
      <div className="px-8 py-6 border-t border-white/8 flex items-center justify-between">
        {prevTool ? (
          <button
            onClick={() => navigate(`/unit/${prevTool.unitId}/tool/${prevTool.id}`)}
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
            <div className="text-left">
              <div className="text-xs text-white/30">Previous Tool</div>
              <div className="text-sm font-medium">T{prevTool.id}: {prevTool.name}</div>
            </div>
          </button>
        ) : <div />}

        {nextTool ? (
          <button
            onClick={() => navigate(`/unit/${nextTool.unitId}/tool/${nextTool.id}`)}
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors"
          >
            <div className="text-right">
              <div className="text-xs text-white/30">Next Tool</div>
              <div className="text-sm font-medium">T{nextTool.id}: {nextTool.name}</div>
            </div>
            <ArrowRight size={16} />
          </button>
        ) : <div />}
      </div>
    </Layout>
  );
}
