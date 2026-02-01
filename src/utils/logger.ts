import pino from 'pino';

export const logger = pino({
    level: 'debug',
    transport: {
        target: "pino-pretty",
        options: {
            colorize: true,
            translateTime: "SYS:yyyy-MM-dd HH:mm:ss.l",
        },
    },
});
