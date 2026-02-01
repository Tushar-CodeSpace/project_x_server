import express from "express";
import swaggerUi from "swagger-ui-express";
import cookieParser from "cookie-parser";

import { openApiDocument } from "./docs/openapi";
import authRouter from './modules/auth/auth.route';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));

app.get("/", (_req, res) => {
    res.json({ status: "API running" });
});

app.use('/api/v1/auth', authRouter);

export default app;
