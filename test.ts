import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

@Injectable()
export class ValidationBodyPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    // Обработка данных из тела запроса (Body)
    if (metadata.type === "body") {
      const object = plainToClass(metatype, value);
      const errors = await validate(object);
      if (errors.length > 0) {
        const errorMessage = errors
          .map((error) => Object.values(error.constraints).join(", "))
          .join(", ");
        throw new BadRequestException(errorMessage);
      }
      return value;
    }

    // Обработка данных из параметров маршрута (Params)
    if (metadata.type === "param") {
      const object = plainToClass(metatype, value); // value содержит параметр маршрута
      const errors = await validate(object);
      if (errors.length > 0) {
        const errorMessage = errors
          .map((error) => Object.values(error.constraints).join(", "))
          .join(", ");
        throw new BadRequestException(errorMessage);
      }
      return value;
    }

    // Возвращаем значение, если оно не требует валидации
    return value;
  }

  private toValidate(metatype: any): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
