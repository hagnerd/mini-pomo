import React from 'react';
import { Status } from '../useTally';

interface SuccessTrackerProps {
  statuses: Status[];
}

export const SuccessTracker: React.FC<SuccessTrackerProps> = ({ statuses }) => {
  return (
    <h4>
      Success Count: {statuses.filter(s => s === 'SUCCESS' ? true : false).map(() => <span>I</span>)}
    </h4>
  );
};
