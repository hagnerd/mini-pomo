import * as React from 'react'
import useLocalStorage from '../use-local-storage';

interface PomoSettings {
  /** The number of minutes you would like to focus for */
  focusLength: number;
  /** The number of minutes you would like to break for */
  breakLength: number;
}

function Form() {
  const [ formState, setFormState ] = useLocalStorage<PomoSettings>('mini-pomo-settings', 
    { focusLength: 25, breakLength: 5}
  )

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement> ) {

  }

  return (
    <form>
      <label htmlFor="focusLength">Focus Length:</label>
      <input id="focusLength" name="focusLength" type="range" min="1" max="60" value={formState.focusLength} onChange={handleChange} />
      <label htmlFor="breakLength">Break Length:</label>
      <input id="breakLength" name="breakLength" type="range" min="1" max="60" value={formState.breakLength} onChange={handleChange} />

      <button type="submit">Save Settings</button>
    </form>
  )
}

export default function Settings() {
  return (
    <React.Fragment>
      <h2>Settings Page</h2>

    </React.Fragment>
  );
}