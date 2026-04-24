import { useState } from "react";

export function DropBoxes() {
  return (
    <div className="flex space-x-8 justify-center pt-2">
      <Box number={1} percentage={50} />
      <Box number={2} percentage={0} />
      <Box number={3} percentage={0} />
      <Box number={4} percentage={0} />
      <Box number={5} percentage={0} />
    </div>
  );
}

export function Box({
  number,
  percentage,
}: {
  number: number;
  percentage: number;
}) {
  const [boxOpen, setBoxOpen] = useState(false);

  return (
    <div className="flex flex-col gap-y-2 w-1/7 relative">
      {boxOpen && (
        <>
          <div
            className="absolute -top-2 left-0 h-1 w-1/2 bg-cyan-300"
            style={{
              transform: "rotate(-135deg)",
              transformOrigin: "left top",
            }}
          />
          <div
            className="absolute top-0 left-0 h-1 w-1/2 bg-cyan-300"
            style={{
              transform: "rotate(-135deg)",
              transformOrigin: "left top",
            }}
          />
          <div className="absolute top-0 left-0 h-2 w-1 bg-cyan-300" />
        </>
      )}
      <div
        className="px-2 py-1 border-cyan-300 border-4 flex justify-center items-center"
        onClick={() => setBoxOpen(true)}
      >
        <div
          className="text-cyan-300 text-2xl"
          style={{
            WebkitTextStroke: "2px #53eafd",
          }}
        >
          0{number}
        </div>
      </div>
      <div className="relative w-full h-6 border-3 border-cyan-300 overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-cyan-300 transition-[width] duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
        <div className="relative flex h-full w-full items-center justify-start px-2 text-lg font-medium text-cyan-300 mix-blend-difference">
          {percentage}%
        </div>
      </div>
    </div>
  );
}
