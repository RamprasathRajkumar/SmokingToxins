import React from 'react';
import { CigaretteEntry, SubstanceKey } from '../types';
import { SUBSTANCE_CONFIG, SUBSTANCE_KEYS } from '../constants';
import SubstanceGauge from './SubstanceGauge';

interface DailyTrackerProps {
  entries: CigaretteEntry[];
}

const DailyTracker: React.FC<DailyTrackerProps> = ({ entries }) => {
  const totalDailySubstances = entries.reduce((totals, entry) => {
    SUBSTANCE_KEYS.forEach(key => {
      totals[key] = (totals[key] || 0) + entry.totalSubstances[key];
    });
    return totals;
  }, {} as Record<SubstanceKey, number>);

  return (
    <div className="w-full bg-gray-800/50 backdrop-blur-sm p-5 rounded-xl shadow-lg border border-gray-700 space-y-4">
      <div className="text-center mb-2">
        <p className="text-xl font-bold text-white">Daily Intake Summary</p>
        <p className="text-sm text-gray-400">Harmful substance levels for today.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        {SUBSTANCE_KEYS.map(key => {
          const config = SUBSTANCE_CONFIG[key];
          const currentValue = totalDailySubstances[key] || 0;
          if (!config) return null;
          return (
            <SubstanceGauge
              key={key}
              name={config.name}
              currentValue={currentValue}
              maxValue={config.max}
              warningValue={config.warning}
              dangerousValue={config.dangerous}
              unit={config.unit}
            />
          );
        })}
      </div>
    </div>
  );
};

export default DailyTracker;
