import { Router } from 'express';
import * as userController from './user.controller';
import { createUserSchema } from './user.schema';
import { validateRequest } from '../../middleware/validate.middleware';

const router = Router();

/**
 * 🛣️ ROUTER (The Map)
 * --------------------
 * The Router maps a URL (like /api/users) to a Controller function.
 *
 * It also applies "Middleware" (like validation) before the controller runs.
 */

// Define Routes
// GET /api/users -> Go to Controller -> getUsers function
router.get('/', userController.getUsers);

// POST /api/users -> Validate Data -> Go to Controller -> registerUser
router.post('/', validateRequest(createUserSchema), userController.registerUser);

export default router;
