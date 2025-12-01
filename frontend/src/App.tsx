import './App.css'
import Store from './Store/Store'
import Search from './Search/Search'
import { useState } from 'react'

function App() {
  const [mode, setMode] = useState(true)

  return(
    <>
      <div className="c">
        <button className={`sw ${!mode ? "active" : ""}`} onClick={() => setMode(false)}>
          Store
        </button>
        <div className="vl"/>
        <button className={`sw ${mode ? "active" : ""}`} onClick={() => setMode(true)}>
          Search
        </button>
      </div>
      {
        mode ? <Search/> : <Store/>
      } 
    </>)
}

export default App
