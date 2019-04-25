import React from 'react';

export const TimeDisplay: React.FC<{
  minutes: number;
  seconds: number;
}> = ({ minutes, seconds }) => {
  return (<React.Fragment>
    <h3>{minutes}: {seconds < 10 ? `0${seconds}` : seconds}</h3>
  </React.Fragment>);
};
