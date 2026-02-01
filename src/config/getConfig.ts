import { databaseOperations } from "../database/mongo";

export const appConfigLoader = async () => {
    await databaseOperations.getConfig();
};
