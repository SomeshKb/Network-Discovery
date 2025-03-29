import express from 'express';
import {
    getDirectories,
    getFilesByExtension,
    mountDirectory,
    unmountDirectory,
} from '../controllers/directoryController.js';
import {
    validateGetDirectories,
    validateGetFilesByExtension,
    validateMountDirectory,
    validateUnmountDirectory,
} from '../middlewares/validators/directoryValidator.js';
import { handleValidationErrors } from '../utils/validationUtils.js';

const router = express.Router();

router.get('/', validateGetDirectories, handleValidationErrors, getDirectories);
router.get('/files', validateGetFilesByExtension, handleValidationErrors, getFilesByExtension);
router.post('/mount', validateMountDirectory, handleValidationErrors, mountDirectory);
router.post('/unmount', validateUnmountDirectory, handleValidationErrors, unmountDirectory);

export default router;