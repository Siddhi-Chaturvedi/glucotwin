import { useState, useEffect } from 'react';

interface TopBarProps {
  isDemoMode: boolean;
  onToggleDemo: () => void;
  onMenuClick?: () => void;
}

export function TopBar({ isDemoMode, onToggleDemo, onMenuClick }: TopBarProps) {
  const [sec, setSec] = useState(0);
  useEffect(() => { const iv = setInterval(() => setSec(s => s + 1), 1000); return () => clearInterval(iv); }, []);

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="lg:hidden p-2 -ml-1 rounded-lg hover:bg-gray-100 text-gray-500" aria-label="Menu">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <line x1="3" y1="5" x2="17" y2="5" /><line x1="3" y1="10" x2="17" y2="10" /><line x1="3" y1="15" x2="17" y2="15" />
          </svg>
        </button>
        <div className="text-sm text-gray-500">
          <span className="text-gray-900 font-semibold">Patient P1024</span>
          <span className="mx-1.5 text-gray-300">·</span>
          <span>John Doe</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-emerald-500 live-dot" />
          <span className="text-xs text-emerald-700 font-semibold">Live</span>
          <span className="text-xs text-gray-400 ml-2">{sec}s ago</span>
        </div>
        <button onClick={onToggleDemo}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all border ${isDemoMode ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}>
          {isDemoMode ? '● Demo On' : 'Demo Mode'}
        </button>
      </div>
    </header>
  );
}