const DOMAIN = require('../config/conf').DOMAIN;
const GetLogonData = require('./getLogonData');
const http = require('http');
const id = require('uuid');
const Rx = require('rxjs');

const Server = require('socket.io');

let logonData = new GetLogonData();
let io = new Server();

let clientStack = {};

let procStack = {};

let clientMaker$ = new Rx.Subject();

io.on('connection', (client) => {
  console.log(client.handshake)

  // Check for CORS
  if (client.handshake.headers.origin != DOMAIN) {
    console.log('Client Failed CORS test, disconnected');
    // write connection to logs
    logonData.save('wsLogs', {status: 403, handshake: client.handshake})
    // disconnect this limp handshake
    client.disconnect();
  }

  // if everything looks ok handle the client
  if (client.handshake.headers.origin === DOMAIN) {
    client.id = id.v1();
    procStack[client.id] = logonData.stream();
    clientMaker$.next(client);

  } else { client.disconnect() }

})

let removeClient = function(client) {
  io.disconnect(client.socket);
  procStack[client.id] = null;

}

let handleClient = function(client) {
  // basic security middleware check doge packets
  client.use((packet, next) => {
    if (packet.doge === true) return next();
    next(new Error('Not a doge error'));
  })

  console.log('New Connection', client.handshake.address);

  // Write connection to logs
  logonData.save('wsLogs', {status: 200, handshake: client.handshake});

  // send greeting to client
  client.emit('message', '[wss] Connection established');

  client.emit('message', '[Client Id]', client.id);

  procStack[client.id].subscribe(data => {
    client.emit('data', data);
    let i = 0;
    ++i;
    if (i > 10) procStack[client.id] = null;
  });
};

clientMaker$.subscribe(client => {
  clientStack[client.id] = client;
  handleClient(clientStack[client.id]);
})


io.listen(3003,() => {
    console.log('Websocket Server started on 3003')
});
