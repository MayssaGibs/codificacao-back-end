# 📁 API de Upload de Imagem — NestJS

Mini projeto desenvolvido com Node.js, NestJS e TypeScript para praticar upload de arquivos através de uma API REST.
A aplicação recebe arquivos de imagem usando `multipart/form-data`, valida o formato e o tamanho, gera um nome único e salva o arquivo localmente na pasta `./uploads`.
Os testes da API podem ser realizados pelo Insomnia.

---

## 🚀 Funcionalidades

- 📤 Upload de arquivos;
- 🖼️ Suporte a `jpg`, `jpeg`, `png`, `gif` e `webp`;
- 📏 Limite máximo de 2 MB;
- 🔐 Nome único utilizando UUID (`uuidv4`);
- 📂 Armazenamento em `./uploads`;
- ❌ Validação de formato;
- ❌ Validação quando nenhum arquivo é enviado;
- 🌐 Servimento público de arquivos estáticos.

---

## 🛠️ Tecnologias

- Node.js
- NestJS
- TypeScript
- Multer
- UUID
- Insomnia

---

## 📤 Endpoint de upload

**`POST /imagem/upload`**

**URL:**
`http://localhost:3000/imagem/upload`

**O campo do formulário deve ser:**
`file`

O `ImagemController` utiliza `FileInterceptor` e `diskStorage` do Multer para receber e armazenar o arquivo. O nome é gerado com UUID e a extensão original é preservada.

---

## 🧪 Testando no Insomnia

1. Crie uma requisição `POST`.
2. Informe `http://localhost:3000/imagem/upload`.
3. Acesse **Body → Multipart Form**.
4. Crie o campo `file`.
5. Selecione o tipo **File**.
6. Escolha uma imagem.
7. Clique em **Send**.

**Exemplo:**
- **POST** `http://localhost:3000/imagem/upload`
- **Multipart Form:** `file` = `minha-imagem.png`

Se o arquivo for válido, ele será salvo em: `./uploads`

---

## 📦 Resposta

O Controller retorna informações do arquivo enviado:

```json
{
  "filename": "f47ac10b-58cc-4372-a567-0e02b2c3d479.png",
  "size": 1048576,
  "url": "http://localhost:3000/api/upload/f47ac10b-58cc-4372-a567-0e02b2c3d479.png"
}
A URL é montada pelo Controller no formato:
http://localhost:3000/api/upload/{nome-do-arquivo}

🖼️ Formatos permitidos
A validação aceita:

.jpg

.jpeg

.png

.gif

.webp

A validação é feita pelo fileFilter do Multer no Controller.

📏 Limite de tamanho
O limite configurado é de 2 MB:

TypeScript
limits: {
  fileSize: 2 * 1024 * 1024,
}
❌ Tratamento de erros
Nenhum arquivo enviado
Se nenhum arquivo for enviado:

Status: 400 Bad Request

Mensagem: Nenhum arquivo enviado.

Esse tratamento está implementado com BadRequestException.

Formato não permitido
Arquivos que não sejam jpg, jpeg, png, gif ou webp são rejeitados pelo filtro:

Mensagem: Apenas arquivos jpg, jpeg, png, gif e webp são suportados!

Arquivo acima de 2 MB
Arquivos maiores que o limite configurado são rejeitados pelo Multer.

📂 Estrutura
Plaintext
api-upload-imagem/
├── uploads/
├── src/
│   ├── imagem/
│   │   ├── imagem.controller.ts
│   │   └── imagem.module.ts
│   ├── app.module.ts
│   └── main.ts
├── package.json
└── README.md
O ImagemController possui a rota POST /imagem/upload.

O ImagemModule registra o ImagemController.

O main.ts registra a pasta ./uploads como conteúdo estático usando useStaticAssets.

🔐 Nome dos arquivos
O projeto utiliza UUID para evitar conflitos de nomes:

TypeScript
const nomeArquivo = `${uuidv4()}${extname(file.originalname)}`;
Por exemplo, foto.png pode ser armazenado como:
550e8400-e29b-41d4-a716-446655440000.png

🔎 Testes no Insomnia
Teste 1 — Upload válido
POST http://localhost:3000/imagem/upload

Body: Multipart Form (file = imagem.png)

Resultado esperado: Arquivo salvo em ./uploads e resposta contendo filename, size e url.

Teste 2 — Nenhum arquivo
POST http://localhost:3000/imagem/upload

Sem o campo file.

Resultado esperado: 400 Bad Request com a mensagem "Nenhum arquivo enviado."

Teste 3 — Formato inválido
Envie, por exemplo: arquivo.pdf

Resultado esperado: Upload rejeitado.

Teste 4 — Arquivo maior que 2 MB
Envie uma imagem com mais de 2 MB.

Resultado esperado: Upload rejeitado.

📦 Instalação
Clone o projeto:

Bash
git clone URL_DO_SEU_REPOSITORIO
Entre na pasta:

Bash
cd api-upload-imagem
Instale as dependências:

Bash
npm install
▶️ Executando
Desenvolvimento:

Bash
npm run start:dev
Normal:

Bash
npm run start
A aplicação ficará disponível em:
http://localhost:3000

📌 Observações
Os arquivos são armazenados localmente em ./uploads.

O campo do upload deve ser chamado file.

O tamanho máximo configurado é de 2 MB.

São aceitos somente JPG, JPEG, PNG, GIF e WEBP.

O nome do arquivo é gerado com UUID.

O endpoint principal é POST /imagem/upload.

A pasta ./uploads é servida publicamente via app.useStaticAssets.

🎯 Objetivo
Este mini projeto foi desenvolvido para praticar Node.js + NestJS + TypeScript, com foco em:

Criação de APIs REST;

Controllers e Modules;

Upload de arquivos;

multipart/form-data;

Multer;

Interceptors;

Validação de arquivos;

Limite de tamanho;

UUID;

Tratamento de erros;

Testes de API no Insomnia.


---

### 🚀 Commits Semânticos

#### 1️⃣ Commits Individuais (Recomendado)

```bash
# 1. Controller com upload e validação de arquivo
git add api-upload-imagem/src/imagem/imagem.controller.ts
git commit -m "feat(api-upload-imagem): adiciona ImagemController com upload de arquivo, uuid e validacoes"

# 2. Módulo de imagem
git add api-upload-imagem/src/imagem/imagem.module.ts
git commit -m "feat(api-upload-imagem): registra ImagemController no ImagemModule"

# 3. Servimento estático no main.ts
git add api-upload-imagem/src/main.ts
git commit -m "feat(api-upload-imagem): configura servimento de arquivos estaticos no main.ts"

# 4. Documentação README.md
git add api-upload-imagem/README.md
git commit -m "docs(api-upload-imagem): adiciona README detalhado com especificacoes e testes no insomnia"
2️⃣ Commit Único em Lote
Bash
git add api-upload-imagem/
git commit -m "feat(api-upload-imagem): implementa API de upload de imagem e documentacao completa"
git push origin main