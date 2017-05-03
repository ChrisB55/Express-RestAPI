const express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');


const db = mongoose.connect('mongodb://localhost/gymAPI');

const Gym = require('./models/gymModel');

var app = express();

var port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

gymRouter = require('./Routes/gymRoutes')(Gym);


app.use('/api/gyms', gymRouter); 


app.get('/', function(req, res){
    res.send('Testing here');
});

app.listen(port, function(){
    console.log('We are running  on  PORT: ' + port);
});