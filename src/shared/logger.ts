export const logger =
  process.env.NODE_ENV !== 'production'
    ? {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'HH:MM:ss.l',
          },
        },
        base: null, // avoid adding pid, hostname and name properties to each log.
      }
    : true
