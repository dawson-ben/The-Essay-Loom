import re

with open('src/components/AssemblyBoard.tsx', 'r') as f:
    content = f.read()

new_state = """  const compatiblePatterns = NARRATIVE_PATTERNS.filter(p => p.compatibleTrackId === draft.track);
  const [activePatternId, setActivePatternId] = useState<string>(compatiblePatterns[0]?.id || '');
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

  const handlePatternChange = (patternId: string) => {"""

content = re.sub(r"  const compatiblePatterns = NARRATIVE_PATTERNS\.filter\(p => p\.compatibleTrackId === draft\.track\);\n  const \[activePatternId, setActivePatternId\] = useState<string>\(compatiblePatterns\[0\]\?\.id \|\| ''\);\n  const \[activeSequence, setActiveSequence\] = useState<PatternSlot\[\]>\(compatiblePatterns\[0\]\?\.layout \|\| \[\]\);\n\n  const handlePatternChange = \(patternId: string\) => \{", new_state, content, flags=re.DOTALL)

with open('src/components/AssemblyBoard.tsx', 'w') as f:
    f.write(content)
