import { useState, useEffect } from 'react';
import { DigitalTwinVisualization } from '../components/ui/DigitalTwinVisualization';
import { DigitalTwinState } from '../components/ui/DigitalTwinState';
import { MetricCard } from '../components/ui/MetricCard';
import { BaselineComparison } from '../components/ui/BaselineComparison';
import {
  patientBaseline,
  digitalTwinStates,
  getLatestReading,
  generateNewReading,
} from '../data/mockData';
import type { PhysiologicalReading } from '../data/mockData';

interface DigitalTwinPageProps {
  isDemoMode: boolean;
}

export function DigitalTwinPage({ isDemoMode }: DigitalTwinPageProps) {
  const [latest, setLatest] = useState(getLatestReading());
  const [readings, setReadings] = useState<PhysiologicalReading[]>([]);

  useEffect(() => {
    if (!isDemoMode) return;
    const interval = setInterval(() => {
      const r = generateNewReading();
      setLatest(r);
      setReadings((prev) => [...prev.slice(-50), r]);
    }, 3000);
    return () => clearInterval(interval);
  }, [isDemoMode]);

  const glucoseSparkline = readings.slice(-30).map((r) => r.glucose);
  const hrSparkline = readings.slice(-30).map((r) => r.heartRate);

  const currentForBaseline = {
    glucose: Math.round(latest.glucose),
    heartRate: latest.heartRate,
    hrv: latest.hrv,
    steps: latest.steps,
    sleepHours: 5.2,
    activity: latest.activity,
  };

  return (
    <div className="space-y-5 animate-fade-in max-w-[1400px]">
      <div>
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">Digital Twin</h1>
        <p className="text-sm text-gray-400 mt-0.5">
          Real-time virtual representation of the patient's physiological state
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-8 space-y-5">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-[11px] font-bold text-gray-400 tracking-[0.18em] uppercase mb-4 text-center">
              Patient State Visualization
            </h3>
            <DigitalTwinVisualization
              state="high-risk"
              metrics={{
                glucose: Math.round(latest.glucose),
                heartRate: latest.heartRate,
                hrv: latest.hrv,
                activity: latest.activity,
              }}
              isLive={isDemoMode}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard label="Glucose" value={Math.round(latest.glucose)} unit="mg/dL" sparklineData={glucoseSparkline} accentColor="#06b6d4" />
            <MetricCard label="Heart Rate" value={latest.heartRate} unit="bpm" sparklineData={hrSparkline} accentColor="#1a8cff" />
            <MetricCard label="HRV" value={latest.hrv} unit="ms" accentColor="#8b5cf6" />
          </div>
        </div>

        <div className="lg:col-span-4 space-y-5">
          <DigitalTwinState states={digitalTwinStates} currentStateId="high-risk" />
          <BaselineComparison baseline={patientBaseline} current={currentForBaseline} />
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="text-[11px] font-bold text-gray-400 tracking-[0.18em] uppercase mb-3">Twin Status</h3>
            <div className="space-y-2.5">
              {[
                { label: 'Model', value: 'GlucoTwin-v2.3.1' },
                { label: 'Data Stream', value: 'Connected' },
                { label: 'Last Sync', value: '3 seconds ago' },
                { label: 'Prediction', value: 'Updated' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-1">
                  <span className="text-xs text-gray-400">{item.label}</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-xs font-semibold text-gray-700">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}