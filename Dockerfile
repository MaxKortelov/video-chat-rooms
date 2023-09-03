FROM node:latest AS frontend

WORKDIR /frontend

COPY video-chat-room-webapp/package*.json /frontend/

RUN npm install

COPY ./video-chat-room-webapp .

RUN npm run build

# --------------------------------------------

FROM node:latest AS application

WORKDIR /app

COPY video-chat-room-backend/package*.json /app/

RUN npm install

COPY ./video-chat-room-backend .

COPY --from=frontend /frontend/build /app/dist/views/

RUN npm run build

RUN ls -a

ENV PORT 9910

EXPOSE $PORT

CMD ["npm", "run", "start"]