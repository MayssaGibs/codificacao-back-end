import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Status: Servidor Nest.JS ativo [Aula 07]';
  }
}
