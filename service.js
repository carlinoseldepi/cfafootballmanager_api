var mongoose = require('mongoose');
var User = mongoose.model('User');

var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('./config');

// Nodejs encryption with CTR
var crypto = require('crypto');
var algorithm = 'aes-256-ctr';
var password = config.TOKEN_SECRET;


//
// encripta un texto
exports.encrypt = function(text){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}
 
//
// desencripta un texto
exports.decrypt = function(text) {
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}

//
// crea el token del usuario
exports.createToken = function(user) {
    var payload = {
        sub: {_id: user._id, email: user.email},  // Identifica el sujeto del token
        iat: moment().unix(), //  Identifica la fecha de creacion del token
        exp: moment().add(7, 'days').unix() //  Identifica a la fecha de expiracion del token
    };

    return jwt.encode(payload, config.TOKEN_SECRET);
};

//
// actualiza el token de un usuario
exports.updateUserToken = function(user, token) {
    User.update(
        {_id: user.id}, 
        {token: token}, 
        function(err, affected, resp){
            if (err) return false;

            console.log(resp);
        }
    );

    return true;
}