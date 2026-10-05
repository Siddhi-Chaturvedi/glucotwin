import { useState, useEffect } from 'react';
import { MetricCard } from '../components/ui/MetricCard';
import { LiveDataFeed } from '../components/ui/LiveDataFeed';
import { getLatestReading, generateNewReading, liveStreamData, patientBaseline } from '../data/mockData';
import type { PhysiologicalReading } from '../data/mockData';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

interface LivePageProps {
  isDemoMode: boolean;
}

export function LivePage({ isDemoMode }: LivePageProps) {
  const [readings, setReadings] = useState<PhysiologicalReading[]>(liveStreamData.slice(-100));
  const [latest, setLatest] = useState(getLatestReading());

  useEffect(() => {
    if (!isDemoMode) return;
    const interval = setInterval(() => {
      const r = generateNewReading();
      setReadings((prev) => [...prev.slice(-199), r]);
      setLatest(r);
    }, 2000);
    return () => clearInterval(interval);
  }, [isDemoMode]);

  const chartData = readings.slice(-60).map((r) => ({
    time: new Date(r.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }),
    glucose: r.glucose,
    hr: r.heartRate,
  }));

  return (
    <div className="space-y-5 animate-fade-in max-w-[1400px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Live Monitoring</h1>
          <p className="text-sm text-gray-400 mt-0.5">Real-time physiological data stream</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full border border-emerald-200">
          <div className="w-2 h-2 rounded-full bg-emerald-500 live-dot" />
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Streaming</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <MetricCard label="Glucose" value={Math.round(latest.glucose)} unit="mg/dL" accentColor="#06b6d4"
          trend={`${latest.glucose > patientBaseline.glucose.typical ? '+' : ''}${(latest.glucose - patientBaseline.glucose.typical).toFixed(0)}`}
          trendDirection={latest.glucose > patientBaseline.glucose.high ? 'up' : 'stable'} />
        <MetricCard label="Heart Rate" value={latest.heartRate} unit="bpm" accentColor="#1a8cff"
          trend={`${latest.heartRate > patientBaseline.heartRate.typical ? '+' : ''}${(latest.heartRate - patientBaseline.heartRate.typical).toFixed(0)}`}
          trendDirection={latest.heartRate > patientBaseline.heartRate.high ? 'up' : 'stable'} />
        <MetricCard label="HRV" value={latest.hrv} unit="ms" accentColor="#8b5cf6"
          trend={`${((latest.hrv - patientBaseline.hrv.typical) / patientBaseline.hrv.typical * 100).toFixed(0)}%`}
          trendDirection={latest.hrv < patientBaseline.hrv.low ? 'down' : 'stable'} />
        <MetricCard label="Steps" value={latest.steps.toLocaleString()} unit="" accentColor="#10b981" />
        <MetricCard label="Activity" value={latest.activity} unit="METs" accentColor="#f59e0b" />
        <MetricCard label="Stage" value={latest.sleepStage} unit="" accentColor="#6366f1" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="text-[11px] font-bold text-gray-400 tracking-[0.18em] uppercase mb-3">Glucose Stream</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#94a3b8' }} interval="preserveStartEnd" />
              <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} domain={[80, 240]} width={35} />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #e5e7eb' }} />
              <ReferenceLine y={180} stroke="#ef4444" strokeDasharray="4 4" />
              <ReferenceLine y={patientBaseline.glucose.typical} stroke="#06b6d4" strokeDasharray="2 4" />
              <Line type="monotone" dataKey="glucose" stroke="#06b6d4" strokeWidth={2} dot={false} isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="text-[11px] font-bold text-gray-400 tracking-[0.18em] uppercase mb-3">Heart Rate Stream</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#94a3b8' }} interval="preserveStartEnd" />
              <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} domain={[50, 130]} width={35} />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #e5e7eb' }} />
              <Line type="monotone" dataKey="hr" stroke="#1a8cff" strokeWidth={2} dot={false} isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <LiveDataFeed readings={readings} isLive={isDemoMode} />
    </div>
  );
}