FROM node:lts-alpine AS base

RUN npm install -g @vue/cli \
    && apk add --no-cache git bash openssh

# Clone and build backend
FROM base AS backend 
WORKDIR /app
RUN git clone --branch latest https://github.com/jfcodiaz/GraphAppMsj-Api.git && \
    cd GraphAppMsj-Api/code && \
    yarn install

CMD [ "tail -f /dev/null" ] 

FROM base AS build
COPY code /app
WORKDIR /app

ENV VUE_APP_GQL_HTTP_PORT=4000
ENV VUE_APP_GQL_WS_PORT=4000

RUN yarn install --frozen-lockfile
RUN yarn run build

# Distribution
FROM mongo:latest AS dist

ENV MONGO_URI=mongodb://localhost:27017/chat_db?authSource=admin

RUN apt-get update && apt-get install -y nginx supervisor && apt-get clean
RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean

COPY --from=build /app/dist /var/www/html
COPY --from=backend /app/GraphAppMsj-Api/code /app/backend
COPY docker/production-dist/config/supervisord/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY docker/production-dist/config/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
EXPOSE 27017
EXPOSE 4000

CMD ["/usr/bin/supervisord"]

# Producction
FROM dist AS prod

# Development
FROM base AS dev

CMD [ "tail -f /dev/null" ] 
