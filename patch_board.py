import re

with open('src/components/AssemblyBoard.tsx', 'r') as f:
    content = f.read()

# Add getSequenceWithLeftovers helper
helper = """const getSequenceWithLeftovers = (patternLayout: PatternSlot[], blocks: EssayBlock[]) => {
  const usedIds = new Set(patternLayout.map(s => s.promptId));
  const leftovers = blocks.filter(b => !usedIds.has(b.promptId)).map(b => ({
    promptId: b.promptId,
    label: b.title,
    targetRangePercentage: [0, 0] as [number, number],
    isLeftover: true
  }));
  return [...patternLayout, ...leftovers];
};

export default function AssemblyBoard"""
content = content.replace("export default function AssemblyBoard", helper)

# Update state initialization to use leftovers
old_state = """  const [activePatternId, setActivePatternId] = useState<string>(compatiblePatterns[0]?.id || '');
  const [activeSequence, setActiveSequence] = useState<PatternSlot[]>(compatiblePatterns[0]?.layout || []);

  useEffect(() => {
    if (!compatiblePatterns.some(p => p.id === activePatternId)) {
      if (compatiblePatterns.length > 0) {
        setActivePatternId(compatiblePatterns[0].id);
        setActiveSequence([...compatiblePatterns[0].layout]);
      } else {
        setActivePatternId('');
        setActiveSequence([]);
      }
    }
  }, [compatiblePatterns, activePatternId]);

  const handlePatternChange = (patternId: string) => {
    setActivePatternId(patternId);
    const pattern = compatiblePatterns.find(p => p.id === patternId);
    if (pattern) {
      setActiveSequence([...pattern.layout]);
    }
  };"""
new_state = """  const [activePatternId, setActivePatternId] = useState<string>('');
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
  };"""
content = content.replace(old_state, new_state)

# Replace DraftingBlock UI to handle isLeftover styling and text
old_drafting_block_start = """    <div className="bg-slate-900 border border-slate-800 shadow-xl rounded-2xl overflow-hidden relative flex flex-col p-6 space-y-6">"""
new_drafting_block_start = """    <div className={`bg-slate-900 border shadow-xl rounded-2xl overflow-hidden relative flex flex-col p-6 space-y-6 ${slot.isLeftover ? 'border-amber-900/50 opacity-90' : 'border-slate-800'}`}>"""
content = content.replace(old_drafting_block_start, new_drafting_block_start)

old_target_text = """            <div className="text-xs font-sans text-slate-500 uppercase tracking-widest mt-1 flex flex-wrap items-center gap-2">
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
            </div>"""
new_target_text = """            <div className="text-xs font-sans text-slate-500 uppercase tracking-widest mt-1 flex flex-wrap items-center gap-2">
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
            </div>"""
content = content.replace(old_target_text, new_target_text)

# Inject leftover banner
banner_inj = """        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">"""
new_banner = """        )}
      </div>

      {slot.isLeftover && (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 text-sm font-sans text-amber-500/90 flex items-start gap-2 leading-relaxed">
          <strong className="font-bold text-amber-500">Note:</strong> This block isn't typically used in this narrative pattern. You can leave it blank to exclude it, or drag it into your sequence above to use it in your draft.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">"""
content = content.replace(banner_inj, new_banner)

# Fix Exports
old_copy = """  const handleCopyToClipboard = () => {
    let text = `--- ${draft.title} (Zero Draft) ---\\n\\n`;
    mappedBlocks.forEach(({ slot, block }, index) => {"""
new_copy = """  const handleCopyToClipboard = () => {
    let text = `--- ${draft.title} (Zero Draft) ---\\n\\n`;
    const exportBlocks = mappedBlocks.filter(b => !b.slot.isLeftover || (b.block?.draftText && b.block.draftText.trim().length > 0));
    exportBlocks.forEach(({ slot, block }, index) => {"""
content = content.replace(old_copy, new_copy)

old_docx = """  const handleDownloadDocx = async () => {
    const children: any[] = [
      new Paragraph({
        text: `${draft.title} (Zero Draft)`,
        heading: HeadingLevel.HEADING_1,
      }),
    ];

    mappedBlocks.forEach(({ slot, block }, index) => {"""
new_docx = """  const handleDownloadDocx = async () => {
    const children: any[] = [
      new Paragraph({
        text: `${draft.title} (Zero Draft)`,
        heading: HeadingLevel.HEADING_1,
      }),
    ];

    const exportBlocks = mappedBlocks.filter(b => !b.slot.isLeftover || (b.block?.draftText && b.block.draftText.trim().length > 0));
    exportBlocks.forEach(({ slot, block }, index) => {"""
content = content.replace(old_docx, new_docx)

content = content.replace("if (index < mappedBlocks.length - 1) {", "if (index < exportBlocks.length - 1) {")

with open('src/components/AssemblyBoard.tsx', 'w') as f:
    f.write(content)
