<!-- <!DOCTYPE html>
<html>
<head>
    <title>Chat App</title>
    <script src="{{asset('files/js/socket.js')}}"></script>
</head>
<body>
    <div id="app">
        <input type="text" id="messageInput" placeholder="Type your message" />
        <button id="sendButton">Send</button>

        <ul id="messages"></ul>
    </div>

    <script>
        const socket = io('http://localhost:3000');

        document.getElementById('sendButton').addEventListener('click', () => {
            const message = document.getElementById('messageInput').value;
            socket.emit('message', message);
        });

        socket.on('message', (message) => {
            const messagesList = document.getElementById('messages');
            const messageItem = document.createElement('li');
            messageItem.innerText = message;
            messagesList.appendChild(messageItem);
        });
    </script>
</body>
</html> -->

<!DOCTYPE html>
<html>
<head>
  <title>Socket IDs List</title>
</head>
<body>
  <ul id="socketIds"></ul>

  <script src="https://cdn.socket.io/3.0.4/socket.io.min.js"></script>
  <script>
    const socket = io('http://localhost:3000');
    const socketIdsList = document.getElementById('socketIds');

    // Memperbarui daftar Socket IDs saat ada koneksi baru
    socket.on('connect', () => {
      socketIdsList.innerHTML = '';  // Mengosongkan daftar sebelum memperbarui
      updateSocketIds();
    });

    // Memperbarui daftar Socket IDs saat ada koneksi yang terputus
    socket.on('disconnect', () => {
      socketIdsList.innerHTML = '';  // Mengosongkan daftar sebelum memperbarui
      updateSocketIds();
    });

    socket.on('socketIds', (data) => {
        data.forEach((socketId) => {
          const listItem = document.createElement('li');
          listItem.innerText = socketId;
          socketIdsList.appendChild(listItem);
        });
    });

    function updateSocketIds() {
      // Mendapatkan daftar Socket IDs dari server
      console.log("ee")
      socket.emit('getSocketIds', (socketIds) => {
        socketIds.forEach((socketId) => {
          const listItem = document.createElement('li');
          listItem.innerText = socketId;
          socketIdsList.appendChild(listItem);
        });
      });
    }
  </script>
</body>
</html>
