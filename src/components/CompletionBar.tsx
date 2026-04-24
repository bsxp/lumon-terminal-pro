// Has three components:
// - The name of the person
// - The completion percentage of the task
// - The Lumon logo
export function CompletionBar({
  name,
  percentage,
}: {
  name: string;
  percentage: number;
}) {
  return (
    <div className="py-8 px-12">
      <div className="px-2 py-1 border-cyan-300 border-4 rounded-sm flex justify-between items-center">
        <div
          className="text-cyan-300 text-2xl"
          style={{
            WebkitTextStroke: "2px #53eafd",
          }}
        >
          {name}
        </div>
        <div className="relative text-2xl">
          <div
            className="absolute inset-0"
            style={{
              WebkitTextStroke: "5px #53eafd",
              WebkitTextFillColor: "transparent",
            }}
          >
            {percentage}% Complete
          </div>
          <div className="relative text-black">{percentage}% Complete</div>
        </div>
        {/* <div>
          <img src={logo} alt="Lumon logo" />
        </div> */}
      </div>
    </div>
  );
}
