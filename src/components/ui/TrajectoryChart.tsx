import {
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  Line,
  ComposedChart,
} from 'recharts';
import type { Prediction } from '../../data/mockData';

interface TrajectoryChartProps {
  trajectory: Prediction['trajectory'];
  showUncertainty?: boolean;
  height?: number;
  comparisonTrajectory?: { time: string; value: number }[];
  comparisonLabel?: string;
}

export function TrajectoryChart({
  trajectory,
  showUncertainty = true,
  height = 300,
  comparisonTrajectory,
  comparisonLabel = 'Simulated',
}: TrajectoryChartProps) {
  const mergedData = trajectory.map((point, i) => ({
    ...point,
    simulated: comparisonTrajectory?.[i]?.value,
  }));

  const nowIndex = 3;

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={height}>
        <ComposedChart data={mergedData} margin={{ top: 10, right: 16, left: 0, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis
            dataKey="time"
            tick={{ fontSize: 11, fill: '#94a3b8', fontFamily: 'system-ui, sans-serif' }}
            axisLine={{ stroke: '#e2e8f0' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#94a3b8', fontFamily: 'system-ui, sans-serif' }}
            axisLine={false}
            tickLine={false}
            domain={[80, 260]}
            width={40}
          />
          <Tooltip
            contentStyle={{
              background: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              fontFamily: 'system-ui, sans-serif',
            }}
            formatter={(value) => [`${value} mg/dL`, '']}
          />
          <ReferenceLine
            y={180}
            stroke="#ef4444"
            strokeDasharray="6 4"
            strokeWidth={1}
            label={{
              value: 'Risk threshold (180)',
              position: 'right',
              fontSize: 10,
              fill: '#ef4444',
            }}
          />
          <ReferenceLine
            x={trajectory[nowIndex]?.time}
            stroke="#334e68"
            strokeDasharray="4 4"
            strokeWidth={1.5}
            label={{
              value: 'NOW',
              position: 'top',
              fontSize: 10,
              fill: '#334e68',
              fontWeight: 'bold',
            }}
          />
          {showUncertainty && (
            <>
              <Area
                type="monotone"
                dataKey="upper"
                stroke="none"
                fill="rgba(239, 68, 68, 0.06)"
              />
              <Area
                type="monotone"
                dataKey="lower"
                stroke="none"
                fill="rgba(255, 255, 255, 1)"
              />
            </>
          )}
          <Line
            type="monotone"
            dataKey="value"
            stroke="#0e7490"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5, fill: '#0e7490', strokeWidth: 2, stroke: '#fff' }}
          />
          {comparisonTrajectory && (
            <Line
              type="monotone"
              dataKey="simulated"
              stroke="#10b981"
              strokeWidth={2}
              strokeDasharray="6 4"
              dot={false}
              activeDot={{ r: 5, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }}
              name={comparisonLabel}
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-2">
        <div className="flex items-center gap-2">
          <div className="w-5 h-0.5 rounded" style={{ background: '#0e7490' }} />
          <span className="text-[11px] text-gray-400">Predicted</span>
        </div>
        {showUncertainty && (
          <div className="flex items-center gap-2">
            <div className="w-5 h-3 rounded" style={{ background: 'rgba(239,68,68,0.1)' }} />
            <span className="text-[11px] text-gray-400">Uncertainty</span>
          </div>
        )}
        {comparisonTrajectory && (
          <div className="flex items-center gap-2">
            <div className="w-5 h-0.5 rounded border-t-2 border-dashed" style={{ borderColor: '#10b981' }} />
            <span className="text-[11px] text-gray-400">{comparisonLabel}</span>
          </div>
        )}
      </div>
    </div>
  );
}