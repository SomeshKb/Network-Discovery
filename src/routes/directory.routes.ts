import express from 'express';
import { DirectoryController } from '../controllers/directory.controller';
import { validateGetDirectories, validateGetFilesByExtension, validateMountDirectory, validateUnmountDirectory } from '../middlewares/validate-request.middleware';

const router = express.Router();

router.get('/', validateGetDirectories, DirectoryController.listDirectories);
router.get('/files', validateGetFilesByExtension, DirectoryController.listFilesByExtension);
router.post('/mount', validateMountDirectory, DirectoryController.mountNetworkDirectory);
router.post('/unmount', validateUnmountDirectory, DirectoryController.unmountNetworkDirectory);

export default router;
