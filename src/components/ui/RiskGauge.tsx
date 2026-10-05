interface RiskGaugeProps {
  probability: number;
  riskLevel: 'stable' | 'monitoring' | 'elevated' | 'high-risk';
  predictedPeak: number;
  horizon: string;
}

const riskColors = {
  stable: { stroke: '#10b981', bg: '#ecfdf5', text: '#065f46', label: 'STABLE' },
  monitoring: { stroke: '#1a8cff', bg: '#eff6ff', text: '#1e40af', label: 'MONITORING' },
  elevated: { stroke: '#f59e0b', bg: '#fffbeb', text: '#92400e', label: 'ELEVATED' },
  'high-risk': { stroke: '#ef4444', bg: '#fef2f2', text: '#991b1b', label: 'HIGH RISK' },
};

export function RiskGauge({ probability, riskLevel, predictedPeak, horizon }: RiskGaugeProps) {
  const config = riskColors[riskLevel];
  const radius = 72;
  const strokeWidth = 12;
  const circumference = Math.PI * radius;
  const progress = (probability / 100) * circumference;

  return (
    <div className="flex flex-col items-center py-2">
      <div className="relative" style={{ width: 188, height: 100 }}>
        <svg width="188" height="100" viewBox="0 0 188 100">
          {/* Background track */}
          <path
            d="M 10 96 A 84 84 0 0 1 178 96"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Progress arc */}
          <path
            d="M 10 96 A 84 84 0 0 1 178 96"
            fill="none"
            stroke={config.stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${progress} ${circumference}`}
            style={{ transition: 'stroke-dasharray 1s ease-out' }}
          />
        </svg>
        {/* Center value */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-0">
          <span
            className="text-4xl font-extrabold tabular-nums tracking-tight leading-none"
            style={{ color: config.stroke }}
          >
            {probability}%
          </span>
        </div>
      </div>

      {/* Risk label */}
      <div
        className="mt-2 px-4 py-1 rounded-full text-[11px] font-bold tracking-[0.15em] uppercase"
        style={{ background: config.bg, color: config.text }}
      >
        {config.label}
      </div>
      <span className="text-[11px] text-gray-400 mt-1">Glucose spike probability</span>

      {/* Stats */}
      <div className="mt-5 grid grid-cols-2 gap-6 w-full">
        <div className="text-center">
          <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Predicted Peak</div>
          <div className="text-xl font-bold text-gray-900 tabular-nums">
            {predictedPeak}
            <span className="text-xs font-medium text-gray-400 ml-1">mg/dL</span>
          </div>
        </div>
        <div className="text-center">
          <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Horizon</div>
          <div className="text-xl font-bold text-gray-900">{horizon}</div>
        </div>
      </div>
    </div>
  );
}