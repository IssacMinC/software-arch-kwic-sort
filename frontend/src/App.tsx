import './App.css'
import Store from './Store/Store'
import Search from './Search/Search'
import Delete from './Delete/Delete'
import { useState } from 'react'

function App() {
  const [mode, setMode] = useState<'store' | 'search' | 'delete'>('search')

  return(
    <>
      <div className="c">
        <button className={`sw ${mode == 'store' ? "active" : ""}`} onClick={() => setMode('store')}>
          Store
        </button>
        <div className="vl"/>
        <button className={`sw ${mode == 'search' ? "active" : ""}`} onClick={() => setMode('search')}>
          Search
        </button>
        <div className="vl"/>
        <button className={`sw ${mode == 'delete' ? "active" : ""}`} onClick={() =>setMode('delete')}>
          Delete
        </button>
      </div>
      {
        mode == 'search' ? <Search/> : mode == 'store' ? <Store/> : <Delete/>
      } 
    </>)
}

export default App
