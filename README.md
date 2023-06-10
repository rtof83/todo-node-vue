# Projeto To Do List

## O projeto tem como objetivo criar e gerenciar uma lista de tarefas, através de etiquetas e configurações personalizáveis.

&nbsp;

## Conteúdo
- [Construção](#construção)
- [Instalação e Inicialização](#instalação-e-inicialização)
- [Acesso à Aplicação](#a-aplicação-pode-ser-acessada-através-dos-links)
- [Configurações](#configurações)
- [Estrutura da Base de Dados](#estrutura-da-base-de-dados)
- [Implementações API](#implementações-api)
- [Exemplos Inserção / Atualização](#exemplos-de-inserção--atualização)
- [Implementações WEB](#implementações-web)

&nbsp;

## Construção:

| Recursos          |                                  |
| ----------------- | -------------------------------- |
| `API`             | Node 17                          |
| `WEB`             | Vue 3                            |
| `Estilização`     | Sass                             |
| `Base de Dados`   | MySQL                            |
| `ORM`             | Sequelize                        |
| `Conteinerização` | Docker                           |
| `Ferramentas`     | Visual Studio Code 1.75.1        |
|                   | Console de Gerenciamento da AWS  |
|                   | HeidiSQL 12.3.0                  |
|                   | Postman 10.11.1                  |

&nbsp;

## Instalação e Inicialização:

- npm (/api):
    - npm install;
    - npm start;

- npm (/web):
    - npm install;
    - npm run serve;

- Docker (build /api e /web):
    - docker build -t {imagem} .;
    - docker run -p {porta}:{porta} -d {imagem};

- Docker (compose):
    - construção da api, web e base de dados (/raiz):
        - docker-compose up;

- porta padrão API: [configuração inicial .env](https://github.com/rtof83/todo-node-vue/blob/main/api/.env.example);

- porta padrão WEB: 8080;

- ### a aplicação pode ser acessada através dos links:
  - WEB (armazenado em instância Amazon S3):
    - http://to-do-list-node-vue.s3-website-us-east-1.amazonaws.com

  - API (instanciada em EC2 AWS):
    - http://3.92.70.204:3005

  - Base de Dados instanciada em RDS:
    - database.c4gffxjofhme.us-east-1.rds.amazonaws.com:3306;

&nbsp;

## Configurações

- [WEB - conexão com a API](https://github.com/rtof83/todo-node-vue/blob/main/web/src/store/api.js);

- [ENV - variáveis de ambiente - configuração inicial](https://github.com/rtof83/todo-node-vue/blob/main/api/.env.example) <strong>(antes da inicialização, deve ser renomeado para .env):</strong>

- [ENV - variáveis de ambiente - Docker](https://github.com/rtof83/todo-node-vue/blob/main/api/.env.docker) <strong>(antes do comando docker-compose, deve ser renomeado para .env):</strong>

  exemplo configuração:

  ```javascript
  APP_PORT = 3001

  DB_NAME = todo        |
  DB_USER = user        |
  DB_PASS = password    |
                        | --> parâmetros base de dados
  DB_DIALECT = mysql    |
  DB_HOST = localhost   |
  DB_PORT = 3306        |
                        
  
  ### initial config to database (configuração que será exportada para a tabela "config")

  PAGE_SIZE = 10        | --> número de registros por página
  DATE_SIZE = 3         | --> número de dias somado à tarefa após inserção

- [Dockerfile (api):](https://github.com/rtof83/todo-node-vue/blob/main/api/Dockerfile)

  ``` javascript
  FROM node:alpine

  WORKDIR /app/todo-api

  COPY ./package*.json ./

  RUN npm install

  COPY . .

  EXPOSE 3001

  CMD ["npm", "start"]
  ```

- [Dockerfile (web):](https://github.com/rtof83/todo-node-vue/blob/main/web/Dockerfile)

  ``` javascript
  FROM node:16

  WORKDIR /app/todo-web

  COPY ./package*.json ./

  RUN npm install

  COPY . .

  EXPOSE 8080

  CMD ["npm", "run", "serve"]
  ```

- [docker-compose:](https://github.com/rtof83/todo-node-vue/blob/main/docker-compose.yml)

  ``` javascript
  version: "3"

  services:

    db:
      container_name: 'database'
      image: mysql:5.7.31
      command: --default-authentication-plugin=mysql_native_password --sql_mode=NO_ENGINE_SUBSTITUTION,NO_AUTO_CREATE_USER --explicit_defaults_for_timestamp
      restart: always
      ports: 
        - '3308:3306'
      environment: 
        - MYSQL_ROOT_PASSWORD=root
        - MYSQL_DATABASE=todo

    dockerapi:
      build: ./api
      ports:
        - "3001:3001"
    
    dockerweb:
      build: ./web
      ports:
        - "8080:8080"
  ```

&nbsp;

## Estrutura da Base de Dados:

- [Tarefa (Task):](https://github.com/rtof83/todo-node-vue/blob/main/api/models/task.js)

  ```javascript
  id: INTEGER
  name: STRING
  deadline: DATE
  tagId: INTEGER
  ```

- [Etiqueta (Tag):](https://github.com/rtof83/todo-node-vue/blob/main/api/models/tag.js)

  ```javascript
  id: INTEGER
  name: STRING
  color: STRING
  ```

- [Configuração (Config):](https://github.com/rtof83/todo-node-vue/blob/main/api/models/config.js)

  ```javascript
  id: INTEGER
  pageSize: INTEGER
  dateSize: INTEGER
  ```

&nbsp;

### Implementações API:

- [Collections Postman](https://github.com/rtof83/todo-node-vue/blob/main/samples/todo.postman_collection.json);

- [Estrutura base de dados](https://github.com/rtof83/todo-node-vue/blob/main/samples/todo.sql);

- Rotas de acesso:

  - TASKS

    | GET                                                                 |                                                                       |
    | ------------------------------------------------------------------  | --------------------------------------------------------------------- |
    | `{baseURL}/tasks`                                                   | retorna todas as tarefas                                              |
    | `{baseURL}/tasks/{id}`                                              | retorna tarefa por id                                                 |
    | `{baseURL}/tasks?page={page}`                                       | retorna tarefas por paginação                                         |
    | `{baseURL}/tasks?name={name}`                                       | retorna tarefas por nome                                              |
    | `{baseURL}/tasks?tag={tagId}`                                       | retorna tarefas por etiqueta                                          |
    | `{baseURL}/tasks?tag={tagId}&name={name}`                           | retorna tarefas por etiqueta e nome                                   |
    | `{baseURL}/tasks?page={page}&tag={tagId}&name={name}`               | retorna tarefas por paginação, etiqueta e nome                        |


    | POST                                                                |                                                                       |
    | ------------------------------------------------------------------- | --------------------------------------------------------------------- |
    | `{baseURL}/tasks`                                                   | cadastra tarefa                                                       |


    | PUT                                                                 |                                                                       |
    | ------------------------------------------------------------------- | --------------------------------------------------------------------- |
    | `{baseURL}/tasks/{id}`                                              | atualiza tarefa                                                       |


    | DELETE                                                              |                                                                       |
    | ------------------------------------------------------------------- | --------------------------------------------------------------------- |
    | `{baseURL}/tasks/{id}`                                              | exclui tarefa                                                         |

  &nbsp;

  - TAGS

    | GET                                                                 |                                                                       |
    | ------------------------------------------------------------------- | --------------------------------------------------------------------- |
    | `{baseURL}/tags `                                                   | retorna todas as etiquetas                                            |


    | PUT                                                                 |                                                                       |
    | ------------------------------------------------------------------- | --------------------------------------------------------------------- |
    | `{baseURL}/tags/{id}`                                               | atualiza etiqueta                                                     |

  &nbsp;

  - CONFIGS

    | GET                                                                 |                                                                       |
    | ------------------------------------------------------------------- | --------------------------------------------------------------------- |
    | `{baseURL}/configs`                                                 | retorna configurações                                                 |


    | PUT                                                                 |                                                                       |
    | ------------------------------------------------------------------- | --------------------------------------------------------------------- |
    | `{baseURL}/configs/{id}`                                            | atualiza configurações                                                |


    | POST                                                                |                                                                       |
    | ------------------------------------------------------------------- | --------------------------------------------------------------------- |
    | `{baseURL}/configs`                                                 | reinicializa configurações                                            |

&nbsp;

- [Middlewares:](https://github.com/rtof83/todo-node-vue/tree/main/api/middlewares)

  - checkMinNumber:
    - verifica se os valores do tamanho da paginação e tamanho do prazo são maiores que zero;

&nbsp;

- [Serviços:](https://github.com/rtof83/todo-node-vue/tree/main/api/services)

  - checkDate:
    - percorre de forma automatizada a lista de tarefas uma vez ao dia, no horário informado, com o objetivo de atualizar os prazos vencidos (etiqueta "pendente");

  - initialConfig, initialTags:
    - envia ao banco de dados as informações iniciais caso não existam (.env e [default](https://github.com/rtof83/todo-node-vue/blob/main/api/services/default.js));

&nbsp;

### Exemplos de inserção / atualização:

- Tarefas:

  ```javascript
  {
      "name": "Tarefa 1",
      "deadline": "2023-02-22"
  }
  ```

- Etiquetas:

  ```javascript
  {
    "name": "etiqueta2",
    "color": "#585422",
  }
  ```

- Config:

  ```javascript
  { 
    "pageSize": 8,
    "dateSize": 3
  }
  ```

&nbsp;

### Outros recursos:

- ao cadastrar uma tarefa, é inserido automaticamente a soma da data atual com o número de dias informado nas configurações (dateSize);
- ao alterar a data da tarefa para uma data anterior à atual, a etiqueta é substituída por "pendente" (caso não seja uma tarefa finalizada);

&nbsp;

### Implementações WEB:
- Cadastro, alteração e exclusão de Tarefas;
- Localizar Tarefas;
- Paginação;
- Listagem geral;
- Listagem por Etiqueta;

- Configurações:
  - personalização de nome e cor de Etiquetas;
  - personalização de paginação;
  - personalização de dias do prazo;
  - retornar à configuração padrão (valores iniciais);
