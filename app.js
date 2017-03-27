const express = require('express');
    mongoose = require('mongoose');

var db = mongoose.connect("mongodb://localhost/gymAPI");
var app = express();

var Gym = require('./models/gymModel');

var port = process.env.PORT || 4000;

var gymRouter = express.Router();

gymRouter.route('/gyms')
    .get(function(req, res){
        Gym.find(function(err,gyms){
            if(err)
                console.log(error);
            else
                res.json (gyms);
        });
        
 });

 gymRouter.route('/gyms/:gymId')
    .get(function(req, res){
        Gym.findById(req.params.gymId, function(err,gym){
            if(err)
                console.log(error);
            else
                res.json (gym);
        });
        
 });
 
app.use('/api', gymRouter);

app.get('/', function(req,res){
    res.send('testing here');
});

app.listen(port, function() {
    console.log('We are running at ' + port);
});

