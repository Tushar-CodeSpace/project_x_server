import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import { authRegistry } from "./modules/auth/auth.openapi";

const generator = new OpenApiGeneratorV3([
    ...authRegistry.definitions
]);

export const swaggerDocument = generator.generateDocument({
    openapi: "3.0.0",
    info: {
        title: "Project X API",
        version: "1.0.0"
    }
});
