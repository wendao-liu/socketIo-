'use strict';

let express = require('express');
let path = require('path');
let { createServer } = require('http');

let WebSocket = require('ws');

let app = express();
// app.use(express.static(path.join(__dirname, '/index.html')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})

let server = createServer(app);
let wss = new WebSocket.Server({ server });
let wsArr = [];
wss.on('connection', function connection(ws) {
  wsArr.push(ws);
  console.log('connection~~', '成功连接个数', wsArr.length)
  ws.on('message', function incoming(message) {
    wsArr.forEach((wsItem) => {
      wsItem.send(message);
    })
  });
  //关闭websocket触发
  // ws.on('close', function () {
  //   console.log('stopping client interval');
  // });
});

server.listen(8080, function () {
  console.log('Listening on http://localhost:8080');
});