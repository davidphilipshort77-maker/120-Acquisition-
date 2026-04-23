// Design: Obsidian Vault — Dark Premium Dashboard
// Homepage: Hero with Sydney backdrop, stats bar, unit grid

import Layout from "@/components/Layout";
import { units, totalTools } from "@/lib/toolkitData";
import { useLocation } from "wouter";
import { ArrowRight, FileDown, Target, TrendingUp, Shield, Clock } from "lucide-react";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663095779347/FQWe7gFcoPbRwtZpb2uRLi/hero-bg-5BNisbwVbcMMsWpKB36m67.webp";

const phaseLabels = [
  { phase: 'Phase 1', label: 'Diagnose & Profile', color: '#C9A84C' },
  { phase: 'Phase 2', label: 'Clarify Direction', color: '#2A5F8F' },
  { phase: 'Phase 3', label: 'Market Readiness', color: '#1E4A72' },
  { phase: 'Phase 4', label: 'Execute', color: '#9A7A30' },
  { phase: 'Phase 5', label: 'Support', color: '#1B3A5C' },
];

const stats = [
  { icon: Target, value: '30', label: 'Tools & Templates', sub: 'Across 10 units' },
  { icon: TrendingUp, value: 'AU', label: 'Market Specific', sub: 'ASIC · Fair Work · ATO · Judo Bank' },
  { icon: Shield, value: '5', label: 'Program Phases', sub: 'Diagnose to Day Zero' },
  { icon: Clock, value: '120%', label: 'Program Pathway 3', sub: 'Business Acquisition' },
];

export default function Home() {
  const [, navigate] = useLocation();

  return (
    <Layout>
      {/* Hero Section */}
      <section
        className="relative min-h-[420px] flex items-end overflow-hidden"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
        }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D1B2A]/40 via-[#0D1B2A]/60 to-[#0D1B2A]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B2A]/80 to-transparent" />

        <div className="relative z-10 px-8 pb-12 pt-20 max-w-4xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-[#C9A84C]" />
            <span className="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase">
              120% Business Acquisition · Australian Edition
            </span>
          </div>

          <h1
            className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-4"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            The Complete
            <span className="block text-[#C9A84C]">Acquisition Toolkit</span>
          </h1>

          <p className="text-white/70 text-lg max-w-2xl leading-relaxed mb-8">
            30 tools, templates, and frameworks tailored for premium corporate executives
            transitioning from $300k–$800k roles into SME ownership through the 120% Business
            Acquisition pathway.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate('/unit/1')}
              className="flex items-center gap-2 px-6 py-3 bg-[#C9A84C] text-[#0D1B2A] font-semibold rounded-lg hover:bg-[#F5E6C8] transition-colors duration-200"
            >
              Start with Unit 1
              <ArrowRight size={16} />
            </button>
            <a
              href="/120pct_MSA_Toolkit_AU.xlsx"
              className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white border border-white/20 font-medium rounded-lg hover:bg-white/15 transition-colors duration-200"
              onClick={(e) => { e.preventDefault(); alert('Download the Excel workbook from the chat attachments above.'); }}
            >
              <FileDown size={16} />
              Download Excel Workbook
            </a>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-b border-white/8 bg-[#0D1B2A]">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/8">
          {stats.map(({ icon: Icon, value, label, sub }) => (
            <div key={label} className="px-6 py-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center shrink-0">
                <Icon size={18} className="text-[#C9A84C]" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{value}</div>
                <div className="text-white/70 text-sm font-medium">{label}</div>
                <div className="text-white/35 text-xs">{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Client Profile Banner */}
      <section className="px-8 py-6 border-b border-white/8 bg-[#1B3A5C]/20">
        <div className="max-w-5xl">
          <div className="flex items-start gap-4">
            <div className="w-1 h-full min-h-[60px] bg-[#C9A84C] rounded-full shrink-0" />
            <div>
              <h2 className="text-white font-semibold mb-1" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem' }}>
                Designed for Premium Corporate Executives
              </h2>
              <p className="text-white/60 text-sm leading-relaxed max-w-3xl">
                You have earned $300k–$800k for 10+ consecutive years. You have been made redundant.
                You are not a startup founder — you are an operator and a leader. This toolkit translates
                your institutional-grade skills into the language of Australian SME acquisition, aligned
                with the 120% program's five-phase journey from profiling to Day Zero.
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {['ASIC & PPSR Compliance', 'Judo Bank DSCR Framework', 'Fair Work AU', 'ATO Obligations', 'Comparable.com.au Multiples', 'IBISWorld Benchmarks'].map(tag => (
                  <span key={tag} className="text-xs px-2 py-1 rounded bg-white/5 text-white/50 border border-white/10">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Phase Journey */}
      <section className="px-8 py-6 border-b border-white/8">
        <h2 className="text-white/50 text-xs font-semibold tracking-widest uppercase mb-4">
          The 5-Phase 120% Journey
        </h2>
        <div className="flex flex-wrap gap-2">
          {phaseLabels.map(({ phase, label, color }, i) => (
            <div key={phase} className="flex items-center gap-2">
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm"
                style={{ borderColor: `${color}40`, backgroundColor: `${color}10`, color }}
              >
                <span className="font-mono text-xs opacity-70">{phase}</span>
                <span className="font-medium">{label}</span>
              </div>
              {i < phaseLabels.length - 1 && (
                <ArrowRight size={14} className="text-white/20 shrink-0" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Units Grid */}
      <section className="px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2
            className="text-2xl font-bold text-white"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            All 10 Units
          </h2>
          <span className="text-white/40 text-sm">{totalTools} tools total</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {units.map((unit) => (
            <button
              key={unit.id}
              onClick={() => navigate(`/unit/${unit.id}`)}
              className="group text-left p-5 rounded-xl border border-white/8 bg-[#1B3A5C]/10 hover:bg-[#1B3A5C]/25 hover:border-white/15 transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{unit.icon}</span>
                  <div>
                    <div className="text-white/30 text-xs font-mono">Unit {unit.id}</div>
                    <h3
                      className="text-white font-semibold text-base leading-tight"
                      style={{ fontFamily: 'Cormorant Garamond, serif' }}
                    >
                      {unit.title}
                    </h3>
                  </div>
                </div>
                <ArrowRight
                  size={16}
                  className="text-white/20 group-hover:text-[#C9A84C] group-hover:translate-x-1 transition-all duration-200 mt-1 shrink-0"
                />
              </div>

              <p className="text-white/50 text-sm mb-3">{unit.subtitle}</p>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {unit.tools.map((tool) => (
                    <span
                      key={tool.id}
                      className="text-xs px-1.5 py-0.5 rounded bg-white/5 text-white/30 font-mono"
                    >
                      T{tool.id}
                    </span>
                  ))}
                </div>
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: `${unit.color}20`,
                    color: unit.color,
                    border: `1px solid ${unit.color}40`
                  }}
                >
                  {unit.phase.split(':')[0]}
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="px-8 py-6 border-t border-white/8">
        <p className="text-white/25 text-xs leading-relaxed max-w-4xl">
          <strong className="text-white/40">Disclaimer:</strong> All templates, checklists, and financial models in this toolkit are for educational and reference purposes only.
          Always engage qualified Australian legal, financial, and tax advisors before executing any business acquisition.
          Judo Bank and NAB lending criteria are indicative and subject to change. Fair Work and ATO obligations must be verified with relevant authorities.
          Source: Contrarian Thinking Main Street Accelerator · 120% Offering Pack (Judo Bank) · Australian Market Edition.
        </p>
      </section>
    </Layout>
  );
}
