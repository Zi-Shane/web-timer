"use client";
import { useState, useRef, useEffect } from "react";

function getProcessCSS(percentage: number) {
  return `conic-gradient(#ff8400 ${percentage * 3.6}deg, #ededed 0deg)`;
}

function seconds2HHMMMS(duration: number): [number, number, number, number] {
  return [
    Math.floor(duration / 360000),
    Math.floor((duration % 360000) / 6000),
    Math.floor((duration % 6000) / 100),
    Math.floor(duration % 100),
  ];
}

export default function Timer() {
  const [pauseStatus, setPauseStatus] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [duration, setDuration] = useState(0);  // for paused time than resume
  const [history, setHistory] = useState((): number[] => {
    let history = localStorage.getItem("HISTORY");
    if (history == null) {
      return [];
    }
    return JSON.parse(history);
  })
  const curCounter = useRef<ReturnType<typeof setInterval> | null>(null);
  const circularProcess = useRef<HTMLDivElement>(null);
  const totalTime = useRef(0);
  const hoursValue = useRef<HTMLSpanElement>(null);
  let [HH, MM, SS, MS] = seconds2HHMMMS(duration);

  useEffect(() => {
    if (history.length > 5) {
      let trimHistory = history.slice(-5)
      setHistory(trimHistory)
      localStorage.setItem("HISTORY", JSON.stringify(trimHistory))
    }
    localStorage.setItem("HISTORY", JSON.stringify(history))
  }, [history])

  async function handleToggle() {
    console.log(pauseStatus);
    if (pauseStatus) {
      // click `resume`
      newCounter();
      setPauseStatus(false);
      console.log("click resume");
    } else {
      // click `pause`
      clearInterval(curCounter.current || undefined);
      setPauseStatus(true);
      console.log("click pause");
    }
  }

  function newCounter() {
    // 10/1000 s = 0.01s
    const counter = setInterval(() => {
      setDuration((prev) => {
        if (prev <= 1) {
          clearInterval(counter);
          setIsStart(false);
          return prev;
        }

        // for fix `null` warning
        if (circularProcess.current) {
          circularProcess.current.style.background = getProcessCSS(
            (prev / totalTime.current) * 100
          );
        }
        // less than an hour
        if (prev < 360000) {
          // for fix `null` warning
          if (hoursValue.current) {
            hoursValue.current.hidden = true;
          }
        }

        return prev - 1;
      });
    }, 10);
    curCounter.current = counter;
  }

  function handleHistoryClick(i: number) {
    totalTime.current = history[i]
    setDuration(history[i]);
    setIsStart(true);
    newCounter();
  }

  function handleStartClick(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    console.log("click Start");
    setPauseStatus(false); // initial
    const form = new FormData(e.currentTarget);
    HH = parseInt(form.get("HH")?.toString() || "0");
    MM = parseInt(form.get("MM")?.toString() || "0");
    SS = parseInt(form.get("SS")?.toString() || "0");
    let inputDuration = (HH * 3600 + MM * 60 + SS) * 100;
    if (inputDuration <= 0) return; // input negative handle by HTML
    totalTime.current = inputDuration;
    setHistory([...history, totalTime.current])

    setDuration(inputDuration);
    setIsStart(true);
    newCounter();
  }

  function handleCancel() {
    clearInterval(curCounter.current || undefined);
    setIsStart(false);
    console.log("click cancel");
  }

  return (
    <div className="body">
      {isStart ? (
        <div className="container">
          <div ref={circularProcess} className="circular-progress">
            <div className="progress-value">
              <span ref={hoursValue} className="text">
                {HH.toString().padStart(2, "0")}:
              </span>
              <span className="text">{MM.toString().padStart(2, "0")}:</span>
              <span className="text">{SS.toString().padStart(2, "0")}.</span>
              <span className="text half-text">{MS.toString().padStart(2, "0")}</span>
            </div>
          </div>

          <div>
            <button onClick={handleToggle}>
              {pauseStatus ? "Resume" : "Pause"}
            </button>
            <button onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="container">
          <form onSubmit={handleStartClick}>
            <input
              className="timer-box"
              name="HH"
              placeholder="HH"
              type="number"
              min={0}
              defaultValue=""
            />
            :
            <input
              className="timer-box"
              name="MM"
              placeholder="MM"
              type="number"
              min={0}
              max={59}
              defaultValue=""
            />
            :
            <input
              className="timer-box"
              name="SS"
              placeholder="SS"
              type="number"
              min={0}
              max={59}
              defaultValue=""
            />
            <button type="submit">Start</button>
          </form>
          { history.length ? (
            <div className="history">
              <span>Others</span>
              { history.map((item, i) => {
                let [historyHH, historyMM, historySS, historyMS] = seconds2HHMMMS(item);
                return (
                  <div key={i} className="text" onClick={() => handleHistoryClick(i)}>
                    <span className="text">{historyHH.toString().padStart(2, "0")}:</span>
                    <span className="text">{historyMM.toString().padStart(2, "0")}:</span>
                    <span className="text">{historySS.toString().padStart(2, "0")}</span>
                  </div>)
              }) }
            </div>) : ("")
          }
          
        </div>
      )}
    </div>
  );
}
