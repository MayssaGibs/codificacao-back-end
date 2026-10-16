import { Controller,
    Post, Body
 } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CriaProdutoDto } from "./dto/criar-produto.dto.js";

@ApiTags('produtos')
@Controller('Produtos')
export class ProdutosController {
     @Post()
     @ApiOperation({
        summary:'Cadastrar um novo produtp no estoque',
     })
     @ApiResponse({
        status: 201,
        description: 'Playload enviado contém dados mal formatados e/ou inválidos.'
     })
    
async criar(@Body() criarprodutodto: CriaProdutoDto){
    return {
        id:67,
        ...criarprodutodto,
        criadoEm: new Date().toLocaleDateString(),
    }
}
}