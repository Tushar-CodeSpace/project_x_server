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
    .openapi("SignupRequest");

export const signinReqSchema = z
    .object({
        email: z.string().email().openapi({
            example: "user@example.com"
        }),
        password: z.string().min(6).openapi({
            example: "123456"
        })
    })
    .openapi("SigninRequest");


export const authResSchema = z
    .object({
        success: z.boolean(),
        message: z.string(),
        data: z
            .object({
                token: z.string().optional()
            })
            .optional(),
        errors: z
            .array(
                z.object({
                    path: z.array(z.string()),
                    message: z.string()
                })
            )
            .optional()
    })
    .openapi("AuthResponse");
