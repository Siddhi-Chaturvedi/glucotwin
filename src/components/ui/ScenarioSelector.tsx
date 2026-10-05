import { clsx } from 'clsx';
import type { Scenario } from '../../data/mockData';

interface ScenarioSelectorProps {
  scenarios: Scenario[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function ScenarioSelector({ scenarios, selectedId, onSelect }: ScenarioSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {scenarios.map((scenario) => {
        const isSelected = scenario.id === selectedId;
        return (
          <button
            key={scenario.id}
            onClick={() => onSelect(scenario.id)}
            className={clsx(
              'px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 border',
              'focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2',
              isSelected
                ? 'bg-gray-900 text-white border-gray-900 shadow-lg shadow-gray-900/10'
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            )}
          >
            <span className="mr-1.5">{scenario.icon}</span>
            {scenario.name}
          </button>
        );
      })}
    </div>
  );
}