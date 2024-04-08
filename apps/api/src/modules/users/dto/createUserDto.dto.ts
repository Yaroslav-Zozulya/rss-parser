import { Transform, TransformFnParams } from 'class-transformer';
import { IsEmail, IsIn, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsEmail({}, { message: 'incorrect email format' })
  readonly email: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsString({ message: 'password must be a string' })
  @Length(6, 16, { message: 'password length must be from 6 to 16' })
  readonly password: string;

  @IsIn(['admin', 'moderator'], {
    message: 'role must be a string with value "admin" or "moderator"',
  })
  readonly role?: 'admin' | 'moderator' = 'moderator';
}
