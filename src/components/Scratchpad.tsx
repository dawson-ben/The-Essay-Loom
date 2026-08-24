import React, { useState, useEffect, useRef } from 'react';
import { Pin, X } from 'lucide-react';
import { EssayDraft } from '../types';

interface ScratchpadProps {
  draft: EssayDraft;
  onUpdateDraft: (updated: EssayDraft) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function Scratchpad({ draft, onUpdateDraft, isOpen, onClose }: ScratchpadProps) {
  const [content, setContent] = useState(draft.scratchpad || '');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setContent(draft.scratchpad || '');
  }, [draft.id, draft.scratchpad]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      onUpdateDraft({ ...draft, scratchpad: newContent });
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 bottom-0 w-80 bg-slate-900 border-l border-slate-800 shadow-2xl z-50 flex flex-col transition-transform transform translate-x-0">
      <div className="flex items-center justify-between p-4 border-b border-slate-800">
        <h3 className="text-sm font-sans font-bold text-white flex items-center gap-2">
          <Pin className="w-4 h-4 text-teal-400" />
          Scratchpad
        </h3>
        <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors cursor-pointer">
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="flex-1 p-4 flex flex-col relative">
        <textarea
          value={content}
          onChange={handleChange}
          placeholder="Jot down unformatted, spontaneous thoughts here..."
          className="flex-1 w-full bg-slate-950 text-slate-200 border border-slate-800 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 rounded-lg p-3 text-sm font-sans resize-none"
        />
        <div className="absolute bottom-6 right-6 text-[11px] text-slate-500 font-sans">
          {content.trim().split(/\s+/).filter(w => w.length > 0).length} words
        </div>
      </div>
    </div>
  );
}
