#  KanDev

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/JSON_Server-000000?style=for-the-badge&logo=json&logoColor=white" />
</p>

<p align="center">
  <a href="https://kandev.vercel.app" target="_blank">
    <img src="https://img.shields.io/badge/Acessar%20o%20Projeto-000000?style=for-the-badge&logo=vercel&logoColor=white" />
  </a>
</p>

---

## 📋 Sobre o Projeto

O **KanDev** é uma aplicação Kanban desenvolvida para facilitar a organização de tarefas do dia a dia. Com uma interface intuitiva e responsiva, o usuário pode criar, mover e gerenciar tarefas entre três colunas: **Começar**, **Fazendo** e **Concluído** — com suporte a arrastar e soltar.

---

## ✨ Funcionalidades

-  **Cadastro de usuários** com validação de campos
-  **Login e autenticação** de usuários
-  **Redefinição de senha**
-  **Edição de perfil** (nome, email e foto)
-  **Adicionar, editar e remover tarefas**
-  **Drag and drop** para mover tarefas entre colunas
-  **Alternância entre tema claro e escuro**
-  **Interface responsiva** para mobile e desktop

---

## 🖥️ Telas do Sistema

> _Adicione aqui prints das telas: Home, Login, Cadastro, Kanban e Edição de Perfil_

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Descrição |
|---|---|
| [React](https://react.dev/) | Biblioteca para construção da interface |
| [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) | Linguagem de programação principal |
| [HTML5](https://developer.mozilla.org/pt-BR/docs/Web/HTML) | Estrutura das páginas |
| [CSS3](https://developer.mozilla.org/pt-BR/docs/Web/CSS) | Estilização e responsividade |
| [Vite](https://vitejs.dev/) | Ferramenta de build e dev server |
| [JSON Server](https://github.com/typicode/json-server) | Simulação de API REST |
| [Axios](https://axios-http.com/) | Requisições HTTP |
| [Postman](https://www.postman.com/) | Testes de API |

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos

Antes de começar, você vai precisar ter instalado na sua máquina:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/)

### Passo a Passo

**1. Clone o repositório:**
```bash
git clone https://github.com/clebermarcolino/KanDev.git
```

**2. Acesse a pasta do projeto:**
```bash
cd KanDev
```

**3. Instale as dependências:**
```bash
npm install
```

**4. Crie o arquivo `db.json`** na raiz do projeto com o seguinte conteúdo:
```json
{
  "usuarios": [],
  "tarefas": []
}
```

**5. Em um terminal, inicie o JSON Server:**
```bash
npm run server
```

**6. Em outro terminal, inicie o front-end:**
```bash
npm run dev
```

**7. Acesse no navegador:**
```
http://localhost:5173
```

> ⚠️ O JSON Server roda na porta `3001` e o front-end na porta `5173`. Certifique-se de que ambas estão disponíveis.

---

## 🌐 Deploy

| Serviço | Plataforma | URL |
|---|---|---|
| Front-end | Vercel | [kandev.vercel.app](https://kandev.vercel.app) |
| Back-end | Railway | [kandev-production-d837.up.railway.app](https://kandev-production-d837.up.railway.app) |
