/** @format */

const express = require('express');
const sharder = require('./sharder'); // your sharder
const { CodeX } = require('./src/client'); // your bot client

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(sharder.getShardInfo());
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

console.log(`
░█████╗░░█████╗░██████╗░███████╗██╗░░██╗
██╔══██╗██╔══██╗██╔══██╗██╔════╝╚██╗██╔╝
██║░░╚═╝██║░░██║██║░░██║█████╗░░░╚███╔╝░
██║░░██╗██║░░██║██║░░██║██╔══╝░░░██╔██╗░
╚█████╔╝╚█████╔╝██████╔╝███████╗██╔╝╚██╗
░╚════╝░░╚════╝░╚═════╝░╚══════╝╚═╝░░╚═╝
`);

const shardCount = Number(process.env.SHARD_COUNT) || 1;
const shardId = Number(process.env.SHARD_ID) || 0;

const client = new CodeX({
  shardId: shardId,
  shardCount: shardCount,
});

client.connect();

module.exports = client;

console.log(`Made By Ray`);
