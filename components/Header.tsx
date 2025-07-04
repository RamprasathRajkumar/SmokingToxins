import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-4 px-2 text-center">
      <h1 className="text-3xl font-bold text-white tracking-wider">
        <span className="text-red-500">Nico</span>Track
      </h1>
      <p className="text-gray-400 text-sm">Your Daily Substance Intake Tracker</p>
    </header>
  );
};

export default Header;