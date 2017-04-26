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
 gymRouter.use('/:gymId', function(req,res next){
     Gym.findById(req.params.gymId, function(err,gym){
            if(err)
                res.status(500).send(err);
            else if (gym)
            {
                req.gym=  gym;
                next();
            }
                res.status(404).send('No Resourse Available');
        });
 })
 gymRouter.route('/:gymId')
    .get(function(req, res){
        res.json (req.gym);
 })
    .put(function (req,res) {
                req.gym.name = req.body.name;
                req.gym.address = req.body.address;
                req.gym.PhoneNumber = req.body.PhoneNumber;
                req.gym.name = req.body.name;
                req.gym.save(function(err) {
                    if(err)
                res.status(500).send(err);
                    else
                res.json (req.gyms);
        });
                req.res.json (gym);
        })

    .patch(function (req,res){
       if (req.body._id)
        delete req.body._id;
       for( var i in req.body)
        {
            req.gym[i] = req.body[i];
        }
        req.gym.save(function(err) {
        if(err)
                res.status(500).send(err);
            else
                res.json (req.gyms);
        });
    });
 return gymRouter;
};

module.exports = routes;
