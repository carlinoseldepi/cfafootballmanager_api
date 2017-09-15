var mongoose = require('mongoose');
var User = mongoose.model('User');
var service = require('./../service');


//GET - Return all registers
exports.findAll = function(req, res) {
    console.log('GET /users')

    User.find({}, function(err, users) {
        if(err) res.send(500, err.message);
        if (!users) return res.status(404).send("Users not found.");
            
        res.status(200).jsonp(users);
    });
};

//GET - Return a register with specified ID
exports.findById = function(req, res) {
    console.log('GET /users/' + req.params.id);

    User.findById(req.params.id, function(err, user) {
        if(err) return res.send(500, err.message);
        if (!user) return res.status(404).send("No user found.");

        res.status(200).jsonp(user);
    });
};

//POST - Insert a new register
exports.create = function(req, res) {
    console.log('POST /users');
    console.log(req.body);

    var user = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: service.encrypt(req.body.password)
    });
    user.save(function(err, user) {
        if(err) return res.send(500, err.message);
        
        res.status(200).jsonp(user);
    });
};

//PUT - Update a register already exists
exports.update = function(req, res) {
    console.log('PUT /users/' + req.params.id);
    console.log(req.body);

    User.findById(req.params.id, function(err, user) {
        if(err) return res.send(500, err.message);
        if (!user) return res.status(404).send("No user found.");

        user.name = req.body.name;
        user.email = req.body.email;
        user.username = req.body.username;
        user.password = service.encrypt(req.body.password);
            
        user.save(function(err2) {
            if(err2) return res.send(500, err2.message);
             
            res.status(200).jsonp(user);
        });
    });
};

//DELETE - Delete a register with specified ID
exports.delete = function(req, res) {
    console.log('DELETE /users/' + req.params.id);

    User.findById(req.params.id, function(err, user) {
        if(err) return res.send(500, err.message);
        if (!user) return res.status(404).send("No user found.");

        user.remove(function(err2) {
            if(err2) return res.send(500, err2.message);
               
            res.status(200).json({ message: 'Successfully deleted' });
        });
    });
};