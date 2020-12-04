import { Router } from 'express';
import * as thingsController from './controllers/things';
import things from '../middleware/things'
const router = Router();

router
    .get('/things', things, thingsController.things)
    .get('/catalogs', things, thingsController.catalogs);


export default router;