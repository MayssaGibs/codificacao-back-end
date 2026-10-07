# 📚 Aula 14 — Servidor Edge Runtime na Vercel (`aula14-servidor-edge-runtime-vercel`)

**Unidade Curricular:** Codificação para Back-End

**Instituição:** SENAI — Amapá

**Autor:** Mayssa Gibson de Oliveira

Este repositório contém a documentação e os códigos desenvolvidos durante a **Aula 14**, focados na criação e execução de funções Serverless na borda da rede (*Edge Computing*) utilizando a plataforma **Vercel** com o **Edge Runtime**.

---

## 🎯 Objetivos da Aula

* Compreender o conceito e funcionamento da **Edge Computing** (Computação de Borda).
* Entender as diferenças entre o ambiente Node.js tradicional e o **Vercel Edge Runtime**.
* Utilizar APIs nativas e padrões Web (*Web Standard APIs*), tais como `Request` e `Response`.
* Desenvolver um manipulador (*handler*) HTTP de alta performance e baixíssima latência.
* Medir métricas de tempo de resposta e simular regiões de execução.
* Executar e testar a função localmente e em ambiente Serverless/Edge.

---

## 💻 Conceitos Aplicados

* **Edge Runtime (V8 Engine):** Ambiente de execução ultraleve baseado no motor V8, otimizado para inicialização instantânea (*zero cold start*).
* **Web Standard APIs:** Uso dos objetos globais `Request` e `Response`, eliminando a dependência de frameworks pesados para manipular requisições HTTP.
* **Métricas de Desempenho:** Cálculo do tempo de execução da requisição em milissegundos através da diferença entre instâncias do objeto `Date`.
* **Cabeçalhos HTTP:** Definição do tipo de conteúdo retornado (`Content-Type: application/json`).

---

## 📂 Estrutura de Pastas do Projeto

```text
aula14-servidor-edge-runtime-vercel/
├── api/
│   └── handler.ts               # Função Serverless configurada para Edge Runtime
├── package.json                 # Dependências e scripts do projeto
├── vercel.json                  # Configurações de implantação Vercel (opcional)
└── README.md                    # Documentação da Aula 14

```

---

## 📑 Passo a Passo de Implementação

### 1. Criar a Função Edge (`api/handler.ts`)

O arquivo define a exportação de configuração `runtime: 'edge'`, instruindo a plataforma a executar o código no ambiente de borda, e implementa a função assíncrona que processa a requisição.

```typescript
export const config = {
    runtime: 'edge',
};

export default async function handler(req: Request) {
    const inicio = new Date();

    return new Response(
        JSON.stringify({
            mensagem: 'Função executada na borda de rede',
            horarioDoServidor: new Date().toISOString(),
            regiao: 'local-dev',
            tempoDeExecucao: `${Date.now() - inicio.getTime()} ms`,
        }),
        {
            status: 200,
            headers: {
                'content-type': 'application/json',
            },
        },
    );
}

```

> **Nota de Correção:** O cabeçalho no código original continha a grafia `'aplication/json'`. Foi corrigido no exemplo para `'application/json'` para garantir o parse correto pelo cliente/navegador.

---

## 🧪 Testando no Insomnia / Navegador

### 1. Requisição `GET /api/handler`

* **Método:** `GET`
* **URL:** `http://localhost:3000/api/handler` (ou URL fornecida pela Vercel)
* **Headers:** NENHUM (Padrão)
* **Resultado Esperado (`200 OK`):**

```json
{
  "mensagem": "Função executada na borda de rede",
  "horarioDoServidor": "2026-10-06T21:18:00.000Z",
  "regiao": "local-dev",
  "tempoDeExecucao": "0 ms"
}

```

---

## 🔎 Resumo das Métricas e Comportamento

| Propriedade | Descrição | Valor Esperado |
| --- | --- | --- |
| `mensagem` | Confirmação de execução no ambiente Edge | `'Função executada na borda de rede'` |
| `horarioDoServidor` | Timestamp ISO retornado pelo servidor | Horário atual em UTC |
| `regiao` | Identificador do Data Center / Borda local | `'local-dev'` (ou ID da região Vercel em produção) |
| `tempoDeExecucao` | Duração do processamento interno da função | `< 5 ms` |

---

## 🛠️ Tecnologias e Ferramentas

| Ferramenta | Categoria | Descrição |
| --- | --- | --- |
| **Vercel Edge Runtime** | Runtime | Ambiente de execução leve baseado em V8 na borda da rede. |
| **TypeScript** | Linguagem | Tipagem estática para garantia de contrato dos dados. |
| **Fetch API (`Request`/`Response`)** | Web API | Padrão nativo para tratamento de requisições/respostas HTTP. |
| **Insomnia / cURL** | HTTP Client | Ferramentas para validação e testes das rotas criadas. |

---

## 👤 Autor

Mayssa Gibson de Oliveira

---

### 🚀 Commits Semânticos (Aula 14)

#### 1️⃣ Commits Individuais (Recomendado)

```bash
# 1. Criação do Handler Edge Runtime
git add api/handler.ts
git commit -m "feat(aula-14): implementa handler serverless para Vercel Edge Runtime"

# 2. Atualização da Documentação no README.md
git add README.md
git commit -m "docs(aula-14): adiciona documentacao completa sobre Edge Computing e Vercel"

```

---

#### 2️⃣ Commit Único em Lote

```bash
git add .
git commit -m "feat(aula-14): adiciona funcao edge runtime, testes e documentacao da aula 14"
git push origin main

```