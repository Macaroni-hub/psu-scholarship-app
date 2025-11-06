
import React from 'react';

interface SummaryProps {
  totalPercentage: number;
  onSubmit: () => void;
}

const Summary: React.FC<SummaryProps> = ({ totalPercentage, onSubmit }) => {
  const isOverLimit = totalPercentage > 100;
  const percentageColor = isOverLimit ? 'text-red-600' : 'text-green-600';
  const progressWidth = Math.min(totalPercentage, 100);
  const progressColor = isOverLimit ? 'bg-red-500' : 'bg-psu-blue';

  return (
    <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-10">
      <div className="container mx-auto p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-1/2">
            <div className="flex justify-between mb-1">
                <span className="text-base font-medium text-psu-blue">Total Allocated</span>
                <span className={`text-sm font-bold ${percentageColor}`}>
                    {totalPercentage}%
                </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                    className={`${progressColor} h-2.5 rounded-full transition-all duration-500`} 
                    style={{ width: `${progressWidth}%` }}
                ></div>
            </div>
            {isOverLimit && (
                 <p className="text-xs text-red-600 mt-1">Total allocation cannot exceed 100%.</p>
            )}
        </div>
        <button
          onClick={onSubmit}
          disabled={isOverLimit}
          className="w-full sm:w-auto px-8 py-3 bg-psu-blue text-white font-bold rounded-md shadow-md hover:bg-psu-light-blue transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none"
        >
          Submit Recommendations
        </button>
      </div>
    </div>
  );
};

export default Summary;
