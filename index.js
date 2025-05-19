/** @format */

// 1. Import required modules
const express = require('express');
const sharder = require('./sharder'); // custom logic
const { CodeX } = require('./src/client'); // bot logic

// 2. Setup Express app
const app = express();
const port = process.env.PORT || 3000;

// 3. Basic route
app.get('/', (req, res) => {
  res.send(sharder.getShardInfo());
});

// 4. Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// 5. Console art (optional)
console.log(`
░█████╗░░█████╗░██████╗░███████╗██╗░░██╗
██╔══██╗██╔══██╗██╔══██╗██╔════╝╚██╗██╔╝
██║░░╚═╝██║░░██║██║░░██║█████╗░░░╚███╔╝░
██║░░██╗██║░░██║██║░░██║██╔══╝░░░██╔██╗░
╚█████╔╝╚█████╔╝██████╔╝███████╗██╔╝╚██╗
░╚════╝░░╚════╝░╚═════╝░╚══════╝╚═╝░░╚═╝
`);

// 6. Parse shard info from environment variables
const shardCount = Number(process.env.SHARD_COUNT) || 1;
const shardIds = process.env.SHARD_IDS
  ? process.env.SHARD_IDS.split(',').map(id => Number(id))
  : [0];

// 7. Connect your custom client/bot with shard options
const client = new CodeX({
  shards: shardIds,
  shardCount: shardCount,
});

client.connect();

// 8. Export client if needed elsewhere
module.exports = client;

// 9. Final log
console.log(`Made By Ray`);
