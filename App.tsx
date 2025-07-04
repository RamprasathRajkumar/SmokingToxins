import React, { useState, useEffect } from 'react';
import { CigaretteEntry, DailyLog, SubstanceContent } from './types';
import { SUBSTANCE_KEYS } from './constants';
import Header from './components/Header';
import DailyTracker from './components/DailyTracker';
import AddEntryForm from './components/AddEntryForm';
import HistoryLog from './components/HistoryLog';

const App: React.FC = () => {
  const [entries, setEntries] = useState<CigaretteEntry[]>([]);

  // Get today's date in YYYY-MM-DD format
  const getTodayDateString = () => new Date().toISOString().split('T')[0];

  // Load entries from localStorage on initial render
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('nicotineLog');
      if (savedData) {
        const log: DailyLog = JSON.parse(savedData);
        // Only load entries if they are from today
        if (log.date === getTodayDateString()) {
          setEntries(log.entries);
        } else {
          // Clear old entries from a previous day
          localStorage.removeItem('nicotineLog');
        }
      }
    } catch (error) {
      console.error("Failed to load data from localStorage", error);
    }
  }, []);

  // Save entries to localStorage whenever they change
  useEffect(() => {
    // Do not save if entries are not loaded yet
    if (entries.length === 0 && !localStorage.getItem('nicotineLog')) return;
    try {
      const log: DailyLog = {
        date: getTodayDateString(),
        entries: entries,
      };
      localStorage.setItem('nicotineLog', JSON.stringify(log));
    } catch (error) {
      console.error("Failed to save data to localStorage", error);
    }
  }, [entries]);

  const handleAddEntry = (brand: string, quantity: number, substancesPerCigarette: SubstanceContent) => {
    
    const totalSubstances = {} as SubstanceContent;
    SUBSTANCE_KEYS.forEach(key => {
        totalSubstances[key] = (substancesPerCigarette[key] || 0) * quantity;
    });

    const newEntry: CigaretteEntry = {
      id: new Date().toISOString(),
      brand,
      quantity,
      substancesPerCigarette,
      totalSubstances,
      timestamp: new Date().toISOString(),
    };
    setEntries(prevEntries => [...prevEntries, newEntry]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <main className="max-w-2xl mx-auto p-4 space-y-6">
        <Header />
        <DailyTracker entries={entries} />
        <AddEntryForm onAddEntry={handleAddEntry} />
        <HistoryLog entries={entries} />
      </main>
    </div>
  );
};

export default App;
