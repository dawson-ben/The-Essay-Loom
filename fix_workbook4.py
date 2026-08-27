with open('src/components/Workbook.tsx', 'r') as f:
    content = f.read()

bad = """                  <textarea
                    value={activeBlock.content}
                    onChange={(e) => updateActiveBlock({ content: e.target.value })}
                    placeholder="Start writing..."
                    className="w-full min-h-[300px] bg-slate-950/50 border border-slate-800/80 rounded-2xl p-6 text-base font-sans text-slate-200 leading-relaxed focus:outline-none focus:ring-1 focus:ring-teal-500/50 focus:border-teal-500/50 placeholder:text-slate-600 transition-all resize-y"
                  />
                )}"""

good = """                  <textarea
                    value={activeBlock.content}
                    onChange={(e) => updateActiveBlock({ content: e.target.value })}
                    placeholder="Start writing..."
                    className="w-full min-h-[300px] bg-slate-950/50 border border-slate-800/80 rounded-2xl p-6 text-base font-sans text-slate-200 leading-relaxed focus:outline-none focus:ring-1 focus:ring-teal-500/50 focus:border-teal-500/50 placeholder:text-slate-600 transition-all resize-y"
                  />
                )}
                
                {activeBlock.brainstormedTopics && (
                  <div className="bg-slate-900 border border-amber-500/20 rounded-xl p-4 mt-2">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="w-4 h-4 text-amber-500" />
                      <h4 className="text-sm font-sans font-bold text-amber-400">Brainstormed Ideas</h4>
                    </div>
                    <div className="text-sm font-sans text-slate-300 whitespace-pre-wrap leading-relaxed">
                      {activeBlock.brainstormedTopics}
                    </div>
                  </div>
                )}"""

content = content.replace(bad, good)
with open('src/components/Workbook.tsx', 'w') as f:
    f.write(content)
