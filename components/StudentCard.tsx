import React from 'react';
import { Student } from '../types';
import DocumentIcon from './icons/DocumentIcon';

interface StudentCardProps {
  student: Student;
  onRankChange: (studentId: number, rank: number | null) => void;
  onPercentageChange: (studentId: number, percentage: number) => void;
  totalStudents: number;
}

const StudentCard: React.FC<StudentCardProps> = ({ student, onRankChange, onPercentageChange, totalStudents }) => {
  const rankOptions = Array.from({ length: totalStudents }, (_, i) => i + 1);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onRankChange(student.id, value ? parseInt(value, 10) : null);
  };

  const handlePercentageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onPercentageChange(student.id, value === '' ? 0 : parseInt(value, 10));
  };
  
  const totalScore = student.grades + student.essay + student.need + student.activities;

  const getScoreColorClasses = (score: number) => {
    if (score <= 5) return { stroke: 'stroke-red-500', text: 'text-red-600' };
    if (score <= 10) return { stroke: 'stroke-orange-400', text: 'text-orange-500' };
    if (score <= 15) return { stroke: 'stroke-yellow-400', text: 'text-yellow-500' };
    return { stroke: 'stroke-green-500', text: 'text-green-600' };
  };

  const scoreColor = getScoreColorClasses(totalScore);
  const circumference = 2 * Math.PI * 40; // r=40
  const strokeDashoffset = circumference - (totalScore / 20) * circumference;

  const rubricItems = [
    { key: 'grades' as keyof Student, label: 'Grades' },
    { key: 'essay' as keyof Student, label: 'Essay' },
    { key: 'need' as keyof Student, label: 'Need' },
    { key: 'activities' as keyof Student, label: 'Activities' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 flex flex-col">
      <div className="p-5">
        <h3 className="text-xl font-bold text-psu-blue tracking-tight truncate">{student.name}</h3>
      </div>
      
      <div className="p-5 flex-grow grid grid-cols-5 gap-4 items-center border-t border-b border-gray-100">
        <div className="col-span-2 flex items-center justify-center">
          <div className="relative w-28 h-28">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 112 112">
              <circle cx="56" cy="56" r="40" strokeWidth="12" className="text-gray-200" fill="transparent" />
              <circle
                cx="56"
                cy="56"
                r="40"
                strokeWidth="12"
                className={`${scoreColor.stroke} transition-all duration-1000 ease-out`}
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
            <div className={`absolute inset-0 flex flex-col items-center justify-center ${scoreColor.text}`}>
              <span className="text-3xl font-extrabold leading-tight">{totalScore}</span>
              <span className="text-sm font-semibold -mt-1">/ 20</span>
            </div>
          </div>
        </div>
        
        <div className="col-span-3">
          <ul className="space-y-1.5 text-sm">
            {rubricItems.map(item => (
              <li key={item.key} className="flex justify-between items-center">
                <span className="text-gray-500">{item.label}</span>
                <span className="font-bold text-gray-800 bg-gray-100 px-2 py-0.5 rounded">{String(student[item.key])} / 5</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="p-5 bg-gray-50/75">
        <a
          href={student.driveLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2.5 w-full text-psu-blue border-2 border-psu-blue font-bold py-2.5 px-4 rounded-lg hover:bg-psu-blue hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-psu-light-blue transition-all duration-200"
        >
          <DocumentIcon />
          <span>View Application</span>
        </a>
        
        <div className="mt-4 flex items-end space-x-4">
          <div className="flex-1">
            <label htmlFor={`rank-${student.id}`} className="block text-base font-semibold text-gray-700 mb-1.5">
              Rank
            </label>
            <select
              id={`rank-${student.id}`}
              value={student.rank ?? ''}
              onChange={handleSelectChange}
              className="block w-full text-base font-medium border-2 border-gray-300 focus:outline-none focus:ring-psu-light-blue focus:border-psu-light-blue rounded-lg shadow-sm py-2 px-3"
            >
              <option value="">N/A</option>
              {rankOptions.map(rank => (
                <option key={rank} value={rank}>{`${rank}`}</option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label htmlFor={`percentage-${student.id}`} className="block text-base font-semibold text-gray-700 mb-1.5">
              Award %
            </label>
            <div className="relative">
              <input
                type="number"
                id={`percentage-${student.id}`}
                value={student.percentage}
                onChange={handlePercentageInputChange}
                min="0"
                max="100"
                className="block w-full text-base font-medium pl-3 pr-8 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-psu-light-blue focus:border-psu-light-blue py-2"
                placeholder="0"
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <span className="text-gray-500 text-base font-medium">%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
