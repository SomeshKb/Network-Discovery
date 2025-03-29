import express from 'express';
import {
    getFirmwareById,
    deleteFirmware,
    copyFirmware
} from '../controllers/firmwareController.js';
import {
    validateDeleteFirmware,
    validateCopyFirmware
} from '../middlewares/validators/firmwareValidator.js';
import { handleValidationErrors } from '../utils/validationUtils.js';

const router = express.Router();

router.get('/', getFirmwareById);
router.delete('/:id', validateDeleteFirmware, handleValidationErrors, deleteFirmware);
router.post('/copy', validateCopyFirmware, handleValidationErrors, copyFirmware);

export default router;