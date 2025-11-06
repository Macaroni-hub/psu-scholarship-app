import React, { useState, useMemo } from 'react';
import { Student } from './types';
import Header from './components/Header';
import StudentCard from './components/StudentCard';
import Summary from './components/Summary';

const initialStudents: Student[] = [
  { id: 1, name: 'Jordan Miller', driveLink: '#', rank: null, percentage: 0, grades: 5, essay: 4, need: 3, activities: 5 },
  { id: 2, name: 'Alexis Chen', driveLink: '#', rank: null, percentage: 0, grades: 4, essay: 5, need: 5, activities: 4 },
  { id: 3, name: 'Ben Carter', driveLink: '#', rank: null, percentage: 0, grades: 3, essay: 3, need: 2, activities: 2 },
  { id: 4, name: 'Olivia Rodriguez', driveLink: '#', rank: null, percentage: 0, grades: 5, essay: 5, need: 5, activities: 5 },
  { id: 5, name: 'Ethan Wright', driveLink: '#', rank: null, percentage: 0, grades: 2, essay: 3, need: 1, activities: 1 },
  { id: 6, name: 'Sophia Kim', driveLink: '#', rank: null, percentage: 0, grades: 4, essay: 3, need: 4, activities: 3 },
];

const App: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleRankChange = (studentId: number, newRank: number | null) => {
    setStudents(prevStudents => {
      const newStudents = prevStudents.map(s => ({ ...s }));
      const currentStudent = newStudents.find(s => s.id === studentId);
      if (!currentStudent) return prevStudents;

      if (newRank !== null) {
        const studentWithSameRank = newStudents.find(s => s.id !== studentId && s.rank === newRank);
        if (studentWithSameRank) {
          studentWithSameRank.rank = currentStudent.rank;
        }
      }
      currentStudent.rank = newRank;
      return newStudents;
    });
  };

  const handlePercentageChange = (studentId: number, newPercentage: number) => {
    setStudents(prevStudents =>
      prevStudents.map(student =>
        student.id === studentId
          ? { ...student, percentage: Math.max(0, Math.min(100, newPercentage)) }
          : student
      )
    );
  };
  
  const totalPercentage = useMemo(() => {
    return students.reduce((sum, student) => sum + student.percentage, 0);
  }, [students]);

  const handleSubmit = () => {
    const rankedStudents = students
      .filter(s => s.rank !== null)
      .sort((a, b) => a.rank! - b.rank!);

    if (rankedStudents.length === 0) {
      alert("Please rank at least one student before submitting.");
      return;
    }

    const recipient = "jya5079@gmail.com";
    const subject = "Scholarship Recommendations Submission";
    
    let body = "Hello,\n\nHere are my scholarship recommendations:\n\n";
    rankedStudents.forEach(student => {
      body += `Rank ${student.rank}: ${student.name} - ${student.percentage}% Award\n`;
    });
    body += `\nTotal Allocated: ${totalPercentage}%\n\nThank you.`;

    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.location.href = mailtoLink;

    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  return (
    <div className="min-h-screen font-sans">
      {showConfetti && <Confetti />}
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <p className="text-center text-slate-600 max-w-2xl mx-auto mb-12">
          Welcome, reviewer. Please evaluate each candidate by assigning a rank and recommending a percentage of the scholarship pool to be awarded. Links to their Google Drive application folders are provided.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {students.map(student => (
            <StudentCard
              key={student.id}
              student={student}
              onRankChange={handleRankChange}
              onPercentageChange={handlePercentageChange}
              totalStudents={students.length}
            />
          ))}
        </div>
      </main>
      <Summary totalPercentage={totalPercentage} onSubmit={handleSubmit} />
    </div>
  );
};

// A simple confetti component for a celebratory effect on submission
const Confetti: React.FC = () => {
    const confettiPieces = Array.from({ length: 150 });
    return (
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50">
            {confettiPieces.map((_, i) => {
                const style = {
                    left: `${Math.random() * 100}%`,
                    animationDuration: `${Math.random() * 3 + 2}s`,
                    animationDelay: `${Math.random() * 5}s`,
                    backgroundColor: ['#003087', '#1E40AF', '#A2AAAD', '#FFFFFF'][Math.floor(Math.random() * 4)],
                };
                return <div key={i} className="confetti-piece" style={style}></div>;
            })}
            <style>{`
                @keyframes confetti-fall {
                    0% { transform: translateY(-10vh) rotateZ(0deg); opacity: 1; }
                    100% { transform: translateY(110vh) rotateZ(720deg); opacity: 0; }
                }
                .confetti-piece {
                    position: absolute;
                    width: 10px;
                    height: 10px;
                    opacity: 0;
                    animation: confetti-fall linear infinite;
                }
            `}</style>
        </div>
    );
};

export default App;
