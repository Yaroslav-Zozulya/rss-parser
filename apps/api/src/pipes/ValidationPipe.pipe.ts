import { ValidationException } from 'src/exceptions/validation.exception';
import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const { metatype } = metadata;

    if (metadata.type === 'body') {
      const object = plainToClass(metatype, value);
      const errors = await validate(object);
      if (errors.length) {
        const messages = errors.map((err) => {
          return `${err.property} - ${Object.values(err.constraints).join(
            ', ',
          )}`;
        });
        throw new HttpException(messages, HttpStatus.BAD_REQUEST);
      }
      return value;
    }

    if (metadata.type === 'param') {
      const id = plainToClass(metatype, value);
      if (!isValidObjectId(id)) {
        throw new HttpException('Id is invalid', HttpStatus.BAD_REQUEST);
      }
      return value;
    }

    return value;
  }
}
