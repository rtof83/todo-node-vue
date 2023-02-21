FROM node:16

WORKDIR /app/todo-web

COPY ./package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "serve"]
