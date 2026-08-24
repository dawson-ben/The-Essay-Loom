import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EssayDraft, TrackType } from '../types';
import Workbook from './Workbook';
import AssemblyBoard from './AssemblyBoard';
import Handbook from './Handbook';
import Scratchpad from './Scratchpad';
import InteractiveGuidebook from './InteractiveGuidebook';
import { BookOpen, FileEdit, LayoutList, FileText, Compass, Sparkles, Plus, Trash2, GraduationCap, Sun, Moon, LogOut, Cloud, CloudOff, PenTool, Copy, RefreshCcw, AlertTriangle, X, TrendingUp } from 'lucide-react';
import { useAuth } from '../AuthContext';
import { fetchEssays, createEssay, updateEssay, deleteEssay } from '../db';

export default function Editor() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { id, tab } = useParams<{ id: string, tab: string }>();

  const [drafts, setDrafts] = useState<EssayDraft[]>([]);
  const [activeDraftId, setActiveDraftId] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'worksheet' | 'clinics' | 'preview' | 'guidebook'>('worksheet');
  const [showOnboarding, setShowOnboarding] = useState<boolean>(false);
  const [isScratchpadOpen, setIsScratchpadOpen] = useState(false);
  const [isGuidebookOpen, setIsGuidebookOpen] = useState(false);
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('college_essay_architect_theme');
    return saved !== 'light';
  });
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  // Custom high-contrast reset sandbox states
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [resetLoadingMsg, setResetLoadingMsg] = useState<string | null>(null);
  const [resetInputText, setResetInputText] = useState('');

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [draftToDeleteId, setDraftToDeleteId] = useState<string | null>(null);
  const [deleteInputText, setDeleteInputText] = useState('');

  const toggleTheme = () => {
    setIsDark(prev => {
      const next = !prev;
      localStorage.setItem('college_essay_architect_theme', next ? 'dark' : 'light');
      return next;
    });
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      if (user) {
        const data = await fetchEssays(user.uid);
        if (data.length > 0) {
          setDrafts(data);
          const needsGuidebookRoute = localStorage.getItem('college_essay_architect_route_to_guidebook') === 'true';
          const targetTab = needsGuidebookRoute ? 'guidebook' : (tab || 'worksheet');
          if (needsGuidebookRoute) {
            localStorage.removeItem('college_essay_architect_route_to_guidebook');
          }
          if (id && data.some(d => d.id === id)) {
            setActiveDraftId(id);
            if (needsGuidebookRoute) {
              navigate(`/essay/${id}/guidebook`, { replace: true });
            }
          } else {
            setActiveDraftId(data[0].id);
            navigate(`/essay/${data[0].id}/${targetTab}`, { replace: true });
          }
        } else {
          const pendingTrackMode = localStorage.getItem('college_essay_architect_pending_track') as TrackType;
          if (pendingTrackMode) {
            localStorage.removeItem('college_essay_architect_pending_track');
          }
          const needsGuidebookRoute = localStorage.getItem('college_essay_architect_route_to_guidebook') === 'true';
          const targetTab = needsGuidebookRoute ? 'guidebook' : 'worksheet';
          if (needsGuidebookRoute) {
            localStorage.removeItem('college_essay_architect_route_to_guidebook');
          }
          const newDraft = await createEssay(user.uid, {
            title: 'My Personal Statement',
            targetWordCount: 650,
            track: pendingTrackMode || 'heros_journey',
            herosJourneyAnswers: {},
            differentTruthfulAnswers: {},
            intellectualJourneyAnswers: {},
          });
          setDrafts([newDraft]);
          setActiveDraftId(newDraft.id);
          navigate(`/essay/${newDraft.id}/${targetTab}`, { replace: true });
        }
      } else {
        const localDraft: EssayDraft = {
          id: 'guest_draft',
          title: 'My Personal Statement',
          targetWordCount: 650,
          track: 'heros_journey',
          herosJourneyAnswers: {},
          differentTruthfulAnswers: {},
          intellectualJourneyAnswers: {},
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setDrafts([localDraft]);
        setActiveDraftId(localDraft.id);
        const needsGuidebookRoute = localStorage.getItem('college_essay_architect_route_to_guidebook') === 'true';
        const targetTab = needsGuidebookRoute ? 'guidebook' : (tab || 'worksheet');
        if (needsGuidebookRoute) {
          localStorage.removeItem('college_essay_architect_route_to_guidebook');
        }
        navigate(`/essay/${localDraft.id}/${targetTab}`, { replace: true });
      }

      const completed = localStorage.getItem('college_essay_architect_onboarding_completed_v2');
      if (!completed) {
        setShowOnboarding(true);
      }
      setLoading(false);
    };
    loadData();
  }, [user]);

  useEffect(() => {
    if (tab && ['worksheet', 'clinics', 'preview', 'guidebook'].includes(tab)) {
      setActiveTab(tab as any);
    }
  }, [tab]);

  useEffect(() => {
    if (id && activeDraftId !== id && drafts.some(d => d.id === id)) {
      setActiveDraftId(id);
    }
  }, [id, drafts]);

  const handleUpdateDraft = async (updated: EssayDraft) => {
    setDrafts(prev => prev.map(d => d.id === updated.id ? updated : d));
    if (!user) return;
    
    setSaving(true);
    try {
      await updateEssay(user.uid, updated.id, updated);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleCreateNewDraft = async () => {
    if (!user) return;
    
    setSaving(true);
    try {
      const newDraft = await createEssay(user.uid, {
        title: 'Untitled Narrative',
        targetWordCount: 650,
        track: 'heros_journey',
        herosJourneyAnswers: {},
        differentTruthfulAnswers: {},
        intellectualJourneyAnswers: {},
      });
      setDrafts([newDraft, ...drafts]);
      setActiveDraftId(newDraft.id);
      navigate(`/essay/${newDraft.id}/worksheet`);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDuplicateDraft = async (draftId: string) => {
    if (!user) return;
    const draftToDuplicate = drafts.find(d => d.id === draftId);
    if (!draftToDuplicate) return;

    setSaving(true);
    try {
      const newDraft = await createEssay(user.uid, {
        title: `${draftToDuplicate.title} (Copy)`,
        targetWordCount: draftToDuplicate.targetWordCount,
        track: draftToDuplicate.track,
        herosJourneyAnswers: { ...draftToDuplicate.herosJourneyAnswers },
        differentTruthfulAnswers: { ...draftToDuplicate.differentTruthfulAnswers },
        intellectualJourneyAnswers: { ...draftToDuplicate.intellectualJourneyAnswers },
        blocks: draftToDuplicate.blocks ? [...draftToDuplicate.blocks] : undefined,
        montageElements: draftToDuplicate.montageElements ? [...draftToDuplicate.montageElements] : undefined,
        scratchpad: draftToDuplicate.scratchpad,
      });
      setDrafts([newDraft, ...drafts]);
      setActiveDraftId(newDraft.id);
      navigate(`/essay/${newDraft.id}/${activeTab}`);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteDraft = async (draftId: string) => {
    if (!user) return;
    document.getElementById('delete_draft_btn')?.blur();
    
    // Add destructive-action modal protection as specified in the document
    const draftToDelete = drafts.find(d => d.id === draftId);
    if (!draftToDelete) return;

    if (drafts.length <= 1) {
      // Just use custom alert state instead of window.alert if needed, but since it's an edge case, we'll just return for now or let them know differently.
      // Wait, let's just ignore if they try to delete the last one.
      return;
    }

    setDraftToDeleteId(draftId);
    setDeleteInputText('');
    setDeleteModalOpen(true);
  };

  const executeDeleteDraft = async () => {
    if (!user || !draftToDeleteId) return;
    
    const draftToDelete = drafts.find(d => d.id === draftToDeleteId);
    if (!draftToDelete || deleteInputText !== draftToDelete.title) {
        return;
    }

    setDeleteModalOpen(false);
    setSaving(true);
    try {
      await deleteEssay(user.uid, draftToDeleteId);
      const updated = drafts.filter(d => d.id !== draftToDeleteId);
      const nextActiveId = updated[0].id;
      setDrafts(updated);
      setActiveDraftId(nextActiveId);
      navigate(`/essay/${nextActiveId}/${activeTab}`);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
      setDraftToDeleteId(null);
    }
  };

  const handleWipeData = async () => {
    if (!user) return;
    setResetLoadingMsg("Purging draft databases and recalibrating the screenplay studio...");
    setResetModalOpen(false);
    
    try {
      // Delete current essays in parallel
      await Promise.all(drafts.map(d => deleteEssay(user.uid, d.id)));
      
      // Clear local onboarding keys
      localStorage.removeItem('college_essay_architect_onboarding_completed_v2');
      
      // Provision a fresh blank canvas draft in the database
      const freshDraft = await createEssay(user.uid, {
        title: 'My Personal Statement',
        targetWordCount: 650,
        track: 'heros_journey',
        herosJourneyAnswers: {},
        differentTruthfulAnswers: {},
        intellectualJourneyAnswers: {},
      });
      
      // Update local state, but don't jump to onboarding until timeout finishes
      setDrafts([freshDraft]);
      setActiveDraftId(freshDraft.id);
      setActiveTab('worksheet');
      navigate(`/essay/${freshDraft.id}/worksheet`, { replace: true });
      
    } catch (err) {
      console.error(err);
      alert("Failed to safely reset the sandbox workspace.");
    } finally {
      setTimeout(() => {
        setResetLoadingMsg(null);
        setResetInputText('');
        setShowOnboarding(true); // Jump to splash screen AFTER feedback completes
      }, 1500);
    }
  };

  const switchTab = (newTab: string) => {
    navigate(`/essay/${activeDraftId}/${newTab}`);
  };

  const switchDraft = (draftId: string) => {
    navigate(`/essay/${draftId}/${activeTab}`);
  };


  const activeDraft = drafts.find(d => d.id === activeDraftId) || drafts[0];

  if (loading || !activeDraft) {
    const isOnboardingNotCompleted = !localStorage.getItem('college_essay_architect_onboarding_completed_v2');
    if (isOnboardingNotCompleted) {
      return <div className="min-h-screen bg-white" />;
    }
    return (
      <div className="min-h-screen bg-[#070a13] flex items-center justify-center font-sans">
        <div className="text-teal-400 animate-pulse font-sans tracking-wider text-sm">LOADING WORKSPACE...</div>
      </div>
    );
  }

  return (
    <>
      {showOnboarding ? (
        <div className={`min-h-screen bg-[#070B14] ${isDark ? '' : 'light'} font-sans`}>
          <Handbook 
            forceOnboarding={true}
            onExit={(options) => {
              setShowOnboarding(false);
              localStorage.setItem('college_essay_architect_onboarding_completed_v2', 'true');
              if (options?.openGuidebook) {
                switchTab('guidebook');
              } else {
                switchTab('worksheet');
              }
            }}
            onSelectTrack={(track) => {
              handleUpdateDraft({ ...activeDraft, track });
            }}
            onOpenGuidebook={() => switchTab('guidebook')}
          />
        </div>
      ) : (
        <div className={`min-h-screen bg-[#070B14] ${isDark ? '' : 'light'} text-slate-150 font-sans selection:bg-cyan-500/20 selection:text-cyan-200 flex flex-col`}>
      <header className="bg-slate-900/90 backdrop-blur border-b border-slate-800 sticky top-0 z-50 py-3 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl shadow-slate-950/20" id="app_header">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-lg font-sans font-bold text-white tracking-tight leading-none flex items-center gap-2">
              Hero's Essay Blueprint
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end shrink-0">
          <div className="flex items-center gap-2 text-sm font-sans text-slate-400 mr-2">
            {saving ? <Cloud className="w-4 h-4 text-teal-400 animate-pulse" /> : <Cloud className="w-4 h-4 text-slate-500" />}
            <span className="hidden lg:inline">{saving ? 'Syncing...' : 'Saved'}</span>
          </div>
          
          <div className="flex items-center gap-2" id="drafts_controller">
            <select
              value={activeDraftId}
              onChange={(e) => switchDraft(e.target.value)}
              className="bg-slate-950 border border-slate-800 p-2 text-sm font-sans text-slate-200 rounded-lg focus:ring-1 focus:ring-teal-505 focus:border-teal-500 focus:outline-none w-[160px] sm:w-[220px] hover:border-slate-700 transition-colors"
            >
              {drafts.map((d) => (
                <option key={d.id} value={d.id} className="bg-slate-950 text-slate-200">
                  {d.title} ({d.track === 'heros_journey' ? "Hero's Journey" : d.track === 'different_but_truthful' ? "Quiet Leadership" : "Intellectual"})
                </option>
              ))}
            </select>

            <button
              id="new_draft_btn"
              onClick={handleCreateNewDraft}
              className="p-2.5 bg-gradient-to-r from-teal-500 via-cyan-500 to-sky-600 hover:opacity-90 text-white rounded-lg transition-all cursor-pointer text-sm flex items-center gap-1 shrink-0 font-bold shadow-md shadow-cyan-505/10"
              title="Create New Draft Block"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">New</span>
            </button>

            <button
              id="duplicate_draft_btn"
              onClick={() => handleDuplicateDraft(activeDraftId)}
              className="p-2.5 bg-slate-900 hover:bg-slate-800 text-teal-400 border border-slate-800 hover:border-teal-900/60 rounded-lg transition-colors cursor-pointer"
              title="Duplicate Current Workbook"
            >
              <Copy className="w-4 h-4" />
            </button>

            <button
              id="delete_draft_btn"
              onClick={() => handleDeleteDraft(activeDraftId)}
              disabled={drafts.length <= 1}
              className="p-2.5 bg-slate-900 hover:bg-rose-950/40 text-rose-400 disabled:text-slate-600 disabled:hover:bg-slate-900 disabled:cursor-not-allowed border border-slate-800 hover:border-rose-900/60 disabled:hover:border-slate-800 rounded-lg transition-colors cursor-pointer"
              title={drafts.length <= 1 ? "Cannot delete the last remaining workbook" : "Delete Current Workbook"}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="w-px h-6 bg-slate-800 hidden md:block" />

          <button
            onClick={() => setIsScratchpadOpen(!isScratchpadOpen)}
            className={`p-2.5 ${isScratchpadOpen ? 'bg-slate-800 text-teal-400' : 'bg-slate-950 text-slate-300'} hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg transition-all cursor-pointer flex items-center gap-2 shrink-0 shadow-sm`}
            title="Toggle Scratchpad"
          >
            <PenTool className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsGuidebookOpen(!isGuidebookOpen)}
            className={`p-2.5 ${isGuidebookOpen ? 'bg-slate-800 text-cyan-400 border-cyan-900/40' : 'bg-slate-950 text-slate-300 border-slate-800'} hover:bg-slate-900 border hover:border-slate-700 rounded-lg transition-all cursor-pointer flex items-center gap-2 shrink-0 shadow-sm`}
            title="Toggle Quick Guidebook Reference"
          >
            <Compass className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline text-sm font-sans font-bold">Quick Ref</span>
          </button>

          <button
            onClick={toggleTheme}
            className="p-2.5 bg-slate-950 hover:bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700 rounded-lg transition-all cursor-pointer flex items-center gap-2 shrink-0 shadow-sm"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-500" />}
          </button>
          
          <button
            onClick={() => setResetModalOpen(true)}
            className="p-2.5 bg-slate-950 hover:bg-rose-950/40 text-rose-400 border border-slate-800 hover:border-rose-900/60 rounded-lg transition-colors cursor-pointer flex items-center gap-2 shrink-0 shadow-sm"
            title="Wipe My Data / Reset Sandbox"
          >
            <RefreshCcw className="w-4 h-4" />
          </button>

          {user ? (
            <button
              onClick={logout}
              className="p-2.5 bg-slate-950 hover:bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700 rounded-lg transition-all cursor-pointer"
              title="Log Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => {
                navigate('/login');
              }}
              className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-600 hover:opacity-95 text-white border border-slate-800 rounded-lg transition-all cursor-pointer font-bold text-sm"
              title="Sign In"
            >
              Sign In
            </button>
          )}
        </div>
      </header>

      <main className="flex-1 w-[95%] md:w-[90%] lg:w-[85%] xl:w-[80%] max-w-none mx-auto p-4 md:p-8 space-y-6">
        <nav className="flex flex-col sm:flex-row items-stretch sm:items-center gap-1 bg-slate-900 border border-slate-800/80 p-1 text-slate-400 rounded-xl shadow-inner mx-auto max-w-4xl" id="master_navbar">
          <button
            onClick={() => switchTab('worksheet')}
            className={`flex-1 flex gap-2 items-center justify-center py-2.5 text-sm font-sans font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'worksheet'
                ? 'bg-slate-800 text-white shadow-md border border-slate-700/60 bg-gradient-to-r from-slate-800 to-slate-850'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileEdit className="w-4 h-4 text-teal-400" />
            Workbook
          </button>

          <button
            onClick={() => switchTab('preview')}
            className={`flex-1 flex gap-2 items-center justify-center py-2.5 text-sm font-sans font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'preview'
                ? 'bg-slate-800 text-white shadow-md border border-slate-700/60 bg-gradient-to-r from-slate-800 to-slate-850'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LayoutList className="w-4 h-4 text-sky-400" />
            Assembly Board
          </button>

          <button
            onClick={() => switchTab('guidebook')}
            className={`flex-1 flex gap-2 items-center justify-center py-2.5 text-sm font-sans font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'guidebook'
                ? 'bg-slate-800 text-white shadow-md border border-slate-700/60 bg-gradient-to-r from-slate-800 to-slate-850'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Compass className="w-4 h-4 text-cyan-400" />
            Guidebook
          </button>
        </nav>

        <div id="dynamic_viewport" className="min-h-[480px]">
          {activeTab === 'worksheet' && (
            <Workbook
              activeDraft={activeDraft}
              onUpdateDraft={handleUpdateDraft}
              onDeleteDraft={handleDeleteDraft}
              onNavigateToAssembly={() => switchTab('preview')}
            />
          )}

          {activeTab === 'preview' && (
            <AssemblyBoard
              draft={activeDraft}
              onUpdateDraft={handleUpdateDraft}
            />
          )}

          {activeTab === 'guidebook' && (
            <InteractiveGuidebook />
          )}
        </div>
      </main>

      <footer className="mt-auto py-8 bg-slate-900/60 border-t border-slate-800/80 text-center text-sm text-slate-500 font-sans" id="app_footer">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-semibold text-slate-400">
            Hero's Essay Blueprint — Crafted to guide reflective application drafting.
          </p>
          <p className="text-[15px] sm:text-base text-slate-500">
            Based on the combined screenwriting frameworks of Joseph Campbell's Hero's Journey and Pixar Animation Studios.
          </p>
        </div>
      </footer>

      <Scratchpad 
        draft={activeDraft} 
        onUpdateDraft={handleUpdateDraft} 
        isOpen={isScratchpadOpen} 
        onClose={() => setIsScratchpadOpen(false)} 
      />

      {resetModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-[9999] animate-fade-in" id="reset_warning_backdrop">
          <div className="bg-[#0b101d] border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-5 shadow-2xl relative overflow-hidden" id="reset_modal">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 to-amber-500" />
            
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 bg-rose-950/50 border border-slate-850 text-rose-500 rounded-xl flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-rose-400" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-base text-white">Reset Admissions Sandbox?</h3>
                <p className="text-sm text-slate-400 font-sans leading-relaxed">
                  This is a destructive, irreversible operation. All drafts will be permanently deleted from the cloud database and your studio session will start fresh.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/50 border border-slate-850 p-4 rounded-xl space-y-2 font-sans text-sm">
              <p className="text-slate-400">To authorize this catastrophic reset, enter the word <strong className="text-rose-400 font-sans tracking-wider font-bold">"RESET"</strong> below:</p>
              <input
                id="reset_verification_word"
                type="text"
                placeholder="e.g. RESET"
                value={resetInputText}
                onChange={(e) => setResetInputText(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm font-sans text-slate-100 placeholder:text-slate-700 uppercase font-bold tracking-widest focus:outline-none focus:border-rose-900 text-center"
              />
            </div>

            <div className="flex items-center gap-3 pt-1">
              <button
                id="cancel_reset_sandbox"
                onClick={() => {
                  setResetModalOpen(false);
                  setResetInputText('');
                }}
                className="flex-1 py-2 text-sm font-sans font-bold text-slate-400 hover:text-slate-200 bg-slate-950 hover:bg-slate-900 border border-slate-850 hover:border-slate-800 rounded-xl transition-all cursor-pointer text-center"
              >
                Cancel
              </button>
              <button
                id="execute_reset_sandbox"
                disabled={resetInputText.trim().toUpperCase() !== 'RESET'}
                onClick={handleWipeData}
                className="flex-1 py-2 text-sm font-sans font-bold text-white bg-gradient-to-r from-rose-600 to-rose-700 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 hover:from-rose-505 hover:to-rose-605 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl transition-all cursor-pointer text-center shadow shadow-rose-950/20"
              >
                Reset Workspace
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteModalOpen && draftToDeleteId && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-[9999] animate-fade-in" id="delete_warning_backdrop">
          <div className="bg-[#0b101d] border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-5 shadow-2xl relative overflow-hidden" id="delete_modal">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 to-amber-500" />
            
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 bg-rose-950/50 border border-slate-850 text-rose-500 rounded-xl flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-rose-400" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-base text-white">Delete Draft?</h3>
                <p className="text-sm text-slate-400 font-sans leading-relaxed">
                  This action cannot be undone. To prevent catastrophic accidental data loss, please type the exact title of this draft to authorize deletion.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/50 border border-slate-850 p-4 rounded-xl space-y-2 font-sans text-sm">
              <p className="text-slate-400">Draft Title: <strong className="text-white font-bold">{drafts.find(d => d.id === draftToDeleteId)?.title}</strong></p>
              <input
                id="delete_verification_word"
                type="text"
                placeholder="Exact title"
                value={deleteInputText}
                onChange={(e) => setDeleteInputText(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm font-sans text-slate-100 placeholder:text-slate-700 focus:outline-none focus:border-rose-900"
              />
            </div>

            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={() => {
                  setDeleteModalOpen(false);
                  setDeleteInputText('');
                  setDraftToDeleteId(null);
                }}
                className="flex-1 py-2 text-sm font-sans font-bold text-slate-400 hover:text-slate-200 bg-slate-950 hover:bg-slate-900 border border-slate-850 hover:border-slate-800 rounded-xl transition-all cursor-pointer text-center"
              >
                Cancel
              </button>
              <button
                disabled={deleteInputText !== drafts.find(d => d.id === draftToDeleteId)?.title}
                onClick={executeDeleteDraft}
                className="flex-1 py-2 text-sm font-sans font-bold text-white bg-gradient-to-r from-rose-600 to-rose-700 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 hover:from-rose-505 hover:to-rose-605 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl transition-all cursor-pointer text-center shadow shadow-rose-950/20"
              >
                Delete Draft
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Action Loader Overlay */}
      {resetLoadingMsg && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-4 z-[10000] animate-fade-in" id="reset_loading_backdrop">
          <div className="text-center space-y-4 max-w-xs">
            <div className="relative w-12 h-11 h-12 mx-auto">
              <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-cyan-400 border-cyan-500 animate-spin" />
              <div className="absolute inset-2 rounded-full border-b-2 border-l-2 border-teal-500 animate-spin animate-reverse" />
            </div>
            <p className="text-sm font-serif italic text-cyan-400 tracking-wide font-normal animate-pulse leading-normal">
              {resetLoadingMsg}
            </p>
            <p className="text-sm font-sans text-slate-600 uppercase tracking-widest leading-none">
              Studio Sandbox Calibration
            </p>
          </div>
        </div>
      )}
    </div>
    )}
      {/* Slide-out Guidebook Drawer */}
      {isGuidebookOpen && (
        <div className="fixed inset-0 z-[99999] flex justify-end" id="guidebook_drawer_container">
          <div 
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsGuidebookOpen(false)}
          />
          <div className="relative w-[95%] md:w-[70%] lg:w-[65%] xl:w-[60%] max-w-6xl bg-[#0b101d] border-l border-slate-800 h-full flex flex-col shadow-2xl animate-fade-in-right">
            <div className="flex items-center justify-between p-4 border-b border-slate-800/80 bg-slate-950">
              <div>
                <h2 className="text-lg font-serif font-medium text-white flex items-center gap-2">
                  <Compass className="w-4 h-4 text-cyan-400" /> Guidebook
                </h2>
                <p className="text-sm text-slate-400 font-sans mt-0.5">
                  Your references for narrative structures and writing techniques
                </p>
              </div>
              <button 
                onClick={() => setIsGuidebookOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 md:p-6 pb-24">
              <Handbook forceOnboarding={false} />
            </div>
          </div>
        </div>
      )}
  </>
  );
}
