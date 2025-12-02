import { useState } from 'react'
import './Search.css'


function Search() {
    const [desc, setDesc] = useState('')
    const [results, setResults] = useState<{ title: string, description: string, url: string }[]>([])
    const [lenError, setLenError] = useState('');
    const [resultsOrder, setResultsOrder] = useState('alphabetical');
    const [searchType, setSearchType] = useState('or');

    async function onSearch() {
        setResults([])
        if(desc.trim().length == 0){
            setLenError("Search string can not be empty");
            return;
        }
        setLenError("");

        fetch(`http://127.0.0.1:5000/search/${searchType}/${resultsOrder}/${encodeURIComponent(desc)}`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json' 
        },
            body: JSON.stringify({line: desc}) 
        })
        .then(response => response.json())
        .then((data) => {
            console.log(data)
            setResults(data.results)
        }
        )
    }

    function onClear(){
        setDesc('')

    }

    return (
        <div className="container">
            <div className="search">
                <input type="text" value={desc} onChange={(e) => {setDesc(e.target.value)}} id="search" className="search inp" placeholder='Enter a sentence to search'/>
            </div>
            <div style={{display: "flex", flexWrap: "wrap", gap: "0 30px", justifyContent: "center"}}>
                <div className="select-container">
                    <div style={{display: "flex"}}>
                        <p style={{marginTop: "4px", marginRight: "5px"}}>Search by:</p>
                        <select id="results-order" className="select-menu" value={resultsOrder} onChange={(e) => setResultsOrder(e.target.value)}>
                            <option id="alphabetical" value = "alphabetical">Alphabetical Order</option>
                            <option id="frequency" value = "frequency">Most Frequently Accessed</option>
                            <option id="payment" value = "payment">Payment Options</option>
                        </select>
                    </div>
                    <select id="search-type" className="select-menu" value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                        <option id="or" value = "or">OR Search</option>
                        <option id="and" value = "and">AND Search</option>
                        <option id="not" value = "not">NOT Search</option>
                    </select>
                </div>
                <div className="btn-container">
                    <button className="clear-btn" onClick={onClear}>
                    Clear Keywords
                    </button>
                    <button className="search-btn" onClick={onSearch}>
                    Search
                    </button>
                </div>
            </div>
            {lenError && <p className="error-message" style={{ color: 'red' }}>{lenError}</p>}
            <div className="results">
                <p className="res-text">
                    Results
                </p>
                <hr className="res-hr"/>
                {results.map((item, index) => (
                        <div key={index} className="result-item">
                        {item.title}<br />
                        <a href={item.url} target="_blank">{item.url}</a><br />
                        {item.description}
                    </div>
                    
                ))}
            </div>
        </div>
    )
}

export default Search