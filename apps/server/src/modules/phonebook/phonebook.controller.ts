import type { IGetPhonebookRecordRequest } from '@repo/types/dist/phonebook';
import type { NextFunction, Request, Response } from 'express';

import config from '@/config';
import { sendResponse } from '@/lib/reponse';
import { CustomError } from '@/utils/custom_error';
import { HttpStatus } from '@/utils/enums/http-status';

import * as phonebookService from './phonebook.service';

export async function getRecords(
  req: Request<object, object, object, IGetPhonebookRecordRequest>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const result = await phonebookService.getRecords(
      Number.parseInt(req.query.limit),
      Number.parseInt(req.query.page),
      req.query.groupBy,
      req.query.orderBy,
      req.query.query
    );
    sendResponse(res, HttpStatus.OK, result);
  } catch (error) {
    next(error);
  }
}

export async function upload(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    if (req.headers.authorization !== config.app.secret) {
      throw new CustomError(HttpStatus.FORBIDDEN);
    }

    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0)
      throw new CustomError(HttpStatus.BAD_REQUEST, 'No files uploaded');

    const tasks: Promise<boolean>[] = [];

    for (const file of files) {
      const jsonText = file.buffer.toString('utf-8');
      let data;
      try {
        data = JSON.parse(jsonText);
      } catch {
        throw new CustomError(
          HttpStatus.BAD_REQUEST,
          `Invalid JSON format in file: ${file.originalname}`
        );
      }

      if (!Array.isArray(data)) {
        throw new CustomError(
          HttpStatus.BAD_REQUEST,
          `Expected array in file: ${file.originalname}`
        );
      }

      tasks.push(phonebookService.uploadRecords(data));
    }

    await Promise.all(tasks);
    sendResponse(res, HttpStatus.OK, { success: true });
  } catch (error) {
    next(error);
  }
}
