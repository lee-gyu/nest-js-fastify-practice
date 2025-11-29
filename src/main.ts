import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import {
    type NestFastifyApplication,
    FastifyAdapter,
} from '@nestjs/platform-fastify';
import { join } from 'node:path';
import handlebars from 'handlebars';

// for ESM
const __dirname = new URL('.', import.meta.url).pathname;

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter(),
    );

    app.useStaticAssets({
        root: join(__dirname, '..', 'public'),
        prefix: '/public/',
    });
    app.setViewEngine({
        engine: {
            handlebars,
        },
        templates: join(__dirname, '..', 'views'),
    });

    await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((error) => console.error(error));
