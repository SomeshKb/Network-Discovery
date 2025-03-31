import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const logger = winston.createLogger({
    level: 'warn',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
        }),
        new DailyRotateFile({
            filename: 'logs/error-%DATE%.log', // Log file name pattern
            datePattern: 'YYYY-MM-DD', // Rotate daily
            level: 'error', // Log only errors
            maxSize: '10m', // Maximum file size (e.g., 10MB)
            maxFiles: '14d', // Keep logs for 14 days, delete older files
        }),
        new DailyRotateFile({
            filename: 'logs/combined-%DATE%.log', // Log file name pattern
            datePattern: 'YYYY-MM-DD', // Rotate daily
            maxSize: '20m', // Maximum file size (e.g., 20MB)
            maxFiles: '30d', // Keep logs for 30 days, delete older files
        }),
    ],
});

export default logger;