var port = process.env.PORT || 3000,
    http = require('http'),
    fs = require('fs'),
    express = require("express");

var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({extended:false});
var app = express();
const sqlite3 = require('sqlite3').verbose();
    
app.use(express.static(__dirname + '/public'));

app.get('/',function(req,res){
    fs.readFile('public/index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
});

app.get('/form01',function(req,res){
    fs.readFile('public/td.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
});

app.post('/form01',urlencodedParser,function(req,res){ 
    
    console.log("\nreq(POST) -> form01");
  
    s1 = req.body.date;
    s2 = req.body.led_data;

    let db = new sqlite3.Database('./SSLDB.db', (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('>> Connected to the SSLDB database.');
      db.run(`INSERT INTO testing (server_datetime,client_datetime,test_result) VALUES(datetime('now'),?,?);`,[s1,s2],function(err) {
          if (err) {
            return console.log(err.message);
          }
          console.log('>> A row has been inserted with rowid');
          db.close();
          console.log('>> Disconnected to the SSLDB database.');
        });
    });
    res.end("</done>");
});


app.listen(port, '0.0.0.0', function() {
    console.log("server starting");
  });