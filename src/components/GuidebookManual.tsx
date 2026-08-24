import React, { useState } from 'react';
import { 
  Beat, 
  Story, 
  HERO_BEATS, 
  FAMILIAR_STORIES 
} from './HerosJourneyCompare';
import { ANTI_PATTERNS } from '../constants';
import { 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Tv, 
  Layers, 
  GraduationCap, 
  Check,
  Shuffle,
  AlertTriangle,
  Lightbulb
} from 'lucide-react';

const STORY_CHARACTERS: Record<string, string> = {
  student_pole_vault: "DIY Pole Vaulter",
  student_tire_mechanic: "Garage Mechanic",
  harry_potter: "Harry Potter",
  neville_longbottom: "Neville Longbottom",
  lord_of_the_rings_frodo: "Frodo Baggins",
  lord_of_the_rings_sam: "Samwise Gamgee",
  lord_of_the_rings_aragorn: "Aragorn",
  the_hobbit: "Bilbo Baggins",
  onward: "Ian Lightfoot",
  spiderman: "Peter Parker",
  legally_blonde: "Elle Woods",
  big_hero_6: "Hiro Hamada",
  luke_skywalker: "Luke Skywalker",
  rey_skywalker: "Rey Skywalker",
  up_carl: "Carl Fredricksen",
  napoleon_dynamite: "Napoleon Dynamite",
  aladdin: "Aladdin",
  rudy: "Rudy Ruettiger"
};

function InjectedPitfallCard({ pitfall }: { pitfall: any }) {
  if (!pitfall) return null;
  return (
    <div className="bg-rose-950/20 border border-slate-800 rounded-xl p-5 mt-4 space-y-3 shadow-sm hover:border-rose-900/40 transition-colors">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h4 className="font-serif font-bold text-sm text-rose-400 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-rose-400 animate-pulse shrink-0" />
          Cliché & Pitfall Warning: {pitfall.trap}
        </h4>
        <span className="text-[11px] bg-rose-900/60 border border-rose-800/40 text-rose-300 font-semibold px-2 py-0.5 rounded font-sans uppercase tracking-wider">
          Admissions Danger Zone
        </span>
      </div>

      <p className="text-xs text-slate-300 leading-relaxed font-sans">
        <strong>The Trap:</strong> {pitfall.explanation}
      </p>

      <div className="bg-amber-950/25 border border-amber-900/30 p-3.5 rounded text-xs text-amber-305 text-amber-200 font-sans leading-relaxed">
        <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1 mb-1 font-sans uppercase tracking-widest">
          <Lightbulb className="w-3.5 h-3.5 text-amber-400 inline" /> Re-centering Solution Fix
        </span>
        {pitfall.fix}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 font-sans text-xs">
        <div className="bg-slate-950/80 border border-slate-850 rounded-lg p-3 text-slate-400">
          <div className="text-[11px] font-bold text-rose-500 mb-1 uppercase tracking-wider font-sans">❌ Flawed Cliché:</div>
          <p className="italic leading-relaxed font-serif text-[11px]">"{pitfall.exampleBad}"</p>
        </div>
        <div className="bg-teal-950/15 border border-teal-950/10 border-teal-905 block rounded-lg p-3 text-teal-300">
          <div className="text-[11px] font-bold text-teal-400 mb-1 uppercase tracking-wider font-sans">✅ Resonant Screenwriter Showing:</div>
          <p className="italic leading-relaxed font-serif text-[11px]">"{pitfall.exampleGood}"</p>
        </div>
      </div>
    </div>
  );
}

export function GuidebookManual() {
  const [guideStep, setGuideStep] = useState(0);
  const [activeBeatIdx, setActiveBeatIdx] = useState(0);
  const [selectedStoryIds, setSelectedStoryIds] = useState<string[]>([
    'student_essay',
    'harry_potter',
    'big_hero_6',
    'spiderman'
  ]);

  const selectableStories = FAMILIAR_STORIES.filter(s => s.id !== 'student_essay');

  const toggleStorySelection = (id: string) => {
    if (selectedStoryIds.includes(id)) {
      if (selectedStoryIds.length <= 1) return; // Keep at least one
      setSelectedStoryIds(selectedStoryIds.filter(sid => sid !== id));
    } else {
      setSelectedStoryIds([...selectedStoryIds, id]);
    }
  };

  const BEAT_STRATEGIES: Record<string, { purpose: string; pixar: string }> = {
    ordinary_world: {
      purpose: "Your comfortable starting bubble. We meet you in your normal, safe sphere of life (e.g., hiding behind a stockroom table sorting inventory, or nesting quietly in a code environment). A stellar college essay establishes this safe habit first, but immediately drops a hint about a silent limitation or stagnant self-perception that holds you back.",
      pixar: "Pixar Rule: We establish a status quo not to celebrate it, but to show what is at stake if our protagonist never changes. Your ordinary world should suggest what part of your character is quietly asleep."
    },
    inciting_incident: {
      purpose: "The disruption or sudden call. An external, unscheduled catalyst shakes you out of your routine—the Science Director resigns mid-summer, a core library system breaks 3 days before launching, or a five-layered birthday cake turns to volcanic carbon. This event demands an immediate active choice.",
      pixar: "Action is reaction. A great story doesn't begin with a character meditating by themselves; it begins because the external world throws a wrench into their gears."
    },
    dont_hesitation: {
      purpose: "The doubt, stumbling, or imposter fear. Admissions readers are exhausted by 'perfect teenagers' who conquer challenges with robotic grace. Honest hesitation is what makes you relatable. Share your genuine anxiety, your feel-like-a-fraud syndrome, or your dread of fail-testing before supervisors. Grounded vulnerability is your greatest tool.",
      pixar: "Pixar Principle: We admire a character vastly more for trying and struggling than for their effortless victories. If you don't share your initial hesitations, the reader cannot measure the psychological distance you had to travel."
    },
    commitment_crossing: {
      purpose: "Crossing the threshold. You physicalize your choice in the scene—stepping out of a staff bathroom stall, written 'LET'S BREAK THINGS' on a slate chalkboard, or typing your first debugging program on a live server. You commit to the Special World, recognizing that you cannot slide back to your safe storage room.",
      pixar: "The threshold is a gate. This is the moment your character stops wishing things were different and starts wading into the physical mud of the trial."
    },
    special_world: {
      purpose: "The messy testing ground of trial-and-error. Avoid jumping from commitment directly to victory. Show the granular work: coordinating wet decks, failing to stabilize a classroom's attention, cleaning up charred flour crumbs, or spending 48 quiet hours mapping casework imports.Verbs matter: I swept, I coded, I re-measured, I listened.",
      pixar: "Focus on the training. The audience loves to watch characters acquire their tools piece-by-piece, making clumsy, honest mistakes before earning their expertise."
    },
    ordeal_climax: {
      purpose: "The Grounded Climax. This is the critical moment of vulnerability where your pre-planned formulas drop dead. The campers are yelling, wet index cards are floating down Lake George, and you are standing holding a soggy box of baking soda. Keep this complication beautifully real and scaled-down. Melodrama is the enemy of sincerity.",
      pixar: "Keep stakes realistic and grounded. A spilled bowl of icing, a quiet verbal breakdown, or a corrupted file is deeply human. Refrain from over-inflating standard academic setbacks into life-or-death battlefield tragedies."
    },
    winning_action: {
      purpose: "Your realistic, personal agency. YOU must resolve the ordeal through your own grit, logic, or psychological pivot—not through lucky rescues, external teachers, or sudden parental interventions. You throw your rigid outline sheets in the biological trash, think of your father's garage, and ask who wants to test if a watermelon floats.",
      pixar: "The protagonist must drive the resolution. If a lucky coincidence or a wiser adult saves the day, your character becomes a bystander in their own narrative."
    },
    transformation_elixir: {
      purpose: "The earned wisdom. You return to your ordinary universe carrying a fundamental, newly minted belief (e.g., 'Messy, interactive discovery stays in the mind longer than a passive textbook sermon'). You actively project how you will bring this collaborative, research-ready character straight to university labs, study squads, or seminar rooms.",
      pixar: "The journey is a circle, but the traveler is fundamentally rewritten. Show the admissions table that the wisdom you earned in that chaotic summer shed will actively enrich their campus culture."
    }
  };

  return (
    <div className="space-y-8 animate-fade-in p-6 md:p-8">
      {/* Guidebook Navigation Stepper */}
      <div className="flex items-center justify-center gap-1 md:gap-3 w-full max-w-xl mx-auto border-b border-slate-800/80 pb-6 mb-2">
        {[0, 1].map((sIndex) => (
          <React.Fragment key={sIndex}>
            <button
              onClick={() => setGuideStep(sIndex)}
              className={`px-4 py-2 rounded-full flex items-center justify-center text-xs font-sans font-bold transition-all relative ${
                guideStep === sIndex
                  ? 'bg-gradient-to-tr from-cyan-500 to-purple-600 text-white ring-2 ring-cyan-400/30'
                  : 'bg-slate-950 text-slate-500 border border-slate-800/80 hover:text-slate-300'
              }`}
            >
              {sIndex === 0 ? "1. Interactive Blueprints" : "2. Cinematic Prose Tools"}
            </button>
          </React.Fragment>
        ))}
      </div>

      {guideStep === 0 && (
        <div className="space-y-8 animate-fade-in" id="step_beats_tour">
          <div className="text-center space-y-1">
            <h2 className="text-xl font-serif font-bold text-white">How Screenwriters and Essayists Build Emotional Resonance</h2>
            <p className="text-xs text-slate-400 font-sans">Click on the timeline circles below to examine each step of the Hero's Journey story pattern.</p>
          </div>

          {/* Beats Stepper Track */}
          <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 max-w-3xl mx-auto shadow-inner" id="beats_index_selector">
            {HERO_BEATS.map((beat, bIdx) => {
              const BeatIcon = beat.icon;
              const isActive = activeBeatIdx === bIdx;
              return (
                <button
                  key={beat.id}
                  onClick={() => setActiveBeatIdx(bIdx)}
                  className={`flex-1 py-1.5 px-1 rounded-lg flex flex-col items-center justify-center gap-1 transition-all group overflow-hidden cursor-pointer ${
                    isActive 
                      ? 'bg-slate-850 text-cyan-400 border border-slate-700 shadow font-semibold' 
                      : 'text-slate-500 hover:text-slate-350'
                  }`}
                >
                  <BeatIcon className={`w-4 h-4 ${isActive ? 'text-cyan-400 scale-110' : 'text-slate-500 group-hover:text-slate-400'}`} />
                  <span className="text-[11px] font-sans font-bold tracking-tight uppercase block text-center truncate w-full max-w-[50px] md:max-w-none">
                    {beat.name.split('. ')[1]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Beat Detail Box */}
          {(() => {
            const currentBeat = HERO_BEATS[activeBeatIdx];
            const strategy = BEAT_STRATEGIES[currentBeat.id] || { purpose: '', pixar: '' };
            const SelectedIcon = currentBeat.icon;
            const activeSelectedStories = FAMILIAR_STORIES.filter(s => selectedStoryIds.includes(s.id));

            return (
              <div className="space-y-6" id={`beat_details_layout_${currentBeat.id}`}>
                
                {/* Beat Explanation Panel */}
                <div className="bg-slate-950 border border-slate-850 rounded-2xl p-6 md:p-8 space-y-4 shadow border-l-4 border-l-cyan-500 relative">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 bg-cyan-950/60 border border-cyan-800/40 rounded-lg flex items-center justify-center text-cyan-400">
                      <SelectedIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-lg text-white">{currentBeat.name}</h3>
                      <p className="text-[11px] font-sans text-slate-400 italic">Strategic storytelling mechanics</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2 font-sans">
                    <div className="md:col-span-7 space-y-2">
                      <span className="text-[11px] uppercase tracking-widest font-bold text-cyan-400 block">Essay Strategic Purpose</span>
                      <p className="text-xs text-slate-300 leading-relaxed font-normal">{strategy.purpose}</p>
                    </div>
                    <div className="md:col-span-5 bg-slate-900 border border-slate-800/80 p-4 rounded-xl space-y-1.5 text-xs text-slate-400 relative overflow-hidden">
                      <span className="text-[11px] uppercase tracking-widest font-extrabold text-sky-400 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-sky-400" /> Pixar Story Playbook
                      </span>
                      <p className="italic leading-relaxed">{strategy.pixar}</p>
                      <div className="absolute right-2 bottom-1 opacity-5 select-none">
                        <Sparkles className="w-16 h-16 text-sky-500" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Comparator fully restored */}
                <div className="border border-slate-800/80 rounded-xl overflow-hidden bg-slate-950 shadow-lg">
                  <div className="bg-slate-900 px-5 py-3 border-b border-slate-800 flex justify-between items-center flex-wrap gap-3">
                    <h4 className="text-xs font-sans font-bold text-slate-300 tracking-tight uppercase flex items-center gap-1">
                      <Shuffle className="w-3.5 h-3.5 text-slate-400" /> Active Comparison across Selected Tracks
                    </h4>
                    {/* Story selection quick toggles */}
                    <div className="flex gap-1 overflow-x-auto">
                      {selectableStories.map(story => (
                        <button
                          key={story.id}
                          onClick={() => toggleStorySelection(story.id)}
                          className={`px-2 py-1 text-[11px] uppercase tracking-widest rounded border transition-colors ${
                            selectedStoryIds.includes(story.id)
                              ? 'bg-slate-800 text-cyan-400 border-cyan-500/50'
                              : 'bg-slate-950 text-slate-500 border-slate-800'
                          }`}
                        >
                          {STORY_CHARACTERS[story.id] ? STORY_CHARACTERS[story.id].split(' ')[0] : 'Hero'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-950 border-b border-slate-850/80 text-[11px] font-sans font-bold text-slate-500 uppercase tracking-widest">
                          <th className="px-5 py-3 w-[180px] md:w-[220px]">Story / Creator</th>
                          <th className="px-5 py-3">How The Beat is Metaphorically Written</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-850">
                        {activeSelectedStories.map((story) => {
                          const detail = story.beats[currentBeat.id];
                          const isStudent = story.id === 'student_essay';
                          return (
                            <tr key={story.id} className={isStudent ? 'bg-teal-950/10 hover:bg-teal-950/15' : 'hover:bg-slate-900/40'}>
                              <td className="px-5 py-4 align-top space-y-1 shrink-0">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <span className="font-serif font-bold text-xs text-white leading-tight block">{story.title}</span>
                                  {isStudent && <span className="text-[11px] bg-teal-500/10 border border-teal-500/20 text-teal-400 px-1.5 py-0.5 rounded font-sans font-semibold uppercase">Student Essay</span>}
                                </div>
                                <span className="text-[11px] text-slate-500 block font-normal font-sans">{story.creator}</span>
                              </td>
                              <td className="px-5 py-4 align-middle text-xs text-slate-300 font-sans leading-relaxed whitespace-pre-line">
                                {detail ? (
                                  <div className="space-y-1">
                                    <p className="font-light">{detail.text}</p>
                                    {detail.isSubverted && detail.subversionNote && (
                                      <div className="mt-1.5 bg-rose-950/30 border border-rose-950/40 p-2 rounded text-[11px] text-rose-300">
                                        <strong>Subversion Rule:</strong> {detail.subversionNote}
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  <span className="text-slate-600 font-serif italic">This beat was omitted or condensed in this cinematic cut.</span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Injected warnings based on the active beat */}
                {(() => {
                  const traumaDump = ANTI_PATTERNS.find(ap => ap.id === 'trauma_dump');
                  const voluntourism = ANTI_PATTERNS.find(ap => ap.id === 'voluntourism');
                  const sportsHighlight = ANTI_PATTERNS.find(ap => ap.id === 'sports_highlight');
                  const passiveProtagonist = ANTI_PATTERNS.find(ap => ap.id === 'passive_protagonist');

                  if (currentBeat.id === 'inciting_incident' && traumaDump) {
                    return <InjectedPitfallCard pitfall={traumaDump} />;
                  }
                  if (currentBeat.id === 'special_world' && voluntourism) {
                    return <InjectedPitfallCard pitfall={voluntourism} />;
                  }
                  if (currentBeat.id === 'ordeal_climax' && sportsHighlight) {
                    return <InjectedPitfallCard pitfall={sportsHighlight} />;
                  }
                  if (currentBeat.id === 'winning_action' && passiveProtagonist) {
                    return <InjectedPitfallCard pitfall={passiveProtagonist} />;
                  }
                  return null;
                })()}

              </div>
            );
          })()}

          {/* Beats navigation toolbar */}
          <div className="flex justify-between items-center max-w-xl mx-auto pt-4" id="beats_navigation_actions">
            <button
              onClick={() => setActiveBeatIdx(prev => Math.max(0, prev - 1))}
              disabled={activeBeatIdx === 0}
              className="p-2 bg-slate-950 border border-slate-850 rounded-lg text-xs font-sans text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-sans text-slate-400">Beat {activeBeatIdx + 1} of 8</span>
            <button
              onClick={() => {
                if (activeBeatIdx < 7) setActiveBeatIdx(prev => Math.min(7, prev + 1));
                else setGuideStep(1);
              }}
              className="px-4 py-2 bg-slate-950 border border-slate-800 text-cyan-400 hover:bg-slate-900 rounded-lg text-xs font-sans font-bold transition-all cursor-pointer flex items-center gap-1"
            >
              {activeBeatIdx < 7 ? "Next Beat" : "Go to Prose Tools"} <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {guideStep === 1 && (
        <div className="space-y-6 max-w-4xl mx-auto animate-fade-in" id="step_cinematic_tools">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-serif font-bold text-white">Cinematic Prose Techniques</h2>
            <p className="text-xs text-slate-400 font-sans">
              Once some story beats are outlined, skilled screenwriters use concrete prose gears to make individual paragraphs pop off the paper.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950/60 border border-slate-850 rounded-xl p-6 space-y-4 shadow flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-sky-950/50 border border-sky-900/50 text-sky-400 rounded-lg flex items-center justify-center">
                    <Tv className="w-4 h-4 text-sky-400" />
                  </div>
                  <h3 className="font-serif font-bold text-base text-white">1. Bullet Time (Slowing down time)</h3>
                </div>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  When you reach the climax of your essay (<strong className="font-semibold text-slate-200">The Grounded Ordeal Climax</strong>), stop summarizing. Do not tell the reader 'I got very nervous during my lecture.' 
                </p>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  Instead, zoom in with macro physical details—the temperature of the room, the sudden sound of a marker humming, or the rapid tapping on a whiteboard. Let us see the scene unfold.
                </p>
              </div>

              <div className="bg-slate-900/60 border border-slate-855 rounded-lg p-3.5 space-y-2.5 font-sans text-[11px]">
                <div className="space-y-1">
                  <strong className="text-rose-400 uppercase tracking-widest block text-[11px]">❌ Lazy Abstract Telling:</strong>
                  <p className="font-serif italic text-slate-400">"I was extremely anxious when I launched my test server because I knew if it failed, my supervisor would think I was an amateur."</p>
                </div>
                <div className="space-y-1 border-t border-slate-800 pt-2.5">
                  <strong className="text-teal-400 uppercase tracking-widest block text-[11px]">✅ Grounded Showing Bullet Time:</strong>
                  <p className="font-serif italic text-slate-300">"My eyes felt sandpapered under the yellow desk lamp. The terminal remained empty, flashing a cold gray prompt block that refused to load. I pressed my thumbs into my palms, waiting for the syntax warning to break our launch."</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-950/60 border border-slate-850 rounded-xl p-6 space-y-4 shadow flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-rose-950/50 border border-rose-900/50 text-rose-400 rounded-lg flex items-center justify-center">
                    <Layers className="w-4 h-4 text-rose-400" />
                  </div>
                  <h3 className="font-serif font-bold text-base text-white">2. The Cinematic Montage (Speeding up)</h3>
                </div>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  Many high-achieving applicants make the error of listing chronological awards or activities. List-driven text reads like a dry catalog.
                </p>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  Instead, string together small memories or micro-skills across several years under <strong className="font-semibold text-slate-200">one central thematic thread</strong>.
                </p>
              </div>

              <div className="bg-slate-900/60 border border-slate-855 rounded-lg p-3.5 space-y-2.5 font-sans text-[11px]">
                <div className="space-y-1">
                  <strong className="text-rose-400 uppercase tracking-widest block text-[11px]">❌ Chronological List:</strong>
                  <p className="font-serif italic text-slate-400">"I have played cello since ninth grade. In tenth grade, I was promoted to section leader. In eleventh grade, I performed solos at our community charity hall."</p>
                </div>
                <div className="space-y-1 border-t border-slate-800 pt-2.5">
                  <strong className="text-teal-400 uppercase tracking-widest block text-[11px]">✅ Thematic Montage Form:</strong>
                  <p className="font-serif italic text-slate-300">"At twelve, my music was dry bowing in our basement. At fourteen, it was the copper scent of resin. At sixteen, it was the quiet breathing coordination of fifteen distinct cellists waiting for my single hand signal."</p>
                </div>
              </div>
            </div>
          </div>

          {(() => {
            const resumeRepeat = ANTI_PATTERNS.find(ap => ap.id === 'resume_repeat');
            return <InjectedPitfallCard pitfall={resumeRepeat} />;
          })()}
        </div>
      )}
    </div>
  );
}
