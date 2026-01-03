import { Router } from 'express';
import * as demoController from './demo.controller';
import { createDemoSchema } from './demo.schema';
import { validateRequest } from '../../middleware/validate.middleware';

const router = Router();

router.get('/', demoController.getDemo);
router.post('/', validateRequest(createDemoSchema), demoController.createDemo);

export default router;
