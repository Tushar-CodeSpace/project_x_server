import mongoose from "mongoose";
import appConfig from "../cache/app.config";
import { logger } from "../utils/logger";

let isConnected = false;

export const databaseOperations = {
    connect: async (uri: string) => {
        if (isConnected) return;

        const conn = await mongoose.connect(uri);
        isConnected = true;

        logger.info({
            host: conn.connection.host,
            port: conn.connection.port
        }, "MongoDB connected");
    },

    disconnect: async () => {
        if (!isConnected) return;

        await mongoose.disconnect();
        isConnected = false;

        logger.info({
            type: "DATABASE",
            message: "MongoDB disconnected"
        });
    },

    getConfig: async () => {
        try {
            const db = mongoose.connection.db;
            if (!db) throw new Error("DB not connected");

            const config = await db
                .collection<{ _id: string }>("config")
                .findOne({ _id: process.env.APP_ID! });

            if (!config) {
                throw new Error("Config not found");
            }

            Object.entries(config).forEach(([key, value]) => {
                if (key !== "_id") {
                    (appConfig as any)[key] = value;
                }
            });

            logger.debug({
                ...config
            }, "Config loaded into memory");

        } catch (err) {
            logger.error({
                type: "CONFIG",
                message: "Config loading failed",
                error: err
            });
            process.exit(1);
        }
    }
};
