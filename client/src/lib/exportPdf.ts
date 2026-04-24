// PDF Export utility — uses jsPDF to generate a clean branded PDF
// from the form's current values

import jsPDF from 'jspdf';

export interface PdfField {
  label: string;
  value: string;
  type?: 'text' | 'textarea' | 'number' | 'currency' | 'select' | 'date' | 'header' | 'divider' | 'note';
}

export interface PdfSection {
  title: string;
  fields: PdfField[];
}

export interface PdfExportOptions {
  toolName: string;
  toolId: number;
  unitName: string;
  clientName?: string;
  sections: PdfSection[];
  auNote?: string;
  corporateTranslation?: string;
}

export function exportToPdf(options: PdfExportOptions) {
  const { toolName, toolId, unitName, clientName, sections, auNote, corporateTranslation } = options;
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  const pageW = 210;
  const pageH = 297;
  const margin = 18;
  const contentW = pageW - margin * 2;
  let y = 0;

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageH - 20) {
      doc.addPage();
      y = 20;
      drawPageHeader();
    }
  };

  const drawPageHeader = () => {
    doc.setFillColor(13, 27, 42);
    doc.rect(0, 0, pageW, 12, 'F');
    doc.setFillColor(201, 168, 76);
    doc.rect(0, 12, pageW, 1.5, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text('120% BUSINESS ACQUISITION TOOLKIT', margin, 8);
    doc.setFont('helvetica', 'normal');
    doc.text('Australian Edition — Powered by Contrarian Thinking MSA', pageW - margin, 8, { align: 'right' });
  };

  // Cover header
  drawPageHeader();
  y = 22;

  // Tool badge box
  doc.setFillColor(245, 245, 245);
  doc.roundedRect(margin, y, contentW, 38, 3, 3, 'F');
  doc.setFillColor(201, 168, 76);
  doc.rect(margin, y, 4, 38, 'F');

  doc.setTextColor(120, 120, 120);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text(`TOOL ${toolId}  ·  ${unitName.toUpperCase()}`, margin + 8, y + 8);

  doc.setTextColor(13, 27, 42);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(toolName, margin + 8, y + 17);

  if (corporateTranslation) {
    doc.setTextColor(160, 130, 60);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'italic');
    doc.text(`Corporate Translation: ${corporateTranslation}`, margin + 8, y + 25);
  }

  const dateStr = new Date().toLocaleDateString('en-AU', { day: '2-digit', month: 'long', year: 'numeric' });
  doc.setTextColor(120, 120, 120);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text(`Prepared: ${dateStr}`, margin + 8, y + 33);
  if (clientName) {
    doc.text(`Client: ${clientName}`, pageW - margin - 4, y + 33, { align: 'right' });
  }

  y += 46;

  // AU Note
  if (auNote) {
    checkPageBreak(18);
    doc.setFillColor(252, 248, 236);
    doc.roundedRect(margin, y, contentW, 14, 2, 2, 'F');
    doc.setDrawColor(201, 168, 76);
    doc.setLineWidth(0.5);
    doc.line(margin, y, margin, y + 14);
    doc.setTextColor(160, 130, 60);
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'bold');
    doc.text('AUSTRALIAN MARKET NOTE', margin + 4, y + 5);
    doc.setTextColor(30, 30, 30);
    doc.setFont('helvetica', 'normal');
    const noteLines = doc.splitTextToSize(auNote, contentW - 8);
    doc.text(noteLines.slice(0, 2) as string[], margin + 4, y + 10);
    y += 18;
  }

  // Sections
  for (const section of sections) {
    checkPageBreak(20);

    doc.setFillColor(13, 27, 42);
    doc.rect(margin, y, contentW, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text(section.title.toUpperCase(), margin + 4, y + 5.5);
    y += 12;

    for (const field of section.fields) {
      if (field.type === 'divider') {
        checkPageBreak(6);
        doc.setDrawColor(220, 220, 220);
        doc.setLineWidth(0.3);
        doc.line(margin, y, margin + contentW, y);
        y += 5;
        continue;
      }

      if (field.type === 'header') {
        checkPageBreak(10);
        doc.setTextColor(160, 130, 60);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.text(field.label, margin, y + 5);
        y += 9;
        continue;
      }

      if (field.type === 'note') {
        checkPageBreak(10);
        doc.setFillColor(248, 248, 248);
        doc.rect(margin, y, contentW, 8, 'F');
        doc.setTextColor(120, 120, 120);
        doc.setFontSize(7.5);
        doc.setFont('helvetica', 'italic');
        const noteLines = doc.splitTextToSize(field.label, contentW - 4);
        doc.text(noteLines as string[], margin + 2, y + 5);
        y += 10;
        continue;
      }

      const isEmpty = !field.value || field.value.trim() === '';
      const displayValue = isEmpty ? '—' : field.value;
      const isTextarea = field.type === 'textarea';
      const valueLines = doc.splitTextToSize(displayValue, contentW - 55) as string[];
      const rowH = isTextarea ? Math.max(12, valueLines.length * 4.5 + 6) : 10;

      checkPageBreak(rowH + 2);

      doc.setFillColor(250, 250, 250);
      doc.rect(margin, y, contentW, rowH, 'F');

      doc.setTextColor(120, 120, 120);
      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'bold');
      const labelLines = doc.splitTextToSize(field.label, 50) as string[];
      doc.text(labelLines, margin + 2, y + 5);

      if (isEmpty) {
        doc.setTextColor(180, 180, 180);
      } else {
        doc.setTextColor(30, 30, 30);
      }
      doc.setFontSize(8.5);
      doc.setFont('helvetica', isEmpty ? 'italic' : 'normal');
      doc.text(valueLines, margin + 56, y + 5);

      doc.setDrawColor(235, 235, 235);
      doc.setLineWidth(0.2);
      doc.line(margin, y + rowH, margin + contentW, y + rowH);

      y += rowH + 1;
    }

    y += 6;
  }

  // Footer on every page
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFillColor(13, 27, 42);
    doc.rect(0, pageH - 10, pageW, 10, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.text('120% Business Acquisition Toolkit — Australian Edition', margin, pageH - 4);
    doc.text(`Page ${i} of ${totalPages}`, pageW - margin, pageH - 4, { align: 'right' });
    doc.setTextColor(201, 168, 76);
    doc.text('Confidential — For Client Use Only', pageW / 2, pageH - 4, { align: 'center' });
  }

  const safeName = toolName.replace(/[^a-zA-Z0-9]/g, '_');
  const clientSuffix = clientName ? `_${clientName.replace(/[^a-zA-Z0-9]/g, '_')}` : '';
  doc.save(`120pct_Tool${toolId}_${safeName}${clientSuffix}.pdf`);
}
