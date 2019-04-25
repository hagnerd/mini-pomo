import React from 'react'
import { useInterval } from './useInterval';

interface UseCountDownOutput {
  isTimerRunning: boolean;
  minutes: number;
  seconds: number;
  quitCycle(): void;
  startCycle(): void;
}

interface UseCountDownInputs {
  /** number of minutes for the timer */
  length: number;
  /** A callback that will execute anything you need to run on quit */
  onQuit?: () => void;
  /** A callback that will execute anything you need to run on start */
  onStart?: () => void;
  /** A callback that will execute anything you need to run on successful end */
  onSuccessfulEnd?: () => void;
}

/**
 * 
 * @param length The number of minutes you want your timer to start with
 * @param onQuit A callback that executes any functions that you want/need run when the timer is quit
 * @param onStart A callback that executes any functions you want/need run when the timer starts
 * @param onFinish A callback that executes any functions you want/need run when the timer finishes successfully
 */
export function useCountDown({ length, onQuit, onStart, onSuccessfulEnd }: UseCountDownInputs): UseCountDownOutput {
  const [isTimerRunning, setIsTimerRunning] = React.useState(false);
  const [timeRemaining, setTimeRemaining] = React.useState(length * 60);


  function quitCycle() {
    setIsTimerRunning(false);
    // Extract and pass into as onquit
    setTimeRemaining(1500);

    if (onQuit !== undefined) {
      onQuit();
    }
  }

  function startCycle() {
    setIsTimerRunning(true);

    if (onStart !== undefined) {
      onStart()
    }
  }

  function success() {
    setIsTimerRunning(false);
    if (onSuccessfulEnd !== undefined) {
      onSuccessfulEnd();
    }
  }

  useInterval(() => {
    if (timeRemaining > 0) {
      setTimeRemaining(t => t - 1)
    }
    if (timeRemaining === 0) {
      success();
    }
  }, isTimerRunning ? 1000 : null)

  const minutes = Math.floor(timeRemaining / 60)
  const seconds = timeRemaining % 60

  return {
    isTimerRunning,
    minutes,
    seconds,
    startCycle,
    quitCycle,
  };
}
