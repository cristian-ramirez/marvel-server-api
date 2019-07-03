FROM node:lts

ENV PORT=7000

COPY . /marvel-server
WORKDIR /marvel-server

RUN npm install

EXPOSE $PORT

ENTRYPOINT ["npm", "run", "server"]
