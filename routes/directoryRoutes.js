import express from 'express';
import {
    getDirectories,
    getFilesByExtension,
    mountDirectory,
    unmountDirectory,
} from '../controllers/directoryController.js';

const router = express.Router();

router.get('/', getDirectories);
router.get('/files', getFilesByExtension);
router.post('/mount', mountDirectory);
router.post('/unmount', unmountDirectory);

export default router;