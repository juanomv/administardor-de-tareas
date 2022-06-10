const express = require("express");
const router = express.Router();
const { body } = require("express-validator/check");
const projeHome = require("../controllers/projectController");
const tareaController = require("../controllers/tareasController");
const usuarioController = require("../controllers/usuariosController");
const authController = require("../controllers/authController");

module.exports = function () {
  router.get("/", authController.usuarioAutenticado, projeHome.projectosHome);
  router.get(
    "/nuevo-proyecto",
    authController.usuarioAutenticado,
    projeHome.formularioProyecto
  );
  router.post(
    "/nuevo-proyecto",
    body("nombre").not().isEmpty().trim().escape(),
    authController.usuarioAutenticado,
    projeHome.nuevoPoryecto
  );
  // poryecto listar
  router.get(
    "/proyectos/:url",
    authController.usuarioAutenticado,
    projeHome.projectPorUrl
  );
  // actualizar el proyecto
  router.get(
    "/proyecto/editar/:id",
    authController.usuarioAutenticado,
    projeHome.projectEditar
  );
  router.post(
    "/nuevo-proyecto/:id",
    authController.usuarioAutenticado,
    body("nombre").not().isEmpty().trim().escape(),
    projeHome.actualizarProject
  );
  // Eliminar Poryecto
  router.delete(
    "/proyectos/:url",
    authController.usuarioAutenticado,
    projeHome.eliminarProject
  );
  // Tareas
  router.post(
    "/proyectos/:url",
    authController.usuarioAutenticado,
    tareaController.agregarTarea
  );
  // actualizar tarea
  router.patch(
    "/tareas/:id",
    authController.usuarioAutenticado,
    tareaController.cambiarEstadotarea
  );
  // eliminar tarea
  router.delete(
    "/tareas/:id",
    authController.usuarioAutenticado,
    tareaController.eliminarTarea
  );
  // crear nueva cuenta
  router.get("/crear-cuenta", usuarioController.formCrearCuenta);
  router.post("/crear-cuenta", usuarioController.crearCuenta);
  //  iniciar Session
  router.get("/iniciar-sesion", usuarioController.formIniciarSession);
  router.post("/iniciar-sesion", authController.auteticarUsuario);
  // cerrar session
  router.get('/cerrar-session',authController.cerrarSesion);
  return router;
};
