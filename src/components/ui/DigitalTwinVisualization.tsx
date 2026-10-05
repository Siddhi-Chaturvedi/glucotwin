interface DigitalTwinVisualizationProps {
  state: 'stable' | 'monitoring' | 'elevated' | 'high-risk';
  metrics: {
    glucose: number;
    heartRate: number;
    hrv: number;
    activity: number;
  };
  isLive?: boolean;
}

const stateConfig = {
  stable: { color: '#10b981', ring: 'rgba(16, 185, 129, 0.12)', label: 'Stable', bg: '#ecfdf5' },
  monitoring: { color: '#1a8cff', ring: 'rgba(26, 140, 255, 0.12)', label: 'Monitoring', bg: '#eff6ff' },
  elevated: { color: '#f59e0b', ring: 'rgba(245, 158, 11, 0.12)', label: 'Elevated', bg: '#fffbeb' },
  'high-risk': { color: '#ef4444', ring: 'rgba(239, 68, 68, 0.12)', label: 'High Risk', bg: '#fef2f2' },
};

export function DigitalTwinVisualization({ state, metrics, isLive = true }: DigitalTwinVisualizationProps) {
  const config = stateConfig[state];

  return (
    <div className="relative flex flex-col items-center justify-center py-6">
      {/* Outer pulse rings */}
      {isLive && (
        <>
          <div
            className="absolute rounded-full animate-pulse-ring"
            style={{
              width: 220,
              height: 220,
              border: `2px solid ${config.color}`,
              opacity: 0.15,
            }}
          />
          <div
            className="absolute rounded-full animate-pulse-ring"
            style={{
              width: 260,
              height: 260,
              border: `1.5px solid ${config.color}`,
              opacity: 0.08,
              animationDelay: '0.6s',
            }}
          />
        </>
      )}

      {/* Glow behind orb */}
      <div
        className="absolute rounded-full"
        style={{
          width: 200,
          height: 200,
          background: `radial-gradient(circle, ${config.ring}, transparent 70%)`,
        }}
      />

      {/* Central twin orb */}
      <div
        className="relative flex flex-col items-center justify-center rounded-full"
        style={{
          width: 160,
          height: 160,
          border: `3px solid ${config.color}`,
          background: 'white',
          boxShadow: `0 0 30px ${config.ring}, 0 0 60px ${config.ring}`,
        }}
      >
        <div className="text-[10px] font-bold tracking-[0.18em] uppercase text-gray-400 mb-1">
          Twin State
        </div>
        <div
          className="text-lg font-bold tracking-wide"
          style={{ color: config.color }}
        >
          {config.label}
        </div>
        {isLive && (
          <div className="flex items-center gap-1.5 mt-2">
            <div
              className="w-2 h-2 rounded-full live-dot"
              style={{ background: config.color }}
            />
            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Live</span>
          </div>
        )}
      </div>

      {/* Metric signals around the orb */}
      <div className="grid grid-cols-4 gap-4 mt-8 w-full max-w-sm">
        {[
          { label: 'Glucose', value: `${metrics.glucose}`, unit: 'mg/dL', color: '#06b6d4' },
          { label: 'Heart Rate', value: `${metrics.heartRate}`, unit: 'bpm', color: '#1a8cff' },
          { label: 'HRV', value: `${metrics.hrv}`, unit: 'ms', color: '#8b5cf6' },
          { label: 'Activity', value: `${metrics.activity}`, unit: 'METs', color: '#f59e0b' },
        ].map((m) => (
          <div key={m.label} className="text-center bg-gray-50 rounded-lg py-2.5 px-2">
            <div className="text-[9px] text-gray-400 uppercase tracking-widest font-semibold mb-1">
              {m.label}
            </div>
            <div className="text-lg font-bold text-gray-800 tabular-nums leading-none">
              {m.value}
            </div>
            <div className="text-[10px] text-gray-400 mt-0.5">{m.unit}</div>
          </div>
        ))}
      </div>
    </div>
  );
}