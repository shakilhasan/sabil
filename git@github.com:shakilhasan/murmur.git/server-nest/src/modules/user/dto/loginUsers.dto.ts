import { IsString } from 'class-validator';

export class LoginUsersDto {
    @IsString()
    readonly username: string;

    @IsString()
    readonly password: string;
}
