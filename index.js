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

// 6. Connect your custom client/bot
const client = new CodeX();
client.connect();

// 7. Export client if needed elsewhere
module.exports = client;

// 8. Final log
console.log(`Made By Ray`);
