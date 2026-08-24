import React, { useState, useEffect, KeyboardEvent } from 'react';
import { X, ChevronLeft, ChevronRight, Plus, Send } from 'lucide-react';
import { EXCAVATOR_PROMPTS } from '../constants';

interface TopicBrainstormingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveToScratchpad: (compiledNotes: string) => void;
}

export default function TopicBrainstormingModal({ isOpen, onClose, onSaveToScratchpad }: TopicBrainstormingModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, string[]>>({});
  const [currentInput, setCurrentInput] = useState('');

  // Reset state when opened
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
      setResponses({});
      setCurrentInput('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentPrompt = EXCAVATOR_PROMPTS[currentIndex];
  const currentResponses = responses[currentPrompt.id] || [];

  const handleAddResponse = () => {
    const trimmed = currentInput.trim();
    if (!trimmed) return;

    setResponses(prev => ({
      ...prev,
      [currentPrompt.id]: [...(prev[currentPrompt.id] || []), trimmed]
    }));
    setCurrentInput('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddResponse();
    }
  };

  const removeResponse = (index: number) => {
    setResponses(prev => {
      const updated = [...(prev[currentPrompt.id] || [])];
      updated.splice(index, 1);
      return {
        ...prev,
        [currentPrompt.id]: updated
      };
    });
  };

  const handleNext = () => {
    if (currentIndex < EXCAVATOR_PROMPTS.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setCurrentInput('');
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setCurrentInput('');
    }
  };

  const handleFinish = () => {
    let output = '';
    
    EXCAVATOR_PROMPTS.forEach(prompt => {
      const promptResponses = responses[prompt.id];
      if (promptResponses && promptResponses.length > 0) {
        output += `--- ${prompt.question} ---\n`;
        promptResponses.forEach(res => {
          output += `- ${res}\n`;
        });
        output += `\n\n`;
      }
    });

    onSaveToScratchpad(output.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#070B14]/90 backdrop-blur-sm p-4">
      <div className="bg-slate-950 border border-slate-800 rounded-2xl w-full max-w-3xl flex flex-col overflow-hidden shadow-2xl h-[600px] max-h-[90vh] relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-slate-900/80 hover:bg-slate-800 rounded-xl transition-colors text-slate-400 hover:text-white z-10 border border-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content Body */}
        <div className="flex-1 flex flex-col p-8 overflow-y-auto relative">
          
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-sans font-bold text-teal-500 uppercase tracking-wider">
              Question {currentIndex + 1} of {EXCAVATOR_PROMPTS.length}
            </span>
          </div>
          <p className="text-sm text-slate-400 mb-6 font-sans">
            Feel free to skip any questions—this is just a list to generate inspiration!
          </p>

          <h3 className="text-2xl md:text-3xl font-serif text-slate-200 leading-relaxed mb-8">
            {currentPrompt.question}
          </h3>

          <div className="space-y-4">
            {/* Input Area */}
            <div className="flex flex-col gap-3">
              <input
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a story idea..."
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm font-sans text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500/50 focus:border-teal-500/50 placeholder:text-slate-600"
              />
              <div className="flex justify-start">
                <button
                  onClick={handleAddResponse}
                  disabled={!currentInput.trim()}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:hover:bg-slate-800 text-slate-200 rounded-xl text-sm font-sans font-medium transition-colors whitespace-nowrap"
                >
                  <Plus className="w-4 h-4" />
                  Add story idea
                </button>
              </div>
            </div>

            {/* Accumulated Responses */}
            {currentResponses.length > 0 && (
              <div className="mt-6 space-y-3">
                <h4 className="text-xs font-sans font-bold text-slate-500 uppercase tracking-wider mb-2">Your Thoughts</h4>
                {currentResponses.map((res, idx) => (
                  <div key={idx} className="flex items-start justify-between gap-4 p-4 bg-teal-950/20 border border-teal-900/30 rounded-xl group">
                    <p className="text-sm font-sans text-teal-100/80 leading-relaxed">
                      {res}
                    </p>
                    <button
                      onClick={() => removeResponse(idx)}
                      className="p-1 opacity-0 group-hover:opacity-100 hover:bg-rose-950/50 rounded text-slate-500 hover:text-rose-400 transition-all shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="p-6 border-t border-slate-900 bg-slate-900/50 flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 px-4 py-2 hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent rounded-lg text-sm font-sans font-medium text-slate-300 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleFinish}
              className="flex items-center gap-2 px-6 py-2.5 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 rounded-xl text-sm font-sans font-medium transition-colors"
            >
              <Send className="w-4 h-4" />
              Finish & Send to Scratchpad
            </button>

            {currentIndex < EXCAVATOR_PROMPTS.length - 1 && (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 rounded-xl text-sm font-sans font-bold transition-colors shadow-lg shadow-teal-500/20"
              >
                Next Question
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
}
