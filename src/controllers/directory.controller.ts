import { Request, Response, NextFunction } from 'express';
import { DirectoryService } from '../services/directory.service';
import { sendResponse } from '../utils/response-handler.util';
import { STATUS_CODES } from '../constants/status-codes.constant';
import { RESPONSE_MESSAGES } from '../constants/response-messages.constant';

export class DirectoryController {
  static async listDirectories(req: Request, res: Response, next: NextFunction): Promise<void> {
    const networkPath = req.query.path as string;

    try {
      const items = await DirectoryService.listDirectories(networkPath);
      sendResponse(res, STATUS_CODES.OK, items, RESPONSE_MESSAGES.DIRECTORIES_FETCHED);
    } catch (err) {
      next(err);
    }
  }

  static async listFilesByExtension(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const networkPath = req.query.path as string;
    const extension = req.query.extension as string;

    try {
      const matchingFiles = await DirectoryService.listFilesByExtension(networkPath, extension);
      sendResponse(res, STATUS_CODES.OK, matchingFiles, RESPONSE_MESSAGES.FILES_FETCHED);
    } catch (err) {
      next(err);
    }
  }

  static async mountNetworkDirectory(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const { networkPath, username, password, mountPoint } = req.body;
    try {
      await DirectoryService.mountNetworkDirectory(networkPath, username, password, mountPoint);
      sendResponse(
        res,
        STATUS_CODES.OK,
        null,
        `${RESPONSE_MESSAGES.SUCCESSFULLY_MOUNTED} ${networkPath} to ${mountPoint}`,
      );
    } catch (err) {
      next(err);
    }
  }

  static async unmountNetworkDirectory(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const { mountPoint } = req.body;

    try {
      await DirectoryService.unmountNetworkDirectory(mountPoint);
      sendResponse(
        res,
        STATUS_CODES.OK,
        null,
        `${RESPONSE_MESSAGES.SUCCESSFULLY_UNMOUNTED} ${mountPoint}`,
      );
    } catch (err) {
      next(err);
    }
  }
}
