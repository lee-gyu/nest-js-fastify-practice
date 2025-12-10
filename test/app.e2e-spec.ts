import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, type INestApplication } from '@nestjs/common';
import request from 'supertest';
import type { App } from 'supertest/types.js';
import { AppModule } from './../src/app.module.js';
import { useValidationPipe } from 'src/pipes/validation.js';

describe('AppController (e2e)', () => {
    let app: INestApplication<App>;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();

        useValidationPipe(app);

        await app.init();
    });

    it('/ (GET)', () => {
        return request(app.getHttpServer())
            .get('/')
            .expect(200)
            .expect('Hello World!');
    });

    it('/user (POST)', async () => {
        const response = await request(app.getHttpServer())
            .post('/user')
            .send({ name: 'a', age: 10, password: 'abCD1234!', role: 'USER' })
            .expect(HttpStatus.BAD_REQUEST);

        expect(response.body.message).toContain(
            'Name should be at least 2 characters long',
        );
    });
});
