# Documentação da API

## Tabela de Conteúdos

- [Visão Geral](#1-visão-geral)
- [Início Rápido](#2-início-rápido)
  - [Instalando Dependências](#21-instalando-dependências)
  - [Variáveis de Ambiente](#22-variáveis-de-ambiente)
  - [Migrations](#23-migrations)
  - [Test](#24-tests)
  - [Server](#25-server)
- [Endpoints](#3-endpoints)

---

## 1. Visão Geral

Visão geral do projeto, um pouco das tecnologias usadas.

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)

---

## 2. Início Rápido

[ Voltar para o topo ](#tabela-de-conteúdos)

### 2.1. Instalando Dependências

Clone o projeto em sua máquina e instale as dependências com o comando:

```shell
yarn
```

### 2.2. Variáveis de Ambiente

Em seguida, crie um arquivo **.env**, copiando o formato do arquivo **.env.example**:

```
cp .env.example .env
```

Configure suas variáveis de ambiente com suas credenciais do Postgres e uma nova database da sua escolha.

### 2.3. Migrations

Execute as migrations com o comando:

```
yarn typeorm migration:run -d src/data-source.ts
```

---

### 2.4. Tests

Execute o comando para rodar os tests:

```
yarn test
```

---

### 2.5. Server

Execute o comando para rodar o servidor na máquina local na porta 3001:

```
yarn dev
```

---

## 3. Endpoints

[ Voltar para o topo ](#tabela-de-conteúdos)

### Índice

- [Users](#1-users)
  - [POST - /users](#11-criação-de-usuário)
  - [GET - /users](#12-listando-usuários)
  - [GET - /users/login](#13-login-usuário)
  - [GET - /users/me](#14-listar-usuário-por-id)
- [Contacts](#2-contacts)
  - [POST - /contact](#21-criação-de-contato)
  - [GET - /contact/:id](#22-listando-contato-por-id)
  - [PATCH - /contact/:id](#23-atualizando-contato)
  - [DELETE - /contact/:id](#24-deletando-contato)

---

## 1. **Users**

[ Voltar para os Endpoints ](#3-endpoints)

O objeto User é definido como:

| Campo      | Tipo   | Descrição                               |
| ---------- | ------ | --------------------------------------- |
| id         | string | Identificador único do usuário          |
| name       | string | O nome do usuário.                      |
| email      | string | O e-mail do usuário.                    |
| password   | string | A senha de acesso do usuário            |
| phone      | string | Telefone de contato do usuário          |
| created_at | date   | Nos mostra quando foi criado o usuário. |

### Endpoints

| Método | Rota         | Descrição                                          |
| ------ | ------------ | -------------------------------------------------- |
| POST   | /users       | Criação de um usuário.                             |
| GET    | /users       | Lista todos os usuários.                           |
| POST   | /users/login | Loga o usuário de acordo com as credenciais        |
| GET    | /users/me    | Lista um usuário baseado no token de autenticação. |

---

### 1.1. **Criação de Usuário**

[ Voltar para os Endpoints ](#3-endpoints)

### `/users`

### Exemplo de Request:

```
POST /users
Host: http://localhost:3001/users
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "name": "Alysson",
  "email": "alysson@email@outlook.com",
  "phone": "19999285876",
  "password": "1234"
}
```

### Exemplo de Response:

```
201 Created
```

```json
{
  "id": "17b49ed0-c9eb-486c-bc81-f1530d72a9ba",
  "name": "Alysson",
  "email": "alysson@colombo@outlook.com",
  "phone": "19999285876",
  "password": "$2b$10$Beh4CkI4xsSnghFIFkstGOZhDhKSLM/68zaB4a76iMTMCZkz1J8ay",
  "created_at": "2022-09-27T01:50:19.801Z"
}
```

### Possíveis Erros:

| Código do Erro  | Descrição                 |
| --------------- | ------------------------- |
| 400 Bad Request | Email already registered. |

---

### 1.2. **Listando Usuários**

[ Voltar aos Endpoints ](#3-endpoints)

### `/users`

### Exemplo de Request:

```
GET /users
Host: http://localhost:3001/users
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
[
  {
    "id": "17b49ed0-c9eb-486c-bc81-f1530d72a9ba",
    "name": "Alysson",
    "email": "alysson@colombo@outlook.com",
    "phone": "19999285876",
    "password": "$2b$10$Beh4CkI4xsSnghFIFkstGOZhDhKSLM/68zaB4a76iMTMCZkz1J8ay",
    "created_at": "2022-09-27T01:50:19.801Z"
  },
  {
    "id": "b4cf9d1b-476b-47d2-8968-8ef6e3e19966",
    "name": "João",
    "email": "João@outlook.com",
    "phone": "19999282222",
    "password": "$2b$10$vbXS/rniGJ43Ym8D/5JOnuMYG44m5jjjr2lZydRknfvj7Ua9m0QMq",
    "created_at": "2022-09-26T18:04:43.748Z"
  },
  {
    "id": "40abdc82-9dde-4e8f-a2f7-19e7f5fb18d4",
    "name": "Rodrigo",
    "email": "rodrigo@kenzie.com.br",
    "phone": "19999283569",
    "password": "$2b$10$lkVifcq3lJU0ZYkRWsK2wO8drRmc7pqAaR2esRcpUpyBvS.XtVB.u",
    "created_at": "2022-09-27T01:50:19.801Z"
  },
  {
    "id": "17b49ed0-c9eb-486c-bc81-f1530d72a9ba",
    "name": "Ana",
    "email": "ana@colombo@outlook.com",
    "phone": "19999247592",
    "password": "$2b$10$Beh4CkI4xsSnghFIFkstGOZhDhKSLM/68zaB4a76iMTMCZkz1J8ay",
    "created_at": "2022-09-27T01:50:19.801Z"
  }
]
```

### Possíveis Erros:

Nenhum, o máximo que pode acontecer é retornar uma lista vazia.

---

### 1.3. **login usuário**

[ Voltar aos Endpoints ](#3-endpoints)

### `/users/login`

### Exemplo de Request:

```
GET /users/9cda28c9-e540-4b2c-bf0c-c90006d37893
Host: http://localhost:3001/users/login
Authorization: None
Content-type: application/json

```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                                |
| --------- | ------ | ---------------------------------------- |
| email     | string | Identificador único do usuário (User)    |
| password  | string | Identificador da conta do usuário (User) |

### Corpo da Requisição:

```json
{
  "email": "rodrigo@kenzie.com.br",
  "password": "1234"
}
```

### Exemplo de Response:

```
201 Created
```

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvZHJpZ29Aa2VuemllLmNvbS5iciIsImlhdCI6MTY2NDI1MjA3NSwiZXhwIjoxNjY0MzM4NDc1fQ.7Rnbm9ZThvWK0PZLyCzvsi1DL2kViOW0vjqJUJupkcw"
}
```

### Possíveis Erros:

| Código do Erro | Descrição          |
| -------------- | ------------------ |
| 401 Not Found  | Account not found. |

---

### 1.4. **listar usuário por id**

[ Voltar aos Endpoints ](#3-endpoints)

### `/users/me`

### Exemplo de Request:

```
GET /users/9cda28c9-e540-4b2c-bf0c-c90006d37893
Host: http://localhost:3001/users/me/
Authorization: Bearer {token}
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                             |
| --------- | ------ | ------------------------------------- |
| token     | string | Identificador único do usuário (User) |

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "id": "40abdc82-9dde-4e8f-a2f7-19e7f5fb18d4",
  "name": "Rodrigo",
  "email": "rodrigo@kenzie.com.br",
  "phone": "19999281346",
  "password": "$2b$10$lkVifcq3lJU0ZYkRWsK2wO8drRmc7pqAaR2esRcpUpyBvS.XtVB.u",
  "created_at": "2022-09-27T01:50:19.801Z",
  "contacts": [
    {
      "id": "d5de763c-11c2-4ca8-bb7b-9a5f2a805a6e",
      "name": "contato1",
      "email": "contato1@email.com",
      "phone": "999999898"
    },
    {
      "id": "08516cab-c887-4b04-8552-7ee0fadf692a",
      "name": "contato1",
      "email": "contato2@email.com",
      "phone": "999999898"
    },
    {
      "id": "90942576-69b3-4e23-a071-b626681572c5",
      "name": "contato3",
      "email": "contato1@email.com",
      "phone": "999999898"
    }
  ]
}
```

### Possíveis Erros:

| Código do Erro | Descrição                |
| -------------- | ------------------------ |
| 401 Not Found  | Authentication required. |
| 401 Not Found  | invalid Token.           |
| 404 Not Found  | User not found.          |

---

### 2.1. **Criação de contato**

[ Voltar para os Endpoints ](#3-endpoints)

### `/contact`

### Exemplo de Request:

```
POST /contact
Host: http://localhost:3001/contact
Authorization: Bearer {token}
Content-type: None
```

### Exemplo de Response:

```
200 Created
```

```json
{
  "id": "d216efee-9b15-450c-95a6-6ef4224e5912",
  "name": "contato1",
  "email": "contato1@email.com",
  "phone": "999999898",
  "user": {
    "id": "40abdc82-9dde-4e8f-a2f7-19e7f5fb18d4",
    "name": "Rodrigo",
    "email": "rodrigo@kenzie.com.br",
    "phone": "19999281346",
    "password": "$2b$10$lkVifcq3lJU0ZYkRWsK2wO8drRmc7pqAaR2esRcpUpyBvS.XtVB.u",
    "created_at": "2022-09-27T01:50:19.801Z"
  }
}
```

### Possíveis Erros:

| Código do Erro  | Descrição                |
| --------------- | ------------------------ |
| 401 Bad Request | Authentication Required. |
| 401 Bad Request | Invalid Token.           |

---

### 2.2. **listando contato por id**

[ Voltar para os Endpoints ](#3-endpoints)

### `/contact/{id}`

### Exemplo de Request:

```
POST /contact
Host: http://localhost:3001/contact/{id}
Authorization: Bearer {token}
Content-type: None
```

### Exemplo de Response:

```
200 Ok
```

```json
{
  "id": "d216efee-9b15-450c-95a6-6ef4224e5912",
  "name": "contato1",
  "email": "contato1@email.com",
  "phone": "999999898",
  "user": {
    "id": "40abdc82-9dde-4e8f-a2f7-19e7f5fb18d4",
    "name": "Rodrigo",
    "email": "rodrigo@kenzie.com.br",
    "phone": "19999281346",
    "password": "$2b$10$lkVifcq3lJU0ZYkRWsK2wO8drRmc7pqAaR2esRcpUpyBvS.XtVB.u",
    "created_at": "2022-09-27T01:50:19.801Z"
  }
}
```

### Possíveis Erros:

| Código do Erro  | Descrição                |
| --------------- | ------------------------ |
| 401 Bad Request | Authentication Required. |
| 401 Bad Request | Invalid Token.           |
| 401 Bad Request | Contact not found.       |

---

### 2.3. **atualizando contato**

[ Voltar para os Endpoints ](#3-endpoints)

### `/contact/{id}`

### Exemplo de Request:

```
PATCH /contact
Host: http://localhost:3001/contact/{id}
Authorization: Bearer {token}
Content-type: application/json
```

### Exemplo de Request:

```json
{
  "name": "contato20",
  "email": "contato20@email.com"
}
```

### Exemplo de Response:

```
200 Ok
```

```json
{
  "id": "d216efee-9b15-450c-95a6-6ef4224e5912",
  "name": "contato20",
  "email": "contato20@email.com",
  "phone": "999999898",
  "user": {
    "id": "40abdc82-9dde-4e8f-a2f7-19e7f5fb18d4",
    "name": "Rodrigo",
    "email": "rodrigo@kenzie.com.br",
    "phone": "19999281346",
    "password": "$2b$10$lkVifcq3lJU0ZYkRWsK2wO8drRmc7pqAaR2esRcpUpyBvS.XtVB.u",
    "created_at": "2022-09-27T01:50:19.801Z"
  }
}
```

### Possíveis Erros:

| Código do Erro  | Descrição                |
| --------------- | ------------------------ |
| 401 Bad Request | Authentication Required. |
| 401 Bad Request | Invalid Token.           |
| 401 Bad Request | Contact not found.       |

---

### 2.4. **deletando contato**

[ Voltar para os Endpoints ](#3-endpoints)

### `/contact/{id}`

### Exemplo de Request:

```
DELETE /contact
Host: http://localhost:3001/contact/{id}
Authorization: Bearer {token}
Content-type: None
```

### Exemplo de Response:

```
200 Ok
```

```json
No body retorned for response
```

### Possíveis Erros:

| Código do Erro  | Descrição                |
| --------------- | ------------------------ |
| 401 Bad Request | Authentication Required. |
| 401 Bad Request | Invalid Token.           |
| 401 Bad Request | Contact not found.       |

---
