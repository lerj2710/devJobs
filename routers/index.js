const { Router } = require("express");
const {autenticarUsuario, panelAdministracion, verificarUsuario} = require("../controllers/auth");

const { mostrarTrabajo } = require("../controllers/home");
const {
  formCrearCuenta,
  crearUsuario,
  validarRegistro,
  formIniciarSesion,
} = require("../controllers/usuarios");
const {
  formularioNuevaVacante,
  agregarVacante,
  mostrarVacantes,
  formEditarVacante,
  editarVacante,
} = require("../controllers/vacantes");

const router = Router();

router.get("/", mostrarTrabajo);

//crear vacantes
router.get("/vacantes/nueva",verificarUsuario ,formularioNuevaVacante);
router.post("/vacantes/nueva",verificarUsuario ,agregarVacante);
router.get("/vacantes/:url", mostrarVacantes);

//editar Vacante
router.get("/vacantes/editar/:url", verificarUsuario ,formEditarVacante);
router.post("/vacantes/editar/:url",verificarUsuario, editarVacante);

// crear cuenta
router.get("/crear-cuenta", formCrearCuenta);
router.post("/crear-cuenta", validarRegistro, crearUsuario);

//autenticar usuario
router.get("/iniciar-sesion", formIniciarSesion);
router.post("/iniciar-sesion", autenticarUsuario);

//Panel de administracion 
router.get('/administracion', verificarUsuario, panelAdministracion )

module.exports = router;
