import { Transform, TransformFnParams } from 'class-transformer';
import { IsString } from 'class-validator';

export class TokenDto {
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsString({ message: 'token must be a string' })
  readonly token: string;
}
