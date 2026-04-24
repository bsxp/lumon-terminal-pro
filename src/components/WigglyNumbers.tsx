// An infinitely scrollable grid of numbers
// There are 16x8 numbers in the grid visible at any given moment in time, but moving your mouse to the edge of the screen will move the center of the grid to follow
// and there will always be new numbers availble to display
// No numbers will ever be located next to themselves NSEW, but diagonals are okay

import {
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";

const NUM_COLUMNS = 16;
const NUM_ROWS = 8;
const TOTAL_COLUMNS = NUM_COLUMNS * 3;
const TOTAL_ROWS = NUM_ROWS * 3;

export function WigglyNumbers() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [hoveredNumber, setHoveredNumber] = useState<{
    x: number;
    y: number;
  } | null>(null);
  // Generate a grid of numbers that is 3x the size of the visible grid
  const grid = useMemo(
    () =>
      Array.from({ length: NUM_ROWS * 3 }, () =>
        Array.from({ length: NUM_COLUMNS * 3 }, () => ({
          number: Math.floor(Math.random() * 10),
          tilt: Math.random() < 0.25 ? Math.floor(Math.random() * 8) + 1 : 0, // 1 in 4 numbers will have between 1 and 8 degrees of tilt
          delay: Math.random() * -6,
        }))
      ),
    []
  );

  // Store the coordinates of the numbers that are currently highlighted
  const [highlightedNumbers, setHighlightedNumbers] = useState<
    { x: number; y: number }[]
  >([]);

  const getCoordinatesFromEvent = (
    event: ReactPointerEvent<HTMLDivElement>
  ) => {
    const container = gridRef.current;
    if (!container) {
      return null;
    }

    const rect = container.getBoundingClientRect();
    const cellWidth = rect.width / TOTAL_COLUMNS;
    const cellHeight = rect.height / TOTAL_ROWS;

    const relativeX = event.clientX - rect.left;
    const relativeY = event.clientY - rect.top;

    const x = Math.floor(relativeX / cellWidth);
    const y = Math.floor(relativeY / cellHeight);

    if (
      Number.isNaN(x) ||
      Number.isNaN(y) ||
      x < 0 ||
      y < 0 ||
      x >= TOTAL_COLUMNS ||
      y >= TOTAL_ROWS
    ) {
      return null;
    }

    return { x, y };
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);

    const coords = getCoordinatesFromEvent(event);
    setHighlightedNumbers(coords ? [coords] : []);
    setHoveredNumber(coords);
    setIsMouseDown(true);
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setIsMouseDown(false);
    const coords = getCoordinatesFromEvent(event);
    setHoveredNumber(coords);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const coords = getCoordinatesFromEvent(event);
    setHoveredNumber(coords);

    if (!coords || !isMouseDown) {
      return;
    }

    const { x, y } = coords;

    setHighlightedNumbers((prev) => {
      const alreadyHighlighted = prev.some(
        (coord) => coord.x === x && coord.y === y
      );

      if (alreadyHighlighted) {
        return prev;
      }

      return [...prev, { x, y }];
    });
  };

  const handlePointerLeave = () => {
    setHoveredNumber(null);
  };

  const isAdjacentToHovered = (x: number, y: number) => {
    if (!hoveredNumber) {
      return false;
    }

    const deltaX = Math.abs(hoveredNumber.x - x);
    const deltaY = Math.abs(hoveredNumber.y - y);

    return deltaX + deltaY === 1;
  };

  // Display the grid
  return (
    <div>
      <div
        ref={gridRef}
        className="absolute left-1/2 top-1/2"
        style={{
          transform: "translate(-50%, -50%)",
          display: "grid",
          gridTemplateColumns: `repeat(${TOTAL_COLUMNS}, 3.5rem)`,
          gridTemplateRows: `repeat(${TOTAL_ROWS}, 3.5rem)`,
          gap: "0.5rem",
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={handlePointerLeave}
      >
        {grid.flat().map(({ number, tilt, delay }, idx) => {
          const columnIndex = idx % TOTAL_COLUMNS;
          const rowIndex = Math.floor(idx / TOTAL_COLUMNS);
          const isHighlighted = highlightedNumbers.some(
            (coord) => coord.x === columnIndex && coord.y === rowIndex
          );
          const isAdjacent = !isHighlighted && isAdjacentToHovered(columnIndex, rowIndex);
          const isHovered =
            hoveredNumber?.x === columnIndex && hoveredNumber?.y === rowIndex;

          return (
            <div
              key={idx}
              className={`w-full h-full flex items-center justify-center spring-bounce ${
                isHighlighted
                  ? "text-5xl"
                  : isHovered
                  ? "text-4xl"
                  : isAdjacent
                  ? "text-3xl"
                  : "text-lg"
              }`}
              style={
                {
                  WebkitTextStroke: isHighlighted
                    ? "5px #53eafd"
                    : isHovered
                    ? "2.4px #53eafd"
                    : isAdjacent
                    ? "2px #53eafd"
                    : "1.4px #53eafd",
                  "--tilt": `${tilt}deg`,
                  animationDelay: `${delay}s`,
                  userSelect: "none",
                  transition: "all 0.2s ease-in-out",
                } as CSSProperties
              }
            >
              {number}
            </div>
          );
        })}
      </div>
    </div>
  );
}
