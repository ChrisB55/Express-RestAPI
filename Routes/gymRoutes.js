const express = require('express');

//This routes object handles .get,.post for the API.
var routes = function(Gym){
    var gymRouter = express.Router();

    gymRouter.route('/')
        .post(function(req, res){
            var gym = new Gym(req.body);
            gym.save();
            res.status(201).send(gym);

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

// Router middleware .use
    gymRouter.use('/:gymId', function(req,res,next){
        Gym.findById(req.params.gymId, function(err,gym){
            if(err)
                res.status(500).send(err);
            else if(gym)
            {
                req.gym = gym;
                next();
            }
            else
            {
                res.status(404).send('no resource found');
            }
        });
    });
    // .put, .patch .delete handled here. 
    gymRouter.route('/:gymId')
        .get(function(req,res){

            res.json(req.gym);

        })
        .put(function(req,res){
            req.gym.name = req.gym.name;
            req.gym.address = req.gym.address;
            req.gym.phoneNumber = req.gym.phonenumber;
            req.gym.sports = req.gym.sports;
            
            req.gym.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.gym);
                }
            });
        })
        .patch(function(req,res){
            if(req.body._id)
                delete req.body._id;

            for(var i in req.body)
            {
                req.gym[i] = req.body[i];
            }

            req.gym.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.gym);
                }
            });
        })
        .delete(function(req,res){
            req.gym.remove(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.status(204).send('Item deleted');
                }
            });
        });
    return gymRouter;
};

module.exports = routes;
