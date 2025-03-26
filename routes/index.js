import express from 'express';
import directoryRoutes from './directoryRoutes.js';
import firmwareRoutes from './firmwareRoutes.js';

const router = express.Router();

router.use('/directory', directoryRoutes);
router.use('/firmware', firmwareRoutes);


export default router;