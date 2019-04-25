import React from 'react';

export type Status = 'SUCCESS' | 'FAILURE'

interface Action {
  type: 'MARK_SUCCESS' | 'MARK_FAILURE';
}

function reducer(state: Status[], action: Action): Status[] {
  switch (action.type) {
    case 'MARK_SUCCESS':
      return [...state, 'SUCCESS']
    case 'MARK_FAILURE':
      return [...state, 'FAILURE',
      ]
    default:
      return state;
  }
}

interface UseTallyOutput {
  status: Status[],
  markFailure(): void;
  markSuccess(): void;
}

export function useTally(): UseTallyOutput {
  const [status, dispatch] = React.useReducer(reducer, []);

  function markSuccess() {
    dispatch({ type: 'MARK_SUCCESS' })
  }
  function markFailure() {
    dispatch({ type: 'MARK_FAILURE' })
  }

  return {
    status,
    markSuccess,
    markFailure
  };
}
