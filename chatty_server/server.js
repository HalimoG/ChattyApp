

const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid');

const PORT = 3001;


const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });
var counter = 0;

wss.on('connection', (ws) => {
  console.log('Client connected');
  counter++
  wss.clients.forEach(function (client){
    client.send(JSON.stringify({type:'counter', data: counter}))
  })

  ws.on('message',(data) =>{

    var data =JSON.parse(data)
    if (data.type === "postMessage"){
      data.username? data.username : "Anonymous"
      data.id= uuid.v4();
      data.type = "incomingMessage"
      wss.clients.forEach(function (client){
        client.send(JSON.stringify(data))
      })
   
    }
    else if (data.type === "postNotification"){
      data.id= uuid.v4();
      data.type = "incomingNotification"
      wss.clients.forEach(function (client){
        client.send(
          JSON.stringify(data)
          )
      })
   
    }
      
  });
  
  ws.on('close', () => {
    counter--
    wss.clients.forEach(function (client){
      client.send(JSON.stringify({type:'counter', data: counter}))
    })
    console.log('Client disconnected');
  });
});

