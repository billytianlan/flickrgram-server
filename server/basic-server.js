var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var router = require('./config/routes.js').router
var db = require('./db/db.js');

app.use(bodyParser.json());
app.set('port', 3000);


router(app, express);

app.listen(app.get('port'));