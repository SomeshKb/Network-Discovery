import express from 'express';
import {
    getFirmwareById,
} from '../controllers/firmwareController.js';

const router = express.Router();

router.get('/firmware', getFirmwareById);

export default router;