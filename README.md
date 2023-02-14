<h1 align="center">devChat</h1>
<p align="center">Frontend de meu liveChat</p>

<p align="center">
 <a href="#demo">Demo</a> •
 <a href="#objetivo">Objetivo</a> •
 <a href="#tecnologias">Tecnologias</a> •
 <a href="#implantacao">Implantação</a> •
 <a href="#funcionalidades">Funcionalidades</a> • 
 <a href="#licenca">Licença</a> • 
 <a href="#autor">Autor</a>
</p>

<h4 align="center"> 
	🚧  Em construção...  🚧
</h4>

<h2 id="demo">🕹️ Demo</h2>

[![Netlify Status](https://api.netlify.com/api/v1/badges/e3a0d613-19ac-4d31-8f73-b57d809363fa/deploy-status)](https://app.netlify.com/sites/superlative-speculoos-6a0b7b/deploys)
<br><a href="https://devlivechat.netlify.app" target="_blank">Teste minha aplicação aqui!</a>

<h2 id="objetivo">📖 Objetivo</h2>
<p>Objetivo principal deste projeto foi a criação de um Backend e Frontend que tivésse toda a parte de cadastro completa, desde autenticações e autorizações e envio de E-mails, e que utilizasse sockets para envio e recebimento de mensagens.</p>

<h2 id="tecnologias">🛠 Tecnologias</h2>

As seguintes ferramentas foram usadas na construção do projeto:

- [React](https://pt-br.reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Axios](https://axios-http.com/)
- [React Router Dom](https://reactrouter.com/en/main)
- [React Redux](https://react-redux.js.org/)
- [Js-Cookie](https://github.com/js-cookie/js-cookie)
- [React Image Crop](https://www.npmjs.com/package/react-image-crop)
- [Socket.IO](https://socket.io/)
- [Tailwindcss](https://tailwindcss.com/)
- [Daisyui](https://daisyui.com/)
- [Heroicons](https://heroicons.com/)
- [React Spinners](https://www.davidhu.io/react-spinners/)

> Veja o arquivo  [package.json](https://github.com/LeandroTRibeiro/devChat-app/blob/main/package.json)

<h2 id="implantacao">📦 Implantação</h2>

Este projeto é dividio em duas partes:

1. Backend <a href="https://github.com/LeandroTRibeiro/devChat-api" target="_blank">Veja o repositório aqui!</a>
2. Frontend

💡 O Frontend precisa que o Backend esteja sendo executado para funcionar.

🧭 Rodando a aplicação web (Frontend)

```bash
# clone o repositório
$ git clone https://github.com/LeandroTRibeiro/devChat-app

# Acesse a pasta do projeto no seu terminal/cmd
$ cd devChat-app

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev
```

<h2 id="funcionalidades">⚙️ Funcionalidades</h2>

Após o usuário entrar na aplicação sera possível:

- [x] Realizar cadastro de uma nova conta:
   - [x] Realizar um cadastro contendo obrigatóriamente "nome", "sobrenome", "email", "senha" e "foto"
   - [x] Recortar a parte da foto de sua escolha
   - [x] Após cadastro de forma correta, usuário recebera um e-mail com link de ativação da conta
- [x] Realizar login:
   - [x] Visualizar usuários online
   - [x] Visualizar foto e status dos outros usuários
   - [x] Receber notificações de entrada e saida de usuários
   - [x] Trocar mensagens de texto e Emoticons 
   - [x] Mudar seu status
- [x] Recuperar sua senha:
   - [x] Se usuário realmente possuir cadastro, após pedido de recuperação de conta, ele recebera um E-mail com um link para troca de senha
	
<h2 id="licenca">📝 Licença</h2>

Este projeto está sobre a licença MIT 
> Veja o arquivo [LINCENSE](https://github.com/LeandroTRibeiro/devChat-app/blob/main/LICENSE)

<h2 id="autor">✒️ Autor</h2>

<a href="https://github.com/LeandroTRibeiro">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/111009157?s=400&u=ccf989df0bb9cf41495186f2bc0564c1b03b0d4e&v=4" width="100px;" alt=""/>
 <br />
 <sub><b>Leandro Thiago Ribeiro </b></sub></a>👋
 <br />
 
[![GitHub Badge](https://img.shields.io/badge/-LeandroTRibeiro-black?style=flat-square&logo=GitHub&logoColor=white&link=https://github.com/LeandroTRibeiro)](https://github.com/LeandroTRibeiro)
[![Linkedin Badge](https://img.shields.io/badge/-LeandroRibeiro-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/leandro-ribeiro-2a8a8b24b/)](https://www.linkedin.com/in/leandro-ribeiro-2a8a8b24b/) 
[![Gmail Badge](https://img.shields.io/badge/-leandrothiago_ribeiro@hotmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:leandrothiago_ribeiro@hotmail.com)](mailto:leandrothiago_ribeiro@hotmail.com)

