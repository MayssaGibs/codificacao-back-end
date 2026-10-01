import { Controller, Get } from '@nestjs/common';
import { get } from 'http';

@Controller()
export class AppController {
@Get()
getPublic(){
  return {
  mensagem: 'Rota Publica acessada com sucesso!',
  data: new Date(),
  }
}  
@Get('admin')
getPrivate(){
  return {
    mensagem: 'Bem-vindo ao Painel Administrativo',
    data: new Date(),
  }
}
}
