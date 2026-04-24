// FormField — renders a single form field based on its type
// Supports: text, textarea, number, currency, percentage, select, date, email, phone, url

import { FormField as FormFieldType } from '@/lib/formSchemas';

interface Props {
  field: FormFieldType;
  value: string;
  onChange: (key: string, value: string) => void;
}

const inputBase =
  'w-full bg-[#0d1b2a] border border-[#c9a84c]/30 rounded px-3 py-2 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#c9a84c]/70 focus:ring-1 focus:ring-[#c9a84c]/40 transition-colors';

const labelBase = 'block text-xs font-semibold text-[#c9a84c]/80 mb-1 uppercase tracking-wide';

export default function FormFieldComponent({ field, value, onChange }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    onChange(field.key, e.target.value);
  };

  const renderInput = () => {
    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            className={`${inputBase} min-h-[90px] resize-y`}
            placeholder={field.placeholder}
            value={value}
            onChange={handleChange}
            rows={4}
          />
        );

      case 'select':
        return (
          <select
            className={`${inputBase} cursor-pointer`}
            value={value}
            onChange={handleChange}
          >
            <option value="">— Select —</option>
            {field.options?.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        );

      case 'currency':
        return (
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c9a84c] text-sm font-semibold">$</span>
            <input
              type="number"
              className={`${inputBase} pl-7`}
              placeholder={field.placeholder || '0'}
              value={value}
              onChange={handleChange}
              min="0"
              step="1000"
            />
          </div>
        );

      case 'percentage':
        return (
          <div className="relative">
            <input
              type="number"
              className={`${inputBase} pr-8`}
              placeholder={field.placeholder || '0'}
              value={value}
              onChange={handleChange}
              min="0"
              max="100"
              step="0.1"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#c9a84c] text-sm font-semibold">%</span>
          </div>
        );

      case 'number':
        return (
          <input
            type="number"
            className={inputBase}
            placeholder={field.placeholder || '0'}
            value={value}
            onChange={handleChange}
            step="any"
          />
        );

      case 'date':
        return (
          <input
            type="date"
            className={`${inputBase} [color-scheme:dark]`}
            value={value}
            onChange={handleChange}
          />
        );

      case 'email':
        return (
          <input
            type="email"
            className={inputBase}
            placeholder={field.placeholder || 'email@example.com'}
            value={value}
            onChange={handleChange}
          />
        );

      case 'phone':
        return (
          <input
            type="tel"
            className={inputBase}
            placeholder={field.placeholder || '04XX XXX XXX'}
            value={value}
            onChange={handleChange}
          />
        );

      case 'url':
        return (
          <input
            type="url"
            className={inputBase}
            placeholder={field.placeholder || 'https://'}
            value={value}
            onChange={handleChange}
          />
        );

      default:
        return (
          <input
            type="text"
            className={inputBase}
            placeholder={field.placeholder}
            value={value}
            onChange={handleChange}
          />
        );
    }
  };

  return (
    <div className="mb-5">
      <label className={labelBase}>
        {field.label}
        {field.required && <span className="text-red-400 ml-1">*</span>}
      </label>
      {renderInput()}
      {field.helper && (
        <p className="mt-1 text-xs text-white/40 leading-relaxed">{field.helper}</p>
      )}
    </div>
  );
}
