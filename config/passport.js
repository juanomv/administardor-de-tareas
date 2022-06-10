const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

// referencia al Modelo donde vamos auteticar

const Usuarios = require ('../models/Usuarios');

// local Strategy - Login con credenciales porpios (usuario y passeord);

passport.use(
    new localStrategy(
        // por default espera un usuario y password
        {
            usernameField:'email',
            passwordField: 'password'

        },
        async (email,password,done) => {
            try {
                const usuario = await Usuarios.findOne({
                    where :{ email:email}
                });
                // el usuario existe , password incorecto
                if(!usuario.verificarPassword(password)){
                    return done(null,false,{
                        message:'password incorecto'
                    })  
                }
                // el email existe y el password correcto
                return done(null,usuario);
            } catch (error) {
               // Ese uaurio no existe
               return done(null,false,{
                   message:'Esa cuenta no existe'
               }) 
            }
        }
    )

    
);

// serializar el usuario
passport.serializeUser((usuario,callback)=>{
    callback(null,usuario);
})

// deserializar el usuario
passport.deserializeUser((usuario,callback)=>{
    callback(null,usuario);
})

module.exports = passport;