import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors({origin: "http://localhost:4200"});
  app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({
      transformOptions: {
        enableImplicitConversion: true,
      }
    })
  )
  const config = new DocumentBuilder()
    .setTitle('AutMotive Api')
    .setDescription(
      'Car Repair Shop Managment, Parts Inventory, Clients Managment etc',
    )
    .setVersion('0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('openapi', app, document);

  await app.listen(3000);
}
bootstrap();
