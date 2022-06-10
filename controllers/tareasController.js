const Proyectos = require("../models/Proyectos");
const Tareas = require("../models/Tareas");

exports.agregarTarea = async (req, res, next) => {
  // obtenemos el proyecto
  const proyecto = await Proyectos.findOne({ where: { url: req.params.url } });

  // leer el valor del input
  const { tarea } = req.body;
  const estado = 0;
  const proyectoId = proyecto.id;
  if (tarea.length <= 0) {
    const proyectos = await Proyectos.findAll();
    const tareas = await Tareas.findAll({
        where: { 
            proyectoId : proyecto.id
        }
    });
    res.render("tareas", {
      nombrePagina: "Tareas del Proyecto",
      error: "Ingrese nombre de tarea",
      proyecto,
      proyectos,
      tareas
    });
  } else {
    // insetar en la base de datos
    const resultado = await Tareas.create({ tarea, estado, proyectoId });

    if (!resultado) {
      return next();
    }
    res.redirect(`/proyectos/${req.params.url}`);
  }
};

exports.cambiarEstadotarea = async (req, res, next) => {
  const { id } = req.params;
  const tarea = await Tareas.findOne({ where: { id } });
  let estado = 0;
  if (tarea.estado === estado) {
    estado = 1;
  }
  tarea.estado = estado;
  const resultado = await tarea.save();
  if (!resultado) return next();
  res.status(200).send("Actualizado");
};
exports.eliminarTarea = async (req, res, next) => {
  const { id } = req.params;
  const resultado = await Tareas.destroy({ where: { id } });

  if (!resultado) return next();
  res.status(200).send("tarea eliminada");
};
