const express = require('express');

//This routes object handles .get,.post for the API.
var routes = function(Gym){
    var gymRouter = express.Router();

    gymRouter.route('/')
        .post(function(req, res){
           
            var gym= new Gym(req.body);
            gym.save();
            res.status().send(gym);

        })
        .get(function(req,res){

            var query = {};

            if(req.query.address)
            {
                query.address = req.query.address;
            }
            Gym.find(query, function(err,gyms){
                if(err)
                    res.status(500).send(err);
                else
                    res.json(gyms);
            });
        });
// This router middleware handles .put, .delete.
    gymRouter.use('/:gymId', function(req,res,next){
        Gym.findById(req.params.gymId, function(err,gym){
            if(err)
                res.status(500).send(err);
            else if(gym)
            {
                req.gym = gym
                next();
            }
            else
            {
                res.status(404).send('no resource found');
            }
        });
    });
    gymRouter.route('/:gymId')
        .get(function(req,res){

            res.json(req.gym);

        })
        .put(function(req,res){
            req.gym.name = req.body.name;
            req.gym.address = req.body.address;
            req.gym.phoneNumber = req.body.phoneNumber;
            req.gym.sports = req.body.sports;
            req.gym.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.gyms);
                }
            });
        })
        .delete(function(req,res){
            req.gym.remove(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.status(204).send('gym removed');
                }
            });
        });
    return gymRouter;
};

module.exports = routes;