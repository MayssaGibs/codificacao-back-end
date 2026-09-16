Markdown# 📚 Aula 03 — Manipulação de Arquivos e Streams no Node.js

**Unidade Curricular:** Codificação para Back-End  
**Instituição:** SENAI — Amapá  
**Autor:** Mayssa Gibson de Oliveira

Este repositório contém os códigos, exercícios e anotações teóricas desenvolvidos na Aula 03, com foco no processamento performático de arquivos grandes através de **Streams**, leitura linha a linha utilizando o módulo nativo `readline` e monitoramento de consumo de memória RAM do processo Node.js.

---

## 🎯 Objetivos da Aula

- Compreender a diferença entre leitura síncrona/integral de arquivos e o processamento sob demanda via **Streams**.
- Utilizar os módulos nativos `fs` (*File System*) e `readline` para manipular arquivos e logs no lado do servidor.
- Implementar filtragem eficiente de logs salvando entradas com o status `ERROR` em um novo arquivo (`apenas_erros.log`).
- Monitorar e analisar o consumo de memória RAM do sistema utilizando `process.memoryUsage()` (RSS e Heap Utilizado).
- Aplicar o laço de repetição `for await...of` para iterar assincronamente sobre dados transmitidos por *Streams*.

---

## 💻 Conceitos de Performance & Streams Aplicados

Quando lidamos com arquivos volumosos (como logs de servidores em ambientes de produção), carregar todo o arquivo para a memória RAM pode causar estouro de memória (*out of memory*). Para resolver esse problema, utiliza-se a arquitetura de **Streams**:

- **Stream de Leitura (`fs.createReadStream`):** Lê dados em pequenos pedaços (*chunks*) progressivamente, sem carregar o arquivo inteiro na memória de uma só vez.
- **Stream de Escrita (`fs.createWriteStream`):** Escreve dados em um arquivo de destino à medida que os dados são processados.
- **Interface Readline (`readline.createInterface`):** Permite a leitura de dados linha a linha diretamente do *Stream* de entrada de forma assíncrona.
- **Monitoramento de Memória (`process.memoryUsage`):**
  - **RSS (*Resident Set Size*):** Quantidade total de memória alocada para o processo pelo Sistema Operacional.
  - **Heap Utilizado:** Quantidade de memória RAM efetivamente ocupada pelos objetos JavaScript ativos no runtime.

---

## 📂 Estrutura de Pastas do Projeto

```text
aula03-manipulacao-arquivos-streams/
├── package.json        # Arquivo manifesto configurado com "type": "module"
├── servidor.log        # Arquivo de log de origem contendo histórico do servidor
├── apenas_erros.log    # Arquivo gerado automaticamente contendo apenas as linhas de erro
├── index.js            # Script principal para filtragem e monitoramento de memória
└── README.md           # Documentação completa da Aula 03
📄 Arquivos e Códigos do Projeto1. index.jsScript responsável por ler o arquivo servidor.log via Stream, filtrar apenas as linhas com falhas (ERROR), gravá-las em apenas_erros.log e mensurar o impacto na memória RAM.JavaScriptimport fs from 'fs';
import readline from 'readline';

async function filtrarErros() {
    console.log('Iniciando processamento com Stream.....');
    exibirConsumoMemoria('Início');

    const streamLeitura = fs.createReadStream('servidor.log');
    const streamEscrita = fs.createWriteStream('apenas_erros.log');
    const leitorLinhaALinha = readline.createInterface({ input: streamLeitura, crlfDelay: Infinity }); 

    let totalErros = 0;
    for await (const linha of leitorLinhaALinha) {
        if (linha.includes('ERROR')) {
            streamEscrita.write(linha + '\n');
            totalErros++;
        }
    }

    exibirConsumoMemoria('Fim');
    console.log('Processamento concluído!\n');
    console.log(`Quantidade de erros encontrados: ${totalErros} linhas.\n`);
}

filtrarErros();

function exibirConsumoMemoria(consumo) {
    const memoria = process.memoryUsage();
    const rssMB = (memoria.rss / 1024 / 1024).toFixed(2);
    const heapMB = (memoria.heapUsed / 1024 / 1024).toFixed(2);
    console.log(`[${consumo}] RSS: ${rssMB} MB | Heap Utilizado: ${heapMB} MB`);
}
🛠️ Métodos e Módulos Nativos UtilizadosMódulo / MétodoCategoriaDescrição e Finalidadefs.createReadStream()File SystemCria um Stream legível para consumo fracionado de arquivos.fs.createWriteStream()File SystemCria um Stream de escrita contínua para gravação em arquivos.readline.createInterface()ReadlineInstancia um leitor assíncrono para processar o fluxo linha a linha.process.memoryUsage()ProcessRetorna um objeto detalhando a alocação de memória RAM do processo Node.js.📌 Observação Técnica: O parâmetro crlfDelay: Infinity no readline garante que todos os tipos de quebras de linha (\r\n do Windows ou \n do Linux/macOS) sejam lidos corretamente como uma única linha.🚀 Passo a Passo de Execução1. Navegar até o diretório do projetoBashcd aula03-manipulacao-arquivos-streams
2. Executar o script de filtragemBashnode index.js
3. Commit Semântico RecomendadoBashgit add .
git commit -m "docs(aula03): adiciona README.md e script de filtragem de logs via streams"
git push origin main
🛠️ Tecnologias e FerramentasFerramentaCategoriaDescriçãoNode.jsRuntimeAmbiente de execução JavaScript no servidor.File System (fs)Módulo NativoManipulação e leitura/escrita de arquivos no sistema operacional.ReadlineMódulo NativoInterface para leitura assíncrona linha a linha.ES ModulesSistema de MódulosPadrão nativo para importação (import).Git & GitHubVersionamentoControle de versão e hospedagem do código-fonte.👤 AutorMayssa Gibson de Oliveira