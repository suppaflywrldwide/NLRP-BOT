/** @format */
console.log(`
░█████╗░░█████╗░██████╗░███████╗██╗░░██╗
██╔══██╗██╔══██╗██╔══██╗██╔════╝╚██╗██╔╝
██║░░╚═╝██║░░██║██║░░██║█████╗░░░╚███╔╝░
██║░░██╗██║░░██║██║░░██║██╔══╝░░░██╔██╗░
╚█████╔╝╚█████╔╝██████╔╝███████╗██╔╝╚██╗
░╚════╝░░╚════╝░╚═════╝░╚══════╝╚═╝░░╚═╝`);

const express = require('express');
const sharder = require('./sharder'); // your sharder.js module
const { CodeX } = require('./src/client');

const app = express();
const port = process.env.PORT || 3000;

// Basic route
app.get('/', (req, res) => {
  res.send(sharder.getShardInfo());
});

// Start Express server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Connect your bot client
const client = new CodeX();
client.connect();

module.exports = client;

console.log(`Made By Ray`);
