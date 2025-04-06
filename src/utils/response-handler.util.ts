import { Response } from 'express';

export function sendResponse(
  res: Response,
  statusCode: number,
  data: unknown,
  message: string,
): void {
  res.status(statusCode).json({ data, message });
}
