const express = require('express');

var routes = function (Gym) {
var gymRouter = express.Router();
gymRouter.route('/gyms')
    .post(function (req,res){
        var gym = new Gym(req.body);
        gym.save();
        res.status(201).send(gym);
        
    })
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
        
 })
    .put(function (req,res) {
      Gym.findById(req.params.gymId, function(err,gym){
            if(err)
                console.log(error);
            else
                gym.name = req.body.name;
                gym.address = req.body.address;
                gym.PhoneNumber = req.body.PhoneNumber;
                gym.name = req.body.read;
                gym.save();
                res.json (gym);
        }); 
    });
 return gymRouter;
};

module.exports = routes;
