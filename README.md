# pawgoni - Process Actuarial Worker for Logon Intents

Below you have instructions on how the project has been set up.

## Up and running

Get the repo:

```
git clone http://github.com/xhad/pawgoni.git
cd pawgoni
```

Next, install dependencies. The back-end is a simple Flask API, so you'll
probably want to set up a virtual environment as well. These commands assume
that you have [Python3](https://www.python.org/downloads/) and
[Node.js](https://nodejs.org/en/) (with npm) installed.

```
sudo apt-get install python3-venv
pyvenv env
source env/bin/activate
pip install -r requirements.txt
npm install
```

## Database

Next, build the mondodb docker image. Here is a link for more infromation
on how to [build docker images](https://docs.docker.com/engine/getstarted/step_four/);

```
sudo apt install Docker docker-compose
sudo gpasswd -a ${USER} docker
cd db
./build-db.sh
```

To run the database as a daemon:
```
docker-compose up -d
```

To copy a csv file from the host to the container and import the longon.csv file to the mongodb running on the contianer

```
docker cp ./seed-data  db_mongodb_1:/root/seed-data
docker exec -it db_mongodb_1 bash
mongoimport  --db pawgoni --collection logons  --type csv --headerline --file /root/seed-data/logons.csv
```

NOTES
```
docker exec -it db_mongodb_1 bash
```

Clean up and erase all docker containers:

```
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
```

## Websocket Data Server

Socket.io server with nodejs that handles delievery of large data sets
This server requires PM2, a node process manaager, to be installed globally.
```
sudo npm install -g pm2
```


Now that you have everything installed, you can build and run the app.

```
npm start
npm stop
```

This will compile the JavaScript modules and Less and start up the Flask API.

## Running tests

To run the tests, use the following commands. The first runs the Mocha
test-suite for the JavaScript app. The second runs the Python unit tests for the
API.

```
npm run test
python api.py
```

You can also run the JavaScript tests in watch mode by passing an additional
flag into the npm `run-script` command.

```
npm run test -- -w
```

## Styling and Design

The style and design libraries are from Materialize. Reference [React Materialize](https://react-materialize.github.io/) for designing with this project.

## Scrape GeoLocation Data for Logon Source IP

After you have imported logons.csv into Mongo and started the mongodb container,
you can run this command and get all geo location data form ip addresses

```
cd server
pm2 addGeoLoc.js --name addGeo
```
