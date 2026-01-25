import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

/* =====================
   REQUEST SCHEMAS
===================== */

export const SignupSchema = z
    .object({
        email: z.string().email().openapi({ example: "user@gmail.com" }),
        password: z.string().min(6).openapi({ example: "123456" })
    })
    .openapi("SignupRequest");

export const SigninSchema = z
    .object({
        email: z.string().email(),
        password: z.string().min(6)
    })
    .openapi("SigninRequest");

export const ChangePasswordSchema = z
    .object({
        oldPassword: z.string(),
        newPassword: z.string()
    })
    .openapi("ChangePasswordRequest");

/* =====================
   RESPONSE SCHEMAS
===================== */

export const SuccessResponseSchema = z
    .object({
        success: z.boolean().openapi({ example: true }),
        message: z.string().openapi({ example: "user created successfully" }),
        data: z.object({
            _id: z.uuidv4(),
            email: z.email(),
            created_at: z.date()
        })
    })
    .openapi("SuccessResponse");

export const ErrorResponseSchema = z
    .object({
        success: z.boolean().openapi({ example: false }),
        message: z.string().openapi({ example: "user already exist" })
    })
    .openapi("ErrorResponse");
