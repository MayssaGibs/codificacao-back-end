import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import Joi from 'joi';
import { AlunosModule } from './alunos/alunos.module.js';
import databaseConfig from './config/database.config.js';
import authConfig from './config/auth.config.js';

@Module({
  imports: [
    AlunosModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, authConfig],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        PORT: Joi.number().default(3000),
        DATABASE_URI: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      
      useFactory:(dbconfig: ConfigType<typeof databaseConfig>) => ({
        uri:dbconfig.uri,
        maxPoolSize: dbconfig.maxPoolSize,
      }),
      inject: [databaseConfig.KEY],
      }),
  ],
})
export class AppModule {}