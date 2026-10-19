# 📚 Aula 16 — Validação de Schemas com Zod e NestJS (`aula16-validacao-schemas-com-zod-nestjs`)

**Unidade Curricular:** Codificação para Back-End  
**Instituição:** SENAI — Amapá  
**Autor:** Mayssa Gibson

Este repositório contém os códigos, exercícios e anotações teóricas desenvolvidos na **Aula 16**, com foco na **validação de dados utilizando Zod em projetos NestJS**. A atividade apresenta a criação de um schema para validar os dados de um colaborador, definindo regras para nome, e-mail, idade e departamento.

---

## 🎯 Objetivos da Aula

- Compreender a importância da validação de dados no back-end.
- Conhecer a biblioteca Zod para validação de schemas em TypeScript.
- Criar schemas utilizando `z.object()`.
- Aplicar regras de validação para strings, e-mails, números e valores enumerados.
- Personalizar mensagens de erro para dados inválidos.
- Inferir tipos TypeScript a partir de schemas usando `z.infer`.
- Entender como integrar a validação ao fluxo de requisições de uma aplicação NestJS.

---

## 💻 Conceitos Aplicados

- **Zod:** biblioteca para validação de dados e definição de schemas com suporte a TypeScript.
- **`z.object()`:** define um objeto com propriedades e regras de validação.
- **`z.string()`:** valida valores do tipo string.
- **`.min()`:** define um limite mínimo para o tamanho de uma string ou para o valor numérico.
- **`z.email()`:** valida o formato de um endereço de e-mail.
- **`z.number()`:** valida valores numéricos.
- **`.max()`:** define um limite máximo.
- **`z.enum()`:** restringe um campo a uma lista de valores permitidos.
- **`z.infer`:** extrai o tipo TypeScript correspondente ao schema.
- **Mensagens personalizadas:** explicam por que um dado não passou na validação.

---

## 📂 Estrutura de Pastas do Projeto

A estrutura abaixo é um exemplo e deve ser adaptada aos arquivos existentes no projeto.

```text
aula16-validacao-schemas-com-zod-nestjs/
├── src/
│   ├── colaboradores/
│   │   ├── colaborador.schema.ts       # Schema de validação
│   │   ├── colaboradores.controller.ts # Rotas de colaboradores, se implementadas
│   │   ├── colaboradores.service.ts    # Regras de negócio, se implementadas
│   │   └── colaboradores.module.ts     # Módulo de colaboradores, se implementado
│   ├── app.module.ts                   # Módulo raiz da aplicação
│   └── main.ts                         # Inicialização da aplicação
├── package.json
└── README.md                           # Documentação da Aula 16
```

---

## ⚙️ Instalação e Execução

### 1. Pré-requisitos

- [Node.js](https://nodejs.org/) instalado.
- npm instalado junto com o Node.js.
- Projeto NestJS configurado.

### 2. Instalar as dependências

Na pasta do projeto, execute:

```bash
npm install
```

Instale o Zod caso ainda não esteja nas dependências:

```bash
npm install zod
```

### 3. Iniciar a aplicação

Em um projeto NestJS com os scripts padrão, execute:

```bash
npm run start:dev
```

A aplicação será iniciada na porta configurada no projeto.

---

## 🧩 Schema de Validação do Colaborador

O schema define as regras que os dados de um colaborador precisam cumprir.

Arquivo: `src/colaboradores/colaborador.schema.ts`

```typescript
import { z } from "zod";

export const colaboradorSchema = z.object({
  nome: z.string()
    .min(3, {
      message: "O nome deve ter no mínimo 3 letras!",
    }),

  email: z.email({
    message: "O email deve ser válido!",
  }),

  idade: z.number({
    message: "A idade deve ser um número válido",
  })
    .min(18, {
      message: "A idade mínima permitida é 18 anos!",
    })
    .max(65, {
      message: "A idade máxima permitida é 65 anos!",
    }),

  departamento: z.enum(
    ["TI", "RH", "Comercial", "Financeiro"],
    {
      error: () => ({
        message:
          "Departamento deve ser obrigatoriamente TI, RH, Comercial ou Financeiro",
      }),
    }
  ),
});

export type Colaborador = z.infer<typeof colaboradorSchema>;
```

### Explicação das regras

| Campo | Tipo esperado | Regra | Exemplo válido |
|---|---|---|---|
| `nome` | `string` | Mínimo de 3 caracteres | `Ana Silva` |
| `email` | E-mail válido | Deve apresentar formato de e-mail válido | `ana@exemplo.com` |
| `idade` | `number` | Entre 18 e 65 anos, inclusive | `25` |
| `departamento` | Enum | Deve corresponder a um dos valores permitidos | `TI` |

### Entendendo o `z.infer`

```typescript
export type Colaborador = z.infer<typeof colaboradorSchema>;
```

Essa declaração cria o tipo TypeScript `Colaborador` com base nas propriedades definidas no schema. Assim, a estrutura dos dados é inferida automaticamente, evitando a necessidade de declarar o mesmo tipo manualmente.

---

## 🧪 Exemplos de Validação

### 1. Dados válidos

```typescript
const resultado = colaboradorSchema.safeParse({
  nome: "Ana Silva",
  email: "ana@exemplo.com",
  idade: 25,
  departamento: "TI",
});

if (resultado.success) {
  console.log("Dados válidos:", resultado.data);
} else {
  console.log("Erros de validação:", resultado.error.issues);
}
```

**Resultado esperado:** a validação é aprovada e os dados ficam disponíveis em `resultado.data`.

### 2. Nome muito curto

```typescript
const resultado = colaboradorSchema.safeParse({
  nome: "Al",
  email: "ana@exemplo.com",
  idade: 25,
  departamento: "TI",
});
```

**Resultado esperado:** a validação falha porque o nome possui menos de 3 caracteres.

Mensagem de erro:

```text
O nome deve ter no mínimo 3 letras!
```

### 3. E-mail inválido

```typescript
const resultado = colaboradorSchema.safeParse({
  nome: "Ana Silva",
  email: "email-invalido",
  idade: 25,
  departamento: "TI",
});
```

**Resultado esperado:** a validação falha porque o e-mail não possui um formato válido.

Mensagem de erro:

```text
O email deve ser válido!
```

### 4. Idade abaixo do mínimo

```typescript
const resultado = colaboradorSchema.safeParse({
  nome: "Ana Silva",
  email: "ana@exemplo.com",
  idade: 16,
  departamento: "TI",
});
```

**Resultado esperado:** a validação falha porque a idade é inferior a 18 anos.

Mensagem de erro:

```text
A idade mínima permitida é 18 anos!
```

### 5. Idade acima do máximo

Se a idade informada for `70`, a validação também falhará porque o limite máximo permitido é 65 anos.

Mensagem de erro:

```text
A idade máxima permitida é 65 anos!
```

### 6. Departamento não permitido

```typescript
const resultado = colaboradorSchema.safeParse({
  nome: "Ana Silva",
  email: "ana@exemplo.com",
  idade: 25,
  departamento: "Marketing",
});
```

**Resultado esperado:** a validação falha porque `Marketing` não está entre os departamentos permitidos.

Departamentos aceitos:

- `TI`
- `RH`
- `Comercial`
- `Financeiro`

---

## 🔍 Diferença entre `parse()` e `safeParse()`

O Zod oferece dois métodos comuns para validar dados:

| Método | Comportamento |
|---|---|
| `parse(dados)` | Retorna os dados validados ou lança um erro `ZodError` quando a validação falha. |
| `safeParse(dados)` | Retorna um resultado com `success: true` ou `success: false`, permitindo tratar erros sem lançar uma exceção durante o fluxo normal de validação. |

O método `safeParse()` é útil quando a aplicação precisa verificar os dados e transformar os erros em respostas HTTP apropriadas.

---

## 🔗 Integração com NestJS

O schema define as regras de validação, mas **não valida automaticamente as requisições do NestJS apenas por existir**. É necessário executar `parse()` ou `safeParse()` em um controller, service, pipe ou outro ponto apropriado.

Exemplo simplificado de validação em um controller:

```typescript
import {
  BadRequestException,
  Body,
  Controller,
  Post,
} from "@nestjs/common";

import { colaboradorSchema } from "./colaborador.schema.js";

@Controller("colaboradores")
export class ColaboradoresController {
  @Post()
  criar(@Body() body: unknown) {
    const resultado = colaboradorSchema.safeParse(body);

    if (!resultado.success) {
      throw new BadRequestException({
        message: "Dados do colaborador inválidos.",
        errors: resultado.error.issues,
      });
    }

    return {
      mensagem: "Dados do colaborador validados com sucesso.",
      colaborador: resultado.data,
    };
  }
}
```

> Este exemplo demonstra uma possibilidade de integração. O caminho do import deve corresponder à estrutura real do projeto, e o controller precisa estar registrado no módulo correspondente.

### Resposta quando os dados são válidos

Exemplo de corpo enviado:

```json
{
  "nome": "Ana Silva",
  "email": "ana@exemplo.com",
  "idade": 25,
  "departamento": "TI"
}
```

Exemplo de resposta:

```json
{
  "mensagem": "Dados do colaborador validados com sucesso.",
  "colaborador": {
    "nome": "Ana Silva",
    "email": "ana@exemplo.com",
    "idade": 25,
    "departamento": "TI"
  }
}
```

### Resposta quando os dados são inválidos

No exemplo de controller, dados inválidos geram uma exceção HTTP `400 Bad Request`, acompanhada de informações sobre os erros de validação.

---

## 📋 Resumo dos Cenários de Teste

| Campo/cenário | Entrada | Resultado esperado |
|---|---|---|
| Nome válido | `Ana Silva` | Aprovado |
| Nome curto | `Al` | Reprovado |
| E-mail válido | `ana@exemplo.com` | Aprovado |
| E-mail inválido | `email-invalido` | Reprovado |
| Idade mínima | `18` | Aprovado |
| Idade abaixo do mínimo | `17` | Reprovado |
| Idade máxima | `65` | Aprovado |
| Idade acima do máximo | `66` | Reprovado |
| Departamento válido | `TI` | Aprovado |
| Departamento inválido | `Marketing` | Reprovado |

**Observação:** `z.number()` espera um valor numérico. Se a idade chegar como texto, por exemplo `"25"`, a validação falhará. A conversão precisa ser realizada explicitamente ou com recursos de coerção do Zod, caso sejam adequados à aplicação.

---

## 🛠️ Tecnologias e Ferramentas

| Tecnologia/Ferramenta | Categoria | Descrição |
|---|---|---|
| NestJS | Framework | Estrutura para construção de aplicações back-end em Node.js. |
| TypeScript | Linguagem | Adiciona tipagem estática ao JavaScript. |
| Zod | Biblioteca | Define schemas e valida dados em tempo de execução. |
| Node.js | Ambiente de execução | Executa a aplicação. |
| npm | Gerenciador de pacotes | Instala e gerencia as dependências. |
| Insomnia ou Postman | Cliente HTTP | Permite testar requisições e respostas, caso exista um endpoint implementado. |

---

## ⚠️ Observações Técnicas

- O schema valida os dados quando um método como `parse()` ou `safeParse()` é executado.
- As mensagens personalizadas ajudam a identificar o motivo de cada falha.
- `z.infer<typeof colaboradorSchema>` gera o tipo TypeScript a partir das regras do schema.
- A validação não substitui regras de negócio, autenticação ou autorização.
- A sintaxe de mensagens e opções pode variar entre versões do Zod. Confira a versão instalada caso ocorram erros de TypeScript.
- Para garantir que todas as rotas necessárias sejam validadas, considere centralizar a validação em um pipe reutilizável.

---

## 👤 Autor

**Mayssa Gibson**  
**Instituição:** SENAI — Amapá  
**Unidade Curricular:** Codificação para Back-End

---

## 🚀 Commits Semânticos (Aula 16)

### 1️⃣ Commits individuais

```bash
# 1. Schema de validação do colaborador
git add aula16-validacao-schemas-com-zod-nestjs/src/colaboradores/colaborador.schema.ts
git commit -m "feat(aula-16): cria schema de validacao de colaborador com Zod"

# 2. Controller com validação integrada, caso exista no projeto
git add aula16-validacao-schemas-com-zod-nestjs/src/colaboradores/colaboradores.controller.ts
git commit -m "feat(aula-16): integra validacao Zod ao endpoint de colaboradores"

# 3. Documentação da aula
git add aula16-validacao-schemas-com-zod-nestjs/README.md
git commit -m "docs(aula-16): adiciona README sobre validacao com Zod e NestJS"
```

### 2️⃣ Commit único em lote

```bash
git add aula16-validacao-schemas-com-zod-nestjs/
git commit -m "feat(aula-16): implementa validacao de schemas com Zod e NestJS"
git push origin main
```

> Execute apenas os comandos referentes aos arquivos que realmente existem e foram modificados no seu projeto. Se você criou somente o schema e o README, não precisa adicionar um controller que ainda não existe.

---

**Aula 16 — Validação de Schemas com Zod e NestJS**  
*Projeto acadêmico de Codificação para Back-End — SENAI Amapá.*
