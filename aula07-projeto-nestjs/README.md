Aqui está o conteúdo do guia da aula estruturado em formato README.md, ideal para inclusão no repositório do seu projeto ou ambiente de estudos.

Markdown
# 🚀 Desenvolvimento Backend com Nest.js
## Aula 07: Estrutura de Projeto e Fundamentos de Nest.js

**Tema:** Arquitetura Nest.js, padrão opinativo, modularidade e configuração do ambiente de desenvolvimento.

---

## 1. 🎯 Objetivos da Aula

* Compreender as limitações do Node.js puro e as vantagens de adotar um framework opinativo.
* Conhecer os pilares do Nest.js: **TypeScript nativo**, **Modularidade** e **Injeção de Dependências (DI)**.
* Entender a estrutura de arquivos da pasta `src/` e os arquivos de configuração do projeto.
* Utilizar a **Nest CLI** para criar, estruturar e executar um projeto.

---

## 2. 🧠 Fundamentos Teóricos

### Framework Opinativo
O Nest.js define padrões claros de arquitetura e convenções de nomenclatura. Isso facilita a padronização e escalabilidade do código, além de agilizar a integração de novos desenvolvedores na equipe.

### Estrutura da Pasta `src/`

| Arquivo | Descrição / Responsabilidade |
| :--- | :--- |
| `main.ts` | Ponto de entrada (*bootstrap*) da aplicação. |
| `app.module.ts` | Módulo raiz que organiza e registra dependências. |
| `app.controller.ts` | Responsável por receber requisições HTTP e mapear rotas via *decorators*. |
| `app.service.ts` | Camada de serviço onde reside a lógica de negócio. |

### Arquivos de Configuração

| Arquivo | Função no Projeto |
| :--- | :--- |
| `package.json` | Manifesto do projeto e gerenciamento de dependências. |
| `tsconfig.json` | Configurações do compilador TypeScript. |
| `nest-cli.json` | Automação e configurações do ecossistema Nest CLI. |

---

## 3. 🛠️ Atividade Prática: O Arquiteto de Software

⏱ **Duração:** 30 minutos

### Requisitos da Atividade
1. Instalar a Nest CLI globalmente e criar um novo projeto chamado `projeto-aula-07`.
2. Explorar o código-fonte e identificar onde o retorno padrão `"Hello World!"` está configurado.
3. Alterar o prefixo do Controller para `/api` utilizando o decorator `@Controller('api')`.
4. Alterar a mensagem de retorno para `"Servidor Nest.js Ativo"`.
5. Executar a aplicação via `npm run start:dev` e validar via navegador ou Postman/Insomnia.

---

### Passo a Passo e Código Prático

#### Passo 1: Instalação e Criação do Projeto (Terminal)
No seu terminal, execute os comandos abaixo para instalar a CLI e gerar a estrutura inicial:

```bash
# Instalar a CLI do Nest.js de forma global
npm install -g @nestjs/cli

# Criar o novo projeto
nest new projeto-aula-07

# Acessar a pasta do projeto
cd projeto-aula-07
Nota: Ao rodar nest new, escolha o gerenciador de pacotes de sua preferência (npm, yarn ou pnpm).

Passo 2: Alteração do Service (src/app.service.ts)
Abra o arquivo src/app.service.ts e altere o método getHello() para retornar a nova mensagem:

TypeScript
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Servidor Nest.js Ativo';
  }
}
Passo 3: Alteração do Controller (src/app.controller.ts)
Abra o arquivo src/app.controller.ts e adicione o prefixo 'api' ao decorator @Controller():

TypeScript
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
Passo 4: Execução do Projeto
Inicie o servidor em modo de desenvolvimento (watch mode):

Bash
npm run start:dev
4. ✅ Checklist de Validação
[ ] Projeto Nest.js gerado corretamente pela CLI.

[ ] Execução com npm run start:dev ativa o modo de desenvolvimento (watch mode).

[ ] Requisição GET para http://localhost:3000/api retorna a string "Servidor Nest.js Ativo".