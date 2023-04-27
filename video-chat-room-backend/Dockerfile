FROM node:latest

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY . .

RUN npm run build

RUN ls -a

ENV PORT 9910

EXPOSE $PORT

CMD ["npm", "run", "start"]