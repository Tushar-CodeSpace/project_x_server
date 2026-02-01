import { Router } from "express";
import { logoutController, signinController, signupController } from "./auth.controller";

const router = Router();

router.post("/signup", signupController)
router.post("/signin", signinController);
router.post("/logout", logoutController);


export default router;