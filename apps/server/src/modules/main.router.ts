import { Router } from 'express';

import phonebookRouter from './phonebook/phonebook.routes';

const router = Router();

router.use('/phonebook', phonebookRouter);

export default router;
