FROM node:latest AS frontend

WORKDIR /frontend

COPY video-chat-room-webapp/package*.json /frontend/

RUN npm install

COPY ./video-chat-room-webapp .

RUN npm run build

# --------------------------------------------

FROM node:18.16.0 AS application

WORKDIR /app

COPY video-chat-room-backend/package*.json /app/

RUN npm install

COPY ./video-chat-room-backend .

COPY --from=frontend /frontend/build /app/dist/views/

RUN npm run build

ENV PORT 9910

# EXPOSE $PORT

CMD ["npm", "run", "start"]