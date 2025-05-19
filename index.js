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

// Read shard info from env or use default
const shardCount = Number(process.env.SHARD_COUNT) || 1;
const shardId = process.env.SHARD_ID !== undefined ? Number(process.env.SHARD_ID) : 0;

// Connect your bot client with proper shard options
const client = new CodeX({
  shards: [shardId],
  shardCount: shardCount,
});
client.connect();

module.exports = client;

console.log(`Made By Ray`);
