FROM node:alpine

WORKDIR /app/todo-api

COPY ./package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "start"]
