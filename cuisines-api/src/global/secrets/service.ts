import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SecretsService extends ConfigService {
  constructor() {
    super();
  }

  PORT = this.get('PORT');
  DB_HOST = this.get('DB_HOST');
  DB_PORT = this.get('DB_PORT');
  DB_USERNAME = this.get('DB_USERNAME');
  DB_NAME = this.get('DB_NAME');
  DB_PASSWORD = this.get('DB_PASSWORD');
}
