var mongoose = require('mongoose');
require('./models/user');
var User = mongoose.model('User');
var service = require('./service');

//
// registro de usuario
exports.register = function(req, res) {
    var user = new User(req.body);
    user.password = service.encrypt(req.body.password);

    user.save(function(err) {
        if(err) throw err;

        //var token = service.createToken(user)
        //service.updateUserToken(user, token);

        return res.status(200).send({id: user.id});
    });
}

//
// login de usuario (en cada login se actualiza el token)
exports.login = function(req, res) {
    User.findOne(
        {email: req.body.email}, 
        function(err, user) {
            // comprobar si el usuario existe o no y si la contraseña es correcta
            if(user) {
                var password_encrypted = service.encrypt(req.body.password);

                if(password_encrypted !== user.password)
                    return res.status(201).send({message: "Pasword incorrect"})
                 
                var token = service.createToken(user);
                service.updateUserToken(user, token);
                
                return res.status(200).send({id: user.id, token: user.token});

            } else {
                return res.status(201).send({message: 'User not exists'});
            }
        }
    );
}

//
// Comprueba que haya usuario en la petición
exports.loginRequired = function(req, res, next) {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: 'Unauthorized user!' });
  }
};


