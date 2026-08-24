import re

with open('src/components/InteractiveGuidebook.tsx', 'r') as f:
    content = f.read()

# Default
content = re.sub(
    r'className="px-3\.5 py-1\.5 bg-slate-900 border border-slate-800 text-slate-[0-9]+ rounded-lg text-center(?: font-bold)?"',
    'className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-400 rounded-lg text-center font-medium shadow-sm"',
    content
)

with open('src/components/InteractiveGuidebook.tsx', 'w') as f:
    f.write(content)

