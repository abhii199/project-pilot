import { NextFunction, Response } from "express";
import { ApiError } from "../utils/api.Error";
import { userRegistrationValidator } from "../validators";


export const validateRegisterUser = (req: Request, res: Response, next: NextFunction) => {
    const result = userRegistrationValidator.safeParse(req.body);
    if (!result.success) {
        const extractedErrors = result.error.flatten().fieldErrors
        throw new ApiError(422, "Recieved data is not valid", extractedErrors);
    }
    next();
}