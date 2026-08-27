with open('src/components/Workbook.tsx', 'r') as f:
    content = f.read()

bad = """  const handleSaveExcavator = (topic: string) => {
    setIsExcavatorOpen(false);
    if (activeBlockId) {
      updateActiveBlock({ content: topic });
    }
  };"""

good = """  const handleSaveExcavator = (topic: string) => {
    setIsExcavatorOpen(false);
    if (activeBlockId) {
      const newBlocks = blocks.map(b => b.id === activeBlockId ? { ...b, brainstormedTopics: topic } : b);
      setBlocks(newBlocks);
      const newScratchpad = activeDraft.scratchpad 
        ? activeDraft.scratchpad + '\\n\\n--- Brainstormed Topics ---\\n' + topic 
        : '--- Brainstormed Topics ---\\n' + topic;
      onUpdateDraft({ ...activeDraft, blocks: newBlocks, scratchpad: newScratchpad });
    }
  };"""

content = content.replace(bad, good)
with open('src/components/Workbook.tsx', 'w') as f:
    f.write(content)
