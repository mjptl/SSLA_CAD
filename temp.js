const sqlite3 = require('sqlite3').verbose();

let ts = Date.now();
let date_ob = new Date(ts);
let date = date_ob.getDate();
let month = date_ob.getMonth() + 1;
let year = date_ob.getFullYear();

// prints date & time in YYYY-MM-DD format
var current_date = year + "-" + month + "-" + date;

let db = new sqlite3.Database('./SSLDB.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the SSLDB database.');
    db.run("INSERT INTO testing (server_datetime,client_datetime,test_result) VALUES(datetime('now'),'HH:MM:SS','{l1:1,l2:2}');",function(err) {
        if (err) {
          return console.log(err.message);
        }
        // get the last insert id
        console.log(`A row has been inserted with rowid`);
      });
  });
