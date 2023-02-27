FROM node:16

WORKDIR /app/todo-web

COPY ./package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "serve"]
