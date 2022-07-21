const { Router } = require("express");

const { mostrarTrabajo } = require("../controllers/home");
const { formularioNuevaVacante } = require("../controllers/vacantes");

const router = Router();

router.get("/", mostrarTrabajo);

//crear vacantes
router.get('/vacantes/nueva', formularioNuevaVacante);

module.exports = router;
