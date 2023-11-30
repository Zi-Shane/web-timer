import { useRef } from "react";
import { seconds2HHMMMS } from "./timer";

function getProcessCSS(percentage: number) {
  return `conic-gradient(#ff8400 ${percentage * 3.6}deg, #ededed 0deg)`;
}

export function RunningTimer({
  handleToggle,
  handleCancel,
  pauseStatus,
  duration,
  totalTime
}: {
  handleToggle: () => void;
  handleCancel: () => void;
  pauseStatus: boolean;
  duration: number;
  totalTime: number;
}) {
  let [HH, MM, SS, MS] =seconds2HHMMMS(duration);
  const hoursValue = useRef<HTMLSpanElement>(null);
  const circularProcess = useRef<HTMLDivElement>(null);

  // less than an hour
  if (duration < 360000) {
    // for fix `null` warning
    if (hoursValue.current) {
      hoursValue.current.hidden = true;
    }
    document.title = `${MM.toString().padStart(2, "0")}:${SS.toString().padStart(2, "0")}`
  } else {
    document.title = `${HH.toString().padStart(2, "0")}:${MM.toString().padStart(2, "0")}:${SS.toString().padStart(2, "0")}`
  }

  // for fix `null` warning
  if (circularProcess.current) {
    circularProcess.current.style.background = getProcessCSS(
      (duration / totalTime) * 100
    );
  }

  return (
    <div className="container">
      <div ref={circularProcess} className="circular-progress">
        <div className="progress-value">
          <span ref={hoursValue} className="text">
            {HH.toString().padStart(2, "0")}:
          </span>
          <span className="text">{MM.toString().padStart(2, "0")}:</span>
          <span className="text">{SS.toString().padStart(2, "0")}</span>
        </div>
      </div>

      <div className="control-btns">
        <button className={pauseStatus ? "resume-btn btn_text" : "pause-btn btn_text"} onClick={handleToggle}>
          {pauseStatus ? "Resume" : "Pause"}
        </button>
        <button className="cancel-btn btn_text" onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
}
