import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { CustomError } from '../utils/custom-error';
import { STATUS_CODES } from '../constants/status-codes.constant';

export class DirectoryService {
  static listDirectories(networkPath: string): Promise<{ name: string; isDirectory: boolean }[]> {
    return new Promise((resolve, reject) => {
      fs.readdir(networkPath, { withFileTypes: true }, (err, files) => {
        if (err) {
          return reject(
            new CustomError('Failed to list directories', STATUS_CODES.INTERNAL_SERVER_ERROR, err),
          );
        }
        const items = files.map((file) => ({
          name: file.name,
          isDirectory: file.isDirectory(),
        }));
        resolve(items);
      });
    });
  }

  static listFilesByExtension(networkPath: string, extension: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
      fs.readdir(networkPath, { withFileTypes: true }, (err, files) => {
        if (err) {
          return reject(
            new CustomError(
              'Failed to list files by extension',
              STATUS_CODES.INTERNAL_SERVER_ERROR,
              err,
            ),
          );
        }
        const matchingFiles = files
          .filter((file) => file.isFile() && path.extname(file.name).slice(1) === extension)
          .map((file) => file.name);
        resolve(matchingFiles);
      });
    });
  }

  static mountNetworkDirectory(
    networkPath: string,
    username: string,
    password: string,
    mountPoint: string,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const mountArgs = [
        '-t',
        'cifs',
        networkPath,
        mountPoint,
        '-o',
        `username=${username},password=${password}`,
      ];
      const mountProcess = spawn('sudo', ['mount', ...mountArgs]);

      mountProcess.on('error', (err) =>
        reject(
          new CustomError('Failed to mount directory', STATUS_CODES.INTERNAL_SERVER_ERROR, err),
        ),
      );
      mountProcess.on('close', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new CustomError('Failed to mount directory', STATUS_CODES.INTERNAL_SERVER_ERROR));
        }
      });
    });
  }

  static unmountNetworkDirectory(mountPoint: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const unmountProcess = spawn('sudo', ['umount', mountPoint]);

      unmountProcess.on('error', (err) =>
        reject(
          new CustomError('Failed to unmount directory', STATUS_CODES.INTERNAL_SERVER_ERROR, err),
        ),
      );
      unmountProcess.on('close', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(
            new CustomError('Failed to unmount directory', STATUS_CODES.INTERNAL_SERVER_ERROR),
          );
        }
      });
    });
  }

  static getDirectories(path: string): string[] {
    if (!fs.existsSync(path)) {
      throw new CustomError('Directory not found', STATUS_CODES.NOT_FOUND);
    }

    try {
      return fs.readdirSync(path);
    } catch (error) {
      throw new CustomError('Failed to read directory', STATUS_CODES.INTERNAL_SERVER_ERROR, error);
    }
  }
}
