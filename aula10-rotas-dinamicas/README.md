

# 📘 AULA 10 ROTAS DINAMICAS • NEST.JS: PARSEINTPIPE & MÁSCARA DE PARÂMETROS
> **Tema:** Validação e transformação de parâmetros de rota via `ParseIntPipe`, busca por ID e tratamento de exceções com `NotFoundException`.

---

## 🎯 Conceitos-Chave

* 🛠️ **Pipes (Transformação e Validação):** O `ParseIntPipe` é um pipe nativo do NestJS que intercepta o parâmetro da rota (`@Param`), garante que é uma string conversível para número e faz a conversão de tipo automaticamente.
* 🛡️ **Validação Automática:** Se o cliente passar um ID inválido na URL (ex: `/jogos/abc`), o `ParseIntPipe` lança automaticamente uma resposta com status `400 Bad Request` sem nem chegar ao Controller ou Service.
* 🔍 **Busca por Parâmetro Dinâmico:** Mapeamento de rotas com `:id` para buscar um recurso específico dentro do array de dados.
* ⚠️ **Tratamento de Exceções (`NotFoundException`):** Lançamento do erro HTTP `404 Not Found` com mensagem personalizada quando a busca no array retorna `undefined`.

---

## 🛠️ Guia Rápido de Decorators, Pipes e Exceções

### ⚡ Elementos Utilizados
| Emoji | Elemento | Tipo | Aplicação |
| :---: | :--- | :---: | :--- |
| 🎮 | `@Controller('jogos')` | Decorator | Define a rota base `/jogos` para as requisições. |
| 🔍 | `@Get(':id')` | Decorator | Mapeia requisições GET com parâmetro dinâmico de rota. |
| ⚙️ | `ParseIntPipe` | Nest Pipe | Converte e valida o parâmetro `:id` da URL para o tipo `number`. |
| 📦 | `@Param('id')` | Decorator | Extrai o parâmetro dinâmico enviado na URL da requisição. |
| ⚙️ | `@Injectable()` | Decorator | Marca a classe como um provedor injetável gerenciado pelo NestJS. |
| ⚠️ | `NotFoundException` | Exceção HTTP | Retorna o status `404 Not Found` caso o jogo não seja localizado. |

---

## 🚀 Passo a Passo do Código

<details>
<summary><b>1. Service (<code>src/jogos.service.ts</code>)</b></summary>

```typescript
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class JogosService {
  private jogos = [
    { id: 1, titulo: 'Minecraft', estudio: 'Mojang' },
    { id: 2, titulo: 'The Legend of Zelda: Ocarina of Time', estudio: 'Nintendo' },
    { id: 3, titulo: 'Grand Theft Auto V', estudio: 'Rockstar North' },
    { id: 4, titulo: 'Elden Ring', estudio: 'FromSoftware' },
    { id: 5, titulo: 'God of War', estudio: 'Santa Monica Studio' },
  ];

  buscarPorId(id: number) {
    const jogo = this.jogos.find((j) => j.id === id);
    if (!jogo) {
      throw new NotFoundException(`Jogo com ID ${id} não localizado em nosso estoque`);
    }
    return jogo;
  }
}
TypeScript
import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { JogosService } from "./jogos.service";

@Controller('jogos')
export class JogosController {
  constructor(private readonly jogosService: JogosService) {}

  @Get(':id')
  buscarPorId(@Param('id', ParseIntPipe) id: number) {
    return this.jogosService.buscarPorId(id);
  }
}

---

🧪 Roteiro de Testes (Insomnia / Postman)
GET /jogos/1 → Retorna o objeto do jogo Minecraft (200 OK).

GET /jogos/99 → Retorna a exceção tratada: "Jogo com ID 99 não localizado em nosso estoque" (404 Not Found).

GET /jogos/abc → O ParseIntPipe intercepta e retorna erro de validação: "Validation failed (numeric string is expected)" (400 Bad Request).


<FollowUp label="Quer uma sugestão de mensagem de commit padronizada para essa nova funcional


## 🧠 CONCEITOS APRENDIDOS NESTA AULA

Mapeamento dos conceitos teóricos e práticos aplicados no desenvolvimento da busca de jogos por ID:

---

### 🛠️ 1. NestJS Pipes & Validação Automática (`ParseIntPipe`)
* **Transformação de Dados:** O `ParseIntPipe` intercepta o parâmetro recebido via URL (que sempre chega originalmente como `string`) e o converte automaticamente para um valor do tipo `number`.
* **Validação Nativa:** Se o valor passado na rota não puder ser convertido para um número inteiro (ex: `/jogos/abc`), o Pipe bloqueia a requisição e retorna automaticamente um erro `400 Bad Request`, sem acionar a execução do Controller nem do Service.
* **Tipagem Limpa:** Como a conversão é realizada diretamente na assinatura do método com o Pipe, elimina-se a necessidade de fazer conversões manuais dentro do código (como o uso de `+id` ou `Number(id)`).

---

### 🔍 2. Manipulação de Parâmetros Dinâmicos de Rota
* **Mapeamento `@Get(':id')`:** Uso de dois pontos (`:id`) na rota HTTP para indicar que a URL receberá um segmento variável dinâmico.
* **Extração via `@Param()`:** Captura específica do parâmetro mapeado na URL para utilização imediata nas regras de busca.

---

### ⚠️ 3. Tratamento de Exceções de Domínio (`NotFoundException`)
* **Lançamento de Erros Semânticos:** Quando um registro solicitado não existe no array de dados (`undefined`), lança-se a exceção nativa `NotFoundException`.
* **Respostas HTTP Padronizadas:** A exceção formata automaticamente uma resposta JSON ao cliente contendo o status code `404 Not Found` e a mensagem de erro customizada informando a ausência do recurso.

---

### ⚙️ 4. Organização em Camadas e Métodos de Busca em Array
* **Injeção do Service no Controller:** Desacoplamento de responsabilidades mantendo o Controller encarregado apenas do recebimento das requisições e a lógica de busca isolada dentro do `JogosService`.
* **Uso de `.find()`:** Utilização do método de array do JavaScript/TypeScript para localizar elementos com base na correspondência exata de propriedade (`j.id === id`).