import React, { useState, useEffect } from 'react';
import { EssayDraft, EssayBlock, NarrativePattern, PatternSlot } from '../types';
import { NARRATIVE_PATTERNS } from '../constants';
import { Link as LinkIcon, LayoutList, Copy, Download, Film, Sparkles, GripVertical } from 'lucide-react';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface AssemblyBoardProps {
  draft: EssayDraft;
  onUpdateDraft: (updated: EssayDraft) => void;
}

const countWords = (text?: string): number => {
  if (!text || text.trim() === '') return 0;
  return text.trim().split(/\s+/).length;
};

const countCharacters = (text?: string): number => {
  if (!text) return 0;
  return text.length;
};

const DraftingBlock = ({ 
  slot, 
  block, 
  limitType,
  globalLimitValue,
  onDraftChange,
  dragHandleProps
}: { 
  slot: PatternSlot;
  block: EssayBlock | undefined;
  limitType: 'words' | 'characters';
  globalLimitValue: number;
  onDraftChange: (text: string) => void;
  dragHandleProps?: any;
}) => {
  const minTarget = slot.targetRangePercentage[0];
  const maxTarget = slot.targetRangePercentage[1];
  
  const draftText = block?.draftText || '';
  const wordCount = countWords(draftText);
  const charCount = countCharacters(draftText);
  const displayCount = limitType === 'words' ? wordCount : charCount;
  const countLabel = limitType === 'words' ? 'Word' : 'Character';
  
  const minTargetCount = Math.floor(globalLimitValue * (minTarget / 100));
  const maxTargetCount = Math.ceil(globalLimitValue * (maxTarget / 100));
  
  const isUnderweight = displayCount < minTargetCount;
  const isOverweight = displayCount > maxTargetCount;
  const showIndicator = draftText.trim().length > 0;

  return (
    <div className={`bg-slate-900 border shadow-xl rounded-2xl overflow-hidden relative flex flex-col p-6 space-y-6 ${slot.isLeftover ? 'border-amber-900/50 opacity-90' : 'border-slate-800'}`}>
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-3">
          <div {...dragHandleProps} className="mt-1 cursor-grab active:cursor-grabbing text-slate-500 hover:text-slate-300">
            <GripVertical className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-serif text-xl text-slate-200">{slot.label}</h4>
            <div className="text-xs font-sans text-slate-500 uppercase tracking-widest mt-1 flex flex-wrap items-center gap-2">
              {slot.isLeftover ? (
                <span className="text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full font-bold">Unused in Pattern</span>
              ) : (
                <>
                  Target: {minTarget}% - {maxTarget}% ({minTargetCount} - {maxTargetCount} {limitType})
                  {showIndicator && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isUnderweight ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                      isOverweight ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' :
                      'bg-teal-500/10 text-teal-500 border border-teal-500/20'
                    }`}>
                      {isUnderweight ? 'Underweight' : isOverweight ? 'Overweight' : 'On Target'}
                    </span>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        {block && (
          <div className="flex items-center gap-2">
            {block.activeTool === 'montage' && (
              <span className="flex items-center gap-1 px-2 py-1 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-sans font-bold rounded-md">
                <Film className="w-3 h-3" /> Montage
              </span>
            )}
            {block.activeTool === 'bulletTime' && (
              <span className="flex items-center gap-1 px-2 py-1 bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-sans font-bold rounded-md">
                <Sparkles className="w-3 h-3" /> Bullet Time
              </span>
            )}
          </div>
        )}
      </div>

      {slot.isLeftover && (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 text-sm font-sans text-amber-500/90 flex items-start gap-2 leading-relaxed">
          <strong className="font-bold text-amber-500">Note:</strong> This block isn't typically used in this narrative pattern. You can leave it blank to exclude it, or drag it into your sequence above to use it in your draft.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
        <div className="flex flex-col space-y-2">
          <h5 className="text-xs font-sans font-bold text-slate-500 uppercase tracking-widest">Workbook Notes</h5>
          <div className="text-sm text-slate-500 italic bg-slate-900/50 p-4 rounded-xl border border-slate-800/50 leading-relaxed whitespace-pre-wrap flex-1">
            {block?.content ? (
              block.content
            ) : block?.microAnswers && block.microAnswers.some(m => m.answer.trim().length > 0) ? (
              block.microAnswers.filter(m => m.answer.trim().length > 0).map(m => m.answer).join(' ')
            ) : (
              "No response written for this block yet."
            )}
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <h5 className="text-xs font-sans font-bold text-teal-500 uppercase tracking-widest flex justify-between">
            <span>Draft this section here.</span>
            <span className="text-slate-500 font-medium normal-case">
              {countLabel}s: <span className={
                !showIndicator ? "text-slate-400" :
                isUnderweight ? "text-amber-500" :
                isOverweight ? "text-rose-500" :
                "text-teal-400"
              }>{displayCount}</span>
            </span>
          </h5>
          <textarea
            value={draftText}
            onChange={(e) => onDraftChange(e.target.value)}
            placeholder="Write your draft for this section here..."
            className="w-full flex-1 min-h-[150px] bg-slate-950/50 border border-slate-800 rounded-xl p-4 resize-y text-slate-200 text-base font-sans focus:outline-none focus:border-teal-500/50 placeholder-slate-700 leading-relaxed transition-colors"
          />
        </div>
      </div>
    </div>
  );
};

type SortableProps = {
  slot: PatternSlot;
  block: EssayBlock | undefined;
  limitType: 'words' | 'characters';
  globalLimitValue: number;
  onDraftChange: (text: string) => void;
};

const SortableDraftingBlock: React.FC<SortableProps> = ({
  slot,
  block,
  limitType,
  globalLimitValue,
  onDraftChange
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: slot.promptId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    position: 'relative' as const,
  };

  return (
    <div ref={setNodeRef} style={style} className="mb-4">
      <DraftingBlock 
        slot={slot}
        block={block}
        limitType={limitType}
        globalLimitValue={globalLimitValue}
        onDraftChange={onDraftChange}
        dragHandleProps={{...attributes, ...listeners}}
      />
    </div>
  );
};

const getSequenceWithLeftovers = (patternLayout: PatternSlot[], blocks: EssayBlock[]) => {
  const usedIds = new Set(patternLayout.map(s => s.promptId));
  const leftovers = blocks.filter(b => !usedIds.has(b.promptId)).map(b => ({
    promptId: b.promptId,
    label: b.title,
    targetRangePercentage: [0, 0] as [number, number],
    isLeftover: true
  }));
  return [...patternLayout, ...leftovers];
};

export default function AssemblyBoard({ draft, onUpdateDraft }: AssemblyBoardProps) {
  const compatiblePatterns = NARRATIVE_PATTERNS.filter(p => p.compatibleTrackId === draft.track);
  const [activePatternId, setActivePatternId] = useState<string>('');
  const [activeSequence, setActiveSequence] = useState<PatternSlot[]>([]);

  useEffect(() => {
    if (!compatiblePatterns.some(p => p.id === activePatternId)) {
      if (compatiblePatterns.length > 0) {
        setActivePatternId(compatiblePatterns[0].id);
        setActiveSequence(getSequenceWithLeftovers(compatiblePatterns[0].layout, draft.blocks || []));
      } else {
        setActivePatternId('');
        setActiveSequence([]);
      }
    }
  }, [compatiblePatterns, activePatternId, draft.blocks]);

  const handlePatternChange = (patternId: string) => {
    setActivePatternId(patternId);
    const pattern = compatiblePatterns.find(p => p.id === patternId);
    if (pattern) {
      setActiveSequence(getSequenceWithLeftovers(pattern.layout, draft.blocks || []));
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      setActiveSequence((items) => {
        const oldIndex = items.findIndex(item => item.promptId === active.id);
        const newIndex = items.findIndex(item => item.promptId === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const blocks = draft.blocks || [];
  
  // Find mapped blocks based on current activeSequence
  const mappedBlocks = activeSequence.map(slot => ({
    slot,
    block: blocks.find(b => b.promptId === slot.promptId)
  }));

  const limitType = draft.limitType || 'words';
  const limitValue = draft.limitValue || draft.targetWordCount || 650;

  const totalWords = mappedBlocks.reduce((acc, { block }) => acc + countWords(block?.draftText || ''), 0);
  const totalChars = mappedBlocks.reduce((acc, { block }) => acc + countCharacters(block?.draftText || ''), 0);
  
  const totalCount = limitType === 'words' ? totalWords : totalChars;

  const handleCopyToClipboard = () => {
    let text = `--- ${draft.title} (Zero Draft) ---\n\n`;
    const exportBlocks = mappedBlocks.filter(b => !b.slot.isLeftover || (b.block?.draftText && b.block.draftText.trim().length > 0));
    exportBlocks.forEach(({ slot, block }, index) => {
      text += `[ ${slot.label} ]\n`;
      text += (block?.draftText !== undefined && block?.draftText.trim().length > 0 ? block.draftText : (block?.content || (block?.microAnswers?.map(m => m.answer).join(' ')) || ''));
      text += '\n\n';
      if (index < exportBlocks.length - 1) {
        text += `[ Insert Transition Here ]\n\n`;
      }
    });
    navigator.clipboard.writeText(text);
    alert('Zero draft copied to clipboard!');
  };

  const handleDownloadDocx = async () => {
    const children: any[] = [
      new Paragraph({
        text: `${draft.title} (Zero Draft)`,
        heading: HeadingLevel.HEADING_1,
      }),
    ];

    const exportBlocks = mappedBlocks.filter(b => !b.slot.isLeftover || (b.block?.draftText && b.block.draftText.trim().length > 0));
    exportBlocks.forEach(({ slot, block }, index) => {
      children.push(
        new Paragraph({
          text: `[ ${slot.label} ]`,
          heading: HeadingLevel.HEADING_2,
        })
      );
      const content = (block?.draftText !== undefined && block?.draftText.trim().length > 0 ? block.draftText : (block?.content || (block?.microAnswers?.map(m => m.answer).join(' ')) || ''));
      if (content) {
        children.push(new Paragraph({ text: content }));
      }
      if (index < exportBlocks.length - 1) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({ text: "\n\n[ Insert transition here ]\n\n", bold: true }),
            ],
          })
        );
      }
    });

    const doc = new Document({
      sections: [{ properties: {}, children }],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${draft.title.replace(/\s+/g, '_')}_zero_draft.docx`);
  };

  if (!compatiblePatterns.length) {
    return (
      <div className="flex flex-col items-center justify-center h-[500px] text-slate-500 space-y-4">
        <LayoutList className="w-12 h-12 text-slate-700" />
        <p>No compatible narrative patterns found for this track.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-20">
      
      {/* Header and Global Counter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="space-y-1">
          <h2 className="text-2xl font-serif text-white font-medium flex items-center gap-2">
            <LayoutList className="w-6 h-6 text-teal-400" />
            Assembly Board
          </h2>
          <p className="text-sm font-sans text-slate-400">
            Arrange your narrative beats in an order that feels right and start drafting text that flows together.
          </p>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 bg-slate-950/50 py-2 px-4 rounded-xl border border-slate-800">
            <div className="text-2xl font-serif text-white">
              {totalCount} <span className="text-slate-500 text-2xl font-serif">/</span>
            </div>
            <input
              type="number"
              value={limitValue}
              onChange={(e) => onUpdateDraft({ ...draft, limitValue: parseInt(e.target.value) || 0 })}
              className="w-16 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-slate-200 text-center text-sm font-sans font-medium focus:outline-none focus:border-teal-500 transition-colors"
              title="Target value"
            />
            <select
              value={limitType}
              onChange={(e) => onUpdateDraft({ ...draft, limitType: e.target.value as 'words' | 'characters' })}
              className="bg-transparent text-slate-400 font-sans font-bold uppercase text-xs focus:outline-none hover:text-slate-300 transition-colors cursor-pointer outline-none ring-0 appearance-none text-left"
              title="Limit type"
              style={{ WebkitAppearance: 'none', MozAppearance: 'none', backgroundPosition: 'right 0.5rem center' }}
            >
              <option value="words" className="bg-slate-900">words</option>
              <option value="characters" className="bg-slate-900">chars</option>
            </select>
          </div>
          
          <div className="flex flex-col gap-2">
            <button
              onClick={handleCopyToClipboard}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-lg text-sm font-sans font-medium transition-colors"
            >
              <Copy className="w-4 h-4 text-sky-400" />
              Copy
            </button>
            <button
              onClick={handleDownloadDocx}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 text-teal-400 rounded-lg text-sm font-sans font-medium transition-colors"
            >
              <Download className="w-4 h-4" />
              .docx
            </button>
          </div>
        </div>
      </div>

      {/* Pattern Switcher */}
      <div className="space-y-3">
        <div>
          <h3 className="text-sm font-sans font-bold text-slate-300 uppercase tracking-widest">Narrative Pattern</h3>
          <p className="text-sm font-sans text-slate-400 mt-1">Select from the predefined arrangements below, or use the drag handles on the blocks to customize the order.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {compatiblePatterns.map(pattern => (
            <button
              key={pattern.id}
              onClick={() => handlePatternChange(pattern.id)}
              className={`p-4 rounded-xl border text-left transition-all ${
                activePatternId === pattern.id 
                  ? 'bg-teal-950/30 border-teal-500/50 shadow-lg shadow-teal-900/20' 
                  : 'bg-slate-900 border-slate-800 hover:border-slate-600'
              }`}
            >
              <div className="font-sans font-bold text-slate-200 mb-1">{pattern.name}</div>
              <div className="text-sm font-sans text-slate-400">{pattern.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* The Engine (Drafting Blocks) */}
      <div className="bg-[#0b101d] border border-slate-800 rounded-2xl p-8 shadow-2xl">
        <div className="space-y-4">
          <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext 
              items={activeSequence.map(slot => slot.promptId)}
              strategy={verticalListSortingStrategy}
            >
              {mappedBlocks.map(({ slot, block }) => (
                <SortableDraftingBlock
                  key={slot.promptId}
                  slot={slot}
                  block={block}
                  limitType={limitType}
                  globalLimitValue={limitValue}
                  onDraftChange={(text) => {
                    if (!block) return;
                    const newBlocks = blocks.map(b => b.id === block.id ? { ...b, draftText: text } : b);
                    onUpdateDraft({ ...draft, blocks: newBlocks });
                  }}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </div>
  );
}
