import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');

  try {
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.listen(PORT, () => {
      console.log(`Server start on port - ${PORT}`);
    });
  } catch (error) {
    app.close().then(() => {
      console.log(`Server was closed with err ${error.message}`);
    });
  }
}
bootstrap();
