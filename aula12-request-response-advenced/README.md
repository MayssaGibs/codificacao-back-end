

📁 README.md
Markdown
# 🔐 API de Área Secreta com Autenticação por Header — NestJS

Mini projeto desenvolvido com Node.js, NestJS e TypeScript para praticar a implementação de controle de acesso a rotas protegidas utilizando cabeçalhos HTTP customizados (`x-api-key` / `y-api-key`).

A aplicação valida a chave enviada no header da requisição, injeta um cabeçalho de resposta customizado de verificação (`y-auth-status`) e retorna respostas estruturadas com registro de data/hora (`log`).

---

## 🚀 Funcionalidades

- 🔑 Validação de chave de API (`API Key`) enviada via cabeçalho HTTP;
- 🏷️ Injeção de cabeçalho de resposta customizado (`y-auth-status: verficado`);
- ⏱️ Geração de log com carimbo de data/hora (`new Date()`);
- 🟢 Resposta HTTP `200 OK` para requisições autenticadas;
- 🔴 Resposta HTTP `403 Forbidden` para chaves inválidas ou ausentes.

---

## 🛠️ Tecnologias

- Node.js
- NestJS
- TypeScript
- Express (`Response`)
- Insomnia / Postman

---

## 📤 Endpoint Protegido

**`GET /secret`**

**URL:**
`http://localhost:3000/secret`

**Cabeçalho Requerido (Header):**
| Header Key | Header Value |
| :--- | :--- |
| `y-api-key` | `FULLSTACK-2026` |

---

## 🧪 Testando no Insomnia

1. Crie uma requisição `GET`.
2. Informe a URL: `http://localhost:3000/secret`.
3. Acesse a aba **Headers**.
4. Adicione o cabeçalho:
   - **Header:** `y-api-key`
   - **Value:** `FULLSTACK-2026`
5. Clique em **Send**.

---

## 📦 Respostas da API

### 1. Acesso Concedido (`200 OK`)

Quando a chave enviada no header `y-api-key` for **`FULLSTACK-2026`**:

**Status:** `200 OK`  
**Header de Resposta:** `y-auth-status: verficado`

```json
{
  "mensagem": "Acesso concedido a Area Secreta!",
  "log": "2026-09-29T21:25:01.000Z"
}
2. Acesso Negado (403 Forbidden)
Quando a chave for omitida ou incorreta:

Status: 403 Forbidden

JSON
{
  "erro": "Forbidden",
  "mensagem": "Chave API inválida ou ausente",
  "log": "2026-09-29T21:25:01.000Z"
}
📂 Estrutura do Código
Plaintext
src/
├── seguranca/
│   ├── seguranca.controller.ts
│   └── seguranca.module.ts
├── app.module.ts
└── main.ts
🔍 Regras de Negócio e Código
TypeScript
import { Controller, Get, Headers, Res } from "@nestjs/common";
import type { Response } from "express";

@Controller('secret')
export class SegurancaController {
    @Get()
    acessAreaSecret(@Headers('y-api-key') apiKey: string, @Res() res: Response) {
        if (apiKey === 'FULLSTACK-2026') {
            res.setHeader('y-auth-status', 'verficado');
            return res.status(200).json({
                mensagem: 'Acesso concedido a Area Secreta!',
                log: new Date(),
            });
        }
        
        return res.status(403).json({
            erro: 'Forbidden',
            mensagem: 'Chave API inválida ou ausente',
            log: new Date(),
        });
    }
}
🔎 Testes Práticos no Insomnia
Teste 1 — Chave Válida
GET http://localhost:3000/secret

Header: y-api-key = FULLSTACK-2026

Resultado esperado: Status 200 OK, mensagem de sucesso e header y-auth-status: verficado.

Teste 2 — Chave Incorreta
GET http://localhost:3000/secret

Header: y-api-key = CHAVE-ERRADA

Resultado esperado: Status 403 Forbidden com mensagem de chave inválida.

Teste 3 — Sem Cabeçalho
GET http://localhost:3000/secret

Sem adicionar nenhum header.

Resultado esperado: Status 403 Forbidden.

🎯 Objetivo
Este código foi desenvolvido para praticar conceitos de Segurança e Autenticação no NestJS:

Captura de cabeçalhos HTTP com o decorador @Headers();

Manipulação da resposta HTTP do Express com @Res();

Definição de status HTTP dinâmicos (200 e 403);

Injeção de cabeçalhos de resposta com res.setHeader();

Tratamento de controle de acesso simples baseado em chave de API (API Key).


---

### 🚀 Commits Semânticos

#### 1️⃣ Commits Individuais (Recomendado)

```bash
# 1. Controller com controle de acesso por API Key
git add src/seguranca/seguranca.controller.ts
git commit -m "feat(seguranca): cria SegurancaController com validacao de api key no header"

# 2. Módulo de Segurança (se houver)
git add src/seguranca/seguranca.module.ts
git commit -m "feat(seguranca): registra SegurancaController no SegurancaModule"

# 3. Documentação README.md
git add README.md
git commit -m "docs(seguranca): adiciona README com documentacao da rota secreta e testes no insomnia"
2️⃣ Commit Único em Lote
Bash
git add .
git commit -m "feat(seguranca): implementa autenticacao de area secreta por header HTTP e documentacao"
git push origin main