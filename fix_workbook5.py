with open('src/components/Workbook.tsx', 'r') as f:
    content = f.read()

bad = """                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-sans font-medium text-slate-600 select-none">✨ Show this using a Cinematic Tool:</span>"""

good = """                    <div className="flex items-center gap-2 flex-wrap">
                      {(activePrompt.tools.includes('montage') || activePrompt.tools.includes('bullet_time')) && (
                        <span className="text-sm font-sans font-medium text-slate-600 select-none">✨ Show this using a Cinematic Tool:</span>
                      )}"""

content = content.replace(bad, good)
with open('src/components/Workbook.tsx', 'w') as f:
    f.write(content)
