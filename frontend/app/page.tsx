"use client";

import React, { useEffect, useState } from 'react';

export default function Placeholder() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-violet-600/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-500/30 rounded-full blur-[120px] animate-pulse delay-1000" />
        <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] bg-fuchsia-500/20 rounded-full blur-[100px] animate-bounce duration-[10s]" />
      </div>

      <div className="z-10 flex flex-col items-center max-w-md w-full px-6">
        {/* Logo / Icon */}
        <div className="w-24 h-24 mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-violet-600 to-cyan-400 rounded-2xl rotate-6 opacity-75 blur-lg animate-pulse"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-violet-600 to-cyan-400 rounded-2xl flex items-center justify-center shadow-2xl border border-white/20 backdrop-blur-xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-violet-200 mb-4 text-center tracking-tight">
          FocusFlow
        </h1>
        
        <p className="text-slate-400 text-lg mb-10 text-center font-light">
          Crafting your ultimate productivity workspace...
        </p>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-slate-800/50 rounded-full overflow-hidden backdrop-blur-sm border border-white/5">
          <div 
            className="h-full bg-gradient-to-r from-violet-600 via-cyan-500 to-fuchsia-500 transition-all duration-100 ease-out shadow-[0_0_15px_rgba(139,92,246,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="mt-4 flex justify-between w-full text-xs text-slate-500 font-mono">
          <span>INITIALIZING CORE</span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
}

