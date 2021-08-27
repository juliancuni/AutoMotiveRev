import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import * as helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import { ExceptionsLoggerFilter } from './utils/exeptions/ex-logger.filter';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.use(helmet());
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.useGlobalFilters(new ExceptionsLoggerFilter(app.get(HttpAdapterHost)));
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  const config = new DocumentBuilder()
    .setTitle('AutoMotive API')
    .setDescription('Car repair shop API for Automotive world')
    .setVersion('1.0')
    .addTag('AutoMotive')
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
