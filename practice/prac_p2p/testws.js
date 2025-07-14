const WebSocket = require('ws');
const readline = require('readline');

const ws = new WebSocket('ws://localhost:3001');

ws.on('open', () => {
  console.log('connected');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  function ask() {
    rl.question('line: ', (lineStr) => {
      const line = parseInt(lineStr);
      rl.question('content: ', (content) => {
        const msg = {
          file: 'file.js', 
          line,
          content
        };
        ws.send(JSON.stringify(msg));
        ask();
      });
    });
  }

  ask();
});

ws.on('message', (data) => {
  console.log('response:', data.toString());
});

ws.on('close', () => {
  console.log('closed');
});
