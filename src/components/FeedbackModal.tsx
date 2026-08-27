import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import { db, auth, handleFirestoreError, OperationType } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  contextData: string;
}

export default function FeedbackModal({ isOpen, onClose, contextData }: FeedbackModalProps) {
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!text.trim()) return;
    setSubmitting(true);
    
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("Must be logged in to send feedback");
      }
      
      await addDoc(collection(db, 'feedbacks'), {
        userId: user.uid,
        text: text.trim(),
        context: contextData,
        createdAt: serverTimestamp()
      });
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setText('');
        setSuccess(false);
      }, 2000);
    } catch (err) {
      console.error(err);
      try {
        handleFirestoreError(err, OperationType.CREATE, 'feedbacks');
      } catch (e) {
        alert("Failed to submit feedback. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-md shadow-xl animate-fade-in relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-300"
        >
          <X className="w-5 h-5" />
        </button>
        <h3 className="text-lg font-sans font-bold text-white mb-2">Send Feedback</h3>
        {success ? (
          <div className="bg-teal-950/40 border border-teal-900/50 p-4 rounded-xl text-teal-300 font-sans text-sm">
            Thank you! Your feedback has been received.
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm font-sans text-slate-400">
              Found a bug or have a suggestion? Let the developer know! 
              <br/>
              <span className="text-[11px] text-slate-500">Current view: {contextData}</span>
            </p>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full bg-slate-950 border border-slate-800 p-3 text-sm font-sans text-slate-200 rounded-xl focus:ring-1 focus:ring-teal-500 focus:outline-none min-h-[120px]"
            />
            <button
              onClick={handleSubmit}
              disabled={submitting || !text.trim()}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 font-bold py-2.5 rounded-xl transition-opacity hover:opacity-90 disabled:opacity-50 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              {submitting ? 'Sending...' : 'Send Feedback'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
