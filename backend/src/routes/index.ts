import { Router } from 'express';
import registrationsRouter from './registrations';

const router = Router();

router.use('/registrations', registrationsRouter);

export default router;
