import { Request, Response } from "express";
import { ApiError } from "../utils/api.Error";
import { asyncHandler } from "../utils/async.Handler";

const registerUser = asyncHandler(async (req: Request, res: Response) => { 
    //const { email, username, password, role } = req.body;
    
    try {
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.log(error),
        new ApiError(500, "Internal Server Error",error);
    }
})

export {
    registerUser
};
