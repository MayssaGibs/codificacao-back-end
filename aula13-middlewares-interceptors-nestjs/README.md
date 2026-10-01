Aqui está o **`README.md`** atualizado e estruturado para a **Aula 13 — Middlewares e Interceptors**, mantendo o mesmo padrão detalhado, o passo a passo de implementação e os **Commits Semânticos**.

---

# 📚 Aula 13 — Middlewares e Interceptors no NestJS (`api-upload-imagem`)

**Unidade Curricular:** Codificação para Back-End

**Instituição:** SENAI — Amapá

**Autor:** Mayssa Gibson de Oliveira

Este repositório contém os códigos, exercícios e anotações teóricas desenvolvidos na **Aula 13**, focados na implementação de **Middlewares** (para logging e controle de acesso condicional) e **Interceptors** utilizando o framework **NestJS**.

---

## 🎯 Objetivos da Aula

* Compreender o ciclo de vida de uma requisição no NestJS (Middlewares vs. Interceptors).
* Criar e aplicar um **Middleware de Logging e Segurança** (`LoggerMiddleware`).
* Interceptar requisições globais e registrar método HTTP e rotas no console.
* Aplicar regras de controle de acesso restrito a rotas administrativas (`/admin`) via cabeçalhos HTTP customizados (`x-user-base`).
* Registrar middlewares globalmente utilizando a interface `NestModule` e o `MiddlewareConsumer`.
* Executar testes de integração via **Insomnia**.

---

## 💻 Conceitos Aplicados

* **Middlewares (`NestMiddleware`):** Funções executadas **antes** que o manipulador de rota (Controller) seja chamado. Têm acesso aos objetos `req`, `res` e à função `next()`.
* **Registro Global (`MiddlewareConsumer`):** Configuração do middleware na classe `AppModule` para interceptar todas as rotas da aplicação (`forRoutes('*')`).
* **Controle de Acesso por Header (`x-user-base`):** Validação condicional no middleware para rotas com prefixo `/admin`, exigindo a chave `Administrator`.
* **Controle de Fluxo (`next()`):** Garantia de continuidade da requisição para o controller quando as validações passam.

---

## 📂 Estrutura de Pastas do Projeto

```text
api-upload-imagem/
├── src/
│   ├── logger/
│   │   └── logger.middleware.ts   # Middleware para logging e segurança de rotas /admin
│   ├── imagem/
│   │   ├── imagem.controller.ts   # Controller de upload de imagens
│   │   └── imagem.module.ts       # Módulo da funcionalidade de imagens
│   ├── app.controller.ts          # Controller principal com rotas públicas e administrativas
│   ├── app.module.ts              # Módulo raiz configurando o NestModule
│   └── main.ts                    # Bootstrap do servidor NestJS
├── uploads/                       # Diretório de armazenamento das imagens
├── package.json                   # Dependências do projeto
└── README.md                      # Documentação da Aula 13

```

---

## 📑 Passo a Passo de Implementação

1. **Criar o Middleware de Logging e Segurança:** src/logger/logger.middleware.ts.
O `LoggerMiddleware` implementa a interface `NestMiddleware`. Ele captura o método HTTP e a rota acessada, além de verificar se a rota inicia com `/admin`.

```typescript
import { Injectable, NestMiddleware } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express'; 

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const currentUrl = req.originalUrl || req.url;

    // Log do Método e Rota no console
    console.log(`[LOG] Método: ${req.method} | Rota: ${req.path}`);

    // Validação de segurança para rotas administrativas (/admin)
    if (currentUrl.startsWith('/admin')) {
      const base = req.headers['x-user-base'];
      if (base !== 'Administrator') {
        return res.status(403).json({
          Codigo: 403,
          mensagem: 'Acesso Negado: Previlégio de Administrator necessário',
          registro: new Date(),
        });
      }
    }

    // Permite o prosseguimento para a próxima etapa/controller
    next();
  }
}

```


2. **Configurar o Middleware no AppModule:** src/app.module.ts.
Implemente a interface `NestModule` e utilize o `MiddlewareConsumer` para aplicar o `LoggerMiddleware` em todas as rotas (`*`).

```typescript
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { LoggerMiddleware } from './logger/logger.middleware.js';
import { ImagemModule } from './imagem/imagem.module.js';

@Module({
  imports: [ImagemModule],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

```


3. **Criar o Controller de Teste:** src/app.controller.ts.
Defina rotas públicas e administrativas para testar o comportamento do middleware.

```typescript
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getPublic() {
    return { mensagem: 'Rota pública acessada com sucesso!' };
  }

  @Get('admin/dashboard')
  getAdminDashboard() {
    return { mensagem: 'Bem-vindo ao Dashboard Administrativo!' };
  }
}

```


---

## 🧪 Testando no Insomnia

### 1. Rota Pública (`GET /`)

* **Método:** `GET`
* **URL:** `http://localhost:3000/`
* **Resultado Esperado (`200 OK`):**
```json
{
  "mensagem": "Rota pública acessada com sucesso!"
}

```


* **Console do Terminal:**
```text
[LOG] Método: GET | Rota: /

```



---

### 2. Rota Admin Sem Autorização (`GET /admin/dashboard`)

* **Método:** `GET`
* **URL:** `http://localhost:3000/admin/dashboard`
* **Headers:** *(Nenhum cabeçalho enviado)*
* **Resultado Esperado (`403 Forbidden`):**
```json
{
  "Codigo": 403,
  "mensagem": "Acesso Negado: Previlégio de Administrator necessário",
  "registro": "2026-09-30T21:23:00.000Z"
}

```



---

### 3. Rota Admin Com Autorização (`GET /admin/dashboard`)

* **Método:** `GET`
* **URL:** `http://localhost:3000/admin/dashboard`
* **Headers:**
| Key | Value |
| --- | --- |
| `x-user-base` | `Administrator` |


* **Resultado Esperado (`200 OK`):**
```json
{
  "mensagem": "Bem-vindo ao Dashboard Administrativo!"
}

```


* **Console do Terminal:**
```text
[LOG] Método: GET | Rota: /admin/dashboard

```



---

## 🔎 Resumo dos Cenários de Teste

| Teste | Rota | Header (`x-user-base`) | Status | Resultado |
| --- | --- | --- | --- | --- |
| **Rota Pública** | `GET /` | *(Ausente)* | `200 OK` | Acesso liberado + Log exibido |
| **Admin Sem Header** | `GET /admin/dashboard` | *(Ausente)* | `403 Forbidden` | Bloqueado pelo Middleware |
| **Admin Header Incorreto** | `GET /admin/dashboard` | `User` | `403 Forbidden` | Bloqueado pelo Middleware |
| **Admin Autorizado** | `GET /admin/dashboard` | `Administrator` | `200 OK` | Acesso liberado + Log exibido |

---

## 🛠️ Tecnologias e Ferramentas

| Ferramenta | Categoria | Descrição |
| --- | --- | --- |
| NestJS | Framework | Framework Node.js para construção de aplicações no servidor. |
| Express | Framework Web | Fornece os tipos `Request`, `Response` e `NextFunction`. |
| TypeScript | Linguagem | Superset JavaScript tipado para desenvolvimento seguro. |
| Insomnia | HTTP Client | Ferramenta para testes de requisições e cabeçalhos HTTP. |

---

## 👤 Autor

Mayssa Gibson

---

### 🚀 Commits Semânticos (Aula 13)

#### 1️⃣ Commits Individuais (Recomendado)

```bash
# 1. Criação do Middleware de Logging e Proteção de Rotas Admin
git add src/logger/logger.middleware.ts
git commit -m "feat(aula-13): implementa LoggerMiddleware para log de requisicoes e bloqueio /admin"

# 2. Configuração do Middleware no AppModule
git add src/app.module.ts
git commit -m "feat(aula-13): configura LoggerMiddleware globalmente em AppModule via NestModule"

# 3. Adição das rotas de teste no AppController
git add src/app.controller.ts
git commit -m "feat(aula-13): adiciona rotas publica e administrativa em AppController"

# 4. Atualização da Documentação no README.md
git add README.md
git commit -m "docs(aula-13): adiciona documentacao da aula 13 sobre middlewares e interceptors"

```

---

#### 2️⃣ Commit Único em Lote

```bash
git add .
git commit -m "feat(aula-13): implementa middleware de logs, validacao admin e documentacao da aula 13"
git push origin main

```