import './App.css'

function App() {
  return (
    <div className="container">
      <input type="text" className="search" placeholder='Input a Sentence to Store'/>
      <div className="btn-container">
        <button className="clear-btn">
          Clear
        </button>
        <button className="search-btn">
          Store
        </button>
      </div>
      <div className="output">
        <div className='section parser'>
          Line to Store
          <hr/>
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
