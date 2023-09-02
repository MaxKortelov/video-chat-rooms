FROM node:latest AS frontend

WORKDIR /frontend

COPY package*.json /frontend/

RUN npm install

COPY . .

RUN npm run build

#--------------------------------------------

FROM nginx:mainline-alpine AS webapp

COPY --from=frontend /frontend/build /var/www/html