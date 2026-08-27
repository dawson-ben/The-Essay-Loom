import React, { useState, useEffect } from 'react';
import { EssayDraft, PromptField } from '../types';
import { HEROS_JOURNEY_PROMPTS, DIFFERENT_BUT_TRUTHFUL_PROMPTS, INTELLECTUAL_JOURNEY_PROMPTS } from '../constants';
import { Copy, Download, CheckSquare, Square, CheckCircle, FileText, BarChart3, AlertCircle, GripVertical } from 'lucide-react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';

interface StoryPreviewProps {
  draft: EssayDraft;
  onUpdateDraft: (updated: EssayDraft) => void;
}

interface Segment {
  id: string; // prompt id
  label: string;
  val: string;
  words: number;
  suggestedWords: number;
  orderIndex: number;
}

export default function StoryPreview({ draft, onUpdateDraft }: StoryPreviewProps) {
  const prompts = draft.track === 'heros_journey'
    ? HEROS_JOURNEY_PROMPTS
    : draft.track === 'different_but_truthful'
      ? DIFFERENT_BUT_TRUTHFUL_PROMPTS
      : INTELLECTUAL_JOURNEY_PROMPTS;

  const answers = draft.track === 'heros_journey'
    ? draft.herosJourneyAnswers
    : draft.track === 'different_but_truthful'
      ? draft.differentTruthfulAnswers
      : draft.intellectualJourneyAnswers || {};

  const countWords = (text: string): number => {
    if (!text || text.trim() === '') return 0;
    return text.trim().split(/\s+/).length;
  };

  const [segments, setSegments] = useState<Segment[]>([]);

  useEffect(() => {
    const rawSegments = prompts.map((p, index) => {
      const rawVal = answers[p.id] || '';
      return {
        id: p.id,
        label: p.label,
        val: rawVal,
        words: countWords(rawVal),
        suggestedWords: Math.round(draft.targetWordCount * p.suggestedWeight),
        orderIndex: index
      };
    });

    if (draft.blocks && draft.blocks.length > 0) {
      // Re-order based on saved blocks array index
      const ordered = rawSegments.sort((a, b) => {
        const aIndex = draft.blocks?.findIndex(bck => bck.promptId === a.id) ?? -1;
        const bIndex = draft.blocks?.findIndex(bck => bck.promptId === b.id) ?? -1;
        const finalAIndex = aIndex !== -1 ? aIndex : (a.orderIndex + 100);
        const finalBIndex = bIndex !== -1 ? bIndex : (b.orderIndex + 100);
        return finalAIndex - finalBIndex;
      });
      setSegments(ordered);
    } else {
      setSegments(rawSegments);
    }
  }, [draft.blocks, answers, prompts, draft.targetWordCount]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(segments);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const newBlocks: import('../types').EssayBlock[] = (items as Segment[]).map((item) => {
      const existingBlock = draft.blocks?.find(bck => bck.promptId === item.id);
      return existingBlock || {
        id: item.id,
        promptId: item.id,
        title: item.label,
        description: '',
        content: item.val
      };
    });

    setSegments(items);
    onUpdateDraft({ ...draft, blocks: newBlocks });
  };

  const totalCurrentWords = segments.reduce((sum, item) => sum + item.words, 0);

  const getCleanText = () => {
    return segments
      .filter(item => item.val.trim() !== '')
      .map(item => item.val)
      .join('\n\n');
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(getCleanText());
    alert('Copied your compiled personal statement draft to clipboard!');
  };

  const handleDownloadDocx = async () => {
    const children: any[] = [
      new Paragraph({
        text: draft.title,
        heading: HeadingLevel.HEADING_1,
      }),
    ];

    segments.filter(item => item.val.trim() !== '').forEach(item => {
      children.push(
        new Paragraph({
          text: item.label,
          heading: HeadingLevel.HEADING_2,
        }),
        new Paragraph({
          text: item.val,
        })
      );
    });

    const doc = new Document({
      sections: [{
        properties: {},
        children,
      }],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${draft.title.replace(/\s+/g, '_')}_draft.docx`);
  };

  const handleDownloadPdf = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text(draft.title, 20, 20);

    doc.setFontSize(14);
    doc.text(`Track: ${draft.track.toUpperCase()}`, 20, 30);

    let yOffset = 40;
    doc.setFontSize(12);

    segments.filter(item => item.val.trim() !== '').forEach(item => {
      if (yOffset > 270) {
        doc.addPage();
        yOffset = 20;
      }
      doc.setFont("helvetica", "bold");
      doc.text(item.label, 20, yOffset);
      yOffset += 10;
      
      doc.setFont("helvetica", "normal");
      const lines = doc.splitTextToSize(item.val, 170);
      lines.forEach((line: string) => {
        if (yOffset > 280) {
          doc.addPage();
          yOffset = 20;
        }
        doc.text(line, 20, yOffset);
        yOffset += 7;
      });
      yOffset += 5;
    });

    doc.save(`${draft.title.replace(/\s+/g, '_')}_draft.pdf`);
  };

  // Automated checks dynamically curated per track
  const getChecks = () => {
    if (draft.track === 'heros_journey') {
      return [
        { id: 'essential_belief', text: "Defines the 'Elixir' (Essential Belief)", passed: (answers['essential_belief'] || '').trim().length > 10 },
        { id: 'transformation_formula', text: "Defines a before-and-after transformation", passed: (answers['transformation_formula'] || '').trim().length > 15 },
        { id: 'hesitation', text: "Includes doubt or hesitation", passed: (answers['hesitation_doubt'] || '').trim().length > 10 },
        { id: 'grounded_climax', text: "Has a complication & vulnerability", passed: (answers['the_ordeal_flat'] || '').trim().length > 15 },
        { id: 'agency', text: "Demonstrates high personal agency", passed: (answers['winning_action'] || '').trim().length > 15 }
      ];
    } else if (draft.track === 'different_but_truthful') {
      return [
        { id: 'silent_admission', text: "The Silent Admission intro", passed: (answers['authenticity_declaration'] || '').trim().length > 15 },
        { id: 'tipping_point', text: "Tipping point scene", passed: (answers['dt_tipping_point'] || '').trim().length > 15 },
        { id: 'unseen_labor', text: "The Unseen Labor section", passed: (answers['real_stories_triumph'] || '').trim().length > 15 },
        { id: 'messy_spectrum', text: "Reflects on continuous development", passed: (answers['reflection_lessons'] || '').trim().length > 15 },
        { id: 'quiet_promise', text: "The Quiet Integration", passed: (answers['authenticity_promise'] || '').trim().length > 15 }
      ];
    } else { // 'intellectual_journey'
      return [
        { id: 'spark_obsession', text: "The Intellectual Spark", passed: (answers['ij_obsession'] || '').trim().length > 15 },
        { id: 'dissonance', text: "Displays cognitive dissonance", passed: (answers['ij_dissonance'] || '').trim().length > 15 },
        { id: 'synthesis', text: "The Synthesizing Pivot", passed: (answers['ij_pivot'] || '').trim().length > 15 },
        { id: 'paradigm_shift', text: "Articulates a clear paradigm shift", passed: (answers['ij_paradigm'] || '').trim().length > 15 },
        { id: 'scholarly_promise', text: "Includes a Scholarly Promise", passed: (answers['ij_promise'] || '').trim().length > 15 }
      ];
    }
  };

  const checks = getChecks();
  const passedCount = checks.filter(c => c.passed).length;
  
  // Pedagogical Linter Example: Warning if Climax is before Inciting Incident
  const checkLinterWarnings = (item: Segment, index: number) => {
    let warning = null;
    if (draft.track === 'heros_journey') {
      if (item.id === 'the_ordeal_flat') {
        const incitingIncidentIdx = segments.findIndex(s => s.id === 'inciting_incident');
        if (incitingIncidentIdx !== -1 && index < incitingIncidentIdx) {
          warning = "Placing the Climax before the Inciting Incident is structurally weak. Consider chronological order.";
        }
      }
    }
    return warning;
  };

  return (
    <div id="story_preview_root" className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-2xl shadow-xl shadow-slate-950/25">
      {/* Left Column: Word Budget & Analytics */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-slate-950 border border-slate-850 rounded-xl p-5 space-y-5 shadow" id="budget_meter_panel">
          <div className="flex items-center gap-1.5 border-b border-slate-800 pb-2">
            <BarChart3 className="w-4 h-4 text-teal-400" />
            <h3 className="font-sans font-bold text-sm text-slate-100">Word Count Strategy</h3>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-sans font-bold text-slate-400">Total Progress:</span>
              <span className={`font-mono font-bold ${totalCurrentWords > draft.targetWordCount ? 'text-[#FF4A6B]' : 'text-teal-400'}`}>
                {totalCurrentWords} / {draft.targetWordCount} words
              </span>
            </div>
            
            <div className="w-full h-3 bg-slate-900 border border-slate-800 rounded-full overflow-hidden" id="bar_track">
              <div 
                className={`h-full transition-all duration-300 ${
                  totalCurrentWords > draft.targetWordCount 
                    ? 'bg-gradient-to-r from-rose-600 to-rose-500 animate-pulse' 
                    : totalCurrentWords > draft.targetWordCount * 0.8 
                    ? 'bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-500' 
                    : 'bg-gradient-to-r from-teal-500 to-cyan-500'
                }`}
                style={{ width: `${Math.min(100, (totalCurrentWords / draft.targetWordCount) * 100)}%` }}
              ></div>
            </div>

            {totalCurrentWords > draft.targetWordCount ? (
              <div className="text-[11px] text-rose-300 font-sans flex items-center gap-1.5 mt-1 bg-rose-950/20 p-2 rounded-md border border-rose-900/40">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-400" />
                Your draft exceeds the target by {totalCurrentWords - draft.targetWordCount} words. Cut descriptive fillers.
              </div>
            ) : totalCurrentWords < draft.targetWordCount * 0.5 ? (
              <p className="text-[11px] text-slate-500 font-sans leading-normal mt-1 block">
                You have structured {Math.round((totalCurrentWords / draft.targetWordCount) * 100)}% of your target draft. Keep reflecting!
              </p>
            ) : (
              <div className="text-[11px] text-teal-300 font-sans flex items-center gap-1.5 mt-1 bg-teal-950/20 p-2 rounded-md border border-teal-905/20 border-teal-900/30">
                <CheckCircle className="w-3.5 h-3.5 shrink-0 text-teal-400 animate-bounce" />
                Draft is within optimal submission range! Beautifully budgeted.
              </div>
            )}
          </div>

          <div className="space-y-3.5 pt-2" id="sectional_budgets">
            <div className="text-[11px] font-sans uppercase font-bold tracking-wider text-slate-500">
              Suggested Word Count Budgets
            </div>
            {segments.map((item, idx) => {
              const isOverBudget = item.words > item.suggestedWords * 1.3;
              const isUnderBudget = item.val.trim().length > 0 && item.words < item.suggestedWords * 0.5;

              return (
                <div key={item.id} className="space-y-1 text-xs">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="font-sans font-medium text-slate-305 text-slate-350 truncate max-w-[170px]">{item.label}</span>
                    <span className="font-mono text-slate-400">
                      <span className="text-teal-400 font-bold">{item.words}w</span> <span className="text-slate-600">/ {item.suggestedWords}w</span>
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full bg-gradient-to-r ${isOverBudget ? 'from-rose-500 to-rose-600' : 'from-teal-400 to-cyan-500'}`}
                      style={{ width: `${Math.min(100, (item.words / item.suggestedWords) * 100)}%` }}
                    ></div>
                  </div>
                  {isOverBudget && (
                    <span className="text-[11px] text-rose-400 font-sans block leading-none pt-0.5">
                      ⚠️ Over optimal bounds. Prune this specific answer’s details.
                    </span>
                  )}
                  {isUnderBudget && (
                    <span className="text-[11px] text-sky-400 font-sans block leading-none pt-0.5">
                      💡 Expand this segment to fully establish your narrative value.
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-slate-950 border border-slate-850 rounded-xl p-5 space-y-4 shadow" id="quality_audit_panel">
          <div className="flex items-center gap-1.5 border-b border-slate-800 pb-2">
            <CheckSquare className="w-4 h-4 text-sky-400" />
            <h3 className="font-sans font-bold text-sm text-slate-100">Admissions Quality Audit</h3>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-[11px] font-sans font-bold text-slate-400">
              <span>COMPLETED PRINCIPLE CHECKS:</span>
              <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-full text-slate-200 font-mono">{passedCount} / {checks.length}</span>
            </div>
            <div className="space-y-2 pt-1" id="checks_list">
              {checks.map(c => (
                <div key={c.id} className="flex items-start gap-2 text-xs">
                  {c.passed ? (
                    <CheckCircle className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  ) : (
                    <div className="w-4 h-4 border border-slate-800 rounded-full shrink-0 mt-0.5 bg-slate-950"></div>
                  )}
                  <span className={`font-sans leading-tight ${c.passed ? 'text-slate-200 font-semibold' : 'text-slate-500'}`}>
                    {c.text}
                  </span>
                </div>
              ))}
            </div>
            {passedCount === checks.length ? (
              <div className="p-3 bg-teal-950/20 border border-teal-900/30 text-teal-300 rounded-lg text-xs font-sans mt-3">
                🏆 Excellent narrative architecture! Your essay elements meet all structural benchmarks from the guide.
              </div>
            ) : (
              <div className="p-3 bg-slate-950/50 border border-slate-850 text-slate-400 rounded-lg text-[11px] font-sans leading-relaxed mt-3">
                Your draft will be highly competitive once you resolve the incomplete elements listed above. Consider revising empty sections.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Column: Compiled Manuscript & Saves */}
      <div className="lg:col-span-12 xl:col-span-7 space-y-4 relative">
        <div className="bg-slate-950 border border-slate-855 border-slate-850 rounded-xl p-6 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3.5 gap-2">
            <div>
              <h3 className="font-sans font-bold text-base text-slate-100 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-sky-400" /> Live Manuscript View
              </h3>
              <p className="text-[11px] text-slate-500 font-sans mt-0.5">
                Drag to assemble your reflective answers:
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5" id="manuscript_export_group">
              <button
                id="copy_manuscript_btn"
                onClick={handleCopyToClipboard}
                disabled={totalCurrentWords === 0}
                className="p-2 bg-slate-900 hover:bg-slate-850 text-slate-350 hover:text-white border border-slate-800 rounded-lg text-xs flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-40 font-bold"
                title="Copy Compiled Text"
              >
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                Copy
              </button>
              
              <button
                id="download_docx_btn"
                onClick={handleDownloadDocx}
                disabled={totalCurrentWords === 0}
                className="p-2 bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800 rounded-lg text-xs flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-40 font-bold"
                title="Download DOCX"
              >
                <Download className="w-3.5 h-3.5 text-slate-400" />
                DOCX
              </button>

              <button
                id="download_pdf_btn"
                onClick={handleDownloadPdf}
                disabled={totalCurrentWords === 0}
                className="p-2 bg-gradient-to-r from-teal-500 to-cyan-500 hover:opacity-90 text-slate-950 rounded-lg text-xs flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-40 font-extrabold"
                title="Download PDF"
              >
                <Download className="w-3.5 h-3.5" />
                PDF
              </button>
            </div>
          </div>

          <div id="manuscript_box" className="bg-slate-950 rounded-xl p-2 text-sm font-serif leading-relaxed text-slate-300 min-h-[480px] shadow-inner">
            {totalCurrentWords === 0 ? (
              <div className="text-center py-20 text-slate-500 font-sans space-y-2 border border-slate-850 rounded-xl">
                <p className="italic text-slate-400">"The canvas sits waiting..."</p>
                <p className="text-xs">Go to the <strong className="font-semibold text-slate-200">Workbook</strong> tab and start structuring your answers to watch your essay take form here!</p>
              </div>
            ) : (
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="manuscript-blocks">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                      {segments.map((item, idx) => {
                        if (item.val.trim() === '') return null;
                        const warning = checkLinterWarnings(item, idx);
                        
                        return (
                          // @ts-ignore
                          <Draggable key={item.id} draggableId={item.id} index={idx}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className="relative rounded-lg bg-slate-900 shadow border border-slate-800 group"
                              >
                                <div 
                                  {...provided.dragHandleProps} 
                                  className="absolute top-0 bottom-0 left-0 w-8 flex items-center justify-center cursor-grab bg-slate-800/20 group-hover:bg-cyan-900/30 rounded-l-lg border-r border-slate-800"
                                >
                                  <GripVertical className="w-4 h-4 text-slate-500 group-hover:text-cyan-400" />
                                </div>
                                <div className="pl-11 pr-4 py-3.5">
                                  <div className="flex items-center justify-between mb-1">
                                    <div className="text-[11px] uppercase font-sans tracking-widest text-teal-400 font-bold flex items-center gap-1">
                                      <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                                      {item.label} 
                                      <span className="text-slate-500 text-[11px] font-mono font-normal">({item.words} words)</span>
                                    </div>
                                    {warning && (
                                      <div className="group/tooltip relative flex items-center">
                                        <AlertCircle className="w-4 h-4 text-rose-500 cursor-help" />
                                        <div className="absolute right-0 top-full mt-2 w-48 p-2 bg-slate-800 text-xs text-rose-200 rounded-md opacity-0 group-hover/tooltip:opacity-100 pointer-events-none transition-opacity z-10 shadow-xl">
                                          {warning}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                  <p className="whitespace-pre-line leading-relaxed text-slate-200" id={`manuscript_paragraph_${idx}`}>
                                    {item.val}
                                  </p>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            )}
          </div>

          <div className="flex items-center gap-2 bg-slate-900 p-3.5 rounded-lg border border-slate-800">
            <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" />
            <p className="text-[11px] text-slate-400 font-sans leading-normal">
              <strong>Word Budgets are estimations:</strong> Admissions readers look for dynamic narrative tempo. Don't worry if your draft slightly misses the budget allocations as long as your overall size matches the target requirement!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
