import React, { useState, useEffect } from 'react';
import { EssayDraft, EssayBlock, TrackType, CinematicToolType, MicroAnswer, MontageData, BulletTimeData } from '../types';
import { HEROS_JOURNEY_PROMPTS, DIFFERENT_BUT_TRUTHFUL_PROMPTS, INTELLECTUAL_JOURNEY_PROMPTS } from '../constants';
import { Lightbulb, LayoutPanelLeft, LayoutList, Wand2, ChevronRight, CheckCircle2, Film, Sparkles, X, Plus, Users, ChevronDown, ChevronUp } from 'lucide-react';
import { CHARACTER_GUIDES } from '../data/characterGuides';
import TopicBrainstormingModal from './TopicBrainstormingModal';

interface WorkbookProps {
  activeDraft: EssayDraft;
  onUpdateDraft: (updatedDraft: EssayDraft) => void;
  onDeleteDraft: (id: string) => void;
  onNavigateToAssembly: () => void;
}

export default function Workbook({ 
  activeDraft, 
  onUpdateDraft,
  onNavigateToAssembly
}: WorkbookProps) {
  
  // Get prompts for current track
  const prompts = activeDraft.track === 'heros_journey'
    ? HEROS_JOURNEY_PROMPTS
    : activeDraft.track === 'different_but_truthful'
      ? DIFFERENT_BUT_TRUTHFUL_PROMPTS
      : INTELLECTUAL_JOURNEY_PROMPTS;

  const [blocks, setBlocks] = useState<EssayBlock[]>([]);
  const [activeBlockId, setActiveBlockId] = useState<string | null>(null);

  const [showGuideSelector, setShowGuideSelector] = useState(false);
  const [selectedGuideIds, setSelectedGuideIds] = useState<string[]>([]);
  
  const [isExcavatorOpen, setIsExcavatorOpen] = useState(false);
  const [showBrainstormChoice, setShowBrainstormChoice] = useState(() => {
    return activeDraft.blocks.length === 0 || activeDraft.blocks.every(b => !b.content && (!b.microAnswers || b.microAnswers.every(m => !m.answer)));
  });

  useEffect(() => {
    if (activeDraft.blocks && activeDraft.blocks.length > 0) {
      setBlocks(activeDraft.blocks);
      if (!activeBlockId) {
        setActiveBlockId(activeDraft.blocks[0].id);
      }
    } else {
      const initialBlocks: EssayBlock[] = prompts.map(p => ({
        id: crypto.randomUUID(),
        promptId: p.id,
        title: p.label,
        description: p.description,
        content: '',
        microAnswers: [
          { questionLabel: 'What happened physically?', answer: '' },
          { questionLabel: 'How did you feel internally?', answer: '' },
          { questionLabel: 'What was the immediate consequence?', answer: '' }
        ],
        isStuck: false,
        activeTool: 'none'
      }));
      setBlocks(initialBlocks);
      setActiveBlockId(initialBlocks[0].id);
      onUpdateDraft({ ...activeDraft, blocks: initialBlocks });
    }
  }, [activeDraft.id]);

  const updateActiveBlock = (updates: Partial<EssayBlock>) => {
    const newBlocks = blocks.map(b => b.id === activeBlockId ? { ...b, ...updates } : b);
    setBlocks(newBlocks);
    onUpdateDraft({ ...activeDraft, blocks: newBlocks });
  };

  const activeBlock = blocks.find(b => b.id === activeBlockId);
  const activePrompt = prompts.find(p => p.id === activeBlock?.promptId);

  const handleNextPrompt = () => {
    const idx = blocks.findIndex(b => b.id === activeBlockId);
    if (idx < blocks.length - 1) {
      setActiveBlockId(blocks[idx + 1].id);
    } else {
      onNavigateToAssembly();
    }
  };

  const handleSaveExcavator = (topic: string) => {
    setIsExcavatorOpen(false);
    if (activeBlockId) {
      const newBlocks = blocks.map(b => b.id === activeBlockId ? { ...b, brainstormedTopics: topic } : b);
      setBlocks(newBlocks);
      const newScratchpad = activeDraft.scratchpad 
        ? activeDraft.scratchpad + '\n\n--- Brainstormed Topics ---\n' + topic 
        : '--- Brainstormed Topics ---\n' + topic;
      onUpdateDraft({ ...activeDraft, blocks: newBlocks, scratchpad: newScratchpad });
    }
  };

  const handleMicroAnswerChange = (idx: number, val: string) => {
    if (!activeBlock?.microAnswers) return;
    const newAnswers = [...activeBlock.microAnswers];
    newAnswers[idx].answer = val;
    updateActiveBlock({ microAnswers: newAnswers });
  };

  const synthesizeMicroAnswers = () => {
    if (!activeBlock?.microAnswers) return;
    const synthesized = activeBlock.microAnswers
      .filter(ma => ma.answer.trim().length > 0)
      .map(ma => ma.answer.trim())
      .join(' ');
    updateActiveBlock({ content: synthesized, isStuck: false });
  };

  const handleCinematicToolToggle = (tool: CinematicToolType) => {
    if (activeBlock?.activeTool === tool) {
      updateActiveBlock({ activeTool: 'none' });
      return;
    }

    const updates: Partial<EssayBlock> = { activeTool: tool };
    
    if (tool === 'montage' && !activeBlock?.montageData) {
      let variant: 'habit' | 'iteration' | 'ripple_effect' = 'habit';
      if (activeBlock?.promptId === 'ordinary_world') {
        variant = 'habit';
      } else if (activeBlock?.promptId === 'return_with_elixir') {
        variant = 'ripple_effect';
      } else if (activeBlock?.promptId === 'road_of_trials' || activeBlock?.promptId === 'ordeal') {
        variant = 'iteration';
      }
      updates.montageData = {
        variant,
        theme: '',
        scenes: ['', '', '']
      };
    }
    
    if (tool === 'bulletTime' && !activeBlock?.bulletTimeData) {
      updates.bulletTimeData = {
        intent: '',
        sight: '',
        sound: '',
        internal: '',
        physical: '',
        smell: '',
        taste: '',
        texture: ''
      };
    }
    
    updateActiveBlock(updates);
  };

  const renderMontageTool = () => {
    if (!activeBlock?.montageData) return null;
    const { variant, theme, scenes } = activeBlock.montageData;
    
    return (
      <div className="bg-slate-900/40 border-l-2 border-rose-500/50 rounded-r-xl p-6 mt-4 animate-fade-in space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <h4 className="font-serif text-lg text-rose-400 flex items-center gap-2">
            <Film className="w-4 h-4" /> Montage ({variant.replace('_', ' ')})
          </h4>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-sans font-bold text-slate-300 uppercase tracking-wider block">Theme / Recurring Element</label>
            <input
              type="text"
              value={theme}
              onChange={(e) => updateActiveBlock({ montageData: { ...activeBlock.montageData!, theme: e.target.value } })}
              placeholder="e.g., The ticking clock, the coffee stains..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm font-sans text-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-500/50"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-sans font-bold text-slate-300 uppercase tracking-wider block">Key Scenes</label>
            {scenes.map((scene, idx) => (
              <input
                key={idx}
                type="text"
                value={scene}
                onChange={(e) => {
                  const newScenes = [...scenes];
                  newScenes[idx] = e.target.value;
                  updateActiveBlock({ montageData: { ...activeBlock.montageData!, scenes: newScenes } });
                }}
                placeholder={`Scene ${idx + 1}...`}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm font-sans text-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-500/50"
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderBulletTimeTool = () => {
    if (!activeBlock?.bulletTimeData) return null;
    const { intent, sight, sound, internal, physical, smell, taste, texture } = activeBlock.bulletTimeData;
    
    return (
      <div className="bg-slate-900/40 border-l-2 border-teal-500/50 rounded-r-xl p-6 mt-4 animate-fade-in space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <h4 className="font-serif text-lg text-teal-400 flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> Bullet Time
          </h4>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-sans font-bold text-slate-300 uppercase tracking-wider block">🎯 Strategic Intent</label>
            <input
              type="text"
              value={intent}
              onChange={(e) => updateActiveBlock({ bulletTimeData: { ...activeBlock.bulletTimeData!, intent: e.target.value } })}
              placeholder="Why are we slowing down here? (e.g., To emphasize the weight of the choice)"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm font-sans text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500/50"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-sans font-bold text-slate-300 uppercase tracking-wider block">👁️ Sight</label>
              <textarea
                value={sight}
                onChange={(e) => updateActiveBlock({ bulletTimeData: { ...activeBlock.bulletTimeData!, sight: e.target.value } })}
                placeholder="The exact shade of..."
                className="w-full h-20 bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm font-sans text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500/50 resize-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-sans font-bold text-slate-300 uppercase tracking-wider block">🫀 Physical Sensation</label>
              <textarea
                value={physical}
                onChange={(e) => updateActiveBlock({ bulletTimeData: { ...activeBlock.bulletTimeData!, physical: e.target.value } })}
                placeholder="My heart felt like..."
                className="w-full h-20 bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm font-sans text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500/50 resize-none"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const countWords = (text?: string): number => {
    if (!text || text.trim() === '') return 0;
    return text.trim().split(/\s+/).length;
  };

  if (!blocks || blocks.length === 0 || !activeBlock) return null;

  if (showBrainstormChoice) {
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-900/20 blur-[120px] rounded-full pointer-events-none" />
      </div>
    );
  }

  const wordCount = countWords(activeBlock.content);

  return (
    <div className="flex h-[calc(100vh-140px)] w-full bg-[#0b101d] rounded-2xl border border-slate-800/80 overflow-hidden shadow-2xl">
      {/* Sidebar: Navigation Map (1/3 width) */}
      <div className="w-1/3 bg-slate-950 border-r border-slate-800/80 flex flex-col">
        <div className="p-5 border-b border-slate-800/80 bg-slate-900/50 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <LayoutPanelLeft className="w-5 h-5 text-teal-400" />
            <h2 className="font-sans font-bold text-slate-200 tracking-tight">Essay Map</h2>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {blocks.map((block, idx) => {
            const isActive = block.id === activeBlockId;
            const isCompleted = countWords(block.content) > 10; 
            
            return (
              <button
                key={block.id}
                onClick={() => setActiveBlockId(block.id)}
                className={`w-full text-left flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-teal-950/30 border border-teal-500/20 shadow-inner' 
                    : 'bg-transparent border border-transparent hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className={`flex items-center justify-center w-6 h-6 rounded-full shrink-0 text-xs font-sans font-bold ${
                    isActive ? 'bg-teal-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {idx + 1}
                  </div>
                  <span className={`font-sans text-sm truncate ${isActive ? 'text-teal-300 font-bold' : 'text-slate-400 font-medium'}`}>
                    {block.title.replace(/^\d+\.\s*/, '')}
                  </span>
                </div>
                {isCompleted && !isActive && <CheckCircle2 className="w-4 h-4 text-emerald-500/50 shrink-0" />}
              </button>
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
        </div>
      </div>

      {/* Canvas: Active Block (2/3 width) */}
      <div className="w-2/3 bg-[#0b101d] flex flex-col relative">
        <div className="flex-1 overflow-y-auto p-8 md:p-12">
          <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
            
            {/* Header: High Info-to-Ink Ratio */}
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="font-sans text-sm font-bold text-slate-500 uppercase tracking-widest">
                  {activeBlock.title.replace(/^\d+\.\s*/, '')}
                </h3>
                <h1 className="font-serif text-3xl md:text-4xl text-white font-medium leading-tight tracking-tight">
                  {activePrompt?.subtitle || activeBlock.title.replace(/^\d+\.\s*/, '')}
                </h1>
              </div>
              
              <div className="flex items-center gap-3">
                {wordCount > 10 && (
                  <div className="px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-sans font-medium text-teal-400 animate-fade-in">
                    {wordCount} words
                  </div>
                )}
              </div>
              
              {/* Description always visible */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3 text-sm text-slate-300 font-sans leading-relaxed animate-fade-in">
                <p>{activeBlock.description}</p>
                {activePrompt?.tip && (
                  <div className="pt-2 mt-2 border-t border-slate-800 flex items-start gap-2 text-slate-400">
                    <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <p className="italic">Tip: {activePrompt.tip}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Main Content Area OR Stuck Router */}
            {!activeBlock.isStuck ? (
              <div className="space-y-4 animate-fade-in">
                {activeBlock.promptId === 'story_selection' ? (
                  <input
                    type="text"
                    value={activeBlock.content}
                    onChange={(e) => updateActiveBlock({ content: e.target.value })}
                    placeholder="E.g., The 'Camp Counselor' Story..."
                    className="w-full bg-slate-950/50 border border-slate-800/80 rounded-2xl p-4 md:p-6 text-base md:text-lg font-sans font-medium text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500/50 focus:border-teal-500/50 placeholder:text-slate-600 transition-all"
                  />
                ) : (
                  <textarea
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
                )}
                
                {/* Tools Footer */}
                {activePrompt?.tools && activePrompt.tools.length > 0 && (
                  <div className="flex justify-between items-center flex-wrap gap-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      {(activePrompt.tools.includes('montage') || activePrompt.tools.includes('bullet_time')) && (
                        <span className="text-sm font-sans font-medium text-slate-600 select-none">✨ Show this using a Cinematic Tool:</span>
                      )}
                      
                      {activePrompt.tools.includes('montage') && (
                        <button
                          onClick={() => handleCinematicToolToggle('montage')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-sans font-bold transition-colors ${
                            activeBlock.activeTool === 'montage' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                          }`}
                        >
                          Montage
                        </button>
                      )}
                      
                      {activePrompt.tools.includes('bullet_time') && (
                        <button
                          onClick={() => handleCinematicToolToggle('bulletTime')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-sans font-bold transition-colors ${
                            activeBlock.activeTool === 'bulletTime' ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                          }`}
                        >
                          Bullet Time
                        </button>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4">
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
                      >
                      <Wand2 className="w-4 h-4" />
                      I'm stuck. Ask me a different way.
                    </button>
                    </div>
                  </div>
                )}
                
                {/* Next or Finish button */}
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
                </div>

                {/* Cinematic Tools Expanded Area */}
                {activeBlock.activeTool === 'montage' && renderMontageTool()}
                {activeBlock.activeTool === 'bulletTime' && renderBulletTimeTool()}

              </div>
            ) : (
              <div className="space-y-6 bg-slate-900/40 border border-slate-800 rounded-2xl p-6 animate-fade-in">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                  <h3 className="font-serif text-xl text-amber-400">Micro-Prompts</h3>
                  <button
                    onClick={() => updateActiveBlock({ isStuck: false })}
                    className="text-xs font-sans text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
                
                <p className="text-sm text-slate-400 font-sans">
                  Don't worry about flow right now. Just answer these specific questions in short, fragmented sentences.
                </p>

                <div className="space-y-5">
                  {activeBlock.microAnswers?.map((ma, idx) => (
                    <div key={idx} className="space-y-2">
                      <label className="text-xs font-sans font-bold text-slate-300 uppercase tracking-wider block">
                        {ma.questionLabel}
                      </label>
                      <textarea
                        value={ma.answer}
                        onChange={(e) => handleMicroAnswerChange(idx, e.target.value)}
                        placeholder={`Briefly describe the ${ma.questionLabel.toLowerCase()}...`}
                        className="w-full h-24 bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm font-sans text-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500/50 focus:border-amber-500/50 resize-none"
                      />
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex justify-end border-t border-slate-800/80 mt-4">
                  <button
                    onClick={synthesizeMicroAnswers}
                    className="bg-amber-500 hover:bg-amber-400 text-amber-950 px-6 py-2.5 rounded-xl font-sans font-bold text-sm transition-colors shadow-lg shadow-amber-500/20"
                  >
                    Synthesize & Return
                  </button>
                </div>
              </div>
            )}
            
          </div>
        </div>
      </div>

      <TopicBrainstormingModal 
        isOpen={isExcavatorOpen} 
        onClose={() => setIsExcavatorOpen(false)} 
        onSaveToScratchpad={handleSaveExcavator} 
      />
    </div>
  );
}
