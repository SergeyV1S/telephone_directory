import { Router } from 'express';
import multer from 'multer';

import * as phonebookController from './phonebook.controller';

const uploadMiddleware = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }
});

const router = Router();

router.get('/', phonebookController.getRecords);

router.post('/update', uploadMiddleware.array('files'), phonebookController.upload);

export default router;
