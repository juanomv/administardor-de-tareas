const Usuarios = require('../models/Usuarios');
exports.formCrearCuenta=(req,res)=>{
    res.render('crearcuenta',{
        nombrePagina: 'Crear Cuenta en Uptaks'
    })
}

exports.formIniciarSession=(req,res)=>{
    const {error} = res.locals.mensajes;
    res.render('iniciarSession',{
        nombrePagina: 'Iniciar Session en Uptaks',
        error
    })
}
exports.crearCuenta = async(req,res)=>{
    const {email , password}= req.body;
    try{
        await Usuarios.create({
            email,
            password
        });
        res.redirect('/iniciar-sesion');
    }catch(error){
        req.flash('error',error.errors.map(error =>error.message));
        console.log(error);
        res.render('crearcuenta',{
           
            mensajes: req.flash(),
            nombrePagina:'Crear Cuenta en Uptask',
            email ,
            password
        })
    }
    
   
    
    
}