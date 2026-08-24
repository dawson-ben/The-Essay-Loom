import re

with open('src/components/Workbook.tsx', 'r') as f:
    content = f.read()

# Remove showExplanation state
content = re.sub(r'const \[showExplanation, setShowExplanation\] = useState\(false\);\n', '', content)

# Remove setShowExplanation from handleNextPrompt
content = re.sub(r'setShowExplanation\(false\);\n', '', content)

# Replace the "Why are we asking this?" button and conditional rendering of the explanation
# We want to replace the whole block starting with `<div className="flex items-center gap-3">` down to `{showExplanation && (`
# Let's use regex creatively.
pattern_to_replace = r'<div className="flex items-center gap-3">\s*<button\s*onClick=\{.*?\}\s*className=".*?">\s*<Lightbulb.*?>\s*Why are we asking this\?\s*</button>.*?{showExplanation && \(\s*<div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3 text-sm text-slate-300 font-sans leading-relaxed animate-fade-in">'

replacement = r'''<div className="flex items-center gap-3">
                {/* Word Counter (Hidden until > 10 words) */}
                {wordCount > 10 && (
                  <div className="px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-sans font-medium text-teal-400 animate-fade-in">
                    {wordCount} words
                  </div>
                )}
              </div>
              
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3 text-sm text-slate-300 font-sans leading-relaxed animate-fade-in">'''

content = re.sub(pattern_to_replace, replacement, content, flags=re.DOTALL)

# Add "Go to Assembly Board" in the sidebar
sidebar_end_pattern = r'</button>\n\s*\);\n\s*}\)\}\n\s*</div>'
sidebar_end_replacement = r'''</button>
            );
          })}
          
          <div className="mt-8 pt-6 border-t border-slate-800/80 px-2 pb-4">
            <div className="text-xs font-sans text-slate-500 mb-3 text-center">Finished drafting?</div>
            <button
              onClick={onNavigateToAssembly}
              className="w-full flex items-center justify-center gap-2 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-xl text-sm font-sans font-medium transition-colors"
            >
              <LayoutList className="w-4 h-4 text-teal-400" />
              Go to Assembly Board
            </button>
          </div>
        </div>'''
content = re.sub(sidebar_end_pattern, sidebar_end_replacement, content)

# Update Next Prompt logic
next_prompt_pattern = r'\{\/\* Next button \*\/\}\n\s*\{blocks\.findIndex\(b => b\.id === activeBlockId\) < blocks\.length - 1 && \(\n\s*<div className="pt-4 flex justify-end border-t border-slate-800\/50 mt-4">\n\s*<button\n\s*onClick=\{handleNextPrompt\}\n\s*className="flex items-center gap-2 px-6 py-2\.5 bg-gradient-to-r from-teal-500 to-cyan-500 hover:opacity-95 text-slate-950 font-sans font-bold text-sm rounded-xl transition-all shadow-lg shadow-cyan-500\/20"\n\s*>\n\s*Next Prompt <ChevronRight className="w-4 h-4" \/>\n\s*<\/button>\n\s*<\/div>\n\s*\)\}'

next_prompt_replacement = r'''{/* Next or Finish button */}
                <div className="pt-4 flex justify-end border-t border-slate-800/50 mt-4">
                  {blocks.findIndex(b => b.id === activeBlockId) < blocks.length - 1 ? (
                    <button
                      onClick={handleNextPrompt}
                      className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-500 hover:opacity-95 text-slate-950 font-sans font-bold text-sm rounded-xl transition-all shadow-lg shadow-cyan-500/20"
                    >
                      Next Prompt <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={onNavigateToAssembly}
                      className="flex items-center gap-2 px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-teal-400 border border-slate-700 rounded-xl transition-all shadow-lg font-sans font-bold text-sm"
                    >
                      <LayoutList className="w-4 h-4" />
                      Go to Assembly Board
                    </button>
                  )}
                </div>'''
content = re.sub(next_prompt_pattern, next_prompt_replacement, content)

with open('src/components/Workbook.tsx', 'w') as f:
    f.write(content)
