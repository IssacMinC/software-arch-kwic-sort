import { useState } from 'react'
import './Store.css'

function Store() {

    const URL_REGEX = /^http:\/\/[a-zA-Z0-9]+\.[a-zA-Z0-9]+\.(?:edu|com|org|net)$/;

    const [desc, setDesc] = useState('')
    const [url, setUrl] = useState('')
    const [storeSent, setStoreSent] = useState('')
    const [shifts, setShifts] = useState([])
    const [alphas, setAlphas] = useState([])
    const [store, setStore] = useState([])
    const [urlError, setUrlError] = useState('');

    async function onStore() {
        if (!URL_REGEX.test(url)) {
            setUrlError("Invalid URL format. Must be 'http://identifier.identifier.tld' where tld is .edu, .com, .org, or .net.");
            return; 
        }
        setStoreSent(desc)
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
            setData(data)
        }
        )
    }

    function onClear(){
        setDesc('')
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
            <div className="store">
                <input 
                    className="url inp" 
                    type="text" 
                    value={url} 
                    onChange={(e) => {setUrl(e.target.value)}} 
                    id="url"   
                    placeholder='Input a URL'
                />
                <input 
                    className="desc inp" 
                    id="desc"
                    type="text" 
                    value={desc} 
                    onChange={(e) => {setDesc(e.target.value)}} 
                    placeholder='Input a Description'
                />
            </div>
                            {urlError && <p className="error-message" style={{ color: 'red' }}>{urlError}</p>}


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

export default Store