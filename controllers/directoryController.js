import fs from 'fs';
import path from 'path';
import { exec, spawn } from 'child_process';
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

    // Input validation
    if (!isValidPath(networkPath) || !isValidPath(mountPoint) || !isValidCredential(username) || !isValidCredential(password)) {
        return res.status(STATUS_CODES.BAD_REQUEST).send(STATUS_MESSAGES.INVALID_INPUT);
    }

    const mountArgs = [
        '-t', 'cifs', networkPath, mountPoint,
        '-o', `username=${username},password=${password}`
    ];

    const mountProcess = spawn('sudo', ['mount', ...mountArgs]);

    mountProcess.on('error', (err) => {
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send(`${STATUS_MESSAGES.ERROR_MOUNTING_DIRECTORY} ${err.message}`);
    });

    mountProcess.on('close', (code) => {
        if (code === 0) {
            res.send(`${STATUS_MESSAGES.SUCCESSFULLY_MOUNTED} ${networkPath} to ${mountPoint}`);
        } else {
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send(STATUS_MESSAGES.ERROR_MOUNTING_DIRECTORY);
        }
    });
};

export const unmountDirectory = (req, res) => {
    const { mountPoint } = req.body;

    if (!mountPoint) {
        return res.status(STATUS_CODES.BAD_REQUEST).send(STATUS_MESSAGES.MOUNT_POINT_REQUIRED);
    }

    // Input validation
    if (!isValidPath(mountPoint)) {
        return res.status(STATUS_CODES.BAD_REQUEST).send(STATUS_MESSAGES.INVALID_INPUT);
    }

    const unmountProcess = spawn('sudo', ['umount', mountPoint]);

    unmountProcess.on('error', (err) => {
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send(`${STATUS_MESSAGES.ERROR_UNMOUNTING_DIRECTORY} ${err.message}`);
    });

    unmountProcess.on('close', (code) => {
        if (code === 0) {
            res.send(`${STATUS_MESSAGES.SUCCESSFULLY_UNMOUNTED} ${mountPoint}`);
        } else {
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send(STATUS_MESSAGES.ERROR_UNMOUNTING_DIRECTORY);
        }
    });
};

// Utility functions for input validation
const isValidPath = (input) => {
    // Add logic to validate paths (e.g., regex or library-based validation)
    return typeof input === 'string' && input.length > 0;
};

const isValidCredential = (input) => {
    // Add logic to validate credentials (e.g., alphanumeric check)
    return typeof input === 'string' && input.length > 0;
};