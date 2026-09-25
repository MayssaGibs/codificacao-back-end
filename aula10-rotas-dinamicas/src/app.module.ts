import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { JogosService } from './jogos.service.js';
import { JogosController } from './jogos.controller.js';

@Module({
  imports: [],
  controllers: [AppController, JogosController],
  providers: [AppService, JogosService],
})
export class AppModule {}
