import { NavLink } from 'react-router-dom';
import { clsx } from 'clsx';

interface SidebarProps { onClose?: () => void; onLogout?: () => void; }

const nav = [
  { path: '/dashboard', label: 'Dashboard', icon: GridIcon },
  { path: '/digital-twin', label: 'Digital Twin', icon: TwinIcon },
  { path: '/live', label: 'Live Monitor', icon: LiveIcon },
  { path: '/prediction', label: 'Predictions', icon: TrendIcon },
  { path: '/what-if', label: 'What-If', icon: WhatIfIcon },
  { path: '/history', label: 'History', icon: HistoryIcon },
  { path: '/model', label: 'Model', icon: ModelIcon },
];

export function Sidebar({ onClose, onLogout }: SidebarProps) {
  return (
    <aside className="w-56 flex flex-col h-full bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="h-16 px-5 flex items-center gap-2.5 border-b border-gray-100">
        <svg width="26" height="26" viewBox="0 0 30 30" fill="none">
          <circle cx="11" cy="15" r="7.5" stroke="#6366f1" strokeWidth="1.5" fill="none" opacity="0.7" />
          <circle cx="19" cy="15" r="7.5" stroke="#3b82f6" strokeWidth="1.5" fill="none" opacity="0.7" />
          <path d="M 4 15 L 8 15 L 10 9 L 12.5 20 L 15 12 L 17 17 L 19 15 L 26 15" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <circle cx="15" cy="15" r="2.5" fill="#818cf8" />
        </svg>
        <span className="text-base font-bold text-gray-900 tracking-tight">GlucoTwin</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 px-3 space-y-0.5 overflow-y-auto">
        {nav.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink key={item.path} to={item.path} onClick={onClose}
              className={({ isActive }) => clsx(
                'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all',
                isActive ? 'bg-gray-900 text-white font-medium' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              )}>
              <span className="w-5 h-5 flex items-center justify-center"><Icon /></span>
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-3 border-t border-gray-100 space-y-1">
        <button onClick={onLogout} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 w-full text-left transition-all">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M6 16H3.5A1.5 1.5 0 012 14.5v-11A1.5 1.5 0 013.5 2H6" />
            <polyline points="12 13 16 9 12 5" />
            <line x1="16" y1="9" x2="7" y2="9" />
          </svg>
          <span>Sign out</span>
        </button>
        <div className="px-3 pt-2">
          <span className="text-[10px] text-gray-400 uppercase tracking-wider">Research Prototype v2.3.1</span>
        </div>
      </div>
    </aside>
  );
}

function GridIcon() {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="5.5" height="5.5" rx="1" /><rect x="10.5" y="2" width="5.5" height="5.5" rx="1" /><rect x="2" y="10.5" width="5.5" height="5.5" rx="1" /><rect x="10.5" y="10.5" width="5.5" height="5.5" rx="1" /></svg>;
}
function TwinIcon() {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="7" cy="9" r="5" /><circle cx="11" cy="9" r="5" /><circle cx="9" cy="9" r="1.5" fill="currentColor" /></svg>;
}
function LiveIcon() {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="9" cy="9" r="3" /><circle cx="9" cy="9" r="6" strokeDasharray="3 3" /></svg>;
}
function TrendIcon() {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="2,13 6,8 10,10 16,3" /><polyline points="12,3 16,3 16,7" /></svg>;
}
function WhatIfIcon() {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M9 2C5.13 2 2 5.13 2 9s3.13 7 7 7 7-3.13 7-7" /><path d="M16 2v6h-6" /></svg>;
}
function HistoryIcon() {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="9" cy="9" r="7" /><polyline points="9 5 9 9 12 11" /></svg>;
}
function ModelIcon() {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="14" height="14" rx="2" /><line x1="2" y1="7" x2="16" y2="7" /><line x1="7" y1="7" x2="7" y2="16" /></svg>;
}