import { ApiProperty } from "@nestjs/swagger";

export class CriaProdutoDto {
    //!nome do produto
    @ApiProperty({
       example:'Café Grão de Ouro 500g',
       description: 'Nome comercial do produto cadastrado.',
    })
    nome:string;

    
    //! Preço do produto
    @ApiProperty({
       example:9.99,
       description:'Preço unitário do produto',
    })
    preco:number;
    

    //!Genero do produto
    @ApiProperty({
       example: 'Alimentos',
       description: 'Categoria do produto',
    })
    categoria:string

}