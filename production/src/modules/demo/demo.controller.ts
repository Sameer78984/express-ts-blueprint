import { Request, Response } from "express";
import { StatusCodes } from "../../constants/httpStatus";
import { asyncHandler } from "../../utils/asyncHandler";
import * as demoService from "./demo.service";
import { CreateDemoInput } from "./demo.schema";

export const createDemo = asyncHandler(
  async (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    req: Request<Record<string, any>, Record<string, any>, CreateDemoInput>,
    res: Response,
  ) => {
    const result = await demoService.createDemoMessage(req.body);
    res.status(StatusCodes.CREATED).json(result);
  },
);

export const getDemo = asyncHandler(async (req: Request, res: Response) => {
  const result = await demoService.getDemoMessage();
  res.status(StatusCodes.OK).json(result);
});
