import { IsString, IsNotEmpty, IsInt, Min, IsArray, ArrayMinSize} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAlunoDto {
  
  @ApiProperty({
   example: 'Matheus Sousa',
   description: 'Nome do aluno',

  })
  @IsString()
  @IsNotEmpty({
     message: 'O nome é obrigatório e não pode estar vazio'
    
  })

  nome: string;
  @ApiProperty({
   example: 25,
   description: 'Idade do aluno',
  })

  @IsInt({ message: 'A idade deve ser um número inteiro' 

  })

  @Min(0, {
     message: 'A idade não pode ser negativa' 
    })

  idade: number;

  @ApiProperty({
   example: '9999',
   description: 'Matricula do aluno',
   
  })

  @IsString()
  @IsNotEmpty({
     message: 'A matrícula é obrigatória!'
     })

  matricula: string;

  @ApiProperty({
   example: ['Ciência da Computação', 'Letras Português'],
   description: 'Cursos em que o aluno está matriculado'
  })
  @IsString({ each: true, message: 'Cada curso deve ser uma texto' })
  @IsArray()
  @ArrayMinSize(1, {
     message: 'O aluno deve estar matriculado em pelo menos um curso '
     })


  cursos: string[];
} 