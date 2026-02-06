import { Router } from 'express';
import registrationsRouter from './registrations';
import participantsRouter from './participants';
import teamsRouter from './teams';

const router = Router();

router.use('/registrations', registrationsRouter);
router.use('/participants', participantsRouter);
router.use('/teams', teamsRouter);

export default router;
