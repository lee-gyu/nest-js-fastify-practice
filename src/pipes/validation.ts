import { ValidationPipe, type INestApplication } from '@nestjs/common';

export function useValidationPipe(app: INestApplication) {
    app.useGlobalPipes(
        new ValidationPipe({
            // if set to true, validator will strip validated (returned) object of any properties that do not have any decorators
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    );
}
