
var express = require('express');
var session = require('cookie-session'); // Charge le middleware de sessions
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
var Connection = require('tedious').Connection;
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var morgan = require('morgan');
var app = express();

var config = {
    userName: 'sa',
    password: '#wk#42@1',
    server: 'S2V-DICTA-TEST',
    options: {
          instanceName: 'DICTAPLUS',
          database: 'WK_WF',
    }
};

app

.use(function(req,res)
{
  var connection = new Connection(config);
  connection.on('connect', function(err) {
  // If no error, then good to proceed.
  	if (err) return console.error(err);
      console.log("Connected");
      executeStatement();
  });

  var Request = require('tedious').Request;
  var TYPES = require('tedious').TYPES;

  function executeStatement() {
   
   request = new Request("select IncrementalId from joblist",function(err, rowCount)
   {
   	if (err)
   	{
   		console.log(err);
   	}
    return console.log(rowCount);
   });

   connection.execSql(request);

   var result = "";
   request.on('row', function(columns) {

          columns.forEach(function(column) {
            if (column.value === null) {
              result+= 'NULL' + " ";
            } else {
              result+= column.value + " ";
            }
          });
          console.log(result);
          console.log("");
          result ="";
   });
      
  }
}

.listen(8080);