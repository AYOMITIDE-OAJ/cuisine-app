import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CuisinesModule } from './modules/cuisines/cuisines.module';
import { Cuisine } from './modules/cuisines/entities/cuisines.entity';
import { SetMenu } from './modules/cuisines/entities/setMenu.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [Cuisine, SetMenu],
        synchronize: true, // Be careful with this option in production
      }),
    }),
    CuisinesModule,
  ],
})
export class AppModule {}
