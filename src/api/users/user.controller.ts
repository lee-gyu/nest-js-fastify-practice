import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Logger,
    Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUser.dto.js';

const logger = new Logger('UserController', { timestamp: true });

@Controller('user')
export class UserController {
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() createUserDto: CreateUserDto) {
        logger.debug(`Registering user: ${JSON.stringify(createUserDto)}`);

        return {};
    }
}
