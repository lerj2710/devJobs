const { Router } = require("express");

const { mostrarTrabajo } = require("../controllers/home");
const {
  formularioNuevaVacante,
  agregarVacante,
  mostrarVacantes,
} = require("../controllers/vacantes");

const router = Router();

router.get("/", mostrarTrabajo);

//crear vacantes
router.get("/vacantes/nueva", formularioNuevaVacante);
router.get("/vacantes/:url", mostrarVacantes);

router.post("/vacantes/nueva", agregarVacante);

module.exports = router;
