var WebSocketServer = require('websocket').server;
var http = require('http');
const { getUniqueID } = require('./assests/UniqueId.js');

var server = http.createServer(function (request, response) {
  console.log((new Date()) + ' Received request for ' + request.url);
  response.writeHead(404);
  response.end();
});
server.listen(8000, function () {
  console.log((new Date()) + ' Server is listening on port 8080');
});

wsServer = new WebSocketServer({
  httpServer: server,
  // You should not use autoAcceptConnections for production
  // applications, as it defeats all standard cross-origin protection
  // facilities built into the protocol and the browser.  You should
  // *always* verify the connection's origin and decide whether or not
  // to accept it.
  autoAcceptConnections: false
});

function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed.
  return true;
}

var clients = {};

wsServer.on('request', function (request) {


  var params = request.resourceURL.pathname.replace("/live-editor/", "");

  const userID = getUniqueID();



  if (!originIsAllowed(request.origin)) {
    // Make sure we only accept requests from an allowed origin
    request.reject();
    console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
    return;
  }

  var connection = request.accept('echo-protocol', request.origin);

  // const client = {};
  // client[userID] = connection;

  // clients[sessionId] = client;
  clients[userID] = connection;

  console.log(Object.keys(clients).length);

  console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients));
  connection.on('message', function (message) {
    if (message.type === 'utf8') {

      for (key in clients) {
        if (clients[key] !== clients[userID]) {
          clients[key].sendUTF(message.utf8Data);
          console.log('sent Message to: ', clients[key]);
        }
      }
    }
    else if (message.type === 'binary') {
      for (key in clients) {
        console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
        connection.sendBytes(message.binaryData);
      }
    }
  });
  connection.on('close', function (reasonCode, description) {
    console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
  });
});