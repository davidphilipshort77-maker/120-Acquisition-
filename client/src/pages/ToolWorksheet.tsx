// ToolWorksheet — full fillable worksheet for a single tool
// Auto-saves to localStorage, supports PDF export

import { useParams, useLocation } from 'wouter';
import { useState, useEffect } from 'react';
import { formSchemas } from '@/lib/formSchemas';
import { units, Unit, Tool } from '@/lib/toolkitData';
import { useFormStorage } from '@/lib/useFormStorage';
import { exportToPdf } from '@/lib/exportPdf';
import FormFieldComponent from '@/components/FormField';
import { toast } from 'sonner';
import {
  FileDown,
  Save,
  RotateCcw,
  ChevronLeft,
  CheckCircle2,
  Clock,
  AlertCircle,
} from 'lucide-react';

export default function ToolWorksheet() {
  const { toolId } = useParams<{ toolId: string }>();
  const [, navigate] = useLocation();
  const id = parseInt(toolId || '1', 10);

  const schema = formSchemas.find(s => s.toolId === id);
  const unit = units.find((u: Unit) => u.tools.some((t: Tool) => t.id === id));
  const tool = unit?.tools.find((t: Tool) => t.id === id);

  const { values, setValue, getValue, clearAll } = useFormStorage(id);
  const [saveIndicator, setSaveIndicator] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);

  // Show save indicator on any change
  useEffect(() => {
    setSaveIndicator(true);
    const t = setTimeout(() => setSaveIndicator(false), 1500);
    return () => clearTimeout(t);
  }, [values]);

  if (!schema || !tool || !unit) {
    return (
      <div className="flex items-center justify-center h-64 text-white/40">
        Tool not found.
      </div>
    );
  }

  // Calculate completion percentage
  const allFields = schema.sections.flatMap(s => s.fields).filter(f => f.type !== 'calculated');
  const filledFields = allFields.filter(f => getValue(f.key).trim() !== '');
  const completionPct = Math.round((filledFields.length / allFields.length) * 100);

  const handleExport = async () => {
    setExportLoading(true);
    try {
      const clientName = getValue('t' + id + '_client') || getValue('t' + id + '_buyer') || getValue('t' + id + '_name') || undefined;

      const pdfSections = schema.sections.map(section => ({
        title: section.title,
        fields: section.fields.map(field => ({
          label: field.label,
          value: getValue(field.key),
          type: (['text','textarea','number','currency','select','date','header','divider','note'].includes(field.type)
            ? field.type
            : 'text') as 'text' | 'textarea' | 'number' | 'currency' | 'select' | 'date' | 'header' | 'divider' | 'note',
        })),
      }));

      exportToPdf({
        toolId: id,
        toolName: tool.name,
        unitName: unit.title,
        clientName,
        sections: pdfSections,
        auNote: tool.auNote,
        corporateTranslation: tool.corporateTranslation,
      });

      toast.success('PDF exported successfully!', {
        description: `${tool.name} worksheet downloaded.`,
      });
    } catch (err) {
      toast.error('Export failed', { description: 'Please try again.' });
    } finally {
      setExportLoading(false);
    }
  };

  const handleClear = () => {
    if (window.confirm('Clear all data for this worksheet? This cannot be undone.')) {
      clearAll();
      toast.info('Worksheet cleared.');
    }
  };

  const completionColor =
    completionPct >= 80
      ? 'text-emerald-400'
      : completionPct >= 40
      ? 'text-[#c9a84c]'
      : 'text-white/40';

  const CompletionIcon =
    completionPct >= 80
      ? CheckCircle2
      : completionPct >= 40
      ? Clock
      : AlertCircle;

  return (
    <div className="min-h-screen bg-[#080f18]">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-[#0d1b2a]/95 backdrop-blur border-b border-[#c9a84c]/20">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          {/* Back + title */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => navigate(`/unit/${unit.id}`)}
              className="flex items-center gap-1.5 text-[#c9a84c]/70 hover:text-[#c9a84c] text-sm transition-colors shrink-0"
            >
              <ChevronLeft size={16} />
              Back
            </button>
            <div className="w-px h-5 bg-white/10" />
            <div className="min-w-0">
              <p className="text-[10px] text-[#c9a84c]/60 uppercase tracking-widest font-semibold">
                Tool {id} · {unit.title}
              </p>
              <h1 className="text-white font-bold text-base leading-tight truncate">{tool.name}</h1>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Auto-save indicator */}
            <span className={`text-xs transition-opacity duration-500 ${saveIndicator ? 'opacity-100 text-emerald-400' : 'opacity-0'}`}>
              <Save size={12} className="inline mr-1" />
              Saved
            </span>

            {/* Completion */}
            <div className={`flex items-center gap-1.5 text-xs font-semibold ${completionColor}`}>
              <CompletionIcon size={14} />
              {completionPct}% complete
            </div>

            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 text-white/40 hover:text-white/70 text-xs transition-colors"
            >
              <RotateCcw size={13} />
              Clear
            </button>

            <button
              onClick={handleExport}
              disabled={exportLoading}
              className="flex items-center gap-2 bg-[#c9a84c] hover:bg-[#d4b460] disabled:opacity-50 text-[#0d1b2a] font-bold text-sm px-4 py-2 rounded transition-colors"
            >
              <FileDown size={15} />
              {exportLoading ? 'Exporting…' : 'Export PDF'}
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-0.5 bg-white/5">
          <div
            className="h-full bg-[#c9a84c] transition-all duration-700"
            style={{ width: `${completionPct}%` }}
          />
        </div>
      </div>

      {/* Body */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Tool intro card */}
        <div className="mb-8 bg-[#0d1b2a] border border-[#c9a84c]/20 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#c9a84c]/10 border border-[#c9a84c]/30 flex items-center justify-center shrink-0">
              <span className="text-[#c9a84c] font-bold text-lg">{id}</span>
            </div>
            <div>
              <h2 className="text-white font-bold text-xl mb-1">{tool.name}</h2>
              {tool.corporateTranslation && (
                <p className="text-[#c9a84c]/80 text-sm italic mb-2">
                  Corporate Translation: {tool.corporateTranslation}
                </p>
              )}
              {tool.auNote && (
                <div className="mt-3 flex gap-2 bg-[#c9a84c]/5 border border-[#c9a84c]/20 rounded-lg p-3">
                  <span className="text-[#c9a84c] text-xs font-bold uppercase tracking-wide shrink-0 mt-0.5">AU Note</span>
                  <p className="text-white/60 text-xs leading-relaxed">{tool.auNote}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Form sections */}
        {schema.sections.map((section, si) => (
          <div key={si} className="mb-8">
            {/* Section header */}
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px flex-1 bg-[#c9a84c]/20" />
              <h3 className="text-[#c9a84c] font-bold text-sm uppercase tracking-widest px-2 shrink-0">
                {section.title}
              </h3>
              <div className="h-px flex-1 bg-[#c9a84c]/20" />
            </div>

            {section.description && (
              <p className="text-white/50 text-sm mb-5 leading-relaxed">{section.description}</p>
            )}

            <div className="bg-[#0d1b2a] border border-white/8 rounded-xl p-6">
              {section.fields.map(field => (
                <FormFieldComponent
                  key={field.key}
                  field={field}
                  value={getValue(field.key)}
                  onChange={setValue}
                />
              ))}
            </div>
          </div>
        ))}

        {/* Bottom export CTA */}
        <div className="mt-10 flex flex-col items-center gap-4 py-8 border-t border-white/8">
          <p className="text-white/40 text-sm">
            All data is saved automatically to your browser.
          </p>
          <button
            onClick={handleExport}
            disabled={exportLoading}
            className="flex items-center gap-2 bg-[#c9a84c] hover:bg-[#d4b460] disabled:opacity-50 text-[#0d1b2a] font-bold text-base px-8 py-3 rounded-lg transition-colors"
          >
            <FileDown size={18} />
            {exportLoading ? 'Generating PDF…' : 'Export Completed Worksheet as PDF'}
          </button>
          <p className="text-white/25 text-xs">
            {filledFields.length} of {allFields.length} fields completed · {completionPct}%
          </p>
        </div>
      </div>
    </div>
  );
}
