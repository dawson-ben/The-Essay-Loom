import re

with open('src/components/AssemblyBoard.tsx', 'r') as f:
    content = f.read()

# Using regex to find the block since exact string matching failed
pattern = r"const compatiblePatterns = NARRATIVE_PATTERNS.*?\}\)\) : \[\];"

new_state = """const compatiblePatterns = NARRATIVE_PATTERNS.filter(p => p.compatibleTrackId === draft.track);
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

content = re.sub(pattern, new_state, content, flags=re.DOTALL)

with open('src/components/AssemblyBoard.tsx', 'w') as f:
    f.write(content)
