const Vacantes = require("../models/Vacantes");
const Vacante = require("../models/Vacantes");

const formularioNuevaVacante = (req, res) => {
  res.render("nueva-vacante", {
    nombrePagina: "Nueva Vacante",
    tagline: "Llena el formulario y publica tu vacante",
  });
};

//agregar vacantes a la base de datos
const agregarVacante = async (req, res) => {
  const vacante = new Vacante(req.body);

  //crear arreglo de habilidades
  vacante.skills = req.body.skills.split(",");

  //almacenar en DB
  const nuevaVacante = await vacante.save();

  res.redirect(`/vacantes/${nuevaVacante.url}`);
};

module.exports = {
  formularioNuevaVacante,
  agregarVacante,
};
