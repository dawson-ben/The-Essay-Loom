import re

with open('src/components/AssemblyBoard.tsx', 'r') as f:
    content = f.read()

# Replace DraftingBlock
old_drafting_block_regex = r"const DraftingBlock = \(\{ slot, block, limitType, onUpdateDraftText \}.*?(?=export default function AssemblyBoard)"
new_drafting_block = """const DraftingBlock = ({ 
  slot, 
  block, 
  limitType,
  globalLimitValue,
  onDraftChange 
}: { 
  slot: PatternSlot;
  block: EssayBlock | undefined;
  limitType: 'words' | 'characters';
  globalLimitValue: number;
  onDraftChange: (text: string) => void;
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
    <div className="bg-slate-900 border border-slate-800 shadow-xl rounded-2xl overflow-hidden relative flex flex-col p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-serif text-xl text-slate-200">{slot.label}</h4>
          <div className="text-xs font-sans text-slate-500 uppercase tracking-widest mt-1 flex flex-wrap items-center gap-2">
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
            <span>Draft this section here</span>
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

"""
content = re.sub(old_drafting_block_regex, new_drafting_block, content, flags=re.DOTALL)

# Update the DraftingBlock usage in mappedBlocks
old_usage_regex = r"<DraftingBlock.*?/>"
new_usage = """<DraftingBlock 
                  slot={slot} 
                  block={block} 
                  limitType={limitType}
                  globalLimitValue={limitValue}
                  onDraftChange={(text) => {
                    if (!block) return;
                    const newBlocks = blocks.map(b => b.id === block.id ? { ...b, draftText: text } : b);
                    onUpdateDraft({ ...draft, blocks: newBlocks });
                  }}
                />"""
content = re.sub(old_usage_regex, new_usage, content, flags=re.DOTALL)

with open('src/components/AssemblyBoard.tsx', 'w') as f:
    f.write(content)
