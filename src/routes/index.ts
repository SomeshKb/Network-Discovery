import express from 'express';
import directoryRoutes from './directory.routes.js';

const router = express.Router();

router.use('/directory', directoryRoutes);

export default router;
