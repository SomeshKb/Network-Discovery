import express from 'express';
import {
    getDirectories,
    searchFiles,
    mountDirectory,
    unmountDirectory,
} from '../controllers/networkController.js';

const router = express.Router();

// Define routes and map them to controller functions
router.get('/directories', getDirectories);
router.get('/search-files', searchFiles);
router.post('/mount', mountDirectory);
router.post('/unmount', unmountDirectory);

export default router;