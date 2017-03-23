// Adds Geo Location Record to Logon data in Mongo
const ObjectId = require('mongodb').ObjectId;
const mongojs = require('mongojs');
const request = require('request');

const Rx = require('rxjs');

let url = 'mongodb://127.0.0.1:27019/pawgoni';

let db = mongojs(url, ['mongojs']);

// holds all of the logon records
let stack = [];

let save = function (collection, data) {
  db[collection].save(data);
};

let dbStream$ = new Rx.Subject();

// get ip address geo location data
let addGeoLoc = function (record) {
    return new Promise((resolve, reject) => {
        let api = `http://freegeoip.net/json/${record.Source}`;
        request(api, (error, response, body) => {
            if (response && response.statusCode === 200) {
                record.GeoLoc = JSON.parse(body);
                console.log('geo api call', response.statusMessage)
                resolve(record);
            } else reject(error);
        });
    }).catch(error => {
        console.log('error during geo loc api fetch:', error)
    });
};

// query database for all logon data
let getLogonData = function () {
  let cursor = db.logons.find({});
  let count = 0;
  cursor.on('data', record => {
    console.log(++count)
    stack.push(record);
  });
};

// gets geoloc with throttling to handle api load
let logonData$ = Rx.Observable.create((observer) => {

  getLogonData();

  // takes record from Source throttle Observable and adds GeoLocation
  dbStream$.subscribe(record => {
    if (record.doc && !record.doc.GeoLoc && record.doc.Source)
        addGeoLoc(record.doc).then(result => {
            let percentFinished = ((record.i + 1) / stack.length * 100).toFixed(2) + ' %';
            console.log('adding GeoLoc to', result._id, '#', record.i +1 , 'of', stack.length, percentFinished);
            db.logons.update({_id: ObjectId(result._id)}, result,
                console.log);
            observer.next(result)
        });
  });

    // from stack array of records throttle api calls with a delay
    let source$ = Rx.Observable.interval(1000)
    .flatMap((e) => {
        if (stack[e]) {
            // send this record with index count to process for loc data
            return Rx.Observable.of(dbStream$.next({doc: stack[e], i: e}))
             .delay(1000);
        } else {
            return Rx.Observable.of('empty data set in stack');
        }
    });

    source$.subscribe();
});

logonData$.subscribe()

// // let id = "58d2466d168ad110ccb825e0";
// db.logons.find(new ObjectId("58d26b4f168ad110ccbccf1e"), [], console.log);
// db.logons.remove({Source: { $exists: false} }, [], console.log);
