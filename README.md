# 🛡️ Validador de Documentos de SST — RRV Consultoria

[![React](https://img.shields.io/badge/React-19.0-61dafb?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646cff?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38b2ac?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

> **Portal Oficial de Validação e Autenticidade de Documentos de Segurança e Saúde no Trabalho (SST)** da **RRV Consultoria**.  
> Permite a verificação instantânea de integridade jurídica, assinatura digital e conformidade com as Normas Regulamentadoras (NRs) e o eSocial.

---

## 📋 Sumário
- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades Principais](#-funcionalidades-principais)
- [Bases Legais e Normativas](#-bases-legais-e-normativas)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Como Rodar Localmente](#-como-rodar-localmente)
- [Passo a Passo para Subir no GitHub](#-passo-a-passo-para-subir-no-github)
- [Deploy (Vercel, Netlify ou GitHub Pages)](#-deploy-em-produção)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Autor e Contato](#-autor-e-contato)

---

## 🌟 Sobre o Projeto

O **Validador RRV** foi desenvolvido para solucionar a necessidade de auditoria e comprovação de autenticidade de documentos emitidos na área de Segurança e Saúde no Trabalho (SST):
- **ASO** (Atestados de Saúde Ocupacional Admissional, Periódico, Demissional, Retorno);
- **Certificados de Treinamento e Capacitação** (NR-35 Trabalho em Altura, NR-10 Eletricidade, NR-33 Espaço Confinado, etc.);
- **PGR** (Programa de Gerenciamento de Riscos - NR-01);
- **PCMSO** (Programa de Controle Médico de Saúde Ocupacional - NR-07);
- **LTCAT** (Laudo Técnico das Condições Ambientais do Trabalho);
- **Ordens de Serviço (OS)** de Segurança.

Ao escanear o QR Code impresso no rodapé de um documento emitido ou digitar o identificador único (UUID), o auditor, fiscal do trabalho ou tomador de serviços confere em tempo real se o documento é íntegro, original e válido.

---

## ⚡ Funcionalidades Principais

1. **Validação Instantânea por UUID ou Código**:
   - Busca em base de dados com validação visual (Válido, Expirado ou Revogado).
   - Exemplos rápidos pré-carregados para demonstração imediata.

2. **Leitor de QR Code Integrado**:
   - Leitura direta via câmera do celular ou computador (Webcam).
   - Upload de foto/arquivo de imagem contendo o QR Code.

3. **Suporte a Acesso Direto via Link / QR Code**:
   - Suporte nativo ao parâmetro de URL `?codigo=UUID`. Ao escanear o QR Code impresso pelo leitor padrão do celular, o portal abre diretamente o resultado verificado do documento.

4. **Assinatura Digital & Resumo Criptográfico SHA-256**:
   - Geração e exibição do hash SHA-256 para auditoria com botão de cópia rápida em 1 clique.
   - Geração dinâmica do QR Code de validação.

5. **Emissão de Certidão Oficial para Impressão (PDF/Print)**:
   - Layout formal com cabeçalho oficial da RRV Consultoria, número de certidão, carimbo de validação digital, selo e conformidade para apresentação a fiscais do MTE.

6. **Simulador / Emissor de Novos Documentos**:
   - Modal para cadastrar novos documentos SST com cálculo automático de UUID e SHA-256 através da Web Crypto API, persistidos no `localStorage`.

7. **Histórico da Sessão**:
   - Painel retrátil com os últimos documentos consultados pelo usuário.

---

## ⚖️ Bases Legais e Normativas

O portal atende e referencia as exigências legais brasileiras de guarda e emissão de documentos eletrônicos de SST:
- **Portaria MTP nº 671/2021:** Regulamenta disposições relativas à legislação trabalhista, inspeção do trabalho e guarda digital de documentos.
- **NR-01 (Portaria SEPRT nº 6.730/2020):** Gerenciamento de Riscos Ocupacionais (GRO) e digitalização de documentos de SST.
- **NR-07 (Portaria MTP nº 427/2021):** Diretrizes para emissão e validação do ASO.
- **Sistema eSocial:** Vinculação com os eventos de SST:
  - `S-2210`: Comunicação de Acidente de Trabalho (CAT)
  - `S-2220`: Monitoramento da Saúde do Trabalhador
  - `S-2240`: Condições Ambientais do Trabalho - Fatores de Risco
  - `S-2245`: Treinamentos e Capacitações

---

## 🛠️ Tecnologias Utilizadas

- **Linguagem:** TypeScript 5+
- **Framework:** React 19 + Vite 6
- **Estilização:** Tailwind CSS v4
- **Ícones:** Lucide React
- **QR Code:** `qrcode`
- **Animações / Efeitos:** `canvas-confetti`, `motion`
- **Criptografia:** Web Crypto API (`crypto.subtle`)

---

## 🚀 Como Rodar Localmente

### Pré-requisitos
- Node.js (versão 18 ou superior instalada)
- npm ou yarn

### Passo a Passo

```bash
# 1. Clone o repositório
git clone https://github.com/SEU-USUARIO/validador-sst-rrv.git

# 2. Acesse a pasta do projeto
cd validador-sst-rrv

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

Abra seu navegador em `http://localhost:3000` (ou na porta indicada no terminal).

---

## 📤 Passo a Passo para Subir no GitHub

Caso ainda não tenha criado o repositório no seu GitHub, siga este passo a passo rápido:

### 1. Crie um novo repositório no GitHub
1. Acesse [github.com/new](https://github.com/new).
2. Dê o nome ao repositório: `validador-sst-rrv`.
3. Escolha **Public** (Público) ou **Private** (Privado).
4. **Não marque** as opções de inicializar com README ou .gitignore (já criamos todos para você).
5. Clique em **Create repository**.

### 2. No terminal do seu computador, execute:

```bash
# Inicialize o repositório local
git init

# Adicione todos os arquivos
git add .

# Faça o primeiro commit
git commit -m "feat: portal de validação de documentos SST RRV Consultoria"

# Renomeie a branch principal para main
git branch -M main

# Conecte ao seu repositório do GitHub (substitua pelo link do seu repositório)
git remote add origin https://github.com/SEU-USUARIO/validador-sst-rrv.git

# Envie o código para o GitHub
git push -u origin main
```

Pronto! Seu projeto estará publicado no seu GitHub.

---

## 🌐 Deploy em Produção

Você pode colocar este projeto no ar gratuitamente em menos de 2 minutos:

### Opção 1: Vercel
1. Acesse [vercel.com](https://vercel.com) e conecte com seu GitHub.
2. Clique em **Add New Project** e selecione o repositório `validador-sst-rrv`.
3. O Vercel detectará automaticamente o Vite.
4. Clique em **Deploy**.

### Opção 2: Netlify
1. Acesse [netlify.com](https://netlify.com).
2. Clique em **Import an existing project** do GitHub.
3. Configure o Build command como `npm run build` e a pasta de saída como `dist`.
4. Clique em **Deploy Site**.

### Opção 3: GitHub Pages
Basta configurar a action do GitHub ou usar o comando `npm run build` gerando a pasta `dist`.

---

## 📁 Estrutura do Projeto

```
validador-sst-rrv/
├── .github/
│   └── workflows/
│       └── ci.yml               # Workflow de verificação contínua
├── src/
│   ├── components/
│   │   ├── DocumentResult.tsx   # Painel detalhado do documento validado
│   │   ├── NovoDocumentoModal.tsx # Modal para emissão de novos documentos
│   │   ├── PrintCertificate.tsx # Certidão oficial para impressão e PDF
│   │   └── ScannerModal.tsx     # Leitor de QR Code via câmera e imagem
│   ├── data/
│   │   └── mockDatabase.ts      # Base de dados SST com persistência local
│   ├── utils/
│   │   └── crypto.ts            # Gerador de UUID e hash SHA-256
│   ├── types.ts                 # Interfaces TypeScript de SST
│   ├── App.tsx                  # Componente principal do portal
│   ├── index.css                # Tailwind CSS v4 e estilos de impressão
│   └── main.tsx                 # Ponto de entrada React
├── index.html                   # HTML com metadados e SEO
├── package.json                 # Dependências e scripts
├── tsconfig.json                # Configuração TypeScript
├── vite.config.ts               # Configuração do Vite
├── LICENSE                      # Licença MIT
└── README.md                    # Documentação completa do projeto
```

---

## 👨‍💻 Autor e Contato

**Rodrigo Vieira**  
Técnico de Segurança do Trabalho (TST) & Consultor de Tecnologia em SST  
📧 Email: [tstrodrigovieira@gmail.com](mailto:tstrodrigovieira@gmail.com)  
🏢 **RRV Consultoria** — Segurança do Trabalho e Tecnologia Ocupacional

---

## 📄 Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).
