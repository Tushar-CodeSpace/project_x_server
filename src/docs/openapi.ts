import { OpenAPIRegistry, OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import { signupReqSchema, authResSchema } from "../modules/auth/auth.schema";

const registry = new OpenAPIRegistry();

registry.registerPath({
    method: "post",
    path: "/api/v1/auth/signup",
    tags: ["Authorization"],
    request: {
        body: {
            content: {
                "application/json": {
                    schema: signupReqSchema
                }
            }
        }
    },
    responses: {
        200: {
            description: "Signup successful",
            content: {
                "application/json": {
                    schema: authResSchema
                }
            }
        },
        400: {
            description: "Signup fail",
            content: {
                "application/json": {
                    schema: authResSchema
                }
            }
        }
    }
});

export const openApiDocument = new OpenApiGeneratorV3(registry.definitions).generateDocument({
    openapi: "3.0.3",
    info: {
        title: "Backend API Blueprint",
        version: "1.0.0",
        description: "Zod-powered API documentation"
    }
});
