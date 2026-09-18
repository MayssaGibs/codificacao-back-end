# 📚 Aula 05 — Gerenciamento de Variáveis de Ambiente no Node.js (`dotenv`)

**Autor:** Mayssa Gibson de Oliveira

Este repositório contém os códigos, exercícios e anotações teóricas desenvolvidos na Aula 05, focados na segurança e parametrização de aplicações Node.js utilizando **Variáveis de Ambiente** via biblioteca `dotenv`, validação de credenciais sensíveis e controle de falhas na inicialização do serviço.

---

## 🎯 Objetivos da Aula

- Compreender a relevância e segurança ao isolar configurações do sistema de dados sensíveis (segredos, chaves de API, credenciais).
- Utilizar o pacote `dotenv` para carregar variáveis definidas em um arquivo `.env` para o objeto global `process.env`.
- Implementar validação preventiva de credenciais críticas (como `API_KEY_PAGAMENTO`) ao inicializar o serviço.
- Utilizar `process.exit(1)` para interromper a execução do serviço caso configurações obrigatórias estejam ausentes.
- Aplicar boas práticas de segurança utilizando o `.gitignore` para impedir o vazamento de segredos no controle de versão (Git/GitHub).

---

## 💻 Conceitos de Segurança e Configuração Aplicados

Em conformidade com as diretrizes do manifesto *Twelve-Factor App* (12 Factors), as configurações de um ambiente devem ser estritamente separadas do código-fonte:

- **Objeto `process.env`:** Propriedade global do Node.js que armazena o estado e as variáveis do ambiente de execução.
- **Biblioteca `dotenv`:** Módulo que carrega automaticamente as pares chave-valor definidas no arquivo `.env` para o `process.env`.
- **Validação de Variáveis Críticas:** Garante que o sistema não inicie em estado inconsistente caso uma chave essencial não esteja configurada.
- **Encerramento Seguro (`process.exit(1)`):** Força o término do processo Node.js retornando um código de erro `1`, sinalizando falha de inicialização para orquestradores e sistemas de monitoramento.
- **Segurança de Segredos:** Arquivos `.env` contêm informações sigilosas e **nunca** devem ser commitados no repositório remoto (devem constar no `.gitignore`).

---

## 📂 Estrutura de Pastas do Projeto

```text
aula05-variaveis-ambiente-dotenv/
├── .env                # Arquivo com as variáveis de ambiente reais (privado / gitignore)
├── .env.example        # Modelo/template de exemplo com as chaves exigidas pela aplicação
├── .gitignore          # Arquivo para ignorar a pasta node_modules e o arquivo .env
├── package.json        # Arquivo manifesto com a dependência "dotenv" e "type": "module"
├── index.js            # Script principal de carregamento e validação de configurações
└── README.md           # Documentação completa da Aula 05