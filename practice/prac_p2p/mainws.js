const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');

const wss = new WebSocket.Server({ port: 3001 });

console.log('ws started');

wss.on('connection', (ws) => {
  console.log('a new client connected');

  ws.on('message', (message) => {
    try {
      const { file, line, content } = JSON.parse(message);
      if (!file || typeof line !== 'number' || content === undefined) {
        ws.send(JSON.stringify({ error: 'payload wrong'}));
        return;
      }

      const filePath = path.resolve(__dirname, file);

      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, '', 'utf8');
      }

      let lines = fs.readFileSync(filePath, 'utf8').split('\n');

      while (lines.length < line) {
        lines.push('');
      }

      lines[line - 1] = content;

      fs.writeFileSync(filePath, lines.join('\n'), 'utf8');

      ws.send(JSON.stringify({ status: 'success', line, content }));

      // wss.clients.forEach(client => {
      //   if (client.readyState === WebSocket.OPEN) {
      //     client.send(JSON.stringify({ updatedLine: line, newContent: content }));
      //   }
      // });

    } catch (e) {
      ws.send(JSON.stringify({ error: 'failed to update file', details: e.message }));
    }
  });

  ws.on('close', () => {
    console.log('closed');
  });
});
