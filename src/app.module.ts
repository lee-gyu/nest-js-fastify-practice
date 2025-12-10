import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ApiModule } from './api/api.module.js';

@Module({
    imports: [ApiModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
