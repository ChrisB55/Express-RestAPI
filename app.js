const express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const User = require('./models/user');
const config = require('./models/config');
const db = mongoose.connect('mongodb://localhost/gymAPI');
const Gym = require('./models/gymModel');


var app = express();

var port = process.env.PORT || 5000;

app.set('superSecret', config.secret); 

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

gymRouter = require('./Routes/gymRoutes')(Gym);


app.use('/api/gyms', gymRouter); 

//Will log requests to console
app.use(morgan('dev'));

app.get('/', function(req, res){
    res.send('Testing here');
});

app.get('/setup', function(req, res) {


  var testUser = new User({ 
    name: 'test person', 
    password: '***',
    admin: true 
  });

  // save the sample user
  testUser.save(function(err) {
    if (err) throw err;

    console.log('The testUser was saved ');
    res.json({ success: true });
  });
});

app.listen(port, function(){
    console.log('We are running  on  PORT: ' + port);
});