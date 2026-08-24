import re

with open('src/components/AssemblyBoard.tsx', 'r') as f:
    content = f.read()

# Update DraftingBlock definition
old_drafting_block = """const DraftingBlock = ({ slot, block, limitType }: { slot: PatternSlot, block: EssayBlock | undefined, limitType: 'words' | 'characters' }) => {
  const minTarget = slot.targetRangePercentage[0];
  const maxTarget = slot.targetRangePercentage[1];
  const wordCount = countWords(block?.content);
  const charCount = countCharacters(block?.content);
  const displayCount = limitType === 'words' ? wordCount : charCount;
  const countLabel = limitType === 'words' ? 'Word' : 'Character';
  
  return (
    <div className="bg-slate-900 border border-slate-800 shadow-xl rounded-2xl overflow-hidden p-6 relative">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="font-serif text-xl text-slate-200">{slot.label}</h4>
          <div className="text-xs font-sans text-slate-500 uppercase tracking-widest mt-1">
            Target: {minTarget}% - {maxTarget}%
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
      <div className="text-base font-sans text-slate-300 leading-relaxed whitespace-pre-wrap">
        {block?.content ? (
          block.content
        ) : block?.microAnswers && block.microAnswers.some(m => m.answer.trim().length > 0) ? (
          <span className="italic text-slate-500">
            {block.microAnswers.filter(m => m.answer.trim().length > 0).map(m => m.answer).join(' ')}
          </span>
        ) : (
          <span className="italic text-slate-600">No response written for this block yet.</span>
        )}
      </div>
      <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end items-center">
        <span className="text-sm font-sans font-medium text-slate-500">
          {countLabel} count: <span className="text-slate-400">{displayCount}</span>
        </span>
      </div>
    </div>
  );
};"""

new_drafting_block = """const DraftingBlock = ({ slot, block, limitType, onUpdateDraftText }: { slot: PatternSlot, block: EssayBlock | undefined, limitType: 'words' | 'characters', onUpdateDraftText: (text: string) => void }) => {
  const minTarget = slot.targetRangePercentage[0];
  const maxTarget = slot.targetRangePercentage[1];
  const draftOrContent = block?.draftText !== undefined ? block.draftText : (block?.content || '');
  const wordCount = countWords(draftOrContent);
  const charCount = countCharacters(draftOrContent);
  const displayCount = limitType === 'words' ? wordCount : charCount;
  const countLabel = limitType === 'words' ? 'Word' : 'Character';
  
  return (
    <div className="bg-slate-900 border border-slate-800 shadow-xl rounded-2xl overflow-hidden relative flex flex-col">
      <div className="p-6 border-b border-slate-800">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-serif text-xl text-slate-200">{slot.label}</h4>
            <div className="text-xs font-sans text-slate-500 uppercase tracking-widest mt-1">
              Target: {minTarget}% - {maxTarget}%
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
      </div>
      <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-800 flex-1">
        <div className="p-6 md:w-1/2 bg-slate-900/40">
          <h5 className="text-xs font-sans font-bold text-slate-500 uppercase tracking-widest mb-3">Workbook Notes</h5>
          <div className="text-sm font-sans text-slate-400 leading-relaxed whitespace-pre-wrap">
            {block?.content ? (
              block.content
            ) : block?.microAnswers && block.microAnswers.some(m => m.answer.trim().length > 0) ? (
              <span className="italic text-slate-500">
                {block.microAnswers.filter(m => m.answer.trim().length > 0).map(m => m.answer).join(' ')}
              </span>
            ) : (
              <span className="italic text-slate-600">No response written for this block yet.</span>
            )}
          </div>
        </div>
        <div className="p-6 md:w-1/2 bg-slate-900 flex flex-col">
          <h5 className="text-xs font-sans font-bold text-teal-500 uppercase tracking-widest mb-3">Draft 0.5</h5>
          <textarea
            value={block?.draftText !== undefined ? block.draftText : ''}
            onChange={(e) => onUpdateDraftText(e.target.value)}
            placeholder="Write your draft for this section here..."
            className="w-full flex-1 min-h-[150px] bg-transparent resize-y text-slate-200 text-base font-sans focus:outline-none placeholder-slate-700 leading-relaxed"
          />
        </div>
      </div>
      <div className="px-6 py-4 border-t border-slate-800 flex justify-end items-center bg-slate-900">
        <span className="text-sm font-sans font-medium text-slate-500">
          {countLabel} count: <span className="text-slate-400">{displayCount}</span>
        </span>
      </div>
    </div>
  );
};"""

content = content.replace(old_drafting_block, new_drafting_block)

# Update state variables
old_state = """  const compatiblePatterns = NARRATIVE_PATTERNS.filter(p => p.compatibleTrackId === draft.track);
  const [activePatternId, setActivePatternId] = useState<string>(compatiblePatterns[0]?.id || '');

  useEffect(() => {
    if (!activePatternId && compatiblePatterns.length > 0) {
      setActivePatternId(compatiblePatterns[0].id);
    }
  }, [compatiblePatterns, activePatternId]);

  const activePattern = compatiblePatterns.find(p => p.id === activePatternId) || compatiblePatterns[0];
  const blocks = draft.blocks || [];
  
  // Find mapped blocks based on current pattern layout
  const mappedBlocks = activePattern ? activePattern.layout.map(slot => ({
    slot,
    block: blocks.find(b => b.promptId === slot.promptId)
  })) : [];"""

new_state = """  const compatiblePatterns = NARRATIVE_PATTERNS.filter(p => p.compatibleTrackId === draft.track);
  const [activePatternId, setActivePatternId] = useState<string>(compatiblePatterns[0]?.id || '');
  const [activeSequence, setActiveSequence] = useState<PatternSlot[]>(compatiblePatterns[0]?.layout || []);

  const handlePatternChange = (patternId: string) => {
    setActivePatternId(patternId);
    const pattern = compatiblePatterns.find(p => p.id === patternId);
    if (pattern) {
      setActiveSequence([...pattern.layout]);
    }
  };

  const blocks = draft.blocks || [];
  
  // Find mapped blocks based on current activeSequence
  const mappedBlocks = activeSequence.map(slot => ({
    slot,
    block: blocks.find(b => b.promptId === slot.promptId)
  }));"""

content = content.replace(old_state, new_state)

# Update copy to clipboard and download
# Actually they use `block?.content`. Let's update them to use draftText if available
content = content.replace(
    "text += block?.content || (block?.microAnswers?.map(m => m.answer).join(' ')) || '';",
    "text += (block?.draftText !== undefined && block?.draftText.trim().length > 0 ? block.draftText : (block?.content || (block?.microAnswers?.map(m => m.answer).join(' ')) || ''));"
)
content = content.replace(
    "const content = block?.content || (block?.microAnswers?.map(m => m.answer).join(' ')) || '';",
    "const content = (block?.draftText !== undefined && block?.draftText.trim().length > 0 ? block.draftText : (block?.content || (block?.microAnswers?.map(m => m.answer).join(' ')) || ''));"
)

# Replace countWords / countCharacters to use draftText inside the total calculations
content = content.replace(
    "mappedBlocks.reduce((acc, { block }) => acc + countWords(block?.content), 0);",
    "mappedBlocks.reduce((acc, { block }) => acc + countWords(block?.draftText !== undefined ? block.draftText : block?.content), 0);"
)
content = content.replace(
    "mappedBlocks.reduce((acc, { block }) => acc + countCharacters(block?.content), 0);",
    "mappedBlocks.reduce((acc, { block }) => acc + countCharacters(block?.draftText !== undefined ? block.draftText : block?.content), 0);"
)

# Update pattern switcher
content = content.replace(
    "onClick={() => setActivePatternId(pattern.id)}",
    "onClick={() => handlePatternChange(pattern.id)}"
)

# Update DraftingBlock rendering
old_render = "<DraftingBlock slot={slot} block={block} limitType={limitType} />"
new_render = """<DraftingBlock 
                  slot={slot} 
                  block={block} 
                  limitType={limitType} 
                  onUpdateDraftText={(text) => {
                    if (!block) return;
                    const newBlocks = blocks.map(b => b.id === block.id ? { ...b, draftText: text } : b);
                    onUpdateDraft({ ...draft, blocks: newBlocks });
                  }}
                />"""
content = content.replace(old_render, new_render)

with open('src/components/AssemblyBoard.tsx', 'w') as f:
    f.write(content)
