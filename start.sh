#!/bin/bash

# Start MongoDB docker container
docker-compose -f ./db/docker-compose.yml up -d

# Start the websocket data server
pm2 start ./server/ws.js --name pawgoni-ws --watch ./server

# Open virtual enveironment for flask server
. env/bin/activate

# Start the web server
npm run app




