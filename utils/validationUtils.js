import { validationResult } from 'express-validator';
import { STATUS_CODES } from './statusCodes.js';

export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({ errors: errors.array() });
    }
    next();
};
