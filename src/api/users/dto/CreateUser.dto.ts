import { Type } from 'class-transformer';
import {
    IsEnum,
    IsNumber,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
}

export class CreateUserDto {
    @IsString()
    @MinLength(2, { message: 'Name should be at least 2 characters long' })
    @MaxLength(30, { message: 'Name should not exceed 30 characters' })
    @ApiProperty({
        description: 'The name of the user',
        minLength: 2,
        maxLength: 30,
    })
    readonly name: string;

    @IsNumber()
    @Type(() => Number)
    @ApiProperty({
        description: 'The age of the user',
        minimum: 0,
        maximum: 150,
    })
    readonly age: number;

    @IsString()
    @MinLength(6, { message: 'Password should be at least 6 characters long' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d\W]).+$/, {
        message:
            'Password must contain at least one uppercase letter, one lowercase letter, and one number or special character',
    })
    @ApiProperty({
        description:
            'The password of the user. Must contain at least one uppercase letter, one lowercase letter, and one number or special character',
        minLength: 6,
    })
    readonly password: string;

    @IsEnum(UserRole, { message: 'Role must be either ADMIN or USER' })
    @ApiProperty({
        description: 'The role of the user',
        enum: UserRole,
    })
    readonly role: UserRole;
}
