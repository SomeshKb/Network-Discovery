import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { STATUS_CODES } from '../utils/statusCodes.js';
import { STATUS_MESSAGES } from '../utils/statusMessages.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getFirmwareById = (req, res) => {
    res.send('Firmware');
};

export const deleteFirmware = (req, res) => {
    const filePath = req.body.filePath;

    if (!filePath) {
        return res.status(STATUS_CODES.BAD_REQUEST).send(STATUS_MESSAGES.FILE_PATH_REQUIRED);
    }

    const dockerHostPath = '/host_mounted_path';
    const absoluteFilePath = path.join(dockerHostPath, filePath);

    fs.unlink(absoluteFilePath, (err) => {
        if (err) {
            console.error('Error deleting file:', err);
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send(STATUS_MESSAGES.FAILED_TO_DELETE_FIRMWARE);
        }
        console.log(`Deleted firmware at path: ${absoluteFilePath}`);
        res.send(STATUS_MESSAGES.FIRMWARE_DELETED_SUCCESSFULLY);
    });
};

export const copyFirmware = (req, res) => {
    let filePath = req.body.filePath;
    let fileName = req.body.fileName;

    if (!filePath || !fileName) {
        return res.status(STATUS_CODES.BAD_REQUEST).send(STATUS_MESSAGES.FILE_PATH_AND_NAME_REQUIRED);
    }

    const dockerHostPath = '/host_mounted_path';
    const absoluteFilePath = path.join(dockerHostPath, filePath);
    const destinationPath = path.join(__dirname, 'downloads', fileName);

    // Ensure the downloads directory exists
    fs.mkdir(path.join(__dirname, 'downloads'), { recursive: true }, (err) => {
        if (err) {
            console.error('Error creating downloads directory:', err);
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send(STATUS_MESSAGES.FAILED_TO_DOWNLOAD_FIRMWARE);
        }

        fs.copyFile(absoluteFilePath, destinationPath, (err) => {
            if (err) {
                console.error('Error copying file:', err);
                return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send(STATUS_MESSAGES.FAILED_TO_DOWNLOAD_FIRMWARE);
            }
            res.send('Firmware downloaded successfully.');
        });
    });
};
