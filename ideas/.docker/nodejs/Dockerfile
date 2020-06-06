FROM node:13.12.0-alpine3.11

RUN npm i -g @nestjs/cli

RUN apk add yarn

EXPOSE 3000

CMD  nest start  --debug 0.0.0.0 --watch