import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { STATUS_CODES } from '../utils/statusCodes.js';
import { STATUS_MESSAGES } from '../utils/statusMessages.js';

export const getDirectories = (req, res) => {
    const networkPath = req.query.path;
    if (!networkPath) {
        return res.status(STATUS_CODES.BAD_REQUEST).send(STATUS_MESSAGES.PATH_REQUIRED);
    }

    fs.readdir(networkPath, { withFileTypes: true }, (err, files) => {
        if (err) {
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send(`${STATUS_MESSAGES.ERROR_READING_DIRECTORY} ${err.message}`);
        }

        const items = files.map((file) => ({
            name: file.name,
            type: file.isDirectory() ? 'directory' : 'file',
        }));

        res.json(items);
    });
};

export const getFilesByExtension = (req, res) => {
    const networkPath = req.query.path;
    const extension = req.query.extension;

    if (!networkPath || !extension) {
        return res.status(STATUS_CODES.BAD_REQUEST).send(STATUS_MESSAGES.PATH_AND_EXTENSION_REQUIRED);
    }

    fs.readdir(networkPath, { withFileTypes: true }, (err, files) => {
        if (err) {
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send(`${STATUS_MESSAGES.ERROR_READING_DIRECTORY} ${err.message}`);
        }

        const matchingFiles = files
            .filter((file) => file.isFile() && path.extname(file.name).slice(1) === extension)
            .map((file) => file.name);

        res.json(matchingFiles);
    });
};

export const mountDirectory = (req, res) => {
    const { networkPath, username, password, mountPoint } = req.body;

    if (!networkPath || !username || !password || !mountPoint) {
        return res.status(STATUS_CODES.BAD_REQUEST).send(STATUS_MESSAGES.NETWORK_PATH_REQUIRED);
    }

    const command = `sudo mount -t cifs ${networkPath} ${mountPoint} -o username=${username},password=${password}`;

    exec(command, (err, stdout, stderr) => {
        if (err) {
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send(`${STATUS_MESSAGES.ERROR_MOUNTING_DIRECTORY} ${stderr || err.message}`);
        }

        res.send(`${STATUS_MESSAGES.SUCCESSFULLY_MOUNTED} ${networkPath} to ${mountPoint}`);
    });
};

export const unmountDirectory = (req, res) => {
    const { mountPoint } = req.body;

    if (!mountPoint) {
        return res.status(STATUS_CODES.BAD_REQUEST).send(STATUS_MESSAGES.MOUNT_POINT_REQUIRED);
    }

    const command = `sudo umount ${mountPoint}`;

    exec(command, (err, stdout, stderr) => {
        if (err) {
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send(`${STATUS_MESSAGES.ERROR_UNMOUNTING_DIRECTORY} ${stderr || err.message}`);
        }

        res.send(`${STATUS_MESSAGES.SUCCESSFULLY_UNMOUNTED} ${mountPoint}`);
    });
};