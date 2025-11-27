import { Request, Response } from "express";
import { ApiResponse } from "../utils/api.Response";

const healthCheck = (req: Request, res: Response) => {
    res.status(200).json(new ApiResponse(200, {
        message: "Server is running smoothly."
    }));
}

export { healthCheck };
