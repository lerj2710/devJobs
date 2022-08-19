const passport = require("passport");
const Vacante = require("../models/Vacantes");

const autenticarUsuario = passport.authenticate("local", {
  successRedirect: "/administracion",
  failureRedirect: "/iniciar-sesion",
  failureFlash: true,
  badRequestMessage: "Ambos campos son obligatorios",
});
// revisar si el usauario esta autenticado
const verificarUsuario = (req, res, next) => {
  // revisar el usuario
  if (req.isAuthenticated()) return next(); // si esta autenticado

  // si no esta lo esta
  res.redirect("/iniciar-sesion");
};

const panelAdministracion = async (req, res) => {
  // consultar el usuario autenticado
  const vacantes = await Vacante.find({ autor: req.user._id }).lean();

  res.render("administracion", {
    nombrePagina: "Panel de Administración",
    tagline: "Crea y administra tus vacantes desde aquí",
    cerrarSesion: true,
    nombre: req.user.nombre,
    vacantes,
  });
};

const cerrarSesion = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("correcto", "cerraste Sesión Correctamente");
    res.redirect("/iniciar-sesion");
  });
};

module.exports = {
  autenticarUsuario,
  panelAdministracion,
  verificarUsuario,
  cerrarSesion,
};
