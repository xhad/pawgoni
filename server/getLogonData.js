const mongojs = require('mongojs');
const mongodb = require('mongodb');
const request = require('request');
const Rx = require('rxjs');

// queries database for logon data
let GetLogonData = function () {
  let url = 'mongodb://127.0.0.1:27019/pawgoni';
  this.db = mongojs(url);
  this.stack = [];
  this.count = 0;

  let cursor = this.db.logons.find({}, {}, {timeout: false});
  cursor.on('data', data => {
      ++this.count;
      this.stack.push(data);
  })
};

GetLogonData.prototype.stream = function () {
  let stack = this.stack;
  let count = this.count;

  return Rx.Observable.interval(2)
    .flatMap((i) => {
      if (stack[i]) {
        // send this record with index count to process for loc data
        let p = ((i + 1) / count * 100).toFixed(2) + '%';
        console.log(p)
        return Rx.Observable.of([stack[i], p]).delay(2);
      } else {
        return Rx.Observable.of('empty data set in stack');
      }
    }).take(stack.length);
};

GetLogonData.prototype.save = function (collection, data) {
  this.db[collection].save(data);
};


module.exports = GetLogonData;
