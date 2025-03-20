import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import * as cors from 'cors';
import * as morgan from 'morgan';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './core/filters';
import { LoggerInterceptor } from './lib/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  app.use(cors({}));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('dev'));

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new LoggerInterceptor());

  app.setGlobalPrefix('/api');
  await app.listen(configService.get<string>('PORT'));
}
bootstrap();
