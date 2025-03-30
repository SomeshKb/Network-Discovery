import winston from 'winston';

const logger = winston.createLogger({
    level: 'warn',
    format: winston.format.combine(
        winston.format.timestamp(), // Add timestamps to logs
        winston.format.json() // Log in JSON format
    ),
    transports: [
        new winston.transports.Console(), // Log to the console
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }), // Log errors to a file
        new winston.transports.File({ filename: 'logs/combined.log' }), // Log all levels to a file
    ],
});

// If in development, log to the console with a readable format
if (process.env.NODE_ENV === 'development') {
    logger.add(
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
        })
    );
}

export default logger;