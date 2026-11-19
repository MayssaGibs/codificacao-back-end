import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module.js';
import {fa, faker, Faker} from '@faker-js/faker';
import { AlunosService } from './alunos/alunos.service.js';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const alunosService = app.get(AlunosService);

    console.log('🤖 Iniciando a Geração de Faker Alunos...');

    const cursoDisponiveis = [
        'Programdor Full-Stack',
        'Panificação',
        'Eletricista Predial',
        'Excel Básico',
        'Power BI Basico',
        'Apresentações Criativas no Canva',
        'Corte e Costura',
        'Tecnico em Biotecnologia',
        'Tecnio em Informatica',
        'Tecnico em desenvolvimento de Jogos Digitais',
        'Tecnico em Manutencao e Suporte de Informática' 
    ];
    for (let i = 0; i < 100; i++) { 
        const curosAleatorio = faker.helpers.arrayElements(
            cursoDisponiveis, {min: 1, max:3});
            const alunoFaker = {
                nome: faker.person.fullName(),
                idade: faker.number.int({
                    min: 16,
                     max: 65
                    }),
                    matricula: faker.string.numeric(5),
                    cursos: curosAleatorio,
                    ativo: true,
            };
         try{
            await alunosService.create(alunoFaker);
         }catch (error) {
            console.log(`Pular: Erro ao criar Matricula para  ${alunoFaker.nome}! - Matricula Duplicada`);
         }
    }
            console.log('🤖 Banco de dados');
                console.log('🤖 Feliz natal');
                await app.close();
            
}

bootstrap();