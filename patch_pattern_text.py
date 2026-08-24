import re

with open('src/components/AssemblyBoard.tsx', 'r') as f:
    content = f.read()

old_text = """      {/* Pattern Switcher */}
      <div className="space-y-3">
        <h3 className="text-sm font-sans font-bold text-slate-300 uppercase tracking-widest">Narrative Pattern</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">"""

new_text = """      {/* Pattern Switcher */}
      <div className="space-y-3">
        <div>
          <h3 className="text-sm font-sans font-bold text-slate-300 uppercase tracking-widest">Narrative Pattern</h3>
          <p className="text-sm font-sans text-slate-400 mt-1">Select from the predefined arrangements below, or use the drag handles on the blocks to customize the order.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">"""

content = content.replace(old_text, new_text)

with open('src/components/AssemblyBoard.tsx', 'w') as f:
    f.write(content)
