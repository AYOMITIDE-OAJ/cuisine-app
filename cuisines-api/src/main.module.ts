import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

import { CuisinesModule } from './modules/cuisines/cuisines.module';
import { Cuisine } from './modules/cuisines/entities/cuisines.entity';
import { SetMenu } from './modules/cuisines/entities/setMenu.entity';
import { GlobalModule } from './global/global.module';
import { SecretsService } from './global/secrets/service';

@Module({
  imports: [
    GlobalModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [SecretsService],
      useFactory: (secretsService: SecretsService) => ({
        type: 'postgres',
        host: secretsService.DB_HOST,
        port: secretsService.DB_PORT,
        username: secretsService.DB_USERNAME,
        password: secretsService.DB_PASSWORD,
        database: secretsService.DB_NAME,
        entities: [Cuisine, SetMenu],
        synchronize: true, // Be careful with this option in production
      }),
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 1000, // Time-to-live in seconds - 1 second
          limit: 1, // Number of requests allowed within TTL
        },
      ],
    }),
    CuisinesModule,
  ],
})
export class MainModule {}
