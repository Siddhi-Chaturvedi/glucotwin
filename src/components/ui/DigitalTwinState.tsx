import { clsx } from 'clsx';

interface StateStep {
  id: string;
  label: string;
  active: boolean;
}

interface DigitalTwinStateProps {
  states: StateStep[];
  currentStateId: string;
}

export function DigitalTwinState({ states, currentStateId }: DigitalTwinStateProps) {
  const currentIdx = states.findIndex((s) => s.id === currentStateId);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5">
      <h3 className="text-[11px] font-bold text-gray-400 tracking-[0.18em] uppercase mb-5">
        Digital Twin State
      </h3>
      <div className="flex flex-col">
        {states.map((state, i) => {
          const isCurrent = state.id === currentStateId;
          const isPast = i < currentIdx;
          const isFuture = i > currentIdx;

          return (
            <div key={state.id} className="flex items-center gap-3">
              {/* Dot + line */}
              <div className="flex flex-col items-center">
                <div
                  className={clsx(
                    'w-3 h-3 rounded-full border-2 flex items-center justify-center',
                    isCurrent && 'border-red-500 bg-red-500',
                    isPast && 'border-gray-300 bg-gray-300',
                    isFuture && 'border-gray-200 bg-white'
                  )}
                >
                  {isCurrent && (
                    <div className="w-1 h-1 rounded-full bg-white" />
                  )}
                </div>
                {i < states.length - 1 && (
                  <div
                    className={clsx(
                      'w-px h-7',
                      i < currentIdx ? 'bg-gray-300' : 'bg-gray-100'
                    )}
                  />
                )}
              </div>
              {/* Label */}
              <span
                className={clsx(
                  'text-sm py-0.5',
                  isCurrent && 'font-bold text-red-600',
                  isPast && 'text-gray-400',
                  isFuture && 'text-gray-300'
                )}
              >
                {state.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}