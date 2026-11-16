import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {HydratedDocument} from 'mongoose';

export type AlunoDoc = HydratedDocument<Aluno>;

@Schema()
export class Aluno {
  @Prop({ required: true 

  })
  nome: string;

    @Prop({ required: true 

  })
  idade: number;

    @Prop({ required: true,
      unique: true


  })
  matricula: string;

  @Prop({
        default:true,
    })
    ativo:boolean


}
export const AlunoSchema = SchemaFactory.createForClass(Aluno);

export class CreateAlunoDto {
  nome: string;
  idade: number;
  matricula: string;
  cursos: string;
} 