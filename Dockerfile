FROM node:latest

WORKDIR /usr/app

COPY package.json ./

RUN npm install

#por que a necessidade disto? 
RUN npm install -g npm@8.4.0 

COPY . .

EXPOSE 5432

CMD ["npm", "run", "dev"]