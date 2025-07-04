import React from 'react';

interface SubstanceGaugeProps {
  name: string;
  currentValue: number;
  maxValue: number;
  warningValue: number;
  dangerousValue: number;
  unit: string;
}

const SubstanceGauge: React.FC<SubstanceGaugeProps> = ({ name, currentValue, maxValue, warningValue, dangerousValue, unit }) => {
  const percentage = Math.min((currentValue / maxValue) * 100, 100);

  let barColor = 'bg-green-500';
  let levelText = 'Low';
  let textColor = 'text-green-300';

  if (currentValue > dangerousValue) {
    barColor = 'bg-red-600';
    levelText = 'Dangerous';
    textColor = 'text-red-300';
  } else if (currentValue > warningValue) {
    barColor = 'bg-yellow-500';
    levelText = 'High';
    textColor = 'text-yellow-300';
  }

  return (
    <div className="w-full space-y-1">
      <div className="flex justify-between items-baseline">
        <span className="text-sm font-medium text-gray-300">{name}</span>
        <span className={`text-sm font-bold ${textColor}`}>{levelText}</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-4 relative overflow-hidden shadow-inner">
        <div
          className={`${barColor} h-4 rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-white mix-blend-difference">
                {currentValue.toFixed(3)} / {maxValue} {unit}
            </span>
        </div>
      </div>
    </div>
  );
};

export default SubstanceGauge;