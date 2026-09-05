import React, { useState, useEffect, useRef } from 'react';

interface ColdOpenProps {
  onComplete: () => void;
}

interface Char {
  char: string;
  bold?: boolean;
  italic?: boolean;
  uppercase?: boolean;
}

type Action =
  | { type: 'WAIT'; ms: number }
  | { type: 'TYPE'; text: string; speedMs?: number }
  | { type: 'SELECT'; start: number; end: number }
  | { type: 'SELECT_ALL' }
  | { type: 'DELETE' }
  | { type: 'BACKSPACE'; count: number; speedMs?: number }
  | { type: 'FORMAT'; styles: { bold?: boolean; italic?: boolean; uppercase?: boolean } }
  | { type: 'MOVE_END' };

const seq1: Action[] = [
  { type: 'TYPE', text: 'I worked hard to fix the robot.' },
  { type: 'WAIT', ms: 150 },
  { type: 'SELECT', start: 2, end: 8 },
  { type: 'WAIT', ms: 200 },
  { type: 'TYPE', text: 'endeavored' },
  { type: 'WAIT', ms: 100 },
  { type: 'SELECT', start: 13, end: 17 },
  { type: 'WAIT', ms: 250 },
  { type: 'TYPE', text: 'strenuously' },
  { type: 'WAIT', ms: 100 },
  { type: 'SELECT', start: 28, end: 31 },
  { type: 'WAIT', ms: 150 },
  { type: 'TYPE', text: 'ameliorate' },
  { type: 'WAIT', ms: 400 },
  { type: 'MOVE_END' },
  { type: 'BACKSPACE', count: 100, speedMs: 2 },
  { type: 'WAIT', ms: 400 },
];

const seq2: Action[] = [
  { type: 'TYPE', text: 'Since the dawn of human civilization, mankind has always' },
  { type: 'WAIT', ms: 200 },
  { type: 'MOVE_END' },
  { type: 'BACKSPACE', count: 150, speedMs: 2 },
  { type: 'WAIT', ms: 150 },
  { type: 'TYPE', text: 'Throughout the history of society,' },
  { type: 'WAIT', ms: 150 },
  { type: 'MOVE_END' },
  { type: 'BACKSPACE', count: 150, speedMs: 2 },
  { type: 'WAIT', ms: 150 },
  { type: 'TYPE', text: "Webster's Dictionary defines society as" },
  { type: 'WAIT', ms: 350 },
  { type: 'MOVE_END' },
  { type: 'BACKSPACE', count: 150, speedMs: 2 },
  { type: 'WAIT', ms: 400 },
];

const seq3: Action[] = [
  { type: 'TYPE', text: '"Be the change you wish to see in the world." - Mahatm' },
  { type: 'WAIT', ms: 150 },
  { type: 'TYPE', text: 'a Gahnd' },
  { type: 'WAIT', ms: 250 },
  { type: 'BACKSPACE', count: 5, speedMs: 40 },
  { type: 'WAIT', ms: 150 },
  { type: 'TYPE', text: 'Ghand' },
  { type: 'WAIT', ms: 250 },
  { type: 'BACKSPACE', count: 5, speedMs: 40 },
  { type: 'WAIT', ms: 150 },
  { type: 'TYPE', text: 'G.' },
  { type: 'WAIT', ms: 400 },
  { type: 'MOVE_END' },
  { type: 'BACKSPACE', count: 150, speedMs: 2 },
  { type: 'WAIT', ms: 150 },
  { type: 'TYPE', text: '"You miss 100% of the shots you don\'t take." - Wayne Gretzky' },
  { type: 'WAIT', ms: 150 },
  { type: 'BACKSPACE', count: 13 },
  { type: 'WAIT', ms: 150 },
  { type: 'TYPE', text: 'Michael Scott' },
  { type: 'WAIT', ms: 400 },
  { type: 'MOVE_END' },
  { type: 'BACKSPACE', count: 150, speedMs: 2 },
  { type: 'WAIT', ms: 400 },
];

const seq4: Action[] = [
  { type: 'TYPE', text: 'I am exactly like a complex symphony orchestra.' },
  { type: 'WAIT', ms: 250 },
  { type: 'SELECT', start: 20, end: 47 },
  { type: 'WAIT', ms: 150 },
  { type: 'DELETE' },
  { type: 'TYPE', text: 'beautifully woven tapestry.' },
  { type: 'WAIT', ms: 250 },
  { type: 'SELECT', start: 19, end: 47 },
  { type: 'WAIT', ms: 200 },
  { type: 'DELETE' },
  { type: 'TYPE', text: 'n onion—I have many layers' },
  { type: 'WAIT', ms: 150 },
  { type: 'TYPE', text: ' that will also make you cry.' },
  { type: 'WAIT', ms: 250 },
  { type: 'TYPE', text: ' A lot.' },
  { type: 'WAIT', ms: 400 },
  { type: 'MOVE_END' },
  { type: 'BACKSPACE', count: 150, speedMs: 2 },
  { type: 'WAIT', ms: 400 },
];

const seq5: Action[] = [
  { type: 'TYPE', text: 'As President of the debate club,' },
  { type: 'WAIT', ms: 150 },
  { type: 'SELECT', start: 3, end: 4 },
  { type: 'WAIT', ms: 150 },
  { type: 'TYPE', text: 'p' },
  { type: 'WAIT', ms: 150 },
  { type: 'SELECT', start: 3, end: 4 },
  { type: 'WAIT', ms: 150 },
  { type: 'TYPE', text: 'P' },
  { type: 'WAIT', ms: 150 },
  { type: 'SELECT', start: 3, end: 12 },
  { type: 'WAIT', ms: 150 },
  { type: 'FORMAT', styles: { italic: true } },
  { type: 'WAIT', ms: 150 },
  { type: 'FORMAT', styles: { bold: true, uppercase: true, italic: false } },
  { type: 'WAIT', ms: 200 },
  { type: 'SELECT', start: 20, end: 21 },
  { type: 'WAIT', ms: 150 },
  { type: 'TYPE', text: 'D' },
  { type: 'WAIT', ms: 150 },
  { type: 'SELECT', start: 27, end: 28 },
  { type: 'WAIT', ms: 150 },
  { type: 'TYPE', text: 'C' },
  { type: 'WAIT', ms: 150 },
  { type: 'SELECT', start: 20, end: 31 },
  { type: 'WAIT', ms: 150 },
  { type: 'FORMAT', styles: { italic: true } },
  { type: 'WAIT', ms: 400 },
  { type: 'MOVE_END' },
  { type: 'BACKSPACE', count: 150, speedMs: 2 },
  { type: 'WAIT', ms: 400 },
];

const seq6: Action[] = [
  { type: 'TYPE', text: 'I used' },
  { type: 'WAIT', ms: 200 },
  { type: 'BACKSPACE', count: 4 },
  { type: 'TYPE', text: 'synergized my skills' },
  { type: 'WAIT', ms: 200 },
  { type: 'BACKSPACE', count: 6 },
  { type: 'TYPE', text: 'cross-functional leadership paradigms' },
  { type: 'WAIT', ms: 200 },
  { type: 'TYPE', text: ' to help' },
  { type: 'WAIT', ms: 100 },
  { type: 'BACKSPACE', count: 4 },
  { type: 'TYPE', text: 'optimize the team' },
  { type: 'WAIT', ms: 100 },
  { type: 'TYPE', text: "'s outcomes." },
  { type: 'WAIT', ms: 400 },
  { type: 'MOVE_END' },
  { type: 'BACKSPACE', count: 150, speedMs: 2 },
  { type: 'WAIT', ms: 400 },
];

const seq7: Action[] = [
  { type: 'TYPE', text: "Webster's Dictionary defines leadership as" },
  { type: 'WAIT', ms: 200 },
  { type: 'SELECT', start: 0, end: 9 },
  { type: 'WAIT', ms: 150 },
  { type: 'TYPE', text: 'Oxford University' },
  { type: 'WAIT', ms: 200 },
  { type: 'SELECT', start: 0, end: 17 },
  { type: 'WAIT', ms: 150 },
  { type: 'TYPE', text: 'Random House' },
  { type: 'WAIT', ms: 400 },
  { type: 'MOVE_END' },
  { type: 'BACKSPACE', count: 150, speedMs: 2 },
  { type: 'WAIT', ms: 400 },
];

const seq8: Action[] = [
  { type: 'TYPE', text: 'Ever since I was two years old, I knew I wanted to dedicate my life to ' },
  { type: 'WAIT', ms: 250 },
  { type: 'TYPE', text: 'applied behavioral economics' },
  { type: 'WAIT', ms: 200 },
  { type: 'TYPE', text: ' with a minor in music history' },
  { type: 'WAIT', ms: 300 },
  { type: 'SELECT', start: 17, end: 20 },
  { type: 'WAIT', ms: 300 },
  { type: 'TYPE', text: 'four', speedMs: 120 },
  { type: 'WAIT', ms: 400 },
  { type: 'MOVE_END' },
  { type: 'BACKSPACE', count: 150, speedMs: 2 },
  { type: 'WAIT', ms: 400 },
];

const seq9: Action[] = [
  { type: 'TYPE', text: 'A time I experienced a challenge, setback, or failure was when' },
  { type: 'WAIT', ms: 250 },
  { type: 'TYPE', text: ' I got an A-' },
  { type: 'WAIT', ms: 200 },
  { type: 'TYPE', text: ' in AP' },
  { type: 'WAIT', ms: 100 },
  { type: 'TYPE', text: ' European History.' },
  { type: 'WAIT', ms: 400 },
  { type: 'MOVE_END' },
  { type: 'BACKSPACE', count: 150, speedMs: 2 },
  { type: 'WAIT', ms: 400 },
];

const seq10: Action[] = [
  { type: 'TYPE', text: "Please, just let me in." },
  { type: 'WAIT', ms: 200 },  
  { type: 'TYPE', text: " I promise I'm smrt." },
  { type: 'WAIT', ms: 250 },
  { type: 'BACKSPACE', count: 3, speedMs: 2 },
  { type: 'WAIT', ms: 250 },
  { type: 'TYPE', text: 'arf.' },
  { type: 'WAIT', ms: 300 },
  { type: 'BACKSPACE', count: 2, speedMs: 2 },
  { type: 'WAIT', ms: 150 },
  { type: 'TYPE', text: 't.' },
  { type: 'WAIT', ms: 400 },
  { type: 'MOVE_END' },
  { type: 'BACKSPACE', count: 150, speedMs: 2 },
  { type: 'WAIT', ms: 400 },
];

const seq11: Action[] = [
  { type: 'TYPE', text: 'Four score and seven years ago' },
  { type: 'WAIT', ms: 250 },
  { type: 'MOVE_END' },
  { type: 'BACKSPACE', count: 150, speedMs: 2 },
  { type: 'WAIT', ms: 150 },
  { type: 'TYPE', text: 'When in the course of human events' },
  { type: 'WAIT', ms: 200 },
  { type: 'SELECT', start: 23, end: 27 },
  { type: 'WAIT', ms: 200 },
  { type: 'TYPE', text: 'igh school' },
  { type: 'WAIT', ms: 300 },
  { type: 'MOVE_END' },
  { type: 'BACKSPACE', count: 150, speedMs: 2 },
  { type: 'WAIT', ms: 400 },
];

const seq12: Action[] = [
  { type: 'TYPE', text: 'My goldfish died in the third grade,' },
  { type: 'WAIT', ms: 200 },
  { type: 'TYPE', text: ' and that is why I want to study computer science' },
  { type: 'WAIT', ms: 150 },
  { type: 'TYPE', text: ' at your prestigious institution' },
  { type: 'WAIT', ms: 250 },
  { type: 'BACKSPACE', count: 23, speedMs: 2 },
  { type: 'WAIT', ms: 150 },
  { type: 'TYPE', text: 'fancy-pants school' },
  { type: 'WAIT', ms: 300 },
  { type: 'MOVE_END' },
  { type: 'BACKSPACE', count: 150, speedMs: 2 },
  { type: 'WAIT', ms: 400 },
];

const seq13: Action[] = [
  { type: 'TYPE', text: 'My kid is an incredibly gifted ' },
  { type: 'WAIT', ms: 400 },
  { type: 'MOVE_END' },
  { type: 'BACKSPACE', count: 31, speedMs: 15 },
  { type: 'WAIT', ms: 200 },
  { type: 'TYPE', text: 'I am a pretty good ' },
  { type: 'WAIT', ms: 500 },
  { type: 'MOVE_END' },
  { type: 'BACKSPACE', count: 150, speedMs: 2 },
  { type: 'WAIT', ms: 400 },
];

const seq14: Action[] = [
  { type: 'TYPE', text: 'Dear College Admissions Committee,' },
  { type: 'WAIT', ms: 300 },
  { type: 'MOVE_END' },
  { type: 'BACKSPACE', count: 150, speedMs: 5 },
  { type: 'WAIT', ms: 200 },
  { type: 'TYPE', text: 'To Whom It May Concern:' },
  { type: 'WAIT', ms: 300 },
  { type: 'MOVE_END' },
  { type: 'BACKSPACE', count: 150, speedMs: 5 },
  { type: 'WAIT', ms: 200 },
  { type: 'TYPE', text: 'What up, Stanford person.' },
  { type: 'WAIT', ms: 500 },
  { type: 'MOVE_END' },
  { type: 'BACKSPACE', count: 150, speedMs: 2 },
  { type: 'WAIT', ms: 400 },
];

const seq15: Action[] = [
  { type: 'TYPE', text: 'I am a motivated student.' },
  { type: 'WAIT', ms: 250 },
  { type: 'SELECT', start: 7, end: 7 },
  { type: 'WAIT', ms: 150 },
  { type: 'TYPE', text: 'highly ' },
  { type: 'WAIT', ms: 150 },
  { type: 'SELECT', start: 7, end: 7 },
  { type: 'WAIT', ms: 150 },
  { type: 'TYPE', text: 'extremely and ' },
  { type: 'WAIT', ms: 150 },
  { type: 'SELECT', start: 7, end: 7 },
  { type: 'WAIT', ms: 150 },
  { type: 'TYPE', text: 'very uniquely, ' },
  { type: 'WAIT', ms: 600 },
  { type: 'MOVE_END' },
  { type: 'BACKSPACE', count: 150, speedMs: 2 },
  { type: 'WAIT', ms: 400 },
];

const penultimateSeq: Action[] = [
  { type: 'TYPE', text: 'I stared at the blinking cursor.' },
  { type: 'WAIT', ms: 300 },
  { type: 'SELECT', start: 2, end: 4 },
  { type: 'WAIT', ms: 150 },
  { type: 'TYPE', text: 'gl' },
  { type: 'WAIT', ms: 300 },
  { type: 'SELECT', start: 2, end: 11 },
  { type: 'WAIT', ms: 150 },
  { type: 'TYPE', text: 'cursed' },
  { type: 'WAIT', ms: 400 },
  { type: 'MOVE_END' },
  { type: 'TYPE', text: ' It cursed me back.' },
  { type: 'WAIT', ms: 500 },
  { type: 'TYPE', text: ' Aptly named...' },
  { type: 'WAIT', ms: 600 },
  { type: 'BACKSPACE', count: 150, speedMs: 2 },
  { type: 'WAIT', ms: 400 },
];

const finalSeq: Action[] = [
  { type: 'TYPE', text: 'blargh ', speedMs: 20 },
  { type: 'WAIT', ms: 250 },
  { type: 'TYPE', text: '\n' },
  { type: 'WAIT', ms: 200 },
  { type: 'TYPE', text: 'asdfjkl; ', speedMs: 20 },
  { type: 'WAIT', ms: 50 },
  { type: 'TYPE', text: 'asdfjkl; ;lkjfdsa', speedMs: 20 },
  { type: 'WAIT', ms: 250 },
  { type: 'TYPE', text: '\n\n' },
  { type: 'WAIT', ms: 300 },
  { type: 'TYPE', text: 'How do I even start this?', speedMs: 80 },
  { type: 'WAIT', ms: 400 }
];

const ALL_SEQUENCES = [seq1, seq2, seq3, seq4, seq5, seq6, seq7, seq8, seq9, seq10, seq11, seq12, seq13, seq14, seq15];

export default function ColdOpen({ onComplete }: ColdOpenProps) {
  const charsRef = useRef<Char[]>([]);
  const selectionRef = useRef<[number, number] | null>(null);
  const cursorRef = useRef<number>(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  
  const [, forceUpdate] = useState({});
  const update = () => forceUpdate({});

  useEffect(() => {
    let isCancelled = false;
    const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

    const executeAction = async (action: Action) => {
      if (isCancelled) return;
      if (action.type === 'WAIT') {
        let ms = action.ms;
        await sleep(ms * 2.2);
      } else if (action.type === 'TYPE') {
        if (selectionRef.current) {
          const [start, end] = selectionRef.current;
          charsRef.current.splice(start, end - start);
          cursorRef.current = start;
          selectionRef.current = null;
          update();
        }
        const delay = action.speedMs !== undefined ? action.speedMs : null;
        for (let i = 0; i < action.text.length; i++) {
          if (isCancelled) return;
          charsRef.current.splice(cursorRef.current, 0, { char: action.text[i] });
          cursorRef.current++;
          update();
          if (delay !== null) {
            await sleep((delay + (Math.random() * (delay * 0.5))) * 0.6);
          } else {
            await sleep((Math.random() * 50 + 40) * 0.6);
          }
        }
      } else if (action.type === 'SELECT') {
        selectionRef.current = [action.start, action.end];
        cursorRef.current = action.end;
        update();
      } else if (action.type === 'SELECT_ALL') {
        selectionRef.current = [0, charsRef.current.length];
        cursorRef.current = charsRef.current.length;
        update();
      } else if (action.type === 'DELETE') {
        if (selectionRef.current) {
          const [start, end] = selectionRef.current;
          charsRef.current.splice(start, end - start);
          cursorRef.current = start;
          selectionRef.current = null;
        } else if (cursorRef.current > 0) {
          charsRef.current.splice(cursorRef.current - 1, 1);
          cursorRef.current--;
        }
        update();
      } else if (action.type === 'BACKSPACE') {
        const delay = action.speedMs !== undefined ? action.speedMs : 50;
        for (let i = 0; i < action.count; i++) {
          if (isCancelled) return;
          if (selectionRef.current) {
            const [start, end] = selectionRef.current;
            charsRef.current.splice(start, end - start);
            cursorRef.current = start;
            selectionRef.current = null;
          } else if (cursorRef.current > 0) {
            charsRef.current.splice(cursorRef.current - 1, 1);
            cursorRef.current--;
          } else {
            break;
          }
          update();
          await sleep(delay * 0.8);
        }
      } else if (action.type === 'FORMAT') {
        if (selectionRef.current) {
          const [start, end] = selectionRef.current;
          for (let i = start; i < end; i++) {
            if (charsRef.current[i]) {
              charsRef.current[i] = { ...charsRef.current[i], ...action.styles };
            }
          }
          update();
        }
      } else if (action.type === 'MOVE_END') {
        cursorRef.current = charsRef.current.length;
        selectionRef.current = null;
        update();
      }
    };

    const runSequences = async () => {
      // Blink for 2 seconds initially
      await sleep(2000);
      
      const numToSelect = Math.floor(Math.random() * 2) + 2; // 2 to 4
      const shuffled = [...ALL_SEQUENCES].sort(() => 0.5 - Math.random());
      const selectedSequences = shuffled.slice(0, numToSelect);
      
      for (const seq of selectedSequences) {
        for (const action of seq) {
          if (isCancelled) return;
          await executeAction(action);
        }
      }
      
      if (isCancelled) return;
      
      for (const action of penultimateSeq) {
        if (isCancelled) return;
        await executeAction(action);
      }
      
      if (isCancelled) return;
      
      for (const action of finalSeq) {
        if (isCancelled) return;
        await executeAction(action);
      }
      
      if (!isCancelled) {
        setIsFadingOut(true);
        setTimeout(() => {
          if (!isCancelled) onComplete();
        }, 1000);
      }
    };

    runSequences();

    return () => {
      isCancelled = true;
    };
  }, [onComplete]);

  const renderText = () => {
    const elements = [];
    const chars = charsRef.current;
    const sel = selectionRef.current;
    const cursor = cursorRef.current;
    
    for (let i = 0; i <= chars.length; i++) {
      // Render cursor
      if (i === cursor && !sel) {
        elements.push(
          <span key={`cursor-${i}`} className="inline-block w-[3px] h-8 md:h-12 bg-slate-900 animate-pulse align-middle -mt-1" />
        );
      }
      
      if (i < chars.length) {
        const char = chars[i];
        const isSelected = sel && i >= sel[0] && i < sel[1];
        
        let className = "";
        if (isSelected) className += "bg-blue-200/80 ";
        if (char.bold) className += "font-bold ";
        if (char.italic) className += "italic ";
        if (char.uppercase) className += "uppercase ";
        
        elements.push(
          <span key={`char-${i}`} className={className || undefined}>
            {char.char}
          </span>
        );
      }
    }
    
    return elements;
  };

  return (
    <div className={`absolute inset-0 z-50 flex flex-col items-center pt-[25vh] px-8 pb-8 transition-opacity duration-1000 ${isFadingOut ? 'opacity-0' : 'opacity-100'} bg-white`}>
      <div className="w-full max-w-5xl flex justify-start">
        <h1 
          className="text-2xl md:text-4xl text-slate-900 tracking-tight leading-tight text-left whitespace-pre-wrap break-words font-sans"
          style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
        >
          {renderText()}
        </h1>
      </div>
      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2">
        <button 
          onClick={onComplete}
          className="px-8 py-2 rounded-full border border-slate-200 text-slate-400 hover:text-slate-600 hover:border-slate-300 bg-transparent text-sm font-medium transition-all"
        >
          Skip
        </button>
      </div>
    </div>
  );
}
