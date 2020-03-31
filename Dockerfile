FROM node:10-alpine

RUN mkdir -p /home/node/app_streaming/node_modules && chown -R node:node /home/node/app_streaming

WORKDIR /home/node/app_streaming

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 5678

CMD [ "node", "src/app.js" ]
