const { Server } = require('ws');

const sockserver = new Server({ port: 8000 });

var serverClients = {};
sockserver.on('connection', (ws, req) => {
    console.log('new client connnected!',);
    const sessionId = req.url;

    ws.on('close', () => console.log('Client has disconnected!'));
    ws.on('message', (data) => {

        console.log('recieved from Client!', data, sockserver.clients[0]);

        // sockserver.clients.forEach(client => {
        //     serverClients[sessionId] = { ...serverClients[sessionId], client };
        // })



        sockserver.clients.forEach((client) => {
            client.send(data);
        });
    }
    );



});

// setInterval(() => {
//     sockserver.clients.forEach((client) => {
//         const data = JSON.stringify({ 'type': 'time', 'time': new Date().toTimeString() });
//         client.send(data);
//     });

// }, 1000);