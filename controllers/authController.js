const passport = require("passport");

exports.auteticarUsuario = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/iniciar-sesion",
  failureFlash: true,
  badRequestMessage: 'Ambos Campos son Obligatorios'
});

// revisar si el usuario esta auntenticado

exports.usuarioAutenticado = (req,res,next)=>{
    // si el usuario esta autenticado , adelante
    if(req.isAuthenticated()){
        return next();
    };
    return res.redirect('/iniciar-sesion')
}
// cerrar sesion

exports.cerrarSesion=(req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/iniciar-sesion');
    })
}