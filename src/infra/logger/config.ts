import {
  utilities as nestWinstonModuleUtilities,
  WinstonModuleOptions,
} from 'nest-winston';
import * as winston from 'winston';

export const configureWinston = (): WinstonModuleOptions => {
  return {
    levels: winston.config.npm.levels,
    level: 'verbose',
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          nestWinstonModuleUtilities.format.nestLike(),
        ),
      }),
    ],
  };
};
