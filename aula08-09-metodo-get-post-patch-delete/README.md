Entendido! Quando tudo fica num bloco gigante de texto e código, a leitura fica cansativa mesmo.

Abaixo organizei o documento de forma **visual, limpa e modular**, usando divisores visuais, tópicos enxutos e destacando apenas o que é essencial para consultar rápido:

---

# 📘 AULAS 08 & 09 • NEST.JS

> **Tema:** Route Handlers (`GET`, `POST`, `PATCH`, `DELETE`), Camada de Serviços, DTOs e Exceções HTTP.

---

## 🎯 Conceitos-Chave

* 🎮 **Controller:** Mapeia rotas HTTP e captura entradas (`@Body`, `@Param`). Não executa regra de negócio.
* ⚙️ **Service (`@Injectable`):** Concentra as regras de negócio, manipulação de dados e lançamento de erros.
* 📦 **DTO:** Classe que define a tipagem e o contrato dos dados de entrada.
* 🔌 **Injeção de Dependência:** O NestJS gerencia e injeta a instância do Service no Controller automaticamente via construtor.
* ⚠️ **Tratamento de Erros:** Exceções como `NotFoundException` retornam automaticamente o status `404 Not Found`.

---

## 🛠️ Guia Rápido de Decorators e Status Codes

### ⚡ Rotas & Parâmetros

| Emoji | Elemento | Função |
| --- | --- | --- |
| 📖 | `@Get()` | Leitura de dados (`200 OK`) |
| ➕ | `@Post()` | Criação de recurso (`201 Created`) |
| ✏️ | `@Patch(':id')` | Atualização parcial por ID (`200 OK`) |
| 🗑️ | `@Delete(':id')` | Remoção por ID (`204 No Content` via `@HttpCode(204)`) |
| 📦 | `@Body()` | Extrai o payload JSON da requisição |
| 🔍 | `@Param('id')` | Extrai parâmetros passados na URL |

### 🚨 Exceções e Utilitários

| Emoji | Elemento | Aplicação |
| --- | --- | --- |
| 🏷️ | `@HttpCode(204)` | Define explicitamente o status de resposta |
| ⚠️ | `NotFoundException` | Lança erro `404 Not Found` caso o ID não exista |
| 🔤 | Template Literals | Interpolação de variáveis no console (` `${variavel}` `) |
| ➕ | Operador Unário `+` | Converte a string do `@Param` em número (`+id`) |

---

## 🚀 Passo a Passo do Código

```typescript
export class CriarConvidadoDto {
  nome: string;
  idade: number;
}

```

```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { CriarConvidadoDto } from './criar-convidado.dto';

@Injectable()
export class ConvidadosService {
  private convidados = [
    { id: 1, nome: 'Rebeca', idade: 20 },
    { id: 2, nome: 'Liam', idade: 18 },
    { id: 3, nome: 'Sergio', idade: 18 },
    { id: 4, nome: 'Jamily', idade: 22 },
    { id: 5, nome: 'Alvaro', idade: 21 },
  ];

  listarConvidados() {
    return this.convidados;
  }

  criarConvidado(criarConvidadoDto: CriarConvidadoDto) {
    const novoConvidado = {
      id: this.convidados.length > 0 ? this.convidados[this.convidados.length - 1].id + 1 : 1,
      ...criarConvidadoDto,
    };

    this.convidados.push(novoConvidado);
    return novoConvidado;
  }

  encontrarConvidado(id: number) {
    const convidado = this.convidados.find((b) => b.id === id);

    if (!convidado) {
      throw new NotFoundException(`Convidado com ID ${id} não encontrado!`);
    }
    return convidado;
  }

  atualizarIdade(id: number, idade: number) {
    const convidado = this.encontrarConvidado(id);
    convidado.idade = idade;
    return convidado;
  }

  removerConvidadoLista(id: number) {
    const index = this.convidados.findIndex((c) => c.id === id);

    if (index === -1) {
      throw new NotFoundException(`Convidado com ID ${id} não encontrado!`);
    }
    this.convidados.splice(index, 1);
  }
}

```

```typescript
import { Controller, Get, Post, Body, Patch, Delete, Param, HttpCode } from '@nestjs/common';
import { CriarConvidadoDto } from './criar-convidado.dto';
import { ConvidadosService } from './convidados.service';

@Controller('convidados')
export class ConvidadosController {
  constructor(private readonly convidadosService: ConvidadosService) {}

  @Get()
  listarConvidados() {
    return this.convidadosService.listarConvidados();
  }

  @Post()
  criarConvidado(@Body() criarConvidadoDto: CriarConvidadoDto) {
    const novoConvidado = this.convidadosService.criarConvidado(criarConvidadoDto);
    console.log(`Novo convidado registrado: ${novoConvidado.nome}`);

    return {
      mensagem: `Convidado(a) ${novoConvidado.nome} adicionado(a) com sucesso!`,
      dados: novoConvidado,
    };
  }

  @Patch(':id')
  atualizarIdade(@Param('id') id: string, @Body('idade') idade: number) {
    return this.convidadosService.atualizarIdade(+id, idade);
  }

  @Delete(':id')
  @HttpCode(204)
  removerConvidado(@Param('id') id: string) {
    return this.convidadosService.removerConvidadoLista(+id);
  }
}

```

```typescript
import { Module } from '@nestjs/common';
import { ConvidadosController } from './convidados.controller';
import { ConvidadosService } from './convidados.service';

@Module({
  imports: [],
  controllers: [ConvidadosController],
  providers: [ConvidadosService],
})
export class AppModule {}

```

---

## 🧪 Roteiro de Testes (Insomnia / Postman)

1. **`GET /convidados`** → Retorna a lista (`200 OK`).
2. **`POST /convidados`** → Body: `{"nome": "Mayssa", "idade": 20}` (`201 Created`).
3. **`PATCH /convidados/2`** → Body: `{"idade": 19}` (`200 OK`).
4. **`DELETE /convidados/1`** → Exclui o item (`204 No Content`).
5. **`GET /convidados/99`** → Retorna erro padronizado (`404 Not Found`).