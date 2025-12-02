import { useState } from 'react'
import './Delete.css'


function Delete() {
    const [url, setUrl] = useState('')
    const [status, setStatus] = useState('')

    async function onStore() {
        fetch('http://127.0.0.1:5000/delete', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json' 
        },
            body: JSON.stringify({url: url}) 
        })
        .then(response => {
            const data = response.json(); 
            return data
        }).then((data) => {
            setStatus(data.status)
        }
        )
    }

    return (
        <div className="container">
            <div className="store">
                <input type="text" value={url} onChange={(e) => {setUrl(e.target.value)}} id="delete" className="delete inp" placeholder='Enter a URL to delete'/>
            </div>
            <div className="btn-container">
                <button className="store-btn" onClick={onStore}>
                    Delete
                </button>
            </div>
            <div className="results">
                <p className="res-text">
                    Status
                </p>
                <hr className="res-hr"/>
                {status}
            </div>
        </div>
    )
}

export default Delete