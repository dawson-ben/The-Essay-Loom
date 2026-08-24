import re

with open('src/components/InteractiveGuidebook.tsx', 'r') as f:
    content = f.read()

# Default
content = re.sub(
    r'className="px-3\.5 py-1\.5 bg-slate-900 border border-slate-800 text-slate-[34]00 rounded-lg text-center(?: font-bold)?"',
    'className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-400 rounded-lg text-center font-medium shadow-sm"',
    content
)

# Blue highlights
content = re.sub(
    r'className="px-3\.5 py-1\.5 bg-blue-900/[0-9]+ border border-blue-[0-9]+/[0-9]+ text-blue-300 rounded-lg text-center(?: font-bold)?"',
    'className="px-3 py-1.5 bg-blue-900/30 border border-blue-800/50 text-blue-400 rounded-lg text-center font-bold shadow-sm"',
    content
)

# Replace remaining
with open('src/components/InteractiveGuidebook.tsx', 'w') as f:
    f.write(content)

