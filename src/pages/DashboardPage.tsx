import { useState, useEffect } from 'react';
import {
  Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Line, ComposedChart, ReferenceLine,
} from 'recharts';
import { currentPatient, patientBaseline, currentPrediction, liveStreamData, generateNewReading, getLatestReading } from '../data/mockData';
import type { PhysiologicalReading } from '../data/mockData';

interface DashboardPageProps { isDemoMode: boolean; }

export function DashboardPage({ isDemoMode }: DashboardPageProps) {
  const [readings, setReadings] = useState<PhysiologicalReading[]>(liveStreamData.slice(-80));
  const [latest, setLatest] = useState(getLatestReading());

  useEffect(() => {
    if (!isDemoMode) return;
    const iv = setInterval(() => {
      const r = generateNewReading();
      setReadings(p => [...p.slice(-149), r]);
      setLatest(r);
    }, 3000);
    return () => clearInterval(iv);
  }, [isDemoMode]);

  const glucoseData = readings.slice(-40).map((r, i) => ({ i, v: r.glucose }));
  const hrData = readings.slice(-40).map((r, i) => ({ i, v: r.heartRate }));
  const hrvData = readings.slice(-40).map((r, i) => ({ i, v: r.hrv }));

  return (
    <div className="space-y-6 animate-fade-up max-w-[1440px]">
      {/* Page Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Digital Twin Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">Patient {currentPatient.id} · {currentPatient.name} · Type {currentPatient.diagnosisType}</p>
        </div>
        {isDemoMode && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 rounded-full">
            <div className="w-2 h-2 rounded-full bg-indigo-500 live-dot" />
            <span className="text-xs font-semibold text-indigo-700">Demo Active</span>
          </div>
        )}
      </div>

      {/* Patient Summary Bar */}
      <div className="bg-white rounded-xl border border-gray-200 px-6 py-4 flex items-center gap-8">
        <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center shrink-0">
          <span className="text-sm font-bold text-white">24</span>
        </div>
        {[
          { label: 'Age', value: `${currentPatient.age}` },
          { label: 'BMI', value: currentPatient.bmi.toFixed(1) },
          { label: 'HbA1c', value: `${currentPatient.hba1c}%` },
          { label: 'Duration', value: `${currentPatient.diabetesDuration} yrs` },
          { label: 'Type', value: currentPatient.diagnosisType },
        ].map((m) => (
          <div key={m.label} className="text-center px-4">
            <div className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">{m.label}</div>
            <div className="text-lg font-bold text-gray-900 tabular-nums mt-0.5">{m.value}</div>
          </div>
        ))}
        <div className="ml-auto flex items-center gap-2 px-3 py-1.5 bg-red-50 rounded-full">
          <div className="w-2 h-2 rounded-full bg-red-500 live-dot" />
          <span className="text-xs font-bold text-red-700">HIGH RISK</span>
        </div>
      </div>

      {/* Row 1: Key Metrics */}
      <div className="grid grid-cols-4 gap-4">
        <MetricBig label="Glucose" value={Math.round(latest.glucose)} unit="mg/dL" sparkline={glucoseData} color="#6366f1"
          change={`${latest.glucose > patientBaseline.glucose.typical ? '+' : ''}${(latest.glucose - patientBaseline.glucose.typical).toFixed(0)}`}
          changeDir={latest.glucose > patientBaseline.glucose.high ? 'up' : 'stable'} />
        <MetricBig label="Heart Rate" value={latest.heartRate} unit="bpm" sparkline={hrData} color="#3b82f6"
          change={`${latest.heartRate > patientBaseline.heartRate.typical ? '+' : ''}${(latest.heartRate - patientBaseline.heartRate.typical).toFixed(0)}`}
          changeDir={latest.heartRate > patientBaseline.heartRate.high ? 'up' : 'stable'} />
        <MetricBig label="HRV" value={latest.hrv} unit="ms" sparkline={hrvData} color="#8b5cf6"
          change={`${((latest.hrv - patientBaseline.hrv.typical) / patientBaseline.hrv.typical * 100).toFixed(0)}%`}
          changeDir={latest.hrv < patientBaseline.hrv.low ? 'down' : 'stable'} />
        <MetricBig label="Steps" value={latest.steps.toLocaleString()} unit="" color="#10b981"
          change="Below target" changeDir="down" />
      </div>

      {/* Row 2: Risk + Trajectory */}
      <div className="grid grid-cols-3 gap-4">
        {/* Risk Gauge */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col items-center">
          <div className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-4">2-Hour Risk</div>
          <RiskRing probability={currentPrediction.riskProbability} />
          <div className="mt-3 px-3 py-1 bg-red-50 rounded-full">
            <span className="text-xs font-bold text-red-700">HIGH RISK</span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 w-full text-center">
            <div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider">Peak</div>
              <div className="text-lg font-bold text-gray-900">{currentPrediction.predictedPeak}<span className="text-xs text-gray-400 ml-1">mg/dL</span></div>
            </div>
            <div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider">Horizon</div>
              <div className="text-lg font-bold text-gray-900">{currentPrediction.horizon}</div>
            </div>
          </div>
        </div>

        {/* Trajectory Chart */}
        <div className="col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Predicted Trajectory</div>
              <div className="text-sm text-gray-600 mt-0.5">Observed → Predicted with uncertainty</div>
            </div>
            <div className="flex items-center gap-4 text-[11px] text-gray-400">
              <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-indigo-500 rounded" /> Predicted</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-red-100 rounded" /> Uncertainty</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <ComposedChart data={currentPrediction.trajectory} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
              <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={{ stroke: '#e5e7eb' }} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} domain={[80, 260]} width={35} />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #e5e7eb', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }} />
              <ReferenceLine y={180} stroke="#ef4444" strokeDasharray="6 4" strokeWidth={1} label={{ value: 'Threshold', position: 'right', fontSize: 9, fill: '#ef4444' }} />
              <ReferenceLine x="10:45" stroke="#374151" strokeDasharray="4 4" strokeWidth={1} label={{ value: 'NOW', position: 'top', fontSize: 9, fill: '#374151', fontWeight: 600 }} />
              <Area type="monotone" dataKey="upper" stroke="none" fill="rgba(239,68,68,0.06)" />
              <Area type="monotone" dataKey="lower" stroke="none" fill="#ffffff" />
              <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2.5} dot={false} activeDot={{ r: 4, fill: '#6366f1', stroke: '#fff', strokeWidth: 2 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 3: Explanation + Baseline + Twin State */}
      <div className="grid grid-cols-3 gap-4">
        {/* AI Explanation */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-5">Risk Factors</div>
          <div className="space-y-4">
            {currentPrediction.explanations.map((exp) => (
              <div key={exp.factor}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-gray-700 font-medium">{exp.factor}</span>
                  <span className="text-sm font-bold text-gray-800 tabular-nums">{exp.contribution}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${exp.contribution}%`, background: 'linear-gradient(90deg, #fbbf24, #ef4444)' }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500 leading-relaxed italic">"{currentPrediction.insight}"</p>
          </div>
        </div>

        {/* Baseline */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-5">Your Baseline</div>
          <div className="space-y-5">
            {[
              { label: 'Glucose', unit: 'mg/dL', low: patientBaseline.glucose.low, high: patientBaseline.glucose.high, cur: Math.round(latest.glucose) },
              { label: 'Heart Rate', unit: 'bpm', low: patientBaseline.heartRate.low, high: patientBaseline.heartRate.high, cur: latest.heartRate },
              { label: 'HRV', unit: 'ms', low: patientBaseline.hrv.low, high: patientBaseline.hrv.high, cur: latest.hrv },
              { label: 'Steps', unit: '', low: patientBaseline.steps.low, high: patientBaseline.steps.high, cur: latest.steps },
            ].map((m) => {
              const out = m.cur < m.low || m.cur > m.high;
              const range = m.high - m.low;
              const pad = range * 0.2;
              const bMin = m.low - pad, bMax = m.high + pad, bR = bMax - bMin;
              const lowP = ((m.low - bMin) / bR) * 100;
              const highP = ((m.high - bMin) / bR) * 100;
              const curP = Math.max(2, Math.min(98, ((m.cur - bMin) / bR) * 100));
              return (
                <div key={m.label}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{m.label}</span>
                    <span className={`text-sm font-bold tabular-nums ${out ? 'text-red-600' : 'text-gray-900'}`}>{m.cur} <span className="text-[10px] text-gray-400 font-normal">{m.unit}</span></span>
                  </div>
                  <div className="relative h-2.5 bg-gray-100 rounded-full">
                    <div className="absolute h-full rounded-full" style={{ left: `${lowP}%`, width: `${highP - lowP}%`, background: 'linear-gradient(90deg, #e0e7ff, #c7d2fe)' }} />
                    <div className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2 border-white shadow" style={{ left: `calc(${curP}% - 7px)`, background: out ? '#ef4444' : '#6366f1' }} />
                  </div>
                  <div className="flex justify-between mt-1 text-[10px] text-gray-300">
                    <span>{m.low}</span><span>{m.high}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Digital Twin State */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-5">Twin State</div>
          <div className="flex flex-col items-center mb-6">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <div className="absolute w-full h-full rounded-full border-2 border-red-200 opacity-40 animate-[pulse-soft_2.5s_ease-in-out_infinite]" />
              <div className="absolute w-[85%] h-[85%] rounded-full border-2 border-red-300 opacity-30 animate-[pulse-soft_2.5s_ease-in-out_infinite_0.5s]" />
              <div className="w-24 h-24 rounded-full border-[3px] border-red-500 bg-white flex flex-col items-center justify-center shadow-lg shadow-red-500/10">
                <span className="text-[9px] text-gray-400 uppercase tracking-widest font-semibold">State</span>
                <span className="text-base font-bold text-red-600 mt-0.5">High Risk</span>
              </div>
            </div>
          </div>
          <div className="space-y-0">
            {['Stable', 'Monitoring', 'Elevated', 'High Risk', 'Predicted Event'].map((s, i) => {
              const isActive = s === 'High Risk';
              const isPast = i < 3;
              return (
                <div key={s} className="flex items-center gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-2.5 h-2.5 rounded-full ${isActive ? 'bg-red-500' : isPast ? 'bg-gray-300' : 'bg-gray-100 border border-gray-200'}`} />
                    {i < 4 && <div className={`w-px h-5 ${isPast ? 'bg-gray-300' : 'bg-gray-100'}`} />}
                  </div>
                  <span className={`text-sm ${isActive ? 'font-bold text-red-600' : isPast ? 'text-gray-400' : 'text-gray-300'}`}>{s}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Row 4: Live Feed + AI Insight */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Live Physiological Stream</div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 live-dot" />
              <span className="text-[10px] font-semibold text-emerald-600 uppercase tracking-wider">Live</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {readings.slice(-6).reverse().map((r, i) => {
              const t = new Date(r.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
              return (
                <div key={r.timestamp} className={`px-3 py-2.5 rounded-lg ${i === 0 ? 'bg-indigo-50' : 'bg-gray-50'}`}>
                  <div className="text-[10px] text-gray-400 font-mono mb-1">{t}</div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="font-semibold text-gray-700 tabular-nums">{Math.round(r.glucose)} <span className="text-gray-400 font-normal">mg/dL</span></span>
                    <span className="font-semibold text-gray-700 tabular-nums">{r.heartRate} <span className="text-gray-400 font-normal">bpm</span></span>
                    <span className="font-semibold text-gray-700 tabular-nums">{r.hrv} <span className="text-gray-400 font-normal">ms</span></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="bg-indigo-600 rounded-xl p-6 text-white">
          <div className="text-[10px] uppercase tracking-widest font-semibold text-indigo-200 mb-3">AI Insight</div>
          <p className="text-sm leading-relaxed text-indigo-100">
            {currentPrediction.insight}
          </p>
          <div className="mt-4 pt-4 border-t border-indigo-500/30 text-[11px] text-indigo-200">
            Generated by GlucoTwin-v2.3.1
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-4">
        <span className="text-[11px] text-gray-400">🔒 Synthetic / Anonymized Data · No identifiable patient information · Research Prototype</span>
      </div>
    </div>
  );
}

/* ---- Sub-components ---- */

function MetricBig({ label, value, unit, sparkline, color, change, changeDir }: {
  label: string; value: number | string; unit: string; color: string;
  sparkline?: { i: number; v: number }[];
  change?: string; changeDir?: 'up' | 'down' | 'stable';
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-start justify-between mb-2">
        <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">{label}</span>
        {change && (
          <span className={`text-[11px] font-semibold px-1.5 py-0.5 rounded ${changeDir === 'up' ? 'text-red-700 bg-red-50' : changeDir === 'down' ? 'text-emerald-700 bg-emerald-50' : 'text-gray-600 bg-gray-100'}`}>
            {changeDir === 'up' ? '↑' : changeDir === 'down' ? '↓' : '→'} {change}
          </span>
        )}
      </div>
      <div className="flex items-baseline gap-1.5 mb-1">
        <span className="text-3xl font-bold text-gray-900 tabular-nums tracking-tight">{value}</span>
        {unit && <span className="text-sm text-gray-400 font-medium">{unit}</span>}
      </div>
      {sparkline && sparkline.length > 2 && (
        <div className="mt-3 h-10">
          <svg width="100%" height="100%" viewBox="0 0 200 40" preserveAspectRatio="none" style={{ display: 'block' }}>
            {(() => {
              const data = sparkline.map(s => s.v);
              const min = Math.min(...data), max = Math.max(...data);
              const range = max - min || 1;
              const pad = range * 0.1;
              const pts = data.map((v, i) => `${(i / (data.length - 1)) * 200},${40 - ((v - min + pad) / (range + pad * 2)) * 40}`);
              const area = [...pts, `200,40`, `0,40`].join(' ');
              return (
                <>
                  <polygon points={area} fill={color} fillOpacity="0.06" />
                  <polyline points={pts.join(' ')} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="200" cy={40 - ((data[data.length - 1] - min + pad) / (range + pad * 2)) * 40} r="3" fill={color} />
                </>
              );
            })()}
          </svg>
        </div>
      )}
    </div>
  );
}

function RiskRing({ probability }: { probability: number }) {
  const r = 64, sw = 10, circ = Math.PI * r;
  const prog = (probability / 100) * circ;
  return (
    <div className="relative" style={{ width: 160, height: 86 }}>
      <svg width="160" height="86" viewBox="0 0 160 86">
        <path d="M 8 82 A 72 72 0 0 1 152 82" fill="none" stroke="#f3f4f6" strokeWidth={sw} strokeLinecap="round" />
        <path d="M 8 82 A 72 72 0 0 1 152 82" fill="none" stroke="#ef4444" strokeWidth={sw} strokeLinecap="round"
          strokeDasharray={`${prog} ${circ}`} style={{ transition: 'stroke-dasharray 1s ease-out' }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-0">
        <span className="text-4xl font-extrabold text-red-600 tabular-nums tracking-tight leading-none">{probability}%</span>
      </div>
    </div>
  );
}