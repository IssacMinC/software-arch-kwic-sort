import './App.css'
import { useState } from 'react'

function App() {

  const [sentence, setSentence] = useState('')

  const search = document.getElementById("search") as HTMLInputElement;

  function onStore() {
    setSentence(search.value)
  }

  return (
    <div className="container">
      <input type="text" id="search" className="search" placeholder='Input a Sentence to Store'/>
      <div className="btn-container">
        <button className="clear-btn">
          Clear
        </button>
        <button className="store-btn" onClick={onStore}>
          Store
        </button>
      </div>
      <div className="output">
        <div className='section parser'>
          Line to Store
          <hr/>
          {sentence}
        </div>
        <div className='section shifter'>
          Circular Shifts
          <hr/>
        </div>
        <div className='section alphabetizer'>
          Alphabetized Lines
          <hr/>
        </div>
        <div className='section database'>
          Database
          <hr/>
        </div>
      </div>
    </div>
  )
}

export default App
