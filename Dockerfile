FROM node:latest

WORKDIR /usr/app

COPY package.json ./

RUN nmp install

COPY . .

EXPOSE 5432

CMD ["npm", "run", "dev"]