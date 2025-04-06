import fs from 'fs';
import path from 'path';

export function readDirectory(networkPath: string): Promise<fs.Dirent[]> {
  return new Promise((resolve, reject) => {
    fs.readdir(networkPath, { withFileTypes: true }, (err, files) => {
      if (err) {
        return reject(err);
      }
      resolve(files);
    });
  });
}

export function filterFilesByExtension(files: fs.Dirent[], extension: string): string[] {
  return files
    .filter((file) => file.isFile() && path.extname(file.name).slice(1) === extension)
    .map((file) => file.name);
}
