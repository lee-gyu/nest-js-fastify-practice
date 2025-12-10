import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module.js';

@Module({
    imports: [UserModule],
    exports: [],
})
export class ApiModule {}
