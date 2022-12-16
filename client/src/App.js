import React, { useEffect, useRef, useState } from 'react'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { ethers } from 'ethers';
import "./App.css"

const getUniqueID = () => {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return s4() + s4() + '-' + s4();
};


// if (window.ethereum) {
//     window.ethereum.request({ method: 'eth_requestAccounts' })
//         .then(res => {
//             accountChangedHandler(res[0]);
//         })
// } else {
//     alert("install metamask extension!!")
// }


// const accountChangedHandler = (newAccount) => {
//     getUserBalance(newAccount.toString());
// }

// const getUserBalance = (account) => {

//     window.ethereum.request({ method: 'eth_getBalance', params: [account, 'latest'] })
//         .then(balance => alert('address: ' + account + '\nBalance: ' + ethers.utils.formatEther(balance)))

//     console.log(account);
// }

// window.ethereum.on('accountsChanged', accountChangedHandler);
// window.ethereum.on('chainChanged', () => window.location.reload());

const App = ({ pathname }) => {


    // if (pathname === "/") {
    //     pathname = getUniqueID() + "/" + getUniqueID();
    //     window.history.pushState({}, null, pathname);
    // } else {
    //     pathname = pathname.replace("/", "");
    // }


    const client = new W3CWebSocket('ws://localhost:8000/' + pathname, 'echo-protocol')

    const [getData, setgetData] = useState('')
    const [Error, setError] = useState("");
    const sendData = (e) => {
        if (client.readyState === client.OPEN) {
            setgetData(e.target.value)
            client.send(e.target.value);
            // setTimeout(sendNumber, 1000);
        }
    }

    useEffect(() => {


        client.onerror = function () {
            console.log('Connection Error');
            setError("Server conncetion failed!");
        }

        client.onopen = function () {
            console.log('WebSocket Client Connected');
            setError("WebSocket Client Connected!");

        };

        client.onclose = function () {
            console.log('echo-protocol Client Closed');
        };

        client.onmessage = function (e) {
            if (typeof e.data === 'string') {
                console.log(e.data);
                setgetData(e.data);
            }
        };

    }, [])

    return (
        <>
            <h1>Web Socket</h1>
            <textarea value={getData} onChange={sendData} rows={5} cols={50} />
            {Error && <div className='alert'>{Error}</div>}
            {/* <h2>Connections:</h2>
            <ul>
            </ul> */}
        </>)
}

export default App;