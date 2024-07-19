import * as winston from 'winston';
import * as path from 'path';

const logDir = path.join(__dirname, '..', '..', 'logs');

const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(info => `${info.timestamp} [${info.level}]: ${info.message}`)
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: path.join(logDir, 'debug.log'), level: 'debug' }),
    new winston.transports.File({ filename: path.join(logDir, 'error.log'), level: 'error' })
  ],
});

export default logger;
