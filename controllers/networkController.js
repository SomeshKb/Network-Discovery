import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

// Fetch directories
export const getDirectories = (req, res) => {
    const networkPath = req.query.path;
    if (!networkPath) {
        return res.status(400).send('Path is required');
    }

    fs.readdir(networkPath, { withFileTypes: true }, (err, files) => {
        if (err) {
            return res.status(500).send(`Error reading directory: ${err.message}`);
        }

        const items = files.map((file) => ({
            name: file.name,
            type: file.isDirectory() ? 'directory' : 'file',
        }));

        res.json(items);
    });
};

// Search files by extension
export const searchFiles = (req, res) => {
    const networkPath = req.query.path;
    const extension = req.query.extension;

    if (!networkPath || !extension) {
        return res.status(400).send('Path and extension are required');
    }

    fs.readdir(networkPath, { withFileTypes: true }, (err, files) => {
        if (err) {
            return res.status(500).send(`Error reading directory: ${err.message}`);
        }

        const matchingFiles = files
            .filter((file) => file.isFile() && path.extname(file.name) === `.${extension}`)
            .map((file) => file.name);

        res.json(matchingFiles);
    });
};

// Mount a network directory
export const mountDirectory = (req, res) => {
    const { networkPath, username, password, mountPoint } = req.body;

    if (!networkPath || !username || !password || !mountPoint) {
        return res.status(400).send('networkPath, username, password, and mountPoint are required');
    }

    const command = `sudo mount -t cifs ${networkPath} ${mountPoint} -o username=${username},password=${password}`;

    exec(command, (err, stdout, stderr) => {
        if (err) {
            return res.status(500).send(`Error mounting directory: ${stderr || err.message}`);
        }

        res.send(`Successfully mounted ${networkPath} to ${mountPoint}`);
    });
};

// Unmount a network directory
export const unmountDirectory = (req, res) => {
    const { mountPoint } = req.body;

    if (!mountPoint) {
        return res.status(400).send('mountPoint is required');
    }

    const command = `sudo umount ${mountPoint}`;

    exec(command, (err, stdout, stderr) => {
        if (err) {
            return res.status(500).send(`Error unmounting directory: ${stderr || err.message}`);
        }

        res.send(`Successfully unmounted ${mountPoint}`);
    });
};