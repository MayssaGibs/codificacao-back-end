Aula 02 — Módulos no Node.js (CommonJS vs. ES Modules)

**Unidade Curricular:** Codificação para Back-End  
**Instituição:** SENAI — Amapá  
**Autor:** Mayssa Gibson de Oliveira

Este repositório contém os códigos, exercícios e anotações teóricas desenvolvidos na Aula 02, com foco na transição do sistema de módulos CommonJS para o padrão moderno ES Modules (ESM), configuração do arquivo manifesto `package.json` e criação de módulos utilitários para formatação de logs com data e hora.

---

## 🎯 Objetivos da Aula

- Compreender a evolução e as diferenças entre o sistema **CommonJS** (`require`/`module.exports`) e o **ES Modules** (`import`/`export`).
- Configurar a propriedade `"type": "module"` no arquivo `package.json` para habilitar a sintaxe ES6 nativamente no Node.js.
- Desenvolver e exportar funções utilitárias personalizadas utilizando a palavra-chave `export`.
- Criar o módulo `log.js` com a função `formatLog` para padronizar mensagens do sistema com registro de data em padrão ISO e horário local.
- Aplicar boas práticas no controle de versão utilizando Git e GitHub.

---

## 💻 Conceitos de Modularização Aplicados

No ecossistema Node.js, a modularização permite organizar a aplicação em arquivos independentes e reutilizáveis:

- **ES Modules (ESM):** Padrão oficial do JavaScript (ES6) que utiliza os comandos `import` e `export`. Permite carregamento assíncrono e verificação estática de dependências.
- **Configuração `"type": "module"`:** Instrução adicionada ao `package.json` que faz com que o runtime do Node.js interprete todos os arquivos `.js` como módulos ES.
- **Isolamento de Escopo:** Variáveis e funções declaradas dentro de um módulo permanecem privadas, sendo expostas apenas através da exportação explícita.

---

## 📂 Estrutura de Pastas do Projeto

```text
aula02-modulos-commonjs-esm/
├── package.json        # Arquivo manifesto configurado com suporte a ES Modules
├── log.js              # Módulo utilitário com a função formatLog
└── README.md           # Documentação completa da Aula 02
📄 Arquivos e Códigos do Projeto1. package.jsonArquivo manifesto responsável pelo gerenciamento de configurações do projeto, parametrizado com "type": "module".JSON{
  "name": "aula02-modulos-commonjs-esm",
  "version": "1.0.0",
  "description": "Aula de revisão sobre módulos CommonJS e ES Modules - SENAI Amapá",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "nodejs",
    "esmodules",
    "commonjs",
    "javascript",
    "backend",
    "senai"
  ],
  "author": "Mayssa Gibson de Oliveira",
  "license": "ISC",
  "type": "module"
}
2. log.jsMódulo responsável por formatar e padronizar mensagens de log do sistema, capturando a data no formato ISO (YYYY-MM-DD) e o horário local em tempo de execução.JavaScriptexport function formatLog(mensagem) {
  const dataAtual = new Date()
    .toISOString().split('T')[0];

  const horaAtual = new Date()
    .toLocaleTimeString();

  return `[${dataAtual} - ${horaAtual}]: ${mensagem}`;
}
🛠️ Comparativo entre Sistemas de MódulosCaracterísticaCommonJS (CJS)ES Modules (ESM)Sintaxe de Importaçãoconst modulo = require('./modulo');import { funcao } from './modulo.js';Sintaxe de Exportaçãomodule.exports = { funcao };export function funcao() { ... }Configuração no Node.jsPadrão nativo tradicional do Node.js.Requer "type": "module" no package.json.Uso de ExtensõesPermite omitir a extensão .js.Exige a inclusão explícita da extensão .js.📌 Observação Técnica: Ao utilizar "type": "module" no package.json, o Node.js exige que os caminhos relativos nas declarações de import especifiquem sempre a extensão do arquivo (ex: './log.js'), caso contrário um erro ERR_MODULE_NOT_FOUND será lançado.🚀 Passo a Passo de Execução1. Navegar até o diretório do projetoBashcd aula02-modulos-commonjs-esm
2. Inicialização do Projeto (caso crie do zero)Bashnpm init -y
3. Exemplo de Uso e Execução do MóduloPara testar o módulo, crie um arquivo index.js na raiz da pasta e importe a função:JavaScript// index.js
import { formatLog } from './log.js';

console.log(formatLog('Sistema inicializado com sucesso!'));
console.log(formatLog('Executando módulo de formatação de logs.'));
Execute o arquivo no terminal:Bashnode index.js
🛠️ Tecnologias e FerramentasFerramentaCategoriaDescriçãoNode.jsRuntimeAmbiente de execução do JavaScript no servidor.NPMGerenciadorGerenciamento de dependências e configurações do projeto.ES ModulesSistema de MódulosPadrão nativo do JavaScript moderno para importação/exportação (import/export).Git & GitHubVersionamentoControle de versão e hospedagem do código-fonte.👤 AutorMayssa Gibson de Oliveira