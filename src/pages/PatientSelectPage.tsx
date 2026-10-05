import { useState } from 'react';

interface PatientSelectPageProps {
  onSelect: (id: string) => void;
}

const patients = [
  { id: 'P1024', name: 'John Doe', age: 52, type: 'T2DM', risk: 'high', hba1c: 7.8, lastUpdate: '2 min ago' },
  { id: 'P1087', name: 'Sarah Miller', age: 44, type: 'T1DM', risk: 'elevated', hba1c: 8.1, lastUpdate: '5 min ago' },
  { id: 'P1103', name: 'Robert Kim', age: 61, type: 'T2DM', risk: 'stable', hba1c: 6.9, lastUpdate: '1 min ago' },
  { id: 'P1056', name: 'Maria Garcia', age: 38, type: 'T2DM', risk: 'monitoring', hba1c: 7.2, lastUpdate: '8 min ago' },
];

const riskColors: Record<string, { bg: string; text: string; dot: string; label: string }> = {
  stable: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500', label: 'Stable' },
  monitoring: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500', label: 'Monitoring' },
  elevated: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500', label: 'Elevated' },
  high: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500', label: 'High Risk' },
};

export function PatientSelectPage({ onSelect }: PatientSelectPageProps) {
  const [search, setSearch] = useState('');

  const filtered = patients.filter(
    (p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-200 h-16 flex items-center px-8">
        <div className="flex items-center gap-3">
          <svg width="28" height="28" viewBox="0 0 30 30" fill="none">
            <circle cx="11" cy="15" r="7.5" stroke="#6366f1" strokeWidth="1.5" fill="none" opacity="0.7" />
            <circle cx="19" cy="15" r="7.5" stroke="#3b82f6" strokeWidth="1.5" fill="none" opacity="0.7" />
            <path d="M 4 15 L 8 15 L 10 9 L 12.5 20 L 15 12 L 17 17 L 19 15 L 26 15" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <circle cx="15" cy="15" r="2.5" fill="#818cf8" />
          </svg>
          <span className="text-lg font-bold text-gray-900">GlucoTwin</span>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Select Patient</h1>
          <p className="text-sm text-gray-500">Choose a patient to view their Digital Twin dashboard</p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="7" cy="7" r="5" />
              <path d="M11 11L14 14" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search by name or patient ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 text-sm bg-white"
            />
          </div>
        </div>

        {/* Patient Cards */}
        <div className="space-y-3">
          {filtered.map((patient) => {
            const risk = riskColors[patient.risk];
            return (
              <button
                key={patient.id}
                onClick={() => onSelect(patient.id)}
                className="w-full bg-white border border-gray-200 rounded-xl p-5 hover:border-indigo-300 hover:shadow-md transition-all duration-200 text-left group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-gray-900 flex items-center justify-center shrink-0">
                      <span className="text-sm font-bold text-white">{patient.id.slice(-2)}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-semibold text-gray-900">{patient.name}</span>
                        <span className="text-xs text-gray-400">{patient.id}</span>
                      </div>
                      <div className="flex items-center gap-3 mt-0.5 text-sm text-gray-500">
                        <span>Age {patient.age}</span>
                        <span>·</span>
                        <span>{patient.type}</span>
                        <span>·</span>
                        <span>HbA1c {patient.hba1c}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${risk.bg}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${risk.dot}`} />
                      <span className={`text-[11px] font-semibold ${risk.text}`}>{risk.label}</span>
                    </div>
                    <span className="text-xs text-gray-400">{patient.lastUpdate}</span>
                    <svg className="w-5 h-5 text-gray-300 group-hover:text-indigo-500 transition-colors" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M7 4L13 10L7 16" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Quick stats */}
        <div className="mt-8 grid grid-cols-4 gap-4">
          {[
            { label: 'Active Patients', value: '4' },
            { label: 'High Risk', value: '1' },
            { label: 'Active Streams', value: '4' },
            { label: 'Model Version', value: 'v2.3.1' },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-gray-200 rounded-lg p-4 text-center">
              <div className="text-xl font-bold text-gray-900">{s.value}</div>
              <div className="text-[11px] text-gray-400 uppercase tracking-wider mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}