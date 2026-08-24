/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  BookOpen, 
  ArrowRight, 
  ArrowLeft, 
  Check,
  Sparkles,
  AlertTriangle,
  UserPlus,
  Clapperboard,
  Milestone
} from 'lucide-react';
import { GuidebookManual } from './GuidebookManual';
import { useAuth } from '../AuthContext';
import ColdOpen from './ColdOpen';

interface HandbookProps {
  forceOnboarding?: boolean;
  onExit?: (options?: { openGuidebook?: boolean }) => void;
  onSelectTrack?: (track: 'heros_journey' | 'different_but_truthful' | 'intellectual_journey') => void;
  onOpenGuidebook?: () => void;
}

export default function Handbook({ forceOnboarding = false, onExit, onSelectTrack, onOpenGuidebook }: HandbookProps) {
  const [onboardingStep, setOnboardingStep] = useState<number>(0);
  const [showColdOpen, setShowColdOpen] = useState(forceOnboarding);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingTrack, setPendingTrack] = useState<'heros_journey' | 'different_but_truthful' | 'intellectual_journey'>('heros_journey');
  const [routeToGuidebook, setRouteToGuidebook] = useState(false);
  const { user, login } = useAuth();

  const handleNextStep = () => {
    setOnboardingStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setOnboardingStep(prev => Math.max(0, prev - 1));
  };

  const handleFinishOnboarding = (trackKey: 'heros_journey' | 'different_but_truthful' | 'intellectual_journey' = 'heros_journey') => {
    if (!user && forceOnboarding) {
      setPendingTrack(trackKey);
      setShowAuthModal(true);
      return;
    }
    
    finalizeOnboarding(trackKey, routeToGuidebook);
  };

  const finalizeOnboarding = (trackKey: 'heros_journey' | 'different_but_truthful' | 'intellectual_journey', shouldRouteGuidebook: boolean = false) => {
    if (onSelectTrack) {
      onSelectTrack(trackKey);
    }
    if (onExit) {
      onExit({ openGuidebook: shouldRouteGuidebook });
    }
    setOnboardingStep(0);
    setShowAuthModal(false);
  };

  const handleLoginClick = async () => {
    try {
      localStorage.setItem('college_essay_architect_pending_track', pendingTrack);
      if (routeToGuidebook) {
        localStorage.setItem('college_essay_architect_route_to_guidebook', 'true');
      }
      await login();
      finalizeOnboarding(pendingTrack, routeToGuidebook);
    } catch (e) {
      console.error(e);
    }
  };

  const handleOpenScholarPath = () => {
    setRouteToGuidebook(true);
    if (!user && forceOnboarding) {
      setPendingTrack('heros_journey');
      setShowAuthModal(true);
      return;
    }
    finalizeOnboarding('heros_journey', true);
  };

  if (showColdOpen) {
    return <ColdOpen onComplete={() => setShowColdOpen(false)} />;
  }

  if (!forceOnboarding) {
    return (
      <div className="w-full" id="handbook_super_container">
        <div 
          id="handbook_card" 
          className="bg-slate-900 border border-slate-800/90 rounded-2xl overflow-hidden shadow-2xl relative w-full grid grid-cols-1 gap-6 p-1 bg-slate-950 border-0 shadow-none"
        >
          <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-slate-900" id="manual_chapters_header">
            <div>
              <h2 className="text-lg font-serif font-medium text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-cyan-400" /> Guidebook
              </h2>
              <p className="text-xs text-slate-400 font-sans mt-0.5">
                Understand screenwriting mechanics, narrative blueprints, and avoid critical clichés
              </p>
            </div>
          </div>
          <GuidebookManual />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 md:p-6 overflow-y-auto" id="handbook_super_container">
      <div 
        id="handbook_card" 
        className="bg-slate-900 border border-slate-800/90 rounded-2xl overflow-hidden shadow-2xl relative w-full max-w-6xl mx-auto my-8 border-cyan-500/20 shadow-cyan-500/5"
      >
        {/* Onboarding Mode Header */}
        <div className="bg-slate-950/80 backdrop-blur border-b border-slate-800 px-6 py-4 flex items-center justify-end sticky top-0 z-10" id="onboarding_header">
          <button
            id="skip_to_workspace_top_btn"
            onClick={() => handleFinishOnboarding()}
            className="text-xs font-sans font-bold text-slate-400 hover:text-slate-100 flex items-center gap-1 transition-colors px-2 py-1 rounded bg-slate-900 border border-slate-800 cursor-pointer"
          >
            Skip to Workspace <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="p-6 md:p-8 flex flex-col h-[750px] md:h-[650px] overflow-hidden" id="onboarding_content">
          
          {/* Step Onboarding Pipeline Indicator */}
          <div className="flex items-center justify-between col-span-12 max-w-xl mx-auto border-b border-slate-800/80 pb-6 mb-6 text-center w-full shrink-0" id="onboarding_stepper">
                <div className="flex items-center justify-center gap-1 md:gap-2 w-full">
                  {[0, 1, 2].map((sIndex) => (
                    <React.Fragment key={sIndex}>
                      <button
                        id={`stepper_jump_${sIndex}`}
                        onClick={() => setOnboardingStep(sIndex)}
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-sans font-bold transition-all relative shrink-0 ${
                          onboardingStep === sIndex
                            ? 'bg-gradient-to-tr from-teal-400 to-cyan-500 text-white ring-2 ring-cyan-400/30'
                            : onboardingStep > sIndex
                              ? 'bg-teal-950 text-teal-400 border border-teal-800'
                              : 'bg-slate-950 text-slate-500 border border-slate-800/80 cursor-pointer hover:bg-slate-900 border-slate-700'
                        }`}
                        title={`Go to Step ${sIndex}`}
                      >
                        {onboardingStep > sIndex ? <Check className="w-3.5 h-3.5" /> : null}
                      </button>
                      {sIndex < 2 && (
                        <div className={`h-0.5 flex-1 min-w-[8px] sm:min-w-[12px] md:min-w-[20px] rounded ${
                          onboardingStep > sIndex ? 'bg-teal-850 bg-teal-500/40' : 'bg-slate-800'
                        }`} />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

            {/* STEP 0: Welcome Splash Screen */}
            {onboardingStep === 0 && (
              <div className="max-w-2xl mx-auto animate-fade-in p-2 md:p-6 w-full flex-grow flex flex-col min-h-0" id="step_0">
                <div className="flex-grow overflow-y-auto pr-2 pb-4 space-y-4">
                  <h1 className="text-3xl md:text-4xl font-serif font-extrabold text-white tracking-tight leading-tight pt-2 text-left">
                    You already know you need a story.
                  </h1>
                  <div className="text-sm md:text-base font-sans leading-relaxed space-y-4 text-slate-300 text-left">
                    <p>
                      You’ve heard a thousand times to not just rehash your resume. You know you need a "compelling narrative."
                    </p>
                    <p>
                      But knowing you need a story and actually writing one are two different things. With high stakes and looming deadlines, staring at an empty screen is terrifying. That is the Curse of the Blank Page. Together, we're going to break it.
                    </p>
                    <p>
                      You're tempted to dive right in, hoping the words will magically flow. They won't. If you try to write your essay line-by-line without a roadmap, you will get lost.
                    </p>
                    <p>
                      Every masterpiece is created twice: first as a plan, and then as a product. Before you polish your prose, you need a blueprint. This app will help you create it.
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex justify-center shrink-0 border-t border-slate-800/50 mt-4" id="action_step_0">
                  <button
                    onClick={handleNextStep}
                    className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-teal-500 to-cyan-600 hover:opacity-95 text-white font-sans font-bold text-sm rounded-xl transition-all shadow-lg shadow-cyan-500/10 cursor-pointer flex items-center justify-center gap-2"
                  >
                    Next <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 1: The "Created Twice" Principle */}
            {onboardingStep === 1 && (
              <div className="max-w-2xl mx-auto animate-fade-in p-2 md:p-6 w-full flex-grow flex flex-col min-h-0" id="step_1">
                <div className="flex-grow overflow-y-auto pr-2 pb-4 space-y-4">
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-tight text-left">
                    100% your voice.
                  </h2>
                  <div className="text-sm md:text-base font-sans text-slate-300 leading-relaxed space-y-4">
                    <p>
                      Let's get one thing clear: colleges are looking for your authentic human voice.
                    </p>
                    <p>
                      This app contains ZERO generative AI. It will not write your essay for you. It won't even check your spelling and grammar.
                    </p>
                    <p>
                      Its ONLY job is to ask you the right questions, help you extract the raw materials of your story, and organize them into a pattern proven to connect with readers.
                    </p>
                    <p>
                      The authorship remains 100% yours.
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex justify-between items-center shrink-0 border-t border-slate-800/50 mt-4">
                  <button onClick={handlePrevStep} className="px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-xs font-sans text-slate-400 hover:text-slate-100 transition-colors flex items-center gap-1 cursor-pointer">
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                  <button onClick={handleNextStep} className="px-6 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-900 font-sans font-bold text-xs rounded-xl flex items-center gap-1.5 hover:opacity-95 cursor-pointer">
                    Next <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Stealing from the Masters */}
            {onboardingStep === 2 && (
              <div className="max-w-2xl mx-auto animate-fade-in p-2 md:p-6 w-full flex-grow flex flex-col min-h-0" id="step_2">
                <div className="flex-grow overflow-y-auto pr-2 pb-4 space-y-4">
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-tight text-left">
                    Stealing from the Masters
                  </h2>
                  <div className="text-sm md:text-base font-sans text-slate-300 leading-relaxed space-y-4">
                    <p>
                      To build your blueprint, we borrow from the best.
                    </p>
                    <p>
                      First, we use the Hero's Journey—the universal structure behind almost every great myth and movie. It is a proven pattern for holding human attention.
                    </p>
                    <p>
                      Second, we apply the narrative rules developed by the master storytellers at Pixar to ensure your essay is emotionally compelling and efficient with your word count.
                    </p>
                    <p>
                      You don't need to invent a structure from scratch. We simply plug your truth into a pattern that works.
                    </p>
                  </div>
                  
                  <hr className="my-8 border-slate-800" />
                  
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-serif font-bold text-white">You are ready to build. How would you like to begin?</h3>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button onClick={handleOpenScholarPath} className="w-full sm:w-auto px-6 py-3 bg-slate-800 hover:bg-slate-700 text-cyan-400 font-sans font-bold text-sm rounded-xl transition-colors cursor-pointer border border-slate-700 hover:border-cyan-500">
                      Read the full Guidebook
                    </button>
                    <button onClick={() => handleFinishOnboarding('heros_journey')} className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 hover:opacity-95 text-slate-950 font-sans font-bold text-sm rounded-xl transition-all cursor-pointer shadow-lg shadow-cyan-500/20">
                      Jump into the Builder
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

      </div>

      {showAuthModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-[9999] animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl max-w-md w-full shadow-2xl relative">
            <h3 className="text-xl font-serif font-bold text-white mb-2 pb-2 border-b border-slate-800">Save Your Work</h3>
            <p className="text-sm text-slate-300 font-sans mb-6 leading-relaxed">
              Create an account to securely save your writing progress.
            </p>

            <div className="space-y-4">
              <button
                onClick={handleLoginClick}
                className="w-full py-3 bg-gradient-to-r from-teal-500 to-cyan-600 hover:opacity-95 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg text-sm cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                Create Account / Sign In
              </button>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-slate-800"></div>
                <span className="flex-shrink-0 mx-4 text-slate-500 text-xs font-sans">OR</span>
                <div className="flex-grow border-t border-slate-800"></div>
              </div>

              <div className="bg-amber-950/20 border border-amber-900/40 p-4 rounded-xl space-y-3">
                <div className="flex gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-200/80 font-sans leading-relaxed">
                    You can continue writing as a guest, but <strong>all your work will be permanently lost</strong> if you close this browser tab or clear your cache.
                  </p>
                </div>
                <button
                  onClick={() => finalizeOnboarding(pendingTrack, routeToGuidebook)}
                  className="w-full py-2 bg-slate-950 text-slate-400 hover:text-white rounded-lg font-bold flex items-center justify-center transition-all border border-slate-850 hover:border-slate-700 text-xs cursor-pointer"
                >
                  Continue without saving
                </button>
              </div>
            </div>
            
            <button 
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
