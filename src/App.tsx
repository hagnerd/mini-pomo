import React from 'react';

import { TimeDisplay } from './components/TimeDisplay';
import { SuccessTracker } from './components/SuccessTracker';
import { useCountDown } from './useCountDown';
import { useTally } from './useTally';

export default function App() {
  const successFailure = useTally();
  const { isTimerRunning, seconds, quitCycle, startCycle, minutes } = useCountDown({
    length: 25,
    onQuit: () => {
      successFailure.markFailure();
    },
    onSuccessfulEnd: () => {
      successFailure.markSuccess();
    }
  });

  return (
    <React.Fragment>
      <main>
        <TimeDisplay minutes={minutes} seconds={seconds} />
        <hr />
        <SuccessTracker statuses={successFailure.status} />
        <h4>Failure Counter: {successFailure.status.filter(s => s === 'FAILURE').map(() => <span>I</span>)}</h4>

        <button onClick={!isTimerRunning ? startCycle : quitCycle}>{isTimerRunning ? 'Stop' : 'Start'}</button>
      </main>
    </React.Fragment>
  )
}