const pino = require('pino');

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  prettyPrint: {
    levelFirst: true,
  },
});

module.exports = logger;
