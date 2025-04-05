import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/custom-error';

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
    if (err instanceof CustomError) {
        res.status(err.statusCode).json({
            error: true,
            message: err.message,
            details: err.details || null,
        });
    } else {
        console.error('Unexpected Error:', err); // Log unexpected errors
        res.status(500).json({
            error: true,
            message: 'Internal Server Error',
        });
    }
}
