import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const signupReqSchema = z
    .object({
        email: z.string().email().openapi({
            example: "user@example.com"
        }),
        password: z.string().min(6).openapi({
            example: "123456"
        })
    })
    .openapi("Signup Request");

export const authSuccessSchema = z
    .object({
        success: z.boolean().openapi({ example: true }),
        message: z.string(),
        data: z.object({
            token: z.string().optional(),
        }),
    })
    .openapi("Auth Success Response");

export const authFailedSchema = z
    .object({
        success: z.literal(false),
        message: z.string(),
        errors: z
            .array(
                z.object({
                    path: z.array(z.string()),
                    message: z.string()
                })
            )
            .optional()
    })
    .openapi("AuthFailedResponse");

