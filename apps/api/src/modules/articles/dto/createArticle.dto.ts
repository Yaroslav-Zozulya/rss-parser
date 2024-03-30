import { Transform, TransformFnParams } from 'class-transformer';
import {
  ArrayMinSize,
  IsNotEmpty,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';

export class CreateArticleDto {
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty({ message: 'title must not be empty' })
  @MinLength(6, { message: 'title length must be 6 and more letters' })
  @IsString({ message: 'title must be a string' })
  title: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @MinLength(6, { message: 'contentSnippet length must be 6 and more letters' })
  @IsString({ message: 'contentSnippet must be a string' })
  contentSnippet: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsUrl(
    { protocols: ['https'] },
    { message: 'link must be  URL as like https://expamle.com' },
  )
  @IsString()
  link: string;

  @Transform(({ value }: TransformFnParams) =>
    value.filter((item) => {
      if (typeof item === 'string') {
        return item.trim() !== '';
      }
      return true;
    }),
  )
  @ArrayMinSize(1, { message: 'categories must not be empty' })
  @IsString({ each: true, message: 'categories must be an array of strings' })
  categories: string[];
}
