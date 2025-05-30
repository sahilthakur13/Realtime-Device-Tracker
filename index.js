const express = require('express');
const app = express();
const path = require('path');
const http = require("http");
const socketio = require('socket.io');

app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'public')));


const server = http.createServer(app);
const io = socketio(server);

io.on("connection", function(socket){
    socket.on('send-location',function(data){
        io.emit('recive-location',{id: socket.id ,...data })
    })
    console.log('connected');
    socket.on('disconnect',function(){
        io.emit('user-disconnected',socket.id)
    })
});


app.get('/',function (req,res){
    res.render('index');
})

server.listen(3000,()=>{
    console.log('server starting at port 3000');
})