# 📚 Aula 17 — Documentação Técnica com Swagger e NestJS (`aula17-documentacao-tecnica-com-swagger-nestjs`)

**Unidade Curricular:** Codificação para Back-End  
**Instituição:** SENAI — Amapá  
**Autor:** Mayssa Gibson de Oliveira

Este repositório contém os códigos, exercícios e anotações teóricas desenvolvidos na **Aula 17**, com foco na criação de **documentação técnica interativa para APIs REST** utilizando **Swagger (OpenAPI)** no **NestJS**. A atividade apresenta a configuração da documentação, a descrição de endpoints e a documentação dos dados de entrada por meio de DTOs.

---

## 🎯 Objetivos da Aula

- Compreender a importância da documentação técnica de uma API.
- Configurar o Swagger em uma aplicação NestJS.
- Definir título, descrição, versão e tags da documentação.
- Documentar endpoints utilizando `@ApiTags`, `@ApiOperation` e `@ApiResponse`.
- Descrever os campos de entrada com `@ApiProperty`.
- Utilizar um DTO (`CriaProdutoDto`) para representar os dados enviados na criação de produtos.
- Acessar e testar a API pela interface interativa do Swagger.
- Conhecer a configuração de autenticação Bearer na documentação.

---

## 💻 Conceitos Aplicados

- **Swagger / OpenAPI:** ferramentas e padrão para descrever, visualizar e testar APIs HTTP.
- **`DocumentBuilder`:** configura os metadados da documentação, como título, descrição e versão.
- **`SwaggerModule.createDocument()`:** gera o documento OpenAPI a partir da aplicação.
- **`SwaggerModule.setup()`:** disponibiliza a interface Swagger em uma rota da aplicação.
- **`@ApiTags()`:** organiza as operações em grupos na interface.
- **`@ApiOperation()`:** descreve a finalidade de um endpoint.
- **`@ApiResponse()`:** documenta respostas HTTP esperadas.
- **`@ApiProperty()`:** documenta propriedades de DTOs com descrições e exemplos.
- **DTO (Data Transfer Object):** define o formato dos dados transferidos na requisição.
- **Bearer Auth:** configuração de autenticação por token na documentação.

---

## 📂 Estrutura de Pastas do Projeto

A estrutura pode variar conforme a organização do projeto. Os principais arquivos desta aula são semelhantes a:

```text
aula17-documentacao-tecnica-com-swagger-nestjs/
├── src/
│   ├── produtos/
│   │   ├── dto/
│   │   │   └── criar-produto.dto.ts  # Campos e exemplos do produto
│   │   └── produtos.controller.ts    # Endpoint para cadastrar produtos
│   ├── app.module.ts                 # Módulo raiz da aplicação
│   └── main.ts                       # Inicialização e configuração do Swagger
├── package.json
└── README.md                         # Documentação da Aula 17
```

---

## ⚙️ Instalação e Execução

### 1. Pré-requisitos

- [Node.js](https://nodejs.org/) instalado.
- npm instalado junto com o Node.js.
- Projeto NestJS configurado.

### 2. Instalar as dependências

No terminal, entre na pasta do projeto e execute:

```bash
npm install
```

Instale o Swagger, caso ainda não esteja no projeto:

```bash
npm install @nestjs/swagger
```

### 3. Iniciar a aplicação

Em um projeto NestJS com os scripts padrão, execute:

```bash
npm run start:dev
```

A aplicação será iniciada na porta `3000`, conforme definido no arquivo principal.

---

## 📖 Configuração do Swagger

No arquivo principal (`src/main.ts`), o Swagger é configurado com o `DocumentBuilder`:

```typescript
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module.js";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("API de estoque de Alimentos")
    .setDescription("Documentação técnica interativa para integração")
    .setVersion("1.0")
    .addTag("Produtos")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  await app.listen(3000);
}

bootstrap();
```

### O que cada configuração faz?

| Configuração | Finalidade |
|---|---|
| `setTitle()` | Define o título exibido na documentação. |
| `setDescription()` | Apresenta uma descrição da API. |
| `setVersion()` | Informa a versão da API documentada. |
| `addTag()` | Adiciona uma tag para organizar os endpoints. |
| `addBearerAuth()` | Registra o esquema de autenticação Bearer na documentação. |
| `createDocument()` | Gera o documento OpenAPI. |
| `setup('docs', ...)` | Disponibiliza a interface Swagger na rota `/docs`. |

### Acessar a documentação

Com a aplicação em execução, abra no navegador:

**http://localhost:3000/docs**

Nessa página, é possível visualizar os