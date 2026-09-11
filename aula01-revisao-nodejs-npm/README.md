
# Project Title

A brief description of what this project does and who it's for

# 📚 Aula 01 — Revisão Node.js & NPM

**Unidade Curricular:** Codificação para Back-End  
**Instituição:** SENAI — Amapá  
**Autor:** Mayssa Gibson de Oliveira

Este repositório contém os códigos, exercícios e anotações teóricas desenvolvidos na Aula 01, com foco em fundamentos do Node.js, gerenciamento de dependências com NPM e criação de rotinas de diagnóstico utilizando módulos nativos do sistema operacional.

---

## 🎯 Objetivos da Aula

- Compreender os conceitos do ecossistema Node.js e sua execução Server-Side.
- Validar e configurar o ambiente de desenvolvimento local.
- Inicializar um projeto Node.js utilizando o NPM (Node Package Manager).
- Desenvolver um script de diagnóstico utilizando o módulo nativo `os` para acessar recursos do sistema operacional.
- Aplicar boas práticas no controle de versão utilizando Git e GitHub.

---

## 💻 Conceitos Server-Side Aplicados

Diferente da execução tradicional no navegador (Client-Side), onde o código é limitado ao DOM e à interface visual:

- **Acesso Direto ao Sistema Operacional:** O Node.js permite interagir diretamente com o hardware, memória e sistema de arquivos.
- **Execução via Terminal:** O código é executado diretamente pelo runtime do Node.js através da linha de comando, sem necessidade de uma página HTML.
- **Arquitetura Non-blocking I/O:** Utilização do motor V8 e do Event Loop para processar instruções de forma assíncrona e performática.

---

## 📂 Estrutura de Pastas do Projeto

```
aula01-revisao-nodejs-npm/
├── package.json        # Arquivo manifesto de metadados e configurações do NPM
├── diagonostico.js     # Script em JS para diagnóstico de hardware/sistema (módulo os)
└── README.md           # Documentação completa da Aula 01
```

---

## 📄 Arquivos e Códigos do Projeto

### 1. package.json

Arquivo manifesto responsável pelo gerenciamento de configurações, metadados e scripts de execução do projeto.

```json
{
  "name": "aula01-revisao-nodejs-npm",
  "version": "1.0.0",
  "description": "Aula de revisão sobre conceitos de Node.js e NPM - SENAI Amapá",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node index.js",
    "diagnostico": "node diagonostico.js"
  },
  "keywords": [
    "nodejs",
    "npm",
    "javascript",
    "backend",
    "senai"
  ],
  "author": "Mayssa Gibson de Oliveira",
  "license": "ISC",
  "type": "commonjs"
}
```

### 2. diagonostico.js

Script desenvolvido para mapear e exibir no terminal as informações de hardware e do sistema operacional através do módulo nativo `os`.

```javascript
// Importação do módulo nativo OS (Operating System)
const os = require('os');

console.log('==========================================');
console.log('🖥️  DIAGNÓSTICO DO SISTEMA OPERACIONAL');
console.log('==========================================\n');

// 1. Plataforma do Sistema Operacional
console.log(`📌 Plataforma            : ${os.platform()}`);

// 2. Memória Total (convertida de bytes para GB)
const totalMemGB = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
console.log(`📌 Memória Total         : ${totalMemGB} GB`);

// 3. Memória Livre (convertida de bytes para GB)
const freeMemGB = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);
console.log(`📌 Memória Livre         : ${freeMemGB} GB`);

// 4. Detalhes do Processador (CPUs)
console.log(`📌 Núcleos da CPU (CPUs) : ${os.cpus().length}`);
console.log(`📌 Modelo do Processador : ${os.cpus()[0].model}`);

console.log('\n------------------------------------------');
console.log('✅ Ambiente verificado e pronto para uso!');
console.log('==========================================');
```

---

## 🛠️ Mapeamento dos Métodos do Módulo `os`

| Método | Descrição e Retorno |
|--------|---------------------|
| `os.platform()` | Retorna uma string identificando a plataforma do SO (ex: `win32`, `linux`, `darwin`). |
| `os.totalmem()` | Retorna a quantidade total de memória RAM física do sistema em bytes. |
| `os.freemem()` | Retorna a quantidade de memória RAM livre/disponível no sistema em bytes. |
| `os.cpus()` | Retorna um array contendo objetos com informações detalhadas sobre cada núcleo de CPU. |

> **📌 Observação Técnica:** O módulo `os` é nativo do Node.js, ou seja, não há necessidade de instalá-lo via `npm install`. Ele exemplifica a capacidade do JavaScript no lado do servidor em acessar dados de sistema que seriam bloqueados em navegadores por motivos de segurança.

---

## 🚀 Passo a Passo de Execução

### 1. Verificação do Ambiente

Antes de iniciar a aplicação, confirme a instalação do Node.js e NPM no seu terminal:

```bash
node -v
npm -v
```

### 2. Navegar até o diretório do projeto

```bash
cd aula01-revisao-nodejs-npm
```

### 3. Inicialização do Projeto (caso crie do zero)

```bash
npm init -y
```

### 4. Execução do Script

Você pode executar o script diretamente pelo Node.js ou através do script customizado do NPM:

```bash
# Execução direta via Node.js
node diagonostico.js

# Ou via NPM script (configurado no package.json)
npm run diagnostico
```

---

##  Tecnologias e Ferramentas

| Ferramenta | Categoria | Descrição |
|------------|-----------|-----------|
| Node.js | Runtime | Ambiente de execução do JavaScript no servidor. |
| NPM | Gerenciador | Gerenciamento de dependências e scripts do projeto. |
| CommonJS | Sistema de Módulos | Padrão nativo do Node.js para importação (`require`). |
| Git & GitHub | Versionamento | Controle de versão e hospedagem do código-fonte. |

---

##  Autor

**Mayssa Gibson de Oliveira**  
