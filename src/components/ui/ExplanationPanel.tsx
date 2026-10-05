import type { Prediction } from '../../data/mockData';

interface ExplanationPanelProps {
  explanations: Prediction['explanations'];
  insight: string;
}

export function ExplanationPanel({ explanations, insight }: ExplanationPanelProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5">
      <h3 className="text-[11px] font-bold text-gray-400 tracking-[0.18em] uppercase mb-5">
        Why is the risk high?
      </h3>
      <div className="space-y-4 mb-6">
        {explanations.map((exp) => (
          <div key={exp.factor}>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span
                  className="text-[11px] font-bold w-4 text-center"
                  style={{ color: exp.direction === 'up' ? '#ef4444' : '#10b981' }}
                >
                  {exp.direction === 'up' ? '↑' : '↓'}
                </span>
                <span className="text-sm text-gray-700 font-medium">{exp.factor}</span>
              </div>
              <span className="text-sm font-bold text-gray-800 tabular-nums">
                {exp.contribution}%
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden ml-6">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{
                  width: `${exp.contribution}%`,
                  background: exp.direction === 'up'
                    ? 'linear-gradient(90deg, #fbbf24, #ef4444)'
                    : 'linear-gradient(90deg, #34d399, #06b6d4)',
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-100 pt-5">
        <h4 className="text-[10px] font-bold text-gray-400 tracking-[0.15em] uppercase mb-2">
          AI Insight
        </h4>
        <p className="text-sm text-gray-600 leading-relaxed">
          <span className="text-gray-300">"</span>{insight}<span className="text-gray-300">"</span>
        </p>
      </div>
    </div>
  );
}