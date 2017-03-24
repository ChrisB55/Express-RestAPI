const express = require('express');
const mongoose = require('mongoose');

var app = express();

var port = process.env.PORT || 4000;

var mainRouter = express.Router();

mainRouter.route('/main')
    .get(function(req, res){
        var responseJson = {hello: "this tests API"};
        res.json(responseJson);
 });
app.use('/api', mainRouter);

app.get('/', function(req,res){
    res.send('testing here');
});

app.listen(port, function() {
    console.log('We are running at ' + port);
});

