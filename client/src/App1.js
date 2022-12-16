import React, { useEffect } from 'react'
import WebSocket, { WebSocketServer } from 'ws';

const App1 = () => {

    useEffect(() => {
        var client = new WebSocket('ws://localhost:8000/');

        console.log(client);

    }, [])

    return (
        <div>App1</div>
    )
}

export default App1