import mongoose, { connect, disconnect, Types } from 'mongoose';
import { logger } from './logger';

export let appConfig: any = null;

export const loadConfig = async () => {
    try {
        const connURL = process.env.MONGO_DB_CONNECTION_URL;
        if (!connURL) throw new Error("MONGO_DB_CONNECTION_URL missing in .env");

        logger.info("Connecting to database...");

        await connect(connURL, {
            serverSelectionTimeoutMS: 5000,
        });

        logger.info("Connected to Database.");

        const configID = process.env.CONFIG_ID;
        if (!configID) throw new Error("CONFIG_ID missing in .env");

        const db = mongoose.connection.db;
        if (!db) throw new Error("Database instance not found.");

        logger.info({
            dbName: db.databaseName,
            collection: 'config'
        }, "Querying collection.");

        logger.info({ configID }, "Fetching configuration from 'config' collection...");

        const configData = await db
            .collection('config')
            .findOne({ _id: configID as any });

        if (!configData) {
            logger.error({ CONFIG_ID: configID }, "No config found in Database. App cannot start.");
            process.exit(1);
        }

        // Store in our exported variable
        appConfig = configData;
        logger.info({ ...appConfig }, "Configurations loaded successfully.");

        await disconnect();
        logger.info("Database connection closed.");

    } catch (error: any) {
        // Log the full error for better debugging
        logger.error({ error }, "Failed to load config.");
        process.exit(1);
    }
};