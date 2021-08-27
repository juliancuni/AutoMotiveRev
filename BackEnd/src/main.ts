import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api');
  app.use(helmet());
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (
      controllerKey: string,
      methodKey: string
    ) => methodKey
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('openapi', app, document);

  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
