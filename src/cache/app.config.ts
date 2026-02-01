type AppConfigValue =
    | string
    | number
    | boolean
    | object
    | null
    | undefined;

const appConfig: Record<string, AppConfigValue> = {};

export default appConfig;
