import { clsx } from 'clsx';

interface SimulationComparisonProps {
  currentRisk: number;
  simulatedRisk: number;
  currentPeak: number;
  simulatedPeak: number;
}

export function SimulationComparison({
  currentRisk,
  simulatedRisk,
  currentPeak,
  simulatedPeak,
}: SimulationComparisonProps) {
  const riskChange = simulatedRisk - currentRisk;
  const peakChange = simulatedPeak - currentPeak;
  const riskImproved = riskChange < 0;
  const peakImproved = peakChange < 0;

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="text-[10px] font-bold text-gray-400 tracking-[0.12em] uppercase mb-2">Current</div>
        <div className="text-3xl font-bold text-gray-900 tabular-nums mb-0.5">{currentRisk}%</div>
        <div className="text-[11px] text-gray-500 mb-3">Risk</div>
        <div className="text-xl font-bold text-gray-800 tabular-nums">
          {currentPeak} <span className="text-xs text-gray-400 font-medium">mg/dL</span>
        </div>
        <div className="text-[11px] text-gray-500">Predicted peak</div>
      </div>

      <div className="bg-emerald-50/50 border border-emerald-200 rounded-lg p-4">
        <div className="text-[10px] font-bold text-gray-400 tracking-[0.12em] uppercase mb-2">Simulated</div>
        <div className="text-3xl font-bold text-emerald-700 tabular-nums mb-0.5">{simulatedRisk}%</div>
        <div className="text-[11px] text-gray-500 mb-3">Risk</div>
        <div className="text-xl font-bold text-emerald-700 tabular-nums">
          {simulatedPeak} <span className="text-xs text-gray-400 font-medium">mg/dL</span>
        </div>
        <div className="text-[11px] text-gray-500">Predicted peak</div>
      </div>

      <div className="col-span-2 grid grid-cols-2 gap-3">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1 font-semibold">Risk Change</div>
          <div className={clsx('text-lg font-bold tabular-nums', riskImproved ? 'text-emerald-700' : 'text-red-600')}>
            {currentRisk}% → {simulatedRisk}%
          </div>
          <div className={clsx('text-[11px] font-medium', riskImproved ? 'text-emerald-600' : 'text-red-500')}>
            {riskImproved ? '↓' : '↑'} {Math.abs(riskChange)}% {riskImproved ? 'improvement' : 'increase'}
          </div>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1 font-semibold">Peak Change</div>
          <div className={clsx('text-lg font-bold tabular-nums', peakImproved ? 'text-emerald-700' : 'text-red-600')}>
            {currentPeak} → {simulatedPeak} <span className="text-xs font-medium text-gray-400">mg/dL</span>
          </div>
          <div className={clsx('text-[11px] font-medium', peakImproved ? 'text-emerald-600' : 'text-red-500')}>
            {peakImproved ? '↓' : '↑'} {Math.abs(peakChange)} mg/dL {peakImproved ? 'lower' : 'higher'}
          </div>
        </div>
      </div>
    </div>
  );
}