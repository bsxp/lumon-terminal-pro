import "./App.css";
import { CompletionBar } from "./components/CompletionBar";
import { DropBoxes } from "./components/DropBoxes";
import { WigglyNumbers } from "./components/WigglyNumbers";

function App() {
  return (
    <>
      <div className="crt w-svw h-svh">
        <div className="h-[16%]">
          <CompletionBar name="Chris" percentage={50} />
          <div className="w-full bg-cyan-300 h-1 mt-auto"></div>
          <div className="w-full bg-cyan-300 h-1 mt-0.5"></div>
        </div>
        <div
          className="h-[60%] overflow-scroll w-svw not-last:relative"
          style={{
            // Hide the scroll bars
            scrollbarWidth: "none",
          }}
        >
          <WigglyNumbers />
        </div>
        <div className="h-[20%]">
          <div className="w-full bg-cyan-300 h-1"></div>
          <div className="w-full bg-cyan-300 h-1 mb-auto mt-0.5"></div>
          <DropBoxes />
        </div>
      </div>
    </>
  );
}
export default App;
