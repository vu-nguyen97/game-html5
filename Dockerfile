# 1. Build
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn build

FROM nginx
COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /app/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/ssl/funkigame.crt /etc/nginx/ssl/funkigame.crt
COPY --from=builder /app/ssl/funkigame.key /etc/nginx/ssl/funkigame.key
EXPOSE 443
