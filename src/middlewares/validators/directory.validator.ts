import { query, body } from 'express-validator';
import { STATUS_MESSAGES } from '../../utils/statusMessages.js';

export const validateGetDirectories = [
    query('path')
        .notEmpty().withMessage(STATUS_MESSAGES.PATH_REQUIRED)
        .isString().withMessage(STATUS_MESSAGES.PATH_MUST_BE_STRING)
        .trim(),
];

export const validateGetFilesByExtension = [
    query('path')
        .notEmpty().withMessage(STATUS_MESSAGES.PATH_REQUIRED)
        .isString().withMessage(STATUS_MESSAGES.PATH_MUST_BE_STRING)
        .trim(),
    query('extension')
        .notEmpty().withMessage(STATUS_MESSAGES.EXTENSION_REQUIRED)
        .isString().withMessage(STATUS_MESSAGES.EXTENSION_MUST_BE_STRING)
        .trim(),
];

export const validateMountDirectory = [
    body('networkPath')
        .notEmpty().withMessage(STATUS_MESSAGES.NETWORK_PATH_REQUIRED)
        .isString().withMessage(STATUS_MESSAGES.NETWORK_PATH_MUST_BE_STRING)
        .trim(),
    body('username')
        .notEmpty().withMessage(STATUS_MESSAGES.USERNAME_REQUIRED)
        .isString().withMessage(STATUS_MESSAGES.USERNAME_MUST_BE_STRING)
        .trim(),
    body('password')
        .notEmpty().withMessage(STATUS_MESSAGES.PASSWORD_REQUIRED)
        .isString().withMessage(STATUS_MESSAGES.PASSWORD_MUST_BE_STRING)
        .trim(),
    body('mountPoint')
        .notEmpty().withMessage(STATUS_MESSAGES.MOUNT_POINT_REQUIRED)
        .isString().withMessage(STATUS_MESSAGES.MOUNT_POINT_MUST_BE_STRING)
        .trim(),
];

export const validateUnmountDirectory = [
    body('mountPoint')
        .notEmpty().withMessage(STATUS_MESSAGES.MOUNT_POINT_REQUIRED)
        .isString().withMessage(STATUS_MESSAGES.MOUNT_POINT_MUST_BE_STRING)
        .trim(),
];
