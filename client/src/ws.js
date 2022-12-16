import React, { useState } from 'react'

const path = window.location.pathname;


const Ws = () => {

    const [data, setdata] = useState('');
    const client = new WebSocket("ws://localhost:8000" + path, "echo-protocol");

    client.onerror = function () {
        console.log('Connection Error');
    };

    client.onopen = function () {
        console.log('connected');
    };



    client.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setdata(data);
        console.log(data);
    }
    const send = (text) => {

        if (client.readyState === client.OPEN) {
            client.send(JSON.stringify(text.target.value));
        }
    }


    return (
        <textarea value={data} onChange={send}></textarea>

    )
}

export default Ws;