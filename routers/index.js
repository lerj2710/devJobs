const { Router } = require("express");
const {
  autenticarUsuario,
  panelAdministracion,
  verificarUsuario,
  cerrarSesion,
} = require("../controllers/auth");

const { mostrarTrabajo } = require("../controllers/home");
const {
  formCrearCuenta,
  crearUsuario,
  validarRegistro,
  formIniciarSesion,
  formEditarPerfil,
  editarPerfil,
  validarPerfil,
} = require("../controllers/usuarios");
const {
  formularioNuevaVacante,
  agregarVacante,
  mostrarVacantes,
  formEditarVacante,
  editarVacante,
  validarVacante,
} = require("../controllers/vacantes");

const router = Router();

router.get("/", mostrarTrabajo);

//crear vacantes
router.get("/vacantes/nueva", verificarUsuario, formularioNuevaVacante);
router.post(
  "/vacantes/nueva",
  verificarUsuario,
  validarVacante,
  agregarVacante
);
router.get("/vacantes/:url", mostrarVacantes);

//editar Vacante
router.get("/vacantes/editar/:url", verificarUsuario, formEditarVacante);
router.post(
  "/vacantes/editar/:url",
  verificarUsuario,
  validarVacante,
  editarVacante
);

// crear cuenta
router.get("/crear-cuenta", formCrearCuenta);
router.post("/crear-cuenta", validarRegistro, crearUsuario);

//autenticar usuario
router.get("/iniciar-sesion", formIniciarSesion);
router.post("/iniciar-sesion", autenticarUsuario);
//  cerrar sesion
router.get("/cerrar-sesion", verificarUsuario, cerrarSesion);

//Panel de administracion
router.get("/administracion", verificarUsuario, panelAdministracion);

// editar perfil
router.get("/editar-perfil", verificarUsuario, formEditarPerfil);

// guardar perfil
router.post("/editar-perfil", verificarUsuario, validarPerfil, editarPerfil);

module.exports = router;
