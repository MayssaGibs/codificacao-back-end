Aqui está o código completo do README.md em estrutura Markdown puro, pronto para você copiar e colar na pasta da Aula 06:Markdown# 📚 Aula 06 — Servidor HTTP Nativo e Headers de Segurança no Node.js

**Unidade Curricular:** Codificação para Back-End  
**Autor:** Mayssa Gibson de Oliveira

Este repositório contém os códigos, exercícios e anotações teóricas desenvolvidos na Aula 06, com foco na criação de um servidor Web utilizando exclusivamente o módulo nativo `http` do Node.js, roteamento básico e injeção de cabeçalhos de segurança HTTP.

---

## 🎯 Objetivos da Aula

- Compreender o funcionamento do protocolo HTTP no Node.js através do módulo nativo `http`.
- Manipular os objetos `req` (*http.IncomingMessage*) e `res` (*http.ServerResponse*).
- Implementar roteamento básico sem o uso de frameworks externos.
- Injetar cabeçalhos de segurança HTTP (`X-Content-Type-options` e `X-Frame-Options`) nas respostas da aplicação.
- Configurar respostas estruturadas em formato JSON para rotas de validação e tratamento de páginas não encontradas.

---

## 💻 Conceitos de Segurança e Servidor Nativo Aplicados

- **Módulo Nativo `http`:** Permite criar servidores Web de alta performance sem dependências externas via `http.createServer()`.
- **Roteamento via `req.url`:** Inspeção da URL requisitada pelo cliente para determinar o fluxo de resposta da aplicação.
- **Cabeçalhos de Segurança (HTTP Headers):**
  - `X-Content-Type-options: nosniff`: Impede que o navegador tente adivinhar o tipo de mídia (*MIME sniffing*), forçando a obediência ao `content-type` informado.
  - `X-Frame-Options: DENY`: Protege a aplicação contra ataques de *Clickjacking*, impedindo a renderização da página em `<frame>`, `<iframe>` ou `<object>`.

---

## 📂 Estrutura de Pastas do Projeto

```text
aula06-servidor-http-nativo/
├── package.json        # Arquivo manifesto configurado com "type": "module"
├── server.js           # Servidor HTTP nativo com cabeçalhos de segurança e rotas
└── README.md           # Documentação completa da Aula 06
📄 Arquivos e Códigos do Projeto1. server.jsServidor HTTP nativo construído com o módulo http, configurado para capturar requisições, aplicar cabeçalhos de proteção e responder em formato JSON.JavaScriptimport http from 'http';

const servidorWeb = http.createServer((req, res) => {

    console.log(`[LOG] Método Recebido: ${req.method} | Rota: ${req.url}`);

    const cabecalhoPadrao = {
        'X-Content-Type-options': 'nosniff',
        'X-Frame-Options': 'DENY',
    };
    if(req.url === '/status'){
     res.writeHead(200, {
        ...cabecalhoPadrao,
        'content-type': 'application/json'
     });
     res.end(JSON.stringify({servidorWeb: 'Online'}));
    } else{
      res.writeHead(400,{
        ...cabecalhoPadrao,
        'content-type' : 'application/json'
      });
      res.end(JSON.stringify({erro: 'Página não encontrada!'}));
    }
});

servidorWeb.listen(3000, () => {
    console.log('Servidor Web ativo!');
    console.log('Porta> 300');
});
🛠️ Endpoints e Respostas HTTPMétodoRotaDescriçãoStatus HTTPResposta ExemploGET/statusRetorna o status de execução do servidor.200 OK{ "servidorWeb": "Online" }GET/*Rota de fallback para requisições inválidas ou não encontradas.400 Bad Request{ "erro": "Página não encontrada!" }🚀 Passo a Passo de Execução1. Navegar até o diretório do projetoBashcd aula06-servidor-http-nativo
2. Executar o servidor HTTPBashnode server.js
3. Testar as rotas no terminalBash# Teste da rota de status
curl -i http://localhost:3000/status

# Teste de rota não encontrada
curl -i http://localhost:3000/outra-rota
🛠️ Tecnologias e FerramentasFerramentaCategoriaDescriçãoNode.jsRuntimeAmbiente de execução JavaScript no servidor.Módulo httpMódulo NativoMódulo responsável pela criação do servidor HTTP.ES ModulesSistema de MódulosPadrão nativo para importação (import).Git & GitHubVersionamentoControle de versão e hospedagem do código-fonte.👤 AutorMayssa Gibson de Oliveira