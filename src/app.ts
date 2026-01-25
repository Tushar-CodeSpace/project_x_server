import dotenv from 'dotenv';
dotenv.config({ quiet: true });

import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./swagger";
import { logger } from "./utils/logger";
import { loadConfig, appConfig } from './utils/loadConfig';

const startApplication = async () => {
    try {
        await loadConfig()
        const port: number = appConfig.port;

        const app = express();

        app.use(express.json());

        app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

        app.listen(port, () => {
            logger.info("Application is online...");
            logger.info({ url: `http://localhost:${port}/docs` }, "Check docs for help.")
        });
    } catch (error) {
        logger.error(error)
    }
}

startApplication()


