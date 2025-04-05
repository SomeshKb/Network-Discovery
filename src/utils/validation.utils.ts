import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { STATUS_CODES } from './statusCodes.js';

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(STATUS_CODES.BAD_REQUEST).json({ errors: errors.array() });
        return;
    }
    next();
};
