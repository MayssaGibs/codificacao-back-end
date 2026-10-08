import { Controller, Get, Param, BadRequestException, NotFoundException, Logger } from "@nestjs/common";
import { ProdutosService } from "./produtos.service.js";

@Controller('produtos')
export class ProdutosController {
    private readonly logger = new Logger (ProdutosController.name);
    constructor (private readonly produtosService: ProdutosService) {}
produtos() {
    return this.produtosService.listarProdutos();
}   
@Get(':id')
buscarProduto(@Param('id') idProduto: string){

    const id = Number(idProduto);
if(isNaN(id)){
    this.logger.warn(`Tentativa de buscar produto com ID ${idProduto} não numérico. `);
    throw new BadRequestException('O ID do produto deve ser um número inteiro.'); 
}
const produto = this.produtos().find((produto) => produto.id === id);
if(!produto){
    this.logger.warn(`Produto com ID ${id} não encontrado.`);
    throw new NotFoundException(`Produto com ID ${id} não encontrado.`)
}
return produto;
}

}
