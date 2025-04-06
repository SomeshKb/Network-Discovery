import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { STATUS_CODES } from '../constants/status-codes.constant';
import { CustomError } from './custom-error';
import { VALIDATION_MESSAGES } from '../constants/validation-messages.constant';

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorDetails = errors.array();
    return next(
      new CustomError(VALIDATION_MESSAGES.INVALID_REQUEST, STATUS_CODES.BAD_REQUEST, errorDetails),
    );
  }
  next();
};
