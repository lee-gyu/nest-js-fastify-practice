import { Type } from 'class-transformer';
import {
    IsEnum,
    IsNumber,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';

export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
}

export class CreateUserDto {
    @IsString()
    @MinLength(2, { message: 'Name should be at least 2 characters long' })
    @MaxLength(30, { message: 'Name should not exceed 30 characters' })
    readonly name: string;

    @IsNumber()
    @Type(() => Number)
    readonly age: number;

    @IsString()
    @MinLength(6, { message: 'Password should be at least 6 characters long' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d\W]).+$/, {
        message:
            'Password must contain at least one uppercase letter, one lowercase letter, and one number or special character',
    })
    readonly password: string;

    @IsEnum(UserRole, { message: 'Role must be either ADMIN or USER' })
    readonly role: UserRole;
}
