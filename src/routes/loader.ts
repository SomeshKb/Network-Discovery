import { Router } from 'express';
import directoryRoutes from './directory.routes';

const router = Router();

router.use('/directory', directoryRoutes);

export default router;
