/** @format */

const logger = require('./utils/plugins/logger.js');
const { token } = require('./configuration/config.js');
const { ClusterManager } = require('discord-hybrid-sharding');

// Create ClusterManager to handle shards and clusters
const manager = new ClusterManager('./index.js', {
  totalShards: 'auto',      // Auto detect number of shards
  mode: 'process',          // Use child processes for clusters
  token: token,
  respawn: true,            // Restart clusters on crash
  restarts: {
    max: 5,                 // Max restarts allowed
    interval: 10000,        // Time window to reset restart count (ms)
  },
});

// Log debug info via your custom logger
manager.on('debug', (message) => logger.log(message, 'shard'));

// Spawn clusters, wait indefinitely for them to be ready
manager.spawn({ timeout: -1 });

// Provide shard info for your express route
function getShardInfo() {
  return 'Cluster Manager is running';
}

module.exports = { getShardInfo };
