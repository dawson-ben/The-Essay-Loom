import re

with open('src/components/InteractiveGuidebook.tsx', 'r') as f:
    content = f.read()

# 1. Replace the initial state
content = re.sub(
    r"const \[selectedStructuralPattern, setSelectedStructuralPattern\] = useState<string>\('medias_res'\);",
    r"const [selectedStructuralPattern, setSelectedStructuralPattern] = useState<string>('hj-chronological');",
    content
)

# 2. Replace the tabs and the content
# We will match from <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2"> 
# all the way down to the closing tag of the parallel_track section.

start_marker = r'                        {/\* Structural switch layout pills \*/}'
end_marker = r'                      </div>\n                    \)}'

# We'll just generate the entire replacement block.

tabs_and_content = """                        {/* Structural switch layout pills */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                          <button
                            onClick={() => setSelectedStructuralPattern('hj-chronological')}
                            className={getTabClass(selectedStructuralPattern === 'hj-chronological')}
                          >
                            Timeline Chain
                          </button>
                          <button
                            onClick={() => setSelectedStructuralPattern('hj-in-media-res')}
                            className={getTabClass(selectedStructuralPattern === 'hj-in-media-res')}
                          >
                            In Media Res
                          </button>
                          <button
                            onClick={() => setSelectedStructuralPattern('hj-post-mortem')}
                            className={getTabClass(selectedStructuralPattern === 'hj-post-mortem')}
                          >
                            The Post-Mortem
                          </button>
                          <button
                            onClick={() => setSelectedStructuralPattern('hj-catalyst-anchor')}
                            className={getTabClass(selectedStructuralPattern === 'hj-catalyst-anchor')}
                          >
                            The Catalyst Anchor
                          </button>
                          <button
                            onClick={() => setSelectedStructuralPattern('hj-reluctant-hook')}
                            className={getTabClass(selectedStructuralPattern === 'hj-reluctant-hook')}
                          >
                            The Reluctant Hook
                          </button>
                          <button
                            onClick={() => setSelectedStructuralPattern('hj-parallel-track')}
                            className={getTabClass(selectedStructuralPattern === 'hj-parallel-track')}
                          >
                            The Parallel Track
                          </button>
                          <button
                            onClick={() => setSelectedStructuralPattern('hj-sudden-setback')}
                            className={getTabClass(selectedStructuralPattern === 'hj-sudden-setback')}
                          >
                            Sudden Setback
                          </button>
                          <button
                            onClick={() => setSelectedStructuralPattern('hj-student-passion')}
                            className={getTabClass(selectedStructuralPattern === 'hj-student-passion')}
                          >
                            Student Meets Passion
                          </button>
                          <button
                            onClick={() => setSelectedStructuralPattern('hj-cinderella')}
                            className={getTabClass(selectedStructuralPattern === 'hj-cinderella')}
                          >
                            Cinderella
                          </button>
                        </div>

                        {selectedStructuralPattern === 'hj-chronological' && (
                          <div className="space-y-4 animate-fade-in font-sans text-sm mt-4">
                            <div className="flex flex-col sm:flex-row items-center gap-2 justify-center py-4 bg-slate-950 rounded-xl border border-slate-855/80">
                              <span className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-400 rounded-lg text-center font-medium shadow-sm">1. Ordinary World</span>
                              <span className="text-slate-500 hidden sm:block">➔</span>
                              <span className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-400 rounded-lg text-center font-medium shadow-sm">2. Inciting Incident</span>
                              <span className="text-slate-500 hidden sm:block">➔</span>
                              <span className="px-3.5 py-1.5 bg-amber-900/35 border border-amber-700 text-amber-400 rounded-lg text-center font-bold shadow-sm">3. The Ordeal</span>
                              <span className="text-slate-500 hidden sm:block">➔</span>
                              <span className="px-3 py-1.5 bg-blue-900/30 border border-blue-800/50 text-blue-400 rounded-lg text-center font-bold shadow-sm">4. The Elixir</span>
                            </div>
                            <div className="space-y-1">
                              <h5 className="font-bold text-slate-200">The Standard Chronological Pattern</h5>
                              <p className="text-slate-450 text-slate-400 leading-relaxed font-normal">
                                The classic timeline. You start in your comfort zone, get pulled into a new challenge, and face your ordeal at the climax. This is excellent for clear, step-by-step psychological growth stories. Readers can follow your trial sequences easily.
                              </p>
                            </div>
                          </div>
                        )}

                        {selectedStructuralPattern === 'hj-in-media-res' && (
                          <div className="space-y-4 animate-fade-in font-sans text-sm mt-4">
                            <div className="flex flex-col sm:flex-row items-center gap-2 justify-center py-4 bg-slate-950 rounded-xl border border-slate-855/80">
                              <span className="px-3.5 py-1.5 bg-blue-900/35 border border-blue-700 text-blue-100 rounded-lg text-center font-extrabold shadow">1. Ordeal / Climax (Hook)</span>
                              <span className="text-slate-500 hidden sm:block">➔</span>
                              <span className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-400 rounded-lg text-center font-medium shadow-sm">2. Ordinary World (Flashback)</span>
                              <span className="text-slate-500 hidden sm:block">➔</span>
                              <span className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-400 rounded-lg text-center font-medium shadow-sm">3. Catalyst/Action</span>
                              <span className="text-slate-500 hidden sm:block">➔</span>
                              <span className="px-3 py-1.5 bg-blue-900/30 border border-blue-800/50 text-blue-400 rounded-lg text-center font-bold shadow-sm">4. Elixir</span>
                            </div>
                            <div className="space-y-1">
                              <h5 className="font-bold text-slate-200">In Media Res (The Action Hook)</h5>
                              <p className="text-slate-450 text-slate-400 leading-relaxed font-normal">
                                Start right in the middle of the chaos. Open with your biggest complication, then flash back to how you got there. Gripping from the first sentence.
                              </p>
                            </div>
                          </div>
                        )}

                        {selectedStructuralPattern === 'hj-post-mortem' && (
                          <div className="space-y-4 animate-fade-in font-sans text-sm mt-4">
                            <div className="flex flex-col sm:flex-row items-center gap-2 justify-center py-4 bg-slate-950 rounded-xl border border-slate-855/80 flex-wrap">
                              <span className="px-3.5 py-1.5 bg-rose-900/35 border border-rose-700 text-rose-100 rounded-lg text-center font-extrabold shadow-sm">1. Failed Ordeal (Hook)</span>
                              <span className="text-slate-500 hidden sm:block">➔</span>
                              <span className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-400 rounded-lg text-center font-medium shadow-sm">2. Inciting Incident</span>
                              <span className="text-slate-500 hidden sm:block">➔</span>
                              <span className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-400 rounded-lg text-center font-medium shadow-sm">3. Unfamiliar World</span>
                              <span className="text-slate-500 hidden sm:block">➔</span>
                              <span className="px-3 py-1.5 bg-blue-900/30 border border-blue-800/50 text-blue-400 rounded-lg text-center font-bold shadow-sm">4. Elixir</span>
                            </div>
                            <div className="space-y-1">
                              <h5 className="font-bold text-slate-200">The Post-Mortem (Failed Ordeal First)</h5>
                              <p className="text-slate-450 text-slate-400 leading-relaxed font-normal">
                                Opens with the aftermath of failure. The essay starts with the sting of defeat, then flashes back to show how you rebuilt your approach to tackle the problem a second time. This is the ultimate "Resilience Story" structure.
                              </p>
                            </div>
                          </div>
                        )}

                        {selectedStructuralPattern === 'hj-catalyst-anchor' && (
                          <div className="space-y-4 animate-fade-in font-sans text-sm mt-4">
                            <div className="flex flex-col sm:flex-row items-center gap-2 justify-center py-4 bg-slate-950 rounded-xl border border-slate-855/80 flex-wrap">
                              <span className="px-3 py-1.5 bg-amber-900/30 border border-amber-800/50 text-amber-400 rounded-lg text-center font-bold shadow-sm">1. Catalyst (Object/Memory)</span>
                              <span className="text-slate-500 hidden sm:block">➔</span>
                              <span className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-400 rounded-lg text-center font-medium shadow-sm">2. Ordinary World</span>
                              <span className="text-slate-500 hidden sm:block">➔</span>
                              <span className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-400 rounded-lg text-center font-medium shadow-sm">3. Ordeal</span>
                              <span className="text-slate-500 hidden sm:block">➔</span>
                              <span className="px-3 py-1.5 bg-blue-900/30 border border-blue-800/50 text-blue-400 rounded-lg text-center font-bold shadow-sm">4. Elixir</span>
                            </div>
                            <div className="space-y-1">
                              <h5 className="font-bold text-slate-200">The Catalyst Anchor (The Object Lesson)</h5>
                              <p className="text-slate-450 text-slate-400 leading-relaxed font-normal">
                                Open with a hyper-focus on a specific physical object, a core memory, or a piece of advice. The narrative then zooms out, progressing until the Ordeal, where that exact object or memory is deployed to save the day. Works brilliantly for the "Intellectual Journey" track.
                              </p>
                            </div>
                          </div>
                        )}

                        {selectedStructuralPattern === 'hj-reluctant-hook' && (
                          <div className="space-y-4 animate-fade-in font-sans text-sm mt-4">
                            <div className="flex flex-col sm:flex-row items-center gap-2 justify-center py-4 bg-slate-950 rounded-xl border border-slate-855/80 flex-wrap">
                              <span className="px-3 py-1.5 bg-teal-900/30 border border-teal-800/50 text-teal-400 rounded-lg text-center font-bold shadow-sm">1. Doubts & Hesitation</span>
                              <span className="text-slate-500 hidden sm:block">➔</span>
                              <span className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-400 rounded-lg text-center font-medium shadow-sm">2. Ordinary World</span>
                              <span className="text-slate-500 hidden sm:block">➔</span>
                              <span className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-400 rounded-lg text-center font-medium shadow-sm">3. Ordeal</span>
                              <span className="text-slate-500 hidden sm:block">➔</span>
                              <span className="px-3 py-1.5 bg-blue-900/30 border border-blue-800/50 text-blue-400 rounded-lg text-center font-bold shadow-sm">4. Elixir</span>
                            </div>
                            <div className="space-y-1">
                              <h5 className="font-bold text-slate-200">The Reluctant Hook (Starting with Hesitation)</h5>
                              <p className="text-slate-450 text-slate-400 leading-relaxed font-normal">
                                Start the essay at the moment of maximum internal resistance (actively refusing to do something, hiding, or stubbornly digging your heels in). Then flash back to explain the safe Ordinary World, and the event that finally forced you to cross the threshold. Highly effective for the "Quiet Power" track that embraces vulnerability.
                              </p>
                            </div>
                          </div>
                        )}

                        {selectedStructuralPattern === 'hj-parallel-track' && (
                          <div className="space-y-4 animate-fade-in font-sans text-sm mt-4">
                            <div className="flex flex-col sm:flex-row items-center gap-2 justify-center py-4 bg-slate-950 rounded-xl border border-slate-855/80 flex-wrap">
                              <span className="px-3 py-1.5 bg-purple-900/30 border border-purple-800/50 text-purple-400 rounded-lg text-center font-bold shadow-sm">1. Ordinary World A vs B</span>
                              <span className="text-slate-500 hidden sm:block">➔</span>
                              <span className="px-3 py-1.5 bg-emerald-900/30 border border-emerald-800/50 text-emerald-400 rounded-lg text-center font-bold shadow-sm">2. Incident A vs Ordeal B</span>
                              <span className="text-slate-500 hidden sm:block">➔</span>
                              <span className="px-3 py-1.5 bg-blue-900/30 border border-blue-800/50 text-blue-400 rounded-lg text-center font-bold shadow-sm">3. Convergence</span>
                              <span className="text-slate-500 hidden sm:block">➔</span>
                              <span className="px-3 py-1.5 bg-blue-900/30 border border-blue-800/50 text-blue-400 rounded-lg text-center font-bold shadow-sm">4. Elixir</span>
                            </div>
                            <div className="space-y-1">
                              <h5 className="font-bold text-slate-200">The Parallel Track (The Dual Timeline)</h5>
                              <p className="text-slate-450 text-slate-400 leading-relaxed font-normal">
                                Alternate between two seemingly unrelated timelines or environments—like a quiet cultural home life (Timeline A) and a loud robotics lab (Timeline B). The two timelines alternate and escalate until the climax, where a skill learned in Timeline A solves the Ordeal in Timeline B. Demonstrates massive intellectual maturity.
                              </p>
                            </div>
                          </div>
                        )}

                        {selectedStructuralPattern === 'hj-sudden-setback' && (
                          <div className="space-y-4 animate-fade-in font-sans text-sm mt-4">
                            <div className="flex flex-col sm:flex-row items-center gap-2 justify-center py-4 bg-slate-950 rounded-xl border border-slate-855/80 flex-wrap">
                              <span className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-400 rounded-lg text-center font-medium shadow-sm">1. Ordinary World</span>
                              <span className="text-slate-500 hidden sm:block">➔</span>
                              <span className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-400 rounded-lg text-center font-medium shadow-sm">2. Inciting Incident</span>
                              <span className="text-slate-500 hidden sm:block">➔</span>
                              <span className="px-3.5 py-1.5 bg-rose-900/35 border border-rose-700 text-rose-100 rounded-lg text-center font-extrabold shadow-sm">3. The Ordeal</span>
                              <span className="text-slate-500 hidden sm:block">➔</span>
                              <span className="px-3 py-1.5 bg-blue-900/30 border border-blue-800/50 text-blue-400 rounded-lg text-center font-bold shadow-sm">4. Winning Action</span>
                            </div>
                            <div className="space-y-1">
                              <h5 className="font-bold text-slate-200">Sudden Setback</h5>
                              <p className="text-slate-450 text-slate-400 leading-relaxed font-normal">
                                A character falls into a crisis and claws their way out. The Ordeal hits hard and early, making the essay about the grueling, deliberate process of climbing out of the hole, rather than building up to the fall.
                              </p>
                            </div>
                          </div>
                        )}

                        {selectedStructuralPattern === 'hj-student-passion' && (
                          <div className="space-y-4 animate-fade-in font-sans text-sm mt-4">
                            <div className="flex flex-col sm:flex-row items-center gap-2 justify-center py-4 bg-slate-950 rounded-xl border border-slate-855/80 flex-wrap">
                              <span className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-400 rounded-lg text-center font-medium shadow-sm">1. Inciting Incident (Meeting the passion)</span>
                              <span className="text-slate-500 hidden sm:block">➔</span>
                              <span className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-400 rounded-lg text-center font-medium shadow-sm">2. Unfamiliar World</span>
                              <span className="text-slate-500 hidden sm:block">➔</span>
                              <span className="px-3.5 py-1.5 bg-amber-900/35 border border-amber-700 text-amber-400 rounded-lg text-center font-bold shadow-sm">3. The Ordeal (Burnout/Competition)</span>
                              <span className="text-slate-500 hidden sm:block">➔</span>
                              <span className="px-3 py-1.5 bg-blue-900/30 border border-blue-800/50 text-blue-400 rounded-lg text-center font-bold shadow-sm">4. Elixir</span>
                            </div>
                            <div className="space-y-1">
                              <h5 className="font-bold text-slate-200">Student Meets Passion</h5>
                              <p className="text-slate-450 text-slate-400 leading-relaxed font-normal">
                                Finding a passion, losing it to burnout/competition, and rebuilding it on healthier, more mature terms. Excellent for tracing the evolution of a hobby or academic interest over several years.
                              </p>
                            </div>
                          </div>
                        )}

                        {selectedStructuralPattern === 'hj-cinderella' && (
                          <div className="space-y-4 animate-fade-in font-sans text-sm mt-4">
                            <div className="flex flex-col sm:flex-row items-center gap-2 justify-center py-4 bg-slate-950 rounded-xl border border-slate-855/80 flex-wrap">
                              <span className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-400 rounded-lg text-center font-medium shadow-sm">1. Ordinary World</span>
                              <span className="text-slate-500 hidden sm:block">➔</span>
                              <span className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-400 rounded-lg text-center font-medium shadow-sm">2. Unfamiliar World (False Peak)</span>
                              <span className="text-slate-500 hidden sm:block">➔</span>
                              <span className="px-3.5 py-1.5 bg-rose-900/35 border border-rose-700 text-rose-100 rounded-lg text-center font-extrabold shadow-sm">3. The Ordeal (Rock Bottom)</span>
                              <span className="text-slate-500 hidden sm:block">➔</span>
                              <span className="px-3 py-1.5 bg-blue-900/30 border border-blue-800/50 text-blue-400 rounded-lg text-center font-bold shadow-sm">4. Winning Action (True Peak)</span>
                            </div>
                            <div className="space-y-1">
                              <h5 className="font-bold text-slate-200">Cinderella (The False Peak)</h5>
                              <p className="text-slate-450 text-slate-400 leading-relaxed font-normal">
                                An initial unearned rise, a devastating fall to rock bottom, and a final earned rise. Shows humility, resilience, and the difference between superficial success and deep mastery.
                              </p>
                            </div>
                          </div>
                        )
"""

pattern = re.compile(start_marker + r'.*?' + end_marker, re.DOTALL)
content = pattern.sub(tabs_and_content, content)

with open('src/components/InteractiveGuidebook.tsx', 'w') as f:
    f.write(content)

