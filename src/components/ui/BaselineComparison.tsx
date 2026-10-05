import { clsx } from 'clsx';
import type { Baseline } from '../../data/mockData';

interface BaselineComparisonProps {
  baseline: Baseline;
  current: {
    glucose: number;
    heartRate: number;
    hrv: number;
    steps: number;
    sleepHours: number;
    activity: number;
  };
}

interface BaselineRowProps {
  label: string;
  unit: string;
  low: number;
  high: number;
  typical: number;
  current: number;
}

function BaselineRow({ label, unit, low, high, typical, current }: BaselineRowProps) {
  const deviation = current - typical;
  const isAbove = deviation > 0;
  const isOutOfRange = current < low || current > high;

  const barMin = Math.min(low, current) - (high - low) * 0.15;
  const barMax = Math.max(high, current) + (high - low) * 0.15;
  const barRange = barMax - barMin;
  const lowPos = ((low - barMin) / barRange) * 100;
  const highPos = ((high - barMin) / barRange) * 100;
  const currentPos = Math.max(2, Math.min(98, ((current - barMin) / barRange) * 100));

  return (
    <div className="mb-4 last:mb-0">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-[0.1em]">
          {label}
        </span>
        <div className="flex items-center gap-1">
          <span
            className={clsx(
              'text-[11px] font-bold tabular-nums',
              isOutOfRange ? 'text-red-600' : 'text-gray-800'
            )}
          >
            {current}
          </span>
          <span className="text-[10px] text-gray-400">{unit}</span>
        </div>
      </div>
      <div className="relative h-2.5 bg-gray-100 rounded-full overflow-visible">
        {/* Baseline range bar */}
        <div
          className="absolute h-full rounded-full"
          style={{
            left: `${lowPos}%`,
            width: `${highPos - lowPos}%`,
            background: 'linear-gradient(90deg, #dbeafe, #bfdbfe)',
          }}
        />
        {/* Current position dot */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2 border-white shadow"
          style={{
            left: `calc(${currentPos}% - 7px)`,
            background: isOutOfRange ? '#ef4444' : '#0e7490',
          }}
        />
      </div>
      <div className="flex items-center justify-between mt-1">
        <span className="text-[10px] text-gray-300">{low}</span>
        <span
          className={clsx(
            'text-[10px] font-medium',
            isAbove ? 'text-amber-600' : 'text-emerald-600'
          )}
        >
          {isAbove ? '+' : ''}{deviation.toFixed(0)} vs baseline
        </span>
        <span className="text-[10px] text-gray-300">{high}</span>
      </div>
    </div>
  );
}

export function BaselineComparison({ baseline, current }: BaselineComparisonProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5">
      <h3 className="text-[11px] font-bold text-gray-400 tracking-[0.18em] uppercase mb-5">
        Your Baseline
      </h3>
      <BaselineRow
        label="Glucose" unit="mg/dL"
        low={baseline.glucose.low} high={baseline.glucose.high}
        typical={baseline.glucose.typical} current={current.glucose}
      />
      <BaselineRow
        label="Heart Rate" unit="bpm"
        low={baseline.heartRate.low} high={baseline.heartRate.high}
        typical={baseline.heartRate.typical} current={current.heartRate}
      />
      <BaselineRow
        label="HRV" unit="ms"
        low={baseline.hrv.low} high={baseline.hrv.high}
        typical={baseline.hrv.typical} current={current.hrv}
      />
      <BaselineRow
        label="Steps" unit=""
        low={baseline.steps.low} high={baseline.steps.high}
        typical={baseline.steps.typical} current={current.steps}
      />
      <BaselineRow
        label="Sleep" unit="hrs"
        low={baseline.sleepHours.low} high={baseline.sleepHours.high}
        typical={baseline.sleepHours.typical} current={current.sleepHours}
      />
    </div>
  );
}