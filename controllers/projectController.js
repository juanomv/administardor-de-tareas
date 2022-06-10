const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');


exports.projectosHome= async (req,res)=>{
    const proyectos = await Proyectos.findAll();
    res.render('index',{
        nombrePagina : 'Proyectos',
        proyectos
    });
}
exports.projectNosotros = (req,res)=>{
    res.render('nosotros')
}
exports.formularioProyecto = async(req,res)=>{
    const proyectos = await Proyectos.findAll();
    res.render('nuevoProyecto',{
        nombrePagina: 'Nuevo Proyecto',
        proyectos
    })
}

exports.nuevoPoryecto = async (req,res) =>{
    const proyectos = await Proyectos.findAll();
    // res.send('enviates el Formulario');
    // validar que tengamos algo en el input
    const { nombre } = req.body;
    let errores = [];
    if(!nombre){
        errores.push({'texto': 'Agrega un nombre al proyecto'})
    }

    if(errores.length >0){
        res.render('nuevoProyecto',{
            nombrePagina : ' Nuevo Proyecto',
            errores,
            proyectos
        })
    }
    else{

        await Proyectos.create({nombre});
        res.redirect('/');
           
    }
}

exports.projectPorUrl = async (req,res) => {
    const proyectosPromise =  Proyectos.findAll();
    const proyectoPromise = Proyectos.findOne({where:{url: req.params.url}});
    const [proyectos,proyecto] = await Promise.all([proyectosPromise,proyectoPromise]);
    // consultar tareas
    
    const tareas = await Tareas.findAll({
        where: { 
            proyectoId : proyecto.id
        }
    });
    if(!proyecto) return next();
    //render a la vista
    res.render('tareas',{
        nombrePagina:'Tareas del Proyecto',
        proyecto,
        proyectos,
        tareas
    })
}
exports.projectEditar = async(req,res) =>{
    const proyectosPromise =  Proyectos.findAll();
    const proyectoPromise = Proyectos.findOne({where:{id: req.params.id}});
    const [proyectos,proyecto] = await Promise.all([proyectosPromise,proyectoPromise]);

    res.render('nuevoProyecto',{
        nombrePagina:'Editar Proyecto',
        proyectos,
        proyecto
    })
    
}

exports.actualizarProject = async (req,res) =>{
    const proyectos = await Proyectos.findAll();
    // res.send('enviates el Formulario');
    // validar que tengamos algo en el input
    const { nombre } = req.body;
    let errores = [];
    if(!nombre){
        errores.push({'texto': 'Agrega un nombre al proyecto'})
    }

    if(errores.length >0){
        res.render('nuevoProyecto',{
            nombrePagina : ' Nuevo Proyecto',
            errores,
            proyectos
        })
    }
    else{

        await Proyectos.update({nombre : nombre},{
            where : {
                id : req.params.id
            }
        });
        res.redirect('/');
           
    }
}
exports.eliminarProject =async(req,res,next)=>{
    // console.log(req);
    const {urlProyecto}= req.query;
    const resultado = await Proyectos.destroy({where :{url : urlProyecto}});
    if(!resultado){
        return next();
    }
    res.status(200).send('Proyecto Eliminado Correctamente');
}