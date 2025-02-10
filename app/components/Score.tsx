interface ScoreProps {
  score: number;
  timeLeft: number;
}

export default function Score({ score, timeLeft }: ScoreProps) {
  return (
    <div className="fixed top-0 left-0 right-0 p-4 flex justify-between items-center bg-black bg-opacity-30">
      <div className="text-white text-2xl font-bold">
        Score: {score}
      </div>
      <div className="text-white text-2xl font-bold">
        Time: {timeLeft}s
      </div>
    </div>
  );
}
