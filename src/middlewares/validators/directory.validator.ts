import { query, body } from 'express-validator';
import { VALIDATION_MESSAGES } from '../../constants/validation-messages.constant';

export const validateGetDirectories = [
  query('path').notEmpty().withMessage(VALIDATION_MESSAGES.PATH_REQUIRED).trim(),
];

export const validateGetFilesByExtension = [
  query('path').notEmpty().withMessage(VALIDATION_MESSAGES.PATH_REQUIRED).trim(),
  query('extension').notEmpty().withMessage(VALIDATION_MESSAGES.EXTENSION_REQUIRED).trim(),
];

export const validateMountDirectory = [
  body('networkPath').notEmpty().withMessage(VALIDATION_MESSAGES.NETWORK_PATH_REQUIRED).trim(),
  body('username').notEmpty().withMessage(VALIDATION_MESSAGES.USERNAME_REQUIRED).trim(),
  body('password').notEmpty().withMessage(VALIDATION_MESSAGES.PASSWORD_REQUIRED).trim(),
  body('mountPoint').notEmpty().withMessage(VALIDATION_MESSAGES.MOUNT_POINT_REQUIRED).trim(),
];

export const validateUnmountDirectory = [
  body('mountPoint').notEmpty().withMessage(VALIDATION_MESSAGES.MOUNT_POINT_REQUIRED).trim(),
];
