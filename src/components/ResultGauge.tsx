import React from 'react';

interface ResultGaugeProps {
  score: number;
  maxScore: number;
  color: string;
}

const RADIUS = 80;
const ARC = Math.PI * RADIUS;

const ResultGauge: React.FC<ResultGaugeProps> = ({ score, maxScore, color }) => {
  const fraction = Math.min(Math.max(score / maxScore, 0), 1);

  return (
    <div className="relative w-full max-w-xs mx-auto" role="img" aria-label={`Puntuación ${score} de ${maxScore}`}>
      <svg viewBox="0 0 200 110" className="w-full">
        <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#F1F5F9" strokeWidth="22" strokeLinecap="round" />
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke={color}
          strokeWidth="22"
          strokeLinecap="round"
          strokeDasharray={`${ARC * fraction} ${ARC}`}
          style={{ transition: 'stroke-dasharray 0.6s ease-out' }}
        />
      </svg>
      <div className="absolute inset-x-0 bottom-0 text-center">
        <span className="text-5xl sm:text-6xl font-serif" style={{ color }}>{score}</span>
        <span className="text-lg sm:text-2xl text-muted-text font-medium ml-1">/ {maxScore}</span>
      </div>
    </div>
  );
};

export default ResultGauge;
