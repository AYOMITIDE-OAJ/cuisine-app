import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import * as cors from 'cors';
import * as morgan from 'morgan';
import { MainModule } from './main.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './core/filters';
import { LoggerInterceptor } from './lib/interceptors/transform.interceptor';
import { SecretsService } from './global/secrets/service';

async function bootstrap() {
  const app = await NestFactory.create(MainModule, {
    bufferLogs: true,
  });

  const { PORT } = app.get<SecretsService>(SecretsService);

  app.use(cors({}));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('dev'));

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new LoggerInterceptor());

  app.setGlobalPrefix('/api');
  await app.listen(PORT);
}
bootstrap();
