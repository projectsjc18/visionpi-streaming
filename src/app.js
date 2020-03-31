var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const db = require('./config/db');
var Customers = require('./models/customer');
var service = require('./services/service');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// Get all clients
Customers.find({}, function(error, customers){
  customers.forEach(function(customer) {
    customers.messages.forEach(function(message){
      if(message.type === 'receive'){
        service.message(customer);
      }else if(message.type === 'receive'){
        service.video(customer);
      }
    });
  });
});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('video_room', function(room) {
    console.log('Joined room' + room)
    socket.join(room);
  });

  socket.on('data', function(data) {
    //console.log(data.camera);
    //socket.broadcast.emit('data', data);
    io.to(data.room).emit(data.camera, data.message);
	});

  socket.on('video', function(data) {
    console.log('Video');
    console.log(data);
    io.to(data.room).emit('video', data.message);
	  //socket.broadcast.emit('video', data);
	});

  socket.on('video_stop', function(data) {
    //socket.broadcast.emit('video_stop', data);
    io.to(data.room).emit('video_stop', data.message);
  })

});


http.listen(5678, function(){
  console.log('listening on *:5678');
});
