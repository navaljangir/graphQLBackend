FROM node:20-alpine

WORKDIR /usr/src

COPY package*.json .

RUN npm install
COPY . . 
RUN npm run db:generate
EXPOSE 8000

CMD ["npm", "run" , "dev"]