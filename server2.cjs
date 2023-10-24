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

const connectedSocketIds = new Set();

io.on('connection', (socket) => {
  console.log('A client connected: ' + socket.id);

  // Menambahkan Socket ID ke daftar saat koneksi baru
  connectedSocketIds.add(socket.id);
  updateConnectedSocketIds();

  // Menghapus Socket ID dari daftar saat koneksi terputus
  socket.on('disconnect', () => {
    connectedSocketIds.delete(socket.id);
    updateConnectedSocketIds();
    console.log('Client disconnected: ' + socket.id);
  });

  // Mendapatkan daftar Socket IDs saat permintaan
  socket.on('getSocketIds', () => {
    const socketIdsArray = Array.from(connectedSocketIds);
    console.log(socketIdsArray)
    io.emit('socketIds', socketIdsArray);
  });
});

function updateConnectedSocketIds() {
  const socketIdsArray = Array.from(connectedSocketIds);
  io.emit('socketIds', socketIdsArray);
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Socket.IO server running at http://localhost:${PORT}`);
});
