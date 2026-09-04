import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { Shield, Sparkles, AlertTriangle } from 'lucide-react';

import { Link } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth();
  const [dob, setDob] = useState('');
  const [error, setError] = useState('');

  const calculateAge = (dobString: string) => {
    const birthday = new Date(dobString);
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const handleLoginClick = async () => {
    if (!dob) {
      setError('Please enter your date of birth to continue.');
      return;
    }
    const age = calculateAge(dob);
    if (age < 13) {
      setError('You must be 13 years or older to use this service.');
      return;
    }
    setError('');
    await login();
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4">
          <Link to="/about" className="flex items-center gap-2 bg-teal-950/40 hover:bg-teal-900/60 text-teal-300 border border-teal-800/60 hover:border-teal-700/80 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide transition-colors">
            <Shield className="w-3.5 h-3.5" />
            100% Human-Authored
          </Link>
        </div>
        
        <h2 className="text-3xl font-serif text-white mb-2 mt-8">The Essay Loom</h2>
        <p className="text-slate-400 mb-8 font-sans text-sm">
          A rigorous framework for drafting compelling, narrative-driven personal statements, free from generative AI.
        </p>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">
              Date of Birth
            </label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
            />
            <p className="text-xs text-slate-500">We require your date of birth for age verification (COPPA compliance).</p>
          </div>

          {error && (
            <div className="flex gap-2 items-center text-rose-400 bg-rose-950/40 border border-rose-900/60 p-3 rounded-xl text-sm">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            onClick={handleLoginClick}
            className="w-full py-3.5 bg-gradient-to-r from-teal-500 to-cyan-600 hover:opacity-95 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg"
          >
            <Sparkles className="w-4 h-4" />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}
