

const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid');
const WebSocket = require('ws');

const PORT = 3001;


const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

//helper function to broadcast data to all clients
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};


wss.on('connection', (ws) => {
  console.log('Client connected');
//count how many users are connected and broadcast to all clients
   wss.broadcast({type:'counter', data:  wss.clients.size})


  //listening for message from client, change message type and include id and send back message
  ws.on('message',(data) =>{

    var data =JSON.parse(data)
    if (data.type === "postMessage"){
      data.username? data.username : "Anonymous"
      data.id= uuid.v4();
      data.type = "incomingMessage"
      wss.broadcast(data)  
    }

    else if (data.type === "postNotification"){
      data.id= uuid.v4();
      data.type = "incomingNotification"
      wss.broadcast(data)
   
    }
      
  });
  
  ws.on('close', () => {
    //send updated number of clients after clients disconnect
    wss.broadcast({type:'counter', data:  wss.clients.size})
    console.log('Client disconnected');
  });
});

