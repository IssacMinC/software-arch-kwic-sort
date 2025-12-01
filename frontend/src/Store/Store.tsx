import { useState } from 'react'
import './Store.css'

function Store() {

    const URL_REGEX = /^http:\/\/[a-zA-Z0-9]+\.[a-zA-Z0-9]+\.(?:edu|com|org|net)$/;

    const [desc, setDesc] = useState('')
    const [url, setUrl] = useState('')
    const [storeSent, setStoreSent] = useState([''])
    const [shifts, setShifts] = useState([])
    const [alphas, setAlphas] = useState([])
    const [urlError, setUrlError] = useState('');

    async function onStore() {
        if (!URL_REGEX.test(url)) {
            setUrlError("Invalid URL format.");
            return; 
        }
        setUrlError("");
        setStoreSent([url, desc])

        fetch('http://127.0.0.1:5000/store', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json' 
        },
            body: JSON.stringify({url: url, desc: desc}) 
        })
        .then(response => {
            const data = response.json(); 
            return data
        }).then((data) => {
            setData(data)
        }
        )
    }

    function onClear(){
        setDesc('')
        setUrl('')
        setStoreSent([''])
        setShifts([])
        setAlphas([])
    }

    function setData(data:any){
        setShifts(data.shifts)
        setAlphas(data.alphas)
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
                    autoCorrect="on"
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
                    <h2>
                        Pair to Store
                    </h2>
                    <hr/>
                    <div className='pair'>
                        <a href={storeSent[0]}>{storeSent[0]}</a>
                        <div>{storeSent[1]}</div>
                    </div>
                    
                </div>
                <div className='section shifter'>
                    <h2>
                        Circular Shifts
                    </h2>
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
                    <h2>
                        Alphabetized Lines
                    </h2>
                    <hr/>
                    <ul className="map">
                        {
                        alphas.map((s) => {
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