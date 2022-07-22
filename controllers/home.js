const Vacante = require("../models/Vacantes");

const mostrarTrabajo = async (req, res, next) => {
  const vacantes = await Vacante.find().lean();

  if (!vacantes) return next();

  res.render("home", {
    nombrePagina: "devJobs",
    tagline: "Encuentra y Publica Trabajo para Desarrolladores Web",
    barra: true,
    boton: true,
	vacantes: vacantes
  });
};

module.exports = {
  mostrarTrabajo,
};
