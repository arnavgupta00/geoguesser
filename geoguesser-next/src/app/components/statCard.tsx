export default function StatCard({
  score,
  time,
}: {
  score: number;
  time: number;

}) {
  return (
    <div className="w-full h-16 flex justify-center items-center">
      <div className="flex items-center justify-between px-4 w-full">
        <div className="text-white">Score: {score}</div>
        <div className="text-white">Time: {time}s</div>
      </div>
    </div>
  );
}
