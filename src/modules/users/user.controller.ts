import { Request, Response } from 'express';
import { StatusCodes } from '../../constants/httpStatus';
import { asyncHandler } from '../../utils/asyncHandler';
import * as userService from './user.service';
import { CreateUserInput } from './user.schema';

/**
 * 🎮 CONTROLLER (The Traffic Cop)
 * --------------------------------
 * The Controller is the first place a request goes after the Route.
 *
 * It has ONE job:
 * 1.  Receives the Request (req) from the user.
 * 2.  Asks the "Service" to do the hard work.
 * 3.  Sends the Response (res) back to the user.
 *
 * It should NOT have complex logic (like checking passwords or calculating prices).
 * Keep it simple!
 */

export const registerUser = asyncHandler(
  async (
    req: Request<Record<string, any>, Record<string, any>, CreateUserInput>,
    res: Response,
  ) => {
    // 1. Controller calls the Service to register the user
    const user = await userService.registerUser(req.body);

    // 2. Controller sends the result back
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'User registered successfully',
      data: user,
    });
  },
);

export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  res.status(StatusCodes.OK).json({
    success: true,
    data: users,
  });
});
