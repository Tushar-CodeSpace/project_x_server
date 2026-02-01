import { Router } from "express";
import { signupController } from "./auth.controller";

const route = Router();

route.post("/signup", signupController)

export default route;