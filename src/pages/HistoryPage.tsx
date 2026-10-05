import { historyEvents } from '../data/mockData';
import { clsx } from 'clsx';

const sev = {
  info: { dot: 'bg-blue-500', bg: 'bg-blue-50/50', border: 'border-blue-200' },
  warning: { dot: 'bg-amber-500', bg: 'bg-amber-50/50', border: 'border-amber-200' },
  alert: { dot: 'bg-red-500', bg: 'bg-red-50/50', border: 'border-red-200' },
};
const icons: Record<string, string> = { glucose: '🩸', activity: '🏃', risk: '⚠', sleep: '🌙', meal: '🍽', prediction: '🔮' };

export function HistoryPage() {
  const grouped = historyEvents.reduce<Record<string, typeof historyEvents>>((a, e) => { (a[e.date] ??= []).push(e); return a; }, {});
  return (
    <div className="space-y-6 animate-fade-up max-w-[800px]">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Patient History</h1>
        <p className="text-sm text-gray-500 mt-0.5">Timeline of significant events and state changes</p>
      </div>
      {Object.entries(grouped).map(([date, events]) => (
        <div key={date}>
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-[0.15em] mb-4">{date}</h2>
          <div className="relative pl-8">
            <div className="absolute left-[11px] top-0 bottom-0 w-px bg-gray-200" />
            {events.map((e, i) => {
              const c = sev[e.severity];
              return (
                <div key={i} className="relative mb-3 last:mb-0">
                  <div className={clsx('absolute -left-[21px] top-2 w-2.5 h-2.5 rounded-full border-2 border-white', c.dot)} />
                  <div className={clsx('rounded-xl border p-4 hover:shadow-sm transition-shadow', c.bg, c.border)}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <span className="text-base mt-0.5">{icons[e.type] || '•'}</span>
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900">{e.title}</h3>
                          <p className="text-xs text-gray-500 mt-0.5">{e.description}</p>
                        </div>
                      </div>
                      <span className="text-[11px] text-gray-400 tabular-nums font-mono shrink-0">{e.timestamp}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}