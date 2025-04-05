import { Response } from 'express';
import { logger } from './logger.util';

export function handleError(res: Response, statusCode: number, error: unknown, errorMessage: string): void {
    if (Array.isArray(error)) {
        // Handle validation errors
        logger.error(`${errorMessage}: ${JSON.stringify(error)}`);
        res.status(statusCode).send({
            error: errorMessage,
            details: error,
        });
    } else if (error instanceof Error) {
        // Handle general errors
        logger.error(`${errorMessage}: ${error.message}`);
        res.status(statusCode).send({
            error: errorMessage,
            details: error.message,
        });
    } else {
        // Handle unknown errors
        logger.error(errorMessage);
        res.status(statusCode).send({
            error: errorMessage,
            details: error,
        });
    }
}