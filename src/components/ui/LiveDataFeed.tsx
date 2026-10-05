import { clsx } from 'clsx';
import type { PhysiologicalReading } from '../../data/mockData';

interface LiveDataFeedProps {
  readings: PhysiologicalReading[];
  isLive?: boolean;
}

export function LiveDataFeed({ readings, isLive = true }: LiveDataFeedProps) {
  const latest = readings.slice(-8).reverse();

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[11px] font-bold text-gray-400 tracking-[0.18em] uppercase">
          Live Stream
        </h3>
        {isLive && (
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 live-dot" />
            <span className="text-[10px] font-semibold text-emerald-600 uppercase tracking-[0.1em]">
              Live
            </span>
          </div>
        )}
      </div>
      <div className="space-y-0">
        {latest.map((reading, i) => {
          const d = new Date(reading.timestamp);
          const time = d.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
          });
          return (
            <div
              key={reading.timestamp}
              className={clsx(
                'flex items-center gap-3 py-2 px-2 rounded transition-colors',
                i === 0 ? 'bg-sky-50/60' : 'hover:bg-gray-50'
              )}
            >
              <span className="text-[11px] text-gray-400 tabular-nums font-mono w-16 shrink-0">
                {time}
              </span>
              <div className="flex items-center gap-3 text-[12px]">
                <span className="text-gray-700 font-semibold tabular-nums">
                  <span className="text-gray-400 text-[10px] font-normal mr-1">Glc</span>
                  {reading.glucose}
                </span>
                <span className="text-gray-700 font-semibold tabular-nums">
                  <span className="text-gray-400 text-[10px] font-normal mr-1">HR</span>
                  {reading.heartRate}
                </span>
                <span className="text-gray-700 font-semibold tabular-nums">
                  <span className="text-gray-400 text-[10px] font-normal mr-1">HRV</span>
                  {reading.hrv}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}