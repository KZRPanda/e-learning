const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:8000',  // Sesuaikan dengan origin aplikasi klien Anda
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('A client connected: ' + socket.id);

  socket.join("hello")
  // Menanggapi pesan dari klien
  socket.on('message', (message) => {
    console.log('Received message:', message);

    // Mengirim pesan ke klien lain
    //io.emit('message', message);
    io.to("hello").emit(message)
  });

  // Menanggapi event disconnect
  socket.on('disconnect', () => {
    console.log('Client disconnected: ' + socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Socket.IO server running at http://localhost:${PORT}`);
});
