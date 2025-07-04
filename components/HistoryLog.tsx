import React, { useState } from 'react';
import { CigaretteEntry } from '../types';
import { SUBSTANCE_CONFIG, SUBSTANCE_KEYS } from '../constants';
import { ClockIcon, SmokingIcon, ChevronDownIcon } from './Icons';

interface HistoryLogProps {
  entries: CigaretteEntry[];
}

const HistoryLogEntry: React.FC<{ entry: CigaretteEntry }> = ({ entry }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <li className="bg-gray-800 rounded-lg shadow-md overflow-hidden animate-fade-in">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-3 flex items-center space-x-4 text-left"
        aria-expanded={isExpanded}
      >
        <div className="p-2 bg-gray-700 rounded-full">
          <SmokingIcon className="w-6 h-6 text-red-400" />
        </div>
        <div className="flex-grow">
          <p className="font-bold text-white capitalize">{entry.brand}</p>
          <p className="text-sm text-gray-400">
            {entry.quantity} {entry.quantity > 1 ? 'cigs' : 'cig'} · Nicotine: {entry.totalSubstances.nicotine.toFixed(1)}mg, Tar: {entry.totalSubstances.tar.toFixed(1)}mg
          </p>
        </div>
        <div className="text-right flex-shrink-0">
            <div className="flex items-center justify-end space-x-1 text-xs text-gray-500 mb-1">
                <ClockIcon className="w-3 h-3"/>
                <span>{new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
           <ChevronDownIcon className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''} mx-auto`} />
        </div>
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 pt-2 border-t border-gray-700/50">
          <h4 className="text-sm font-semibold text-gray-300 mb-2">Substance Breakdown (total for this entry):</h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm">
            {SUBSTANCE_KEYS.map(key => {
              const config = SUBSTANCE_CONFIG[key];
              const value = entry.totalSubstances[key];
              if (!config) return null;
              return (
                <li key={key} className="flex justify-between text-gray-400 py-1 border-b border-gray-700/50">
                  <span>{config.name}</span>
                  <span className="font-mono text-gray-200">{value.toFixed(4)} {config.unit}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </li>
  );
};


const HistoryLog: React.FC<HistoryLogProps> = ({ entries }) => {
  if (entries.length === 0) {
    return (
      <div className="text-center py-10 px-4 bg-gray-800 rounded-lg">
        <p className="text-gray-400">No entries for today yet.</p>
        <p className="text-gray-500 text-sm">Use the form above to add your first cigarette.</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-3">
       <h3 className="text-lg font-semibold text-gray-200 px-1">Today's Log</h3>
      <ul className="space-y-3">
        {[...entries].reverse().map((entry) => (
          <HistoryLogEntry key={entry.id} entry={entry} />
        ))}
      </ul>
    </div>
  );
};

export default HistoryLog;
