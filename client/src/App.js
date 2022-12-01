import React, { useEffect, useRef, useState } from 'react'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import "./App.css"

const getUniqueID = () => {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return s4() + s4() + '-' + s4();
};

const pathname = getUniqueID() + "/" + getUniqueID();

var client = new W3CWebSocket('ws://localhost:8000/' + pathname, 'echo-protocol');

window.history.pushState({}, null, pathname);

const App = () => {


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

        // function sendNumber() {
        //     if (client.readyState === client.OPEN) {
        //         var number = Math.round(Math.random() * 0xFFFFFF);
        //         client.send(number.toString());
        //         setTimeout(sendNumber, 1000);
        //     }
        // }


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