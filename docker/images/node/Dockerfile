FROM node:lts-alpine

RUN npm install -g @vue/cli \
    && apk add --no-cache git bash openssh

CMD [ "tail -f /dev/null" ]
