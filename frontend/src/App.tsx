import './App.css'
import { useState } from 'react'

function App() {

  const [sentence, setSentence] = useState('')

  const [storeSent, setStoreSent] = useState('')
  const [shifts, setShifts] = useState([])
  const [alphas, setAlphas] = useState([])
  const [store, setStore] = useState([])

  async function onStore() {
    setStoreSent(sentence)
    fetch('http://127.0.0.1:5000/store', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json' 
    },
      body: JSON.stringify({line: sentence}) 
    })
    .then(response => {
      const data = response.json(); 
      return data
    }).then((data) => {
      console.log(data)
      setData(data)
    }
    )
  }

  function onClear(){
    setSentence('')
    setStoreSent('')
    setShifts([])
    setAlphas([])
    setStore([])
  }

  function setData(data:any){
    setShifts(data.shifts)
    setAlphas(data.alphas)
    setStore(data.store)
  }

  return (
    <div className="container">
      <input type="text" value={sentence} onChange={(e) => {setSentence(e.target.value)}}id="search" className="search" placeholder='Input a Sentence to Store'/>
      <div className="btn-container">
        <button className="clear-btn" onClick={onClear}>
          Clear All
        </button>
        <button className="store-btn" onClick={onStore}>
          Store
        </button>
      </div>
      <div className="output">
        <div className='section parser'>
          Line to Store
          <hr/>
          {storeSent}
        </div>
        <div className='section shifter'>
          Circular Shifts
          <hr/>
          <ul className="map">
            {
              shifts.map((s) => {
                return <li>{s}</li>
              })
            }
          </ul>
        </div>
        <div className='section alphabetizer'>
          Alphabetized Lines
          <hr/>
          <ul className="map">
            {
              alphas.map((s) => {
                return <li>{s}</li>
              })
            }
          </ul>
        </div>
        <div className='section database'>
          Database
          <hr/>
          <ul className="map">
            {
              store.map((s) => {
                return <li>{s}</li>
              })
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App
