import { Request, Response, NextFunction } from 'express';
import { query, validationResult, body } from 'express-validator';
import { STATUS_CODES } from '../constants/status-codes.constant';
import { VALIDATION_MESSAGES } from '../constants/validation-messages.constant';
import { handleError } from '../utils/error-handler.util'; // Import centralized error handler

export const validateGetDirectories = [
    query('path')
        .notEmpty()
        .withMessage(VALIDATION_MESSAGES.PATH_REQUIRED)
        .custom((value) => !value.includes('..'))
        .withMessage(VALIDATION_MESSAGES.INVALID_PATH),
    (req: Request, res: Response, next: NextFunction): void => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return handleError(res, STATUS_CODES.BAD_REQUEST, errors.array(), VALIDATION_MESSAGES.INVALID_REQUEST);
        }
        next();
    },
];

export const validateGetFilesByExtension = [
    query('path')
        .notEmpty()
        .withMessage(VALIDATION_MESSAGES.PATH_REQUIRED)
        .custom((value) => !value.includes('..'))
        .withMessage(VALIDATION_MESSAGES.INVALID_PATH),
    query('extension')
        .notEmpty()
        .withMessage(VALIDATION_MESSAGES.EXTENSION_REQUIRED)
        .isString()
        .withMessage('Extension must be a string'),
    (req: Request, res: Response, next: NextFunction): void => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return handleError(res, STATUS_CODES.BAD_REQUEST, errors.array(), VALIDATION_MESSAGES.INVALID_REQUEST);
        }
        next();
    },
];

export const validateMountDirectory = [
    body('networkPath').notEmpty().withMessage(VALIDATION_MESSAGES.PATH_REQUIRED),
    body('username').notEmpty().withMessage(VALIDATION_MESSAGES.USERNAME_REQUIRED),
    body('password').notEmpty().withMessage(VALIDATION_MESSAGES.PASSWORD_REQUIRED),
    body('mountPoint').notEmpty().withMessage(VALIDATION_MESSAGES.MOUNT_POINT_REQUIRED),
    (req: Request, res: Response, next: NextFunction): void => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return handleError(res, STATUS_CODES.BAD_REQUEST, errors.array(), VALIDATION_MESSAGES.INVALID_REQUEST);
        }
        next();
    },
];

export const validateUnmountDirectory = [
    body('mountPoint')
        .notEmpty()
        .withMessage(VALIDATION_MESSAGES.MOUNT_POINT_REQUIRED),
    (req: Request, res: Response, next: NextFunction): void => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return handleError(res, STATUS_CODES.BAD_REQUEST, errors.array(), VALIDATION_MESSAGES.INVALID_REQUEST);
        }
        next();
    },
];
