import { Request, Response } from "express";
import { ZodError } from "zod";
import { logger } from "../../utils/logger";
import { signupReqSchema, authResSchema } from "./auth.schema";
import { authService } from "./auth.service";

export const signupController = async (req: Request, res: Response) => {
    try {
        const payload = signupReqSchema.parse(req.body);

        const result = await authService.signup(payload);

        // 🔐 Authorization header
        res.setHeader("Authorization", `Bearer ${result.token}`);

        // 🍪 httpOnly cookie
        res.cookie("access_token", result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 15 * 60 * 1000 // 15 minutes
        });

        const response = authResSchema.parse({
            success: true,
            message: "User signup successful",
            data: {
                token: result.token
            }
        });

        return res.status(201).json(response);

    } catch (err: any) {

        // 🔹 Zod validation error
        if (err instanceof ZodError) {
            const response = authResSchema.parse({
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

        // 🔹 Business error
        if (err.message === "USER_ALREADY_EXISTS") {
            const response = authResSchema.parse({
                success: false,
                message: "User already exists"
            });

            logger.warn({
                type: "AUTH",
                message: err.message
            });

            return res.status(409).json(response);
        }

        // 🔹 Unknown error
        logger.error({
            type: "AUTH_UNKNOWN",
            error: err.message,
            stack: err.stack
        });

        const response = authResSchema.parse({
            success: false,
            message: "Signup failed"
        });

        return res.status(500).json(response);
    }
};
