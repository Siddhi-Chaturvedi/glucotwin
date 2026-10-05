import { clsx } from 'clsx';

interface MetricCardProps {
  label: string;
  value: number | string;
  unit: string;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'stable';
  baseline?: string;
  sparklineData?: number[];
  accentColor?: string;
}

export function MetricCard({
  label,
  value,
  unit,
  trend,
  trendDirection,
  baseline,
  sparklineData,
  accentColor = '#06b6d4',
}: MetricCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors duration-150">
      <div className="flex items-start justify-between mb-1">
        <span className="text-[11px] font-semibold text-gray-500 tracking-widest uppercase">
          {label}
        </span>
        {trend && (
          <span
            className={clsx(
              'text-[11px] font-semibold px-1.5 py-0.5 rounded',
              trendDirection === 'up' && 'text-red-700 bg-red-50',
              trendDirection === 'down' && 'text-green-700 bg-green-50',
              trendDirection === 'stable' && 'text-gray-600 bg-gray-100'
            )}
          >
            {trendDirection === 'up' && '↑ '}
            {trendDirection === 'down' && '↓ '}
            {trendDirection === 'stable' && '→ '}
            {trend}
          </span>
        )}
      </div>
      <div className="flex items-baseline gap-1.5 mb-1">
        <span className="text-3xl font-bold text-gray-900 tabular-nums leading-none tracking-tight">
          {value}
        </span>
        {unit && (
          <span className="text-sm text-gray-400 font-medium">{unit}</span>
        )}
      </div>
      {baseline && (
        <span className="text-[11px] text-gray-400">Baseline: {baseline}</span>
      )}
      {sparklineData && sparklineData.length > 2 && (
        <div className="mt-3 h-10 w-full">
          <MiniSparkline data={sparklineData} color={accentColor} />
        </div>
      )}
    </div>
  );
}

function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const padding = range * 0.1;
  const adjMin = min - padding;
  const adjRange = range + padding * 2;

  const w = 200;
  const h = 40;
  const step = w / Math.max(data.length - 1, 1);

  const points = data.map((v, i) => {
    const x = i * step;
    const y = h - ((v - adjMin) / adjRange) * h;
    return `${x},${y}`;
  });

  const areaPoints = [...points, `${w},${h}`, `0,${h}`].join(' ');

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      style={{ display: 'block' }}
    >
      {/* Area fill */}
      <polygon
        points={areaPoints}
        fill={color}
        fillOpacity="0.08"
      />
      {/* Line */}
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        points={points.join(' ')}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* End dot */}
      <circle
        cx={w}
        cy={h - ((data[data.length - 1] - adjMin) / adjRange) * h}
        r="3"
        fill={color}
      />
    </svg>
  );
}