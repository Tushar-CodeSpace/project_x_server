import dotenv from 'dotenv';
dotenv.config({ quiet: true });

import app from "./app";
import { logger } from "./utils/logger";
import { databaseOperations } from './database/mongo';
import appConfig from "./cache/app.config";
import { appConfigLoader } from './config/getConfig';

(async () => {
    logger.info(`Starting server...`)
    await databaseOperations.connect(String(process.env.MONGO_URL))
    await appConfigLoader();
    const PORT = appConfig.port ?? 8000;

    app.listen(PORT, () => {
        logger.info(`🚀 Server running on http://localhost:${PORT}`);
        logger.debug(`📚 Docs available at http://localhost:${PORT}/docs`);
    });

})();