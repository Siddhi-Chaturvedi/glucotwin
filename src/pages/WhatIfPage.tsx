import { useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, ComposedChart, ReferenceLine } from 'recharts';
import { whatIfScenarios } from '../data/mockData';

export function WhatIfPage() {
  const [sel, setSel] = useState('none');
  const base = whatIfScenarios[0];
  const cur = whatIfScenarios.find(s => s.id === sel) || base;
  const improved = cur.riskProbability < base.riskProbability;

  return (
    <div className="space-y-6 animate-fade-up max-w-[1440px]">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">What-If Simulation</h1>
        <p className="text-sm text-gray-500 mt-0.5">Explore how interventions may affect the predicted glucose trajectory</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-3">Select Scenario</div>
        <div className="flex flex-wrap gap-2">
          {whatIfScenarios.map(s => (
            <button key={s.id} onClick={() => setSel(s.id)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all border ${s.id === sel ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}`}>
              <span className="mr-1.5">{s.icon}</span>{s.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-4">Comparison</div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <div className="text-[10px] text-gray-400 uppercase mb-1">Current</div>
                <div className="text-2xl font-bold text-gray-900 tabular-nums">{base.riskProbability}%</div>
                <div className="text-[10px] text-gray-500">{base.predictedPeak} mg/dL peak</div>
              </div>
              <div className="bg-emerald-50 rounded-lg p-3 text-center">
                <div className="text-[10px] text-gray-400 uppercase mb-1">Simulated</div>
                <div className="text-2xl font-bold text-emerald-700 tabular-nums">{cur.riskProbability}%</div>
                <div className="text-[10px] text-gray-500">{cur.predictedPeak} mg/dL peak</div>
              </div>
            </div>
            {sel !== 'none' && improved && (
              <div className="mt-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-sm text-emerald-700 font-medium">
                ↓ {base.riskProbability - cur.riskProbability}% risk reduction · ↓ {base.predictedPeak - cur.predictedPeak} mg/dL lower peak
              </div>
            )}
          </div>
          {sel !== 'none' && (
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-2">{cur.name}</div>
              <p className="text-sm text-gray-600">{cur.description}</p>
            </div>
          )}
          <div className="bg-amber-50 rounded-xl border border-amber-200 p-4">
            <p className="text-xs text-amber-700 font-medium">⚠ Hypothetical simulation only. Not a clinical recommendation.</p>
          </div>
        </div>
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-4">Trajectory Comparison</div>
          <ResponsiveContainer width="100%" height={380}>
            <ComposedChart data={base.trajectory.map((p, i) => ({ ...p, sim: cur.trajectory[i]?.value }))} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
              <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={{ stroke: '#e5e7eb' }} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} domain={[80, 260]} width={35} />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #e5e7eb' }} />
              <ReferenceLine y={180} stroke="#ef4444" strokeDasharray="6 4" strokeWidth={1} />
              <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2.5} dot={false} name="Current" />
              {sel !== 'none' && <Line type="monotone" dataKey="sim" stroke="#10b981" strokeWidth={2} strokeDasharray="6 4" dot={false} name={cur.name} />}
            </ComposedChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-6 mt-3 text-[11px] text-gray-400">
            <span className="flex items-center gap-1.5"><span className="w-4 h-0.5 bg-indigo-500 rounded" /> Current</span>
            {sel !== 'none' && <span className="flex items-center gap-1.5"><span className="w-4 h-0.5 bg-emerald-500 rounded border-dashed" /> {cur.name}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}