const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');

// helpers con algunas funciones

const helpers = require('./helpers');

// Crear la conexion a la BD

const db = require('./config/db');
require('./models/Proyectos');
require('./models/Tareas');
require('./models/Usuarios');
db.sync()
    .then(()=> console.log('conectado al servidor'))
    .catch(error => console.log(error));

const app = express();

// hablitar body-parse para ller datos del formulario
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.set('view engine','pug')
app.set('views',path.join(__dirname,'./views'))

// agrar flass messages
app.use(flash());

app.use(cookieParser());
// sessiones
app.use(session({
    secret: 'supersecreto',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
//pasar vardum a la aplicacion

app.use((req,res,next)=> {
    res.locals.vardump = helpers.vardump;
    res.locals.mensajes = req.flash();
    next();
});



app.use('/',routes());

app.listen(3000);