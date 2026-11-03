import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import { CreateAlunoDto } from './schemas/alunos.schema.js';
import { UpdateAlunoDto } from './dto/update-aluno.dto.js';
import { Aluno, AlunoDoc } from './schemas/alunos.schema.js';
@Injectable()
export class AlunosService {
    constructor (@InjectModel(Aluno.name) private alunoModel: Model<AlunoDoc>) {}

    //!CRUD
    //! C - CREATE (CRIAR)
    //! R - READ (LER)
    //! U - UPDATE (ATUALIZAR)
    //! D - DELETE (APAGAR)

    async create( createAlunoDto: CreateAlunoDto): Promise<Aluno> { 
        const createdAluno = new this.alunoModel(createAlunoDto);
        return createdAluno.save();
 }
    async findAll(): Promise<Aluno[]> {
        return this.alunoModel.find().exec();
    }

    async findOne(id: string): Promise<Aluno> {
        const aluno = await this.alunoModel.findById(id).exec();
        if (!aluno) {
            throw new NotFoundException(`Aluno com ID ${id} não encontrado`);
        }
        return aluno;
    }

    async update(id: string, updateAlunoDto: UpdateAlunoDto): Promise<Aluno> {
        const alunoAtualizado = await this.alunoModel.findByIdAndUpdate(id, updateAlunoDto, { new: true }).exec();
        if (!alunoAtualizado) {
            throw new NotFoundException(`Aluno com ID ${id} não encontrado`);
        }
        return alunoAtualizado;
    }

    async remove(id: string): Promise<Aluno> {
        const alunoRemovido = await this.alunoModel.findByIdAndDelete(id).exec();
        if (!alunoRemovido) {
            throw new NotFoundException(`Aluno com ID ${id} não encontrado`);
        }
        return alunoRemovido;
    }

}  