# 📚 Aula 15 — Tratamento de Erros, Logs e Status Codes (`aula15-tratamento-erros-status-codes`)

**Unidade Curricular:** Codificação para Back-End

**Instituição:** SENAI — Amapá

**Autor:** Mayssa Gibson de Oliveira

Este repositório contém os códigos, exercícios e anotações teóricas desenvolvidos na **Aula 15**, focados no **Tratamento de Erros e Exceções HTTP** (`BadRequestException`, `NotFoundException`), uso de **Logger nativo do NestJS** para emissão de avisos (`this.logger.warn`) e tratamento de **Status Codes** RESTful.

---

## 🎯 Objetivos da Aula

* Compreender e aplicar as exceções nativas do NestJS (`BadRequestException` e `NotFoundException`).
* Implementar validação manual de parâmetros numéricos enviando status HTTP adequado (`400 Bad Request`).
* Manipular buscas de entidades inexistentes retornando erro HTTP proporcional (`404 Not Found`).
* Utilizar a classe `Logger` para monitoramento e auditoria de erros no console da aplicação.
* Estruturar a separação de responsabilidades entre **Controller** (validação/resposta HTTP) e **Service** (regra de negócio/dados).
* Executar e validar chamadas HTTP e monitorar logs gerados no terminal.

---

## 💻 Conceitos Aplicados

* **`BadRequestException` (`400`):** Lançada quando o parâmetro da requisição não atende aos requisitos esperados (ex: passar texto `"lua"` em vez de número).
* **`NotFoundException` (`404`):** Lançada quando o recurso solicitado não é encontrado no banco ou repositório de dados.
* **`Logger` do NestJS:** Ferramenta interna para registrar mensagens contextuais de aviso (`logger.warn`), erro (`logger.error`) ou informação (`logger.log`).
* **Injeção de Dependências:** O `ProdutosService` é injetado no `ProdutosController` para fornecer a lista de produtos.

---

## 📂 Estrutura de Pastas do Projeto

```text
aula15-tratamento-erros-status-codes/
├── src/
│   ├── produtos/
│   │   ├── produtos.controller.ts   # Manipula rotas /produtos, validações e erros HTTP
│   │   ├── produtos.service.ts      # Repositório/Serviço com a lista de produtos
│   │   └── produtos.module.ts       # Módulo da funcionalidade de produtos
│   ├── app.module.ts                # Módulo raiz da aplicação
│   └── main.ts                      # Bootstrap da aplicação NestJS
├── package.json
└── README.md                        # Documentação completa da Aula 15

```

---

## 📑 Passo a Passo de Implementação

1. **Criar o Service de Produtos:** src/produtos/produtos.service.ts.
Crie o serviço injetável com a lista estática de produtos e o método para listar os itens.

```typescript
import { Injectable } from "@nestjs/common";

@Injectable()
export class ProdutosService {
    produtos = [
        { id: 1, nome: 'Arroz Namorados', preco: 9.99 },
        { id: 2, nome: 'Feijão Timbiras', preco: 7.99 },
        { id: 3, nome: 'Macarrão Galo', preco: 5.99 },
        { id: 4, nome: 'Açucar União', preco: 4.99 },
        { id: 5, nome: 'Sal Lebre', preco: 2.99 },
    ];

    listarProdutos() {
        return this.produtos;
    }
}

```


2. **Criar o Controller com Validação e Logger:** src/produtos/produtos.controller.ts.
Implemente o controller capturando o parâmetro `:id`, validando se é numérico (`isNaN`) e verificando a existência do produto.

```typescript
import { Controller, Get, Param, BadRequestException, NotFoundException, Logger } from "@nestjs/common";
import { ProdutosService } from "./produtos.service.js";

@Controller('produtos')
export class ProdutosController {
    private readonly logger = new Logger(ProdutosController.name);

    constructor(private readonly produtosService: ProdutosService) {}

    produtos() {
        return this.produtosService.listarProdutos();
    }

    @Get(':id')
    buscarProduto(@Param('id') idProduto: string) {
        const id = Number(idProduto);

        // Validação 1: ID não é numérico -> 400 Bad Request
        if (isNaN(id)) {
            this.logger.warn(`Tentativa de buscar produto com ID ${idProduto} não numérico.`);
            throw new BadRequestException('O ID do produto deve ser um número inteiro.');
        }

        // Validação 2: Produto não existe -> 404 Not Found
        const produto = this.produtos().find((produto) => produto.id === id);
        if (!produto) {
            this.logger.warn(`Produto com ID ${id} não encontrado.`);
            throw new NotFoundException(`Produto com ID ${id} não encontrado.`);
        }

        return produto;
    }
}

```


---

## 📄 Logs de Execução do NestJS (Terminal)

Quando a aplicação é iniciada e as requisições de teste são enviadas, o `Logger` exibe as inicializações das rotas e os avisos de erro em tempo real:

```text
[Nest] 18648  - 07/10/2026, 21:07:52     LOG [NestFactory] Starting Nest application...
[Nest] 18648  - 07/10/2026, 21:07:52     LOG [InstanceLoader] AppModule dependencies initialized +5ms
[Nest] 18648  - 07/10/2026, 21:07:52     LOG [RoutesResolver] AppController {/}: +5ms
[Nest] 18648  - 07/10/2026, 21:07:52     LOG [RouterExplorer] Mapped {/, GET} route +1ms
[Nest] 18648  - 07/10/2026, 21:07:52     LOG [RoutesResolver] ProdutosController {/produtos}: +1ms
[Nest] 18648  - 07/10/2026, 21:07:52     LOG [RouterExplorer] Mapped {/produtos/:id, GET} route +0ms
[Nest] 18648  - 07/10/2026, 21:07:52     LOG [NestApplication] Nest application successfully started +1ms
[Nest] 18648  - 07/10/2026, 21:11:54    WARN [ProdutosController] Produto com ID 999 não encontrado.
[Nest] 18648  - 07/10/2026, 21:12:18    WARN [ProdutosController] Tentativa de buscar produto com ID lua não numérico. 
[Nest] 18648  - 07/10/2026, 21:13:38    WARN [ProdutosController] Produto com ID 6 não encontrado.

```

---

## 🧪 Testando no Insomnia

### 1. Busca Válida por ID (`200 OK`)

* **GET** `http://localhost:3000/produtos/1`
* **Status:** `200 OK`
* **Resposta:**
```json
{
  "id": 1,
  "nome": "Arroz Namorados",
  "preco": 9.99
}

```



---

### 2. ID Não Numérico (`400 Bad Request`)

* **GET** `http://localhost:3000/produtos/lua`
* **Status:** `400 Bad Request`
* **Resposta:**
```json
{
  "message": "O ID do produto deve ser um número inteiro.",
  "error": "Bad Request",
  "statusCode": 400
}

```



---

### 3. Produto Não Encontrado (`404 Not Found`)

* **GET** `http://localhost:3000/produtos/999`
* **Status:** `404 Not Found`
* **Resposta:**
```json
{
  "message": "Produto com ID 999 não encontrado.",
  "error": "Not Found",
  "statusCode": 404
}

```



---

## 🔎 Resumo dos Cenários de Teste

| Teste | Rota | Condição | Status HTTP | Log Gerado no Terminal |
| --- | --- | --- | --- | --- |
| **Produto Existente** | `GET /produtos/1` | ID numérico válido (`1`) | `200 OK` | *(Nenhum log de aviso)* |
| **ID Não Numérico** | `GET /produtos/lua` | ID inválido (`"lua"`) | `400 Bad Request` | `WARN [ProdutosController] Tentativa de buscar produto com ID lua não numérico.` |
| **Produto Inexistente** | `GET /produtos/999` | ID numérico alto (`999`) | `404 Not Found` | `WARN [ProdutosController] Produto com ID 999 não encontrado.` |
| **Outro Produto Inexistente** | `GET /produtos/6` | ID numérico fora da lista (`6`) | `404 Not Found` | `WARN [ProdutosController] Produto com ID 6 não encontrado.` |

---

## 🛠️ Tecnologias e Ferramentas

| Ferramenta | Categoria | Descrição |
| --- | --- | --- |
| NestJS | Framework | Framework de Node.js para construção do backend estruturado. |
| NestJS Logger | Utilitário | Logger interno para emitições de alertas (`warn`) e logs do sistema. |
| Express / HTTP | Web | Gerenciamento de Exceções HTTP (`BadRequestException`, `NotFoundException`). |
| TypeScript | Linguagem | Tipagem para validações de parâmetros e objetos. |
| Insomnia | HTTP Client | Execução de testes manuais nas rotas REST. |

---

## 👤 Autor

**Mayssa Gibson de Oliveira**

---

### 🚀 Commits Semânticos (Aula 15)

#### 1️⃣ Commits Individuais (Recomendado)

```bash
# 1. Criação do ProdutosService
git add aula15-tratamento-erros-status-codes/src/produtos/produtos.service.ts
git commit -m "feat(aula-15): cria ProdutosService com lista estatica de produtos"

# 2. Criação do ProdutosController com tratamento de erros e logger
git add aula15-tratamento-erros-status-codes/src/produtos/produtos.controller.ts
git commit -m "feat(aula-15): adiciona ProdutosController com tratamento de erros (400, 404) e logger"

# 3. Documentação no README.md
git add aula15-tratamento-erros-status-codes/README.md
git commit -m "docs(aula-15): adiciona documentacao completa da aula 15 sobre tratamento de erros e status codes"

```

---

#### 2️⃣ Commit Único em Lote

```bash
git add aula15-tratamento-erros-status-codes/
git commit -m "feat(aula-15): implementa tratamento de erros, logger e status codes com documentacao completa"
git push origin main

```