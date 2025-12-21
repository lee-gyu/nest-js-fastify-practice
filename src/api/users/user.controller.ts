import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Logger,
    Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUser.dto.js';
import { ApiExcludeEndpoint, ApiOperation } from '@nestjs/swagger';

const logger = new Logger('UserController', { timestamp: true });

@Controller('user')
export class UserController {
    @Post()
    @ApiOperation({
        description: 'Register a new user',
        operationId: 'registerUser',
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/CreateUserDto',
                    },
                },
            },
            required: true,
        },
        responses: {
            201: {
                description: 'User successfully registered',
            },
        },
    })
    @HttpCode(HttpStatus.CREATED)
    register(@Body() createUserDto: CreateUserDto) {
        logger.debug(`Registering user: ${JSON.stringify(createUserDto)}`);

        return {};
    }

    @Get()
    @ApiExcludeEndpoint()
    hiddenMethod() {}
}
