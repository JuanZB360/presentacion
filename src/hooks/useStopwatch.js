import { useState, useEffect, useCallback } from 'react'

/**
 * SRP: Hook dedicated solely to stopwatch timing logic and formatting
 */
export function useStopwatch() {
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let interval = null
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning])

  const start = useCallback(() => setIsRunning(true), [])
  const pause = useCallback(() => setIsRunning(false), [])
  const toggle = useCallback(() => setIsRunning((prev) => !prev), [])
  const reset = useCallback(() => {
    setSeconds(0)
    setIsRunning(false)
  }, [])

  const formattedTime = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`

  return {
    seconds,
    isRunning,
    start,
    pause,
    toggle,
    reset,
    formattedTime,
  }
}
