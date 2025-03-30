import { body } from 'express-validator';
import { STATUS_MESSAGES } from '../../utils/statusMessages.js';

export const validateDeleteFirmware = [
    body('filePath')
        .notEmpty().withMessage(STATUS_MESSAGES.FILE_PATH_REQUIRED)
        .isString().withMessage(STATUS_MESSAGES.PATH_MUST_BE_STRING)
        .trim(),
];

export const validateCopyFirmware = [
    body('filePath')
        .notEmpty().withMessage(STATUS_MESSAGES.FILE_PATH_REQUIRED)
        .isString().withMessage(STATUS_MESSAGES.PATH_MUST_BE_STRING)
        .trim(),
    body('fileName')
        .notEmpty().withMessage(STATUS_MESSAGES.FILE_NAME_REQUIRED)
        .isString().withMessage(STATUS_MESSAGES.FILE_NAME_MUST_BE_STRING)
        .trim(),
];
