with open('src/components/Workbook.tsx', 'r') as f:
    content = f.read()

bad = """                    <button
                      onClick={() => updateActiveBlock({ isStuck: true })}
                      className="flex items-center gap-2 text-sm font-sans font-medium text-slate-500 hover:text-amber-400 transition-colors px-2 py-1"
                    >"""

good = """                    <div className="flex items-center gap-4">
                      {activePrompt.tools.includes('excavator') && (
                        <button
                          onClick={() => setIsExcavatorOpen(true)}
                          className="flex items-center gap-2 text-sm font-sans font-bold text-amber-500 hover:text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          <Lightbulb className="w-4 h-4" />
                          Brainstorm Topics
                        </button>
                      )}
                      <button
                        onClick={() => updateActiveBlock({ isStuck: true })}
                        className="flex items-center gap-2 text-sm font-sans font-medium text-slate-500 hover:text-amber-400 transition-colors px-2 py-1"
                      >"""

content = content.replace(bad, good)
with open('src/components/Workbook.tsx', 'w') as f:
    f.write(content)
