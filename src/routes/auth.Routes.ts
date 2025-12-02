import { Router } from "express";
import { registerUser } from "../controllers/auth.Controllers";
import { validate } from "../middlewares/validator.Middlewares";
import { userRegistrationValidator } from "../validators";


const router = Router();


router.post('/register', validate(userRegistrationValidator), registerUser)

export default router;