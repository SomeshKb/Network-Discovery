import express from 'express';
import { DirectoryController } from '../controllers/directory.controller';
import {
  validateGetDirectories,
  validateGetFilesByExtension,
  validateMountDirectory,
  validateUnmountDirectory,
} from '../middlewares/validators/directory.validator';
import { handleValidationErrors } from '../utils/validation.utils';

const router = express.Router();

router.get(
  '/',
  validateGetDirectories,
  handleValidationErrors,
  DirectoryController.listDirectories,
);
router.get(
  '/files',
  validateGetFilesByExtension,
  handleValidationErrors,
  DirectoryController.listFilesByExtension,
);
router.post(
  '/mount',
  validateMountDirectory,
  handleValidationErrors,
  DirectoryController.mountNetworkDirectory,
);
router.post(
  '/unmount',
  validateUnmountDirectory,
  handleValidationErrors,
  DirectoryController.unmountNetworkDirectory,
);

export default router;
