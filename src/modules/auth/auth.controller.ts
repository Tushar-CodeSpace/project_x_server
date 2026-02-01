import { Request, Response } from "express";
import { logger } from "../../utils/logger";
import {
    authSuccessSchema,
    authFailedSchema
} from "./auth.schema";
import { signupReqSchema } from "./auth.schema";
import { authService } from "./auth.service";
import { ZodError } from "zod";

export const signupController = async (req: Request, res: Response) => {
    try {
        // request validation
        const payload = signupReqSchema.parse(req.body);

        const result = await authService.signup(payload);

        // response must follow schema
        const response = authSuccessSchema.parse({
            success: true,
            message: "User signup successful",
            data: {
                token: result.token
            }
        });
        logger.debug("User signup successful")
        return res.status(201).json(response);
    } catch (err: any) {

        if (err instanceof ZodError) {

            const response = authFailedSchema.parse({
                success: false,
                message: "Invalid request payload",
                errors: err.issues.map(e => ({
                    path: e.path.map(String),
                    message: e.message
                }))
            });

            logger.error({
                type: "ZOD_VALIDATION",
                errors: err.issues
            });

            return res.status(400).json(response);
        }

        const response = authFailedSchema.parse({
            success: false,
            message: "Signup failed"
        });

        return res.status(500).json(response);
    }
};
