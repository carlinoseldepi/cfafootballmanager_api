var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('./config');

//
// Comprueba si llega el token del usuario y este es correcto
exports.ensureAuthenticated = function(req, res, next) {
    console.log("-- MIDDLEWARE ensureAuthentication");
    req.user = undefined;

    // comprobar que venga cabecera de autorización que se envía desde el cliente
    if(!req.headers.authorization) {
        return res.status(403).send({message: 'La petición no tiene cabecera de autorización'})
    }
    
    // Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbsciOiJIUzI1NiJ9.eyJzdWIiOiIWeRtU2ZWMyYjUyNjgxNzE2YmXiNzAxMzIiLCJpYXQiOjE0Mj10MjA0OTEsImV4cCI6MTQy67YzMDA5MX0.IH7ek7Rp_WQJvXeOd8zrBIpeFi4W6kUi_6htmaxv7Ow
    var token = req.headers.authorization.split(" ")[1] || req.body.token || req.query.token || req.headers['x-access-token'];

    try {
        var payload = jwt.decode(token, config.TOKEN_SECRET);
        
        req.user = payload.sub; //contiene el ID del usuario

    } catch (e) {
        console.log("ERROR", e);
        return res.status(403).send({message: 'Token incorrecto'})
    }

    if(payload.exp <= moment().unix()) {
        return res.status(401).send({message: "El token ha expirado"});
    }

    
    next();
}


//
// Comprueba que estamos accediendo a los datos
exports.checkAccess = function(req, res, next) {
    console.log("-- MIDDLEWARE checkAccess");

    var user_id = req.user;
    console.log('user ID: ', user_id);
    next();
}