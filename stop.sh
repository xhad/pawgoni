#!/bin/bash

# stop the docker database server
docker stop $(docker ps -a -q)

# stop the websocket server
pm2 stop pawgoni-ws

# stop the http server
pkill -f pawgoni.py