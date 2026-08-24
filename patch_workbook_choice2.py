import re

with open('src/components/Workbook.tsx', 'r') as f:
    code = f.read()

old_block = """  if (showBrainstormChoice) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-140px)] w-full bg-[#0b101d] rounded-2xl border border-slate-800/80 overflow-hidden shadow-2xl p-8 relative">
        
        <div className="max-w-2xl text-center space-y-8 animate-fade-in z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-900 border border-slate-800 mb-2 shadow-xl shadow-slate-950">
            <Sparkles className="w-8 h-8 text-amber-400" />
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-slate-100 tracking-tight">How do you want to start?</h2>
          <p className="text-lg font-sans text-slate-400 max-w-xl mx-auto leading-relaxed">
            Every great essay begins with a choice. You can jump straight into outlining a story you already have in mind, or use our rapid-fire ideation tool if you're staring at a blank page.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <button
              onClick={() => setShowBrainstormChoice(false)}
              className="flex flex-col items-center gap-3 p-6 bg-slate-900/50 hover:bg-slate-800 border border-slate-800 hover:border-teal-500/50 rounded-2xl transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <LayoutPanelLeft className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-sans font-bold text-slate-200">I know my story</h3>
                <p className="text-xs text-slate-400">Take me to the structural outline</p>
              </div>
            </button>
            
            <button
              onClick={() => {
                setShowBrainstormChoice(false);
                setIsExcavatorOpen(true);
              }}
              className="flex flex-col items-center gap-3 p-6 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 hover:border-amber-500/50 rounded-2xl transition-all group shadow-lg shadow-amber-900/20"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Lightbulb className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-sans font-bold text-amber-400">Help me brainstorm</h3>
                <p className="text-xs text-amber-500/70">Open the Topic Excavator</p>
              </div>
            </button>
          </div>
        </div>

        {/* Ambient background blur */}"""

new_block = """  if (showBrainstormChoice) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-140px)] w-full bg-[#0b101d] rounded-2xl border border-slate-800/80 overflow-hidden shadow-2xl p-8 relative">
        
        <div className="max-w-2xl text-center space-y-8 animate-fade-in z-10">
          <h2 className="text-3xl md:text-4xl font-serif text-slate-100 tracking-tight">How do you want to start?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <button
              onClick={() => setShowBrainstormChoice(false)}
              className="flex flex-col items-center justify-center gap-1 p-6 bg-slate-900/50 hover:bg-slate-800 border border-slate-800 hover:border-teal-500/50 rounded-2xl transition-all group"
            >
              <h3 className="font-sans font-bold text-slate-200 text-lg">I already know my story</h3>
              <p className="text-sm text-slate-400">Help me start outlining it.</p>
            </button>
            
            <button
              onClick={() => {
                setShowBrainstormChoice(false);
                setIsExcavatorOpen(true);
              }}
              className="flex flex-col items-center justify-center gap-1 p-6 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 hover:border-amber-500/50 rounded-2xl transition-all group shadow-lg shadow-amber-900/20"
            >
              <h3 className="font-sans font-bold text-amber-400 text-lg">Help me brainstorm topics</h3>
              <p className="text-sm text-amber-500/70">Ask questions to help me think of potential stories.</p>
            </button>
          </div>
        </div>

        {/* Ambient background blur */}"""

if old_block in code:
    code = code.replace(old_block, new_block)
else:
    print("Old block not found!")

with open('src/components/Workbook.tsx', 'w') as f:
    f.write(code)

