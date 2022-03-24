FROM node:16-alpine

WORKDIR /backend

COPY package*.json /

RUN npm install

COPY . .

EXPOSE 3002

CMD ["npm", "start"]
