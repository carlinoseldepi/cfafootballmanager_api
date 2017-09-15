var mongoose = require('mongoose');
var Team = mongoose.model('Team');


//GET - Return all registers
exports.findAll = function(req, res) {
    console.log('GET /teams')

    Team.find({}, function(err, teams) {
        if(err) res.send(500, err.message);
        if (!teams) return res.status(404).send("Teams not found.");
            
        res.status(200).jsonp(teams);
    });
};

//GET - Return a register with specified ID
exports.findById = function(req, res) {
    console.log('GET /teams/' + req.params.id);
    
    Team.findById(req.params.id, function(err, team) {
        if(err) return res.send(500, err.message);
        if (!team) return res.status(404).send("No team found.");

        res.status(200).jsonp(team);
    });
};

//POST - Insert a new register
exports.create = function(req, res) {
    console.log('POST /teams');
    console.log(req.body);

    var team = new Team({
        name: req.body.name,
        //email: req.body.email,
        //teamname: req.body.teamname,
        //password: service.encrypt(req.body.password)
    });
    team.save(function(err, team) {
        if(err) return res.send(500, err.message);
        
        res.status(200).jsonp(team);
    });
};

//PUT - Update a register already exists
exports.update = function(req, res) {
    console.log('PUT /teams/' + req.params.id);
    console.log(req.body);

    Team.findById(req.params.id, function(err, team) {
        if(err) return res.send(500, err.message);
        if (!team) return res.status(404).send("No team found.");

        team.name = req.body.name;
        //team.email = req.body.email;
        //team.teamname = req.body.teamname;
        //team.password = service.encrypt(req.body.password);
            
        team.save(function(err2) {
            if(err2) return res.send(500, err2.message);
             
            res.status(200).jsonp(team);
        });
    });
};

//DELETE - Delete a register with specified ID
exports.delete = function(req, res) {
    console.log('DELETE /teams/' + req.params.id);

    Team.findById(req.params.id, function(err, team) {
        if(err) return res.send(500, err.message);
        if (!team) return res.status(404).send("No team found.");

        team.remove(function(err2) {
            if(err2) return res.send(500, err2.message);
               
            res.status(200).json({ message: 'Successfully deleted' });
        });
    });
};