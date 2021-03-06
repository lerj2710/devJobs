const { Router } = require("express");

const { mostrarTrabajo } = require("../controllers/home");
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
router.get("/vacantes/nueva", formularioNuevaVacante);
router.post("/vacantes/nueva", agregarVacante);
router.get("/vacantes/:url", mostrarVacantes);

//editar Vacante
router.get("/vacantes/editar/:url", formEditarVacante);
router.post("/vacantes/editar/:url", editarVacante);

module.exports = router;
