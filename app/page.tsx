'use client'
import { useState, useRef } from "react";

function Setter({ onStartClick }: { onStartClick: (e: React.FormEvent<HTMLFormElement>) => void }) {
  return (
    <form onSubmit={onStartClick}>
      <input name='HH' placeholder='HH' type="number" defaultValue={0} />:
      <input name='MM' placeholder='MM' type="number" defaultValue={0} />:
      <input name='SS' placeholder='SS' type="number" defaultValue={0} />
      <button>Start</button>
    </form>
  )
}

function Counter({ counterTime, handleReset, handlePause }: { counterTime: number, handleReset: () => void, handlePause: () => void }) {
  
  let HH = Math.floor(counterTime / 3600)
  let MM = Math.floor((counterTime % 3600) / 60)
  let SS = Math.floor(counterTime % 60)

  return (
    <div>
      <span>{HH}:{MM}:{SS}</span>
      <button onClick={handlePause}>Pause</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  )
}

function Timer() {
  const [isReset, setIsReset] = useState(true)
  const [counterTime, setCounterTime] = useState(0)
  const [curTimer, setCurTimer] = useState<NodeJS.Timeout | null>(null)
  const isPause = useRef(false)
  
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    let HH = parseInt(data.get("HH") as string, 0)
    let MM = parseInt(data.get("MM") as string, 0)
    let SS = parseInt(data.get("SS") as string, 0)
    let duration = HH * 3600 + MM * 60 + SS
    if (HH >= 0 && MM >= 0 && SS >= 0 && duration > 0) {
      setIsReset(false)
      setCounterTime(duration)
      startTimer()
    }
  }

  function startTimer() {
    let newTimer = setInterval(() => {
      setCounterTime(prev => {
        if (prev <= 1) {
          clearInterval(newTimer)
          setIsReset(true)
        }
        return (prev - 1)
      })
    }, 1000)

    setCurTimer(newTimer)
  }

  function handleReset() {
    setIsReset(true)
  }

  function handlePause() {
    isPause.current = !isPause.current
    if (isPause.current) {
      // handle null or type error
      if (curTimer != null) {
        clearInterval(curTimer)
      }
    } else {
      startTimer()
    }
  }

  if (isReset) {
    return <Setter onStartClick={handleSubmit}/>
  } else {
    return <Counter counterTime={counterTime} handleReset={handleReset} handlePause={handlePause} />
  }
}

export default function Home() {
  return (
    <div>
      <div>Countdown Timer</div>
      <Timer />
    </div>
  )
}
