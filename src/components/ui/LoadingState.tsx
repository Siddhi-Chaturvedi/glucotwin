import { useState, useEffect } from 'react';

interface LoadingStateProps {
  onComplete?: () => void;
}

const steps = [
  { label: 'EHR', delay: 400 },
  { label: 'Wearable stream', delay: 800 },
  { label: 'Patient baseline', delay: 1200 },
  { label: 'AI model', delay: 1600 },
  { label: 'Digital Twin', delay: 2000 },
];

export function LoadingState({ onComplete }: LoadingStateProps) {
  const [completed, setCompleted] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timers = steps.map((step) =>
      setTimeout(() => {
        setCompleted((prev) => [...prev, step.label]);
      }, step.delay)
    );

    const doneTimer = setTimeout(() => {
      setDone(true);
      onComplete?.();
    }, 2600);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center z-50"
      style={{ background: '#080f1e' }}
    >
      {/* Logo */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <svg width="36" height="36" viewBox="0 0 30 30" fill="none">
            <circle cx="11" cy="15" r="7.5" stroke="#06b6d4" strokeWidth="1.5" fill="none" opacity="0.6" />
            <circle cx="19" cy="15" r="7.5" stroke="#3b82f6" strokeWidth="1.5" fill="none" opacity="0.6" />
            <path
              d="M 4 15 L 8 15 L 10 9 L 12.5 20 L 15 12 L 17 17 L 19 15 L 26 15"
              stroke="#22d3ee"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <circle cx="15" cy="15" r="2.5" fill="#22d3ee" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">GLUCOTWIN</h1>
        <p className="text-sm text-gray-500 mt-1">Synchronizing Digital Twin...</p>
      </div>

      {/* Steps */}
      <div className="space-y-3 w-72">
        {steps.map((step) => {
          const isComplete = completed.includes(step.label);
          return (
            <div key={step.label} className="flex items-center gap-3">
              <div
                className="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300"
                style={{
                  borderColor: isComplete ? '#10b981' : '#374151',
                  background: isComplete ? '#10b981' : 'transparent',
                }}
              >
                {isComplete && (
                  <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span
                className="text-sm transition-colors duration-300"
                style={{ color: isComplete ? '#e5e7eb' : '#4b5563' }}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Active indicator */}
      {done && (
        <div className="mt-10">
          <div className="w-2.5 h-2.5 rounded-full bg-sky-400 live-dot mx-auto" />
        </div>
      )}
    </div>
  );
}