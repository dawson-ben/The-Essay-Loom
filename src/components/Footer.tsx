import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full py-8 text-center border-t border-slate-800 bg-slate-900 mt-auto">
      <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between text-sm text-slate-500">
        <p>&copy; 2026 The Essay Loom. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 sm:mt-0">
          <Link to="/about" className="hover:text-slate-300 transition-colors">About: Zero-AI</Link>
          <Link to="/privacy-policy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
          <Link to="/terms-of-service" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
