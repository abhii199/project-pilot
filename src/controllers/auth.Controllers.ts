import { asyncHandler } from "../utils/async.Handler";

const registerUser = asyncHandler(async (req: Request, res: Response) => { 
    const { email, username, password, role } = req.body;

})

export {
    registerUser
};
