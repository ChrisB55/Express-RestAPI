const express = require('express');

//This routes object handles .get,.post for the API.
var routes = (Gym)=>{
    var gymRouter = express.Router();

    gymRouter.route('/')
        .post((req, res)=>{
            var gym = new Gym(req.body);
            gym.save();
            res.status(201).send(gym);

        })
        .get((req,res)=> {

            var query = {};
            if(req.query.address)
            {
                query.address = req.query.address;
            }
            Gym.find(query, (err,gyms)=>{
                if(err)
                    res.status(500).send(err);
                else
                    res.json(gyms);
            });
        });

// Router middleware .use
    gymRouter.use('/:gymId', (req,res,next)=> {
        Gym.findById(req.params.gymId, (err,gym)=> {
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
        .get((req,res) => {

            res.json(req.gym);

        })
        .put((req, res)=> {
            req.gym.name = req.body.name;
            req.gym.address = req.body.address;
            req.gym.phoneNumber = req.body.phonenumber;
            req.gym.sports = req.body.sports;
            
            req.gym.save((err)=>{
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.gym);
                }
            });
        })
        .patch((req, res)=> {
            if(req.body._id)
                delete req.body._id;

            for(var i in req.body)
            {
                req.gym[i] = req.body[i];
            }

            req.gym.save((err)=>{
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.gym);
                }
            });
        })
        .delete((req,res)=>{
            req.gym.remove((err)=>{
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