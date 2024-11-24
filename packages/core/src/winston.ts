import path from 'node:path'
import { cwd } from 'node:process'
import { Configuration } from '@nailyjs/ioc'
import { CustomWinston, CustomWinstonImpl, WinstonOptions } from '@nailyjs/winston'
import winston from 'winston'

@Configuration(CustomWinston)
export class WinstonConfiguration implements CustomWinston {
  configure(winstonOptions: WinstonOptions): WinstonOptions | Promise<WinstonOptions> {
    const defaultOptions = CustomWinstonImpl.getDefaultWinstonOptions()
    winstonOptions = { ...defaultOptions, ...winstonOptions }
    if (!winstonOptions.transports) winstonOptions.transports = []
    if (!Array.isArray(winstonOptions.transports)) winstonOptions.transports = [winstonOptions.transports]

    winstonOptions.transports.push(new winston.transports.File({
      maxsize: 5242880,
      maxFiles: 5,
      dirname: path.join(cwd(), '.unproject'),
      filename: 'unproject.log',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      level: 'silly',
    }))
    return winstonOptions
  }
}
