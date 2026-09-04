import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { AlertTriangle, Trash2, X, RefreshCw } from 'lucide-react';
import { fetchEssays, deleteEssay } from '../db';
import { deleteUser, reauthenticateWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [deleteInputText, setDeleteInputText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDeleteAccount = async () => {
    if (!user) return;
    setIsDeleting(true);
    setErrorMsg(null);

    try {
      // 1. Fetch and delete all user data (WorkbookResponse, EssayBlock, drafts)
      const drafts = await fetchEssays(user.uid);
      await Promise.all(drafts.map(d => deleteEssay(user.uid, d.id)));

      // 2. Delete the user authentication record
      try {
        await deleteUser(user);
        navigate('/');
      } catch (authError: any) {
        if (authError.code === 'auth/requires-recent-login') {
          // Re-authenticate
          const provider = new GoogleAuthProvider();
          await reauthenticateWithPopup(user, provider);
          // Try deleting again
          await deleteUser(user);
          navigate('/');
        } else {
          throw authError;
        }
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'An error occurred while deleting your account.');
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-[9999] animate-fade-in" id="settings_modal_backdrop">
      <div className="bg-[#0b101d] border border-slate-800 rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden" id="settings_modal">
        <div className="flex items-center justify-between p-5 border-b border-slate-800/80">
          <h2 className="text-xl font-serif font-bold text-white">Account Settings</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-sans font-bold text-slate-300 uppercase tracking-wider">Danger Zone</h3>
            <div className="border border-rose-900/50 bg-rose-950/10 rounded-xl p-4 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-rose-950/50 border border-rose-900/50 text-rose-500 rounded-xl flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-sans font-bold text-base text-rose-400">Delete Account & Data</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    This will permanently delete your account, authentication record, and all associated drafts, workbooks, and blocks from our servers. This action cannot be undone.
                  </p>
                </div>
              </div>

              <div className="space-y-3 bg-slate-950/50 p-4 rounded-lg border border-slate-800/50">
                <p className="text-xs font-sans text-slate-300">
                  To confirm deletion, please type <strong className="text-rose-400 select-none">DELETE</strong> below:
                </p>
                <input
                  type="text"
                  placeholder="DELETE"
                  value={deleteInputText}
                  onChange={(e) => setDeleteInputText(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 uppercase focus:outline-none focus:border-rose-800 text-center tracking-widest font-bold"
                  disabled={isDeleting}
                />
              </div>

              {errorMsg && (
                <div className="text-xs text-rose-400 bg-rose-950/40 p-2 rounded border border-rose-900/50">
                  {errorMsg}
                </div>
              )}

              <button
                disabled={deleteInputText.trim().toUpperCase() !== 'DELETE' || isDeleting}
                onClick={handleDeleteAccount}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-sans font-bold text-white bg-rose-600 hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors shadow-lg shadow-rose-900/20"
              >
                {isDeleting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Deleting Account...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    Delete Account and All Data
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
