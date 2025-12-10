import { NestFactory } from '@nestjs/core';
import { fastifyHelmet } from '@fastify/helmet';
import { AppModule } from './app.module.js';
import {
    type NestFastifyApplication,
    FastifyAdapter,
} from '@nestjs/platform-fastify';
import { join } from 'node:path';
import handlebars from 'handlebars';
import { useValidationPipe } from './pipes/validation.js';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// for ESM
const __dirname = new URL('.', import.meta.url).pathname;

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter(),
    );

    useValidationPipe(app);

    await app.register(fastifyHelmet, {
        contentSecurityPolicy: {
            directives: {
                defaultSrc: [`'self'`],
                styleSrc: [
                    `'self'`,
                    `'unsafe-inline'`, // Swagger UI 등에서 인라인 스타일 사용 시 필요
                ],
                imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
                scriptSrc: [
                    `'self'`,
                    `"unsafe-inline"`, // 인라인 스크립트 허용 (필요 시에만)
                    `"unsafe-eval"`, // 일부 라이브러리 호환성 위해 (운영에선 지양)
                ],
            },
        },
    });

    if (process.env.NODE_ENV !== 'production') {
        const config = new DocumentBuilder()
            .setTitle('My Backend API')
            .setDescription('The API description')
            .setVersion('1.0')
            .addBearerAuth() // JWT 토큰 인증 기능 추가
            .build();

        const document = SwaggerModule.createDocument(app, config);

        SwaggerModule.setup('api-docs', app, document, {
            swaggerOptions: {
                persistAuthorization: true, // 새로고침 해도 토큰 유지
            },
        });
    }

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
