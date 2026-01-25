import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import {
    SignupSchema,
    SigninSchema,
    ChangePasswordSchema,
    SuccessResponseSchema,
    ErrorResponseSchema
} from "./auth.schema";

export const authRegistry = new OpenAPIRegistry();

authRegistry.register("SignupRequest", SignupSchema);
authRegistry.register("SigninRequest", SigninSchema);
authRegistry.register("ChangePasswordRequest", ChangePasswordSchema);

authRegistry.register("SuccessResponse", SuccessResponseSchema);
authRegistry.register("ErrorResponse", ErrorResponseSchema);

authRegistry.registerPath({
    method: "post",
    path: "/api/v1/auth/signup",
    summary: "Create user",
    tags: ["Auth"],
    request: {
        body: {
            content: {
                "application/json": {
                    schema: SignupSchema
                }
            }
        }
    },
    responses: {
        201: {
            description: "User registered",
            content: {
                "application/json": {
                    schema: SuccessResponseSchema
                }
            }
        },
        409: {
            description: "Email exists",
            content: {
                "application/json": {
                    schema: ErrorResponseSchema
                }
            }
        }
    }
});

authRegistry.registerPath({
    method: "post",
    path: "/api/v1/auth/signin",
    summary: "Login user",
    tags: ["Auth"],
    request: {
        body: {
            content: {
                "application/json": {
                    schema: SigninSchema
                }
            }
        }
    },
    responses: {
        200: {
            description: "Login success",
            content: {
                "application/json": {
                    schema: SuccessResponseSchema
                }
            }
        },
        401: {
            description: "Invalid credentials",
            content: {
                "application/json": {
                    schema: ErrorResponseSchema
                }
            }
        }
    }
});
