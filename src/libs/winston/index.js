const winston = require('winston')

const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(winston.format.cli()),
  transports: [
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json()
      )
    }),
    new winston.transports.File({
      filename: 'logs/error.log',
      format: winston.format.combine(winston.format.cli())
    })
  ]
})

// if (env.ENVIRONMENT !== "PRODUCTION") {
//   logger.add(
//     new winston.transports.Console({
//       format: winston.format.combine(
//         winston.format.colorize(),
//         winston.format.simple()
//       ),
//     })
//   );
// }

module.exports = logger
