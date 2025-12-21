import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ApiModule } from './api/api.module.js';
import { customLogLevel } from './utils/logger.js';

@Module({
    imports: [
        ConfigModule.forRoot(),
        LoggerModule.forRoot({
            pinoHttp: {
                customLogLevel: customLogLevel,
                transport: {
                    targets: [
                        {
                            target: 'pino-pretty',
                            options: {
                                colorize: true,
                                singleLine: true,
                                translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
                            },
                        },
                        {
                            target: 'pino-roll',
                            options: {
                                file: './logs/app-log',
                                frequency: 'daily',
                                dateFormat: 'yyyy-MM-dd',
                                extension: 'log',
                                mkdir: true,
                                size: '10m',
                            },
                            level: 'info',
                        },
                    ],
                },
            },
        }),
        ApiModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
