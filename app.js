const express = require('express');
    mongoose = require('mongoose');
    bodyParser = require('body-parser');

var db = mongoose.connect("mongodb://localhost/gymAPI");
var app = express();

var Gym = require('./models/gymModel');

var port = process.env.PORT || 4000;


var gymRouter = require('./Routes/gymRoutes')(Gym);

app.use(bodyParser.urlencoded({extended:true})); 
app.use(bodyParser.json());


app.use('/api/', gymRouter);

app.get('/', function(req,res){
    res.send('testing here');
});

app.listen(port, function() {
    console.log('We are running at ' + port);
});

