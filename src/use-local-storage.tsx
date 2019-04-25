import * as React from 'react'
import { Dispatch } from 'react'

export default function useLocalStorage<T>(name: string, value: T): [T, Dispatch<T>] {
  const [ state, updateState] = React.useState<T>(() => {

    if (typeof window !== 'undefined') {
      // We are in the browser and can safely use localStorage
      const payload = JSON.stringify(value);  

      let local = localStorage.getItem(name);
      if (local !== null) {
        return JSON.parse(local);
      } else {
        localStorage.setItem(name, payload);
        return value;
      }
    } else {
      return value;
    }    
  })

  React.useEffect(() => {
    localStorage.setItem(name, JSON.stringify(state));
  }, [state])

  return [
    state,
    updateState,
  ]
}