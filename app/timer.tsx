"use client";
import { useState, useRef, useEffect } from "react";
import { SetupTimer } from "./setupTimer";
import { RunningTimer } from "./runningTimer";

export function seconds2HHMMMS(
  duration: number
): [number, number, number, number] {
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
  const [duration, setDuration] = useState(0); // for paused time than resume
  const [history, setHistory] = useState((): number[] => {
    let history = localStorage.getItem("HISTORY");
    if (history == null) {
      return [];
    }
    return JSON.parse(history);
  });
  const curCounter = useRef<ReturnType<typeof setInterval> | null>(null);
  const totalTime = useRef(0);

  useEffect(() => {
    if (history.length > 5) {
      let trimHistory = history.slice(-5);
      setHistory(trimHistory);
      localStorage.setItem("HISTORY", JSON.stringify(trimHistory));
    } else {
      localStorage.setItem("HISTORY", JSON.stringify(history));
    }
  }, [history]);

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

  function handleCancel() {
    clearInterval(curCounter.current || undefined);
    setIsStart(false);
    console.log("click cancel");
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

        return prev - 1;
      });
    }, 10);
    curCounter.current = counter;
  }

  function handleHistoryClick(i: number) {
    totalTime.current = history[i];
    setDuration(history[i]);
    setIsStart(true);
    newCounter();
  }

  function handleStartClick(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    console.log("click Start");
    setPauseStatus(false); // initial
    const form = new FormData(e.currentTarget);
    let [HH, MM, SS, MS] = seconds2HHMMMS(duration);
    HH = parseInt(form.get("HH")?.toString() || "0");
    MM = parseInt(form.get("MM")?.toString() || "0");
    SS = parseInt(form.get("SS")?.toString() || "0");
    let inputDuration = (HH * 3600 + MM * 60 + SS) * 100;
    if (inputDuration <= 0) return; // input negative handle by HTML
    totalTime.current = inputDuration;
    setHistory([...history, totalTime.current]);

    setDuration(inputDuration);
    setIsStart(true);
    newCounter();
  }

  return (
    <div className="body">
      {isStart ? (
        <RunningTimer
          handleToggle={handleToggle}
          handleCancel={handleCancel}
          pauseStatus={pauseStatus}
          duration={duration}
          totalTime={totalTime.current}
        />
      ) : (
        <SetupTimer
          handleStartClick={handleStartClick}
          handleHistoryClick={handleHistoryClick}
          history={history}
        />
      )}
    </div>
  );
}
