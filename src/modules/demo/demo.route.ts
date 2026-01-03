import { Router } from 'express';
import * as demoController from './demo.controller';
import { createDemoSchema } from './demo.schema';

// Middleware to validate request against schema
import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { StatusCodes } from '../../constants/httpStatus';

const validate = (schema: ZodSchema<any>) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json(error.errors);
  }
};

const router = Router();

router.get('/', demoController.getDemo);
router.post('/', validate(createDemoSchema), demoController.createDemo);

export default router;
