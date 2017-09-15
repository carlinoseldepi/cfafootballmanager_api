var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require("method-override");
var morgan = require('morgan');
var cors = require('cors');
var auth = require('./auth');
var middleware = require('./middleware');

// CONFIGS
// configuracion express
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride())
app.use(cors());
var port = process.env.PORT || 3000
app.set('port', port);
app.use(morgan('dev')); // use morgan to log requests to the console



// ----- IMPORT MODELS
// importar modelos
require('./models/user');
// importar controladores
//var UserCtrl = require('./controllers/users');

// ----- RUTER
// iniciar rutas del servidor/API
app.get('/', function(req, res) {
    res.send("HOLA!! Estás en la API de CFA Football Manager");
});


var router = express.Router();
// rutas libres: login y registro
router.post('/auth/register', auth.register);
router.post('/auth/login', auth.login);
app.use(router);


// rutas protegidas
// cualquier ruta definida a partir de aquí va a requerir el Token
var apiRoutes = express.Router();

// midleware para comprobar el token
apiRoutes.use(function(req, res, next) {
    middleware.ensureAuthenticated(req, res, next);
});

// middleware para comprobar si el usuario tiene permiso
apiRoutes.use(function(req, res, next) {
    middleware.checkAccess(req, res, next);
});


apiRoutes.get('/', function(req, res) {
    res.json({ message: 'Welcome to the coolest API on earth!' });
});

// usuarios
var userRoutes = require('./routes/userRoutes'); //importing routes
userRoutes(apiRoutes);

// midleware para rutas incorrectas
apiRoutes.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

app.use('/api', apiRoutes);


// ---- INIT SERVER
// iniciar servidor y base de datos
mongoose.connect('mongodb://localhost/cfa_football_manager', function(err) {
    // comprobar errores
    if(err) throw err;

    app.listen(app.get('port'), function() {
        console.log('Express corriendo en http://localhost:3000')
    });
});