const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Serve HTML page with JavaScript for WebSocket connection
app.get('/websocket', (req, res) => {
  res.sendFile(path.join(__dirname, 'websocket.html'));
});

// WebSocket server setup
wss.on('connection', (ws) => {
  // Connection established
  console.log('WebSocket connection established');

  // Handle messages from clients
  ws.on('message', (message) => {
    // Echo the received message back to the client
    ws.send(`Server: ${message}`);
  });

  // Handle WebSocket closure
  ws.on('close', () => {
    console.log('WebSocket connection closed');
  });
});

// Serve static files
app.use(express.static(path.join(__dirname)));

// Start the HTTP server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
