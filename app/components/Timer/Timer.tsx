import { useState, useRef, useEffect } from 'react';
import { SetupTimer } from './setupTimer';
import { RunningTimer } from './runningTimer';
import { WarningToast } from './warningToast';
import { ToastPortal, ToastPortalAPI } from 'components';

const N_HISTORY = 3;

export function seconds2HHMMMS(
  duration: number,
): [number, number, number, number] {
  return [
    Math.floor(duration / 360000),
    Math.floor((duration % 360000) / 6000),
    Math.floor((duration % 6000) / 100),
    Math.floor(duration % 100),
  ];
}

export function Timer() {
  const [pauseStatus, setPauseStatus] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [duration, setDuration] = useState(0); // for paused time than resume
  const [history, setHistory] = useState((): number[] => {
    let history: string = '';
    if (typeof window !== 'undefined') {
      history = localStorage.getItem('HISTORY') || '';
    }

    try {
      return JSON.parse(history);
    } catch (error) {
      return JSON.parse('[]');
    }
  });
  const curCounter = useRef<ReturnType<typeof setInterval> | null>(null);
  const totalTime = useRef(0);
  const toastPortalRef = useRef<ToastPortalAPI>(null);

  useEffect(() => {
    if (history.length > N_HISTORY) {
      let trimHistory = history.slice(-N_HISTORY);
      setHistory(trimHistory);
      localStorage.setItem('HISTORY', JSON.stringify(trimHistory));
    } else {
      localStorage.setItem('HISTORY', JSON.stringify(history));
    }
  }, [history]);

  function handleToggle() {
    if (pauseStatus) {
      // click `resume`
      newCounter();
      setPauseStatus(false);
      console.log('click resume');
    } else {
      // click `pause`
      clearInterval(curCounter.current || undefined);
      setPauseStatus(true);
      console.log('click pause');
    }
  }

  function handleCancel() {
    clearInterval(curCounter.current || undefined);
    setPauseStatus(false); // reset
    setIsStart(false);
    console.log('click cancel');
  }

  function newCounter() {
    // 10/1000 s = 0.01s
    const counter = setInterval(() => {
      setDuration(prev => {
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
    console.log('click Start');
    const form = new FormData(e.currentTarget);
    let [HH, MM, SS, _] = seconds2HHMMMS(duration);
    HH = parseInt(form.get('HH')?.toString() || '0');
    MM = parseInt(form.get('MM')?.toString() || '0');
    SS = parseInt(form.get('SS')?.toString() || '0');

    if (Number.isNaN(HH) || Number.isNaN(MM) || Number.isNaN(SS)) {
      toastPortalRef.current?.addToast('Cannot start with not number!!');
      return;
    }
    let inputDuration = (HH * 3600 + MM * 60 + SS) * 100;

    if (
      inputDuration <= 0 ||
      HH < 0 ||
      MM < 0 ||
      SS < 0 ||
      inputDuration > 3600000
    ) {
      toastPortalRef.current?.addToast('Range should be 1s to 24hr!!');
      return;
    }
    // if (inputDuration == 0) {
    //   toastPortalRef.current?.addToast(
    //     'Cannot start less than 1 second!!',
    //   );
    //   return;
    // }
    totalTime.current = inputDuration;
    setHistory([...history, totalTime.current]);

    setDuration(inputDuration);
    setIsStart(true);
    newCounter();
  }

  return (
    <div>
      {isStart || <title>React Timer App</title>}

      <ToastPortal toastPortalRef={toastPortalRef} />
      {/* <WarningToast toastList={toastList} setToastList={setToastList} /> */}

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
