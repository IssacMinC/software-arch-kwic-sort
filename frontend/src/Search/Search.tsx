import { useState } from 'react'
import './Search.css'


function Search() {
    const [desc, setDesc] = useState('')
    const [results, setResults] = useState(['a', 'b', 'c'])

    async function onStore() {
        fetch('http://127.0.0.1:5000/store', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json' 
        },
            body: JSON.stringify({line: desc}) 
        })
        .then(response => {
            const data = response.json(); 
            return data
        }).then((data) => {
            console.log(data)
            setResults(data)
        }
        )
    }

    function onClear(){
        setDesc('')

    }

    return (
        <div className="container">
            <div className="store">
                <input type="text" value={desc} onChange={(e) => {setDesc(e.target.value)}} id="search" className="search inp" placeholder='Enter a sentence to search'/>
            </div>

            <div className="btn-container">
                <button className="clear-btn" onClick={onClear}>
                Clear All
                </button>
                <button className="store-btn" onClick={onStore}>
                Store
                </button>
            </div>
            <div className="results">
                <p className="res-text">
                    Results
                </p>
                <hr className="res-hr"/>
                {results.map((item, index) => (
                    <p key={index}>
                        {item}
                    </p>
                    
                ))}
            </div>
        </div>
    )
}

export default Search