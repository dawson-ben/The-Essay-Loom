import re

with open('src/components/Workbook.tsx', 'r') as f:
    content = f.read()

# Add LayoutList import if missing
if 'LayoutList' not in content[:1000]:
    content = content.replace('import { Lightbulb, LayoutPanelLeft, ', 'import { Lightbulb, LayoutPanelLeft, LayoutList, ')

# Re-add showExplanation to fix errors, then properly replace it by just rendering it
# Actually, let's just remove the uses of showExplanation.
content = re.sub(r'setShowExplanation\(false\); // Reset explanation toggle on change\s*', '', content)

# Remove the button block manually
pattern_button = r'<button\s*onClick=\{.*?setShowExplanation\(!showExplanation\)\}\s*className="[^"]*"\s*>\s*<Lightbulb className=\{`[^`]*`\} />\s*Why are we asking this\?\s*</button>'
content = re.sub(pattern_button, '', content, flags=re.DOTALL)

# Change {showExplanation && ( to just directly rendering the div
content = content.replace('{showExplanation && (', '')
content = re.sub(r'\{activePrompt\?\.tip && \(\s*<div.*?</div>\s*\)\}\s*</div>\s*\)', r'{activePrompt?.tip && (\n                    <div className="pt-2 mt-2 border-t border-slate-800 flex items-start gap-2 text-slate-400">\n                      <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />\n                      <p className="italic">Tip: {activePrompt.tip}</p>\n                    </div>\n                  )}\n                </div>', content, flags=re.DOTALL)


with open('src/components/Workbook.tsx', 'w') as f:
    f.write(content)
