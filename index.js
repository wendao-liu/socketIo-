var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})

io.on('connect', socket => {
  // 响应用户发送的信息
  socket.on('chat message', function (msg) {
    console.log('chat message' + msg)
    io.emit('chat message', msg)
  })
});


http.listen(3001, () => {
  console.log('打开3001端口')
})