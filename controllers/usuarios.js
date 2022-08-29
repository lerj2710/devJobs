const flash = require("express-flash");
const Usuarios = require("../models/Usuarios");
const { check, sanitizeBody } = require("express-validator");

const formCrearCuenta = (req, res) => {
  res.render("crear-cuenta", {
    nombrePagina: "Crea tu cuenta en devJobs",
    tagline:
      "Comienza a publicar tus vacantes gratis, Solo debes crear una cuenta",
  });
};

const validarRegistro = (req, res, next) => {
  // sanitizar
  req.sanitizeBody("nombre").escape();
  req.sanitizeBody("email").escape();
  req.sanitizeBody("password").escape();
  req.sanitizeBody("confirmar").escape();

  // validar
  req.check("nombre", "El Nombre es Obligatorio").notEmpty();
  req.check("email", "El email debe ser valido").isEmail();
  req.check("password", "El password no puede ir vacio").notEmpty();
  req.check("confirmar", "Confirmar password no puede ir vacio").notEmpty();
  req.check("confirmar", "El password es diferente").equals(req.body.password);

  const errores = req.validationErrors();

  if (errores) {
    // si hay errores
    req.flash(
      "error",
      errores.map((error) => error.msg)
    );

    res.render("crear-cuenta", {
      nombrePagina: "Crea tu cuenta en devJobs",
      tagline:
        "Comienza a publicar tus vacantes gratis, solo debes crear una cuenta",
      mensajes: req.flash(),
    });
    return;
  }

  // Si toda la validación es correcta
  next();
};

const crearUsuario = async (req, res, next) => {
  //crear el usuario
  const usuario = new Usuarios(req.body);

  try {
    await usuario.save();
    res.redirect("/iniciar-sesion");
  } catch (error) {
    req.flash("error", error);
    res.redirect("/crear-cuenta");
  }
};
// formulario para iniciar
const formIniciarSesion = (req, res) => {
  res.render("iniciar-sesion", {
    nombrePagina: "Iniciar Sesión en devJobs",
  });
};
// editar el perfil
const formEditarPerfil = async (req, res) => {
  res.render("editar-perfil", {
    nombrePagina: "Edita tu pefil en devJobs",
    usuario: req.user,
    cerrarSesion: true,
    nombre: req.user.nombre,
  });
};

// guardar cambios editar perfil
const editarPerfil = async (req, res) => {
  const usuario = await Usuarios.findById(req.user._id);

  usuario.nombre = req.body.nombre;
  usuario.email = req.body.email;

  if (req.body.password) {
    usuario.password = req.body.password;
  }

  await usuario.save();
  // mensaje de alerta
  flash("correcto", "Cambios guardados correctamente");
  // redirecionar
  res.redirect("/administracion");

  // console.log(usuario);
};

// validar y sanitiar los campos de las vacantes
const validarPerfil = (req, res, next) => {
  // sanitizar
  req.sanitizeBody("nombre").escape();
  req.sanitizeBody("email").escape();

  if (req.body.password) {
    req.sanitizeBody("password").escape();
  }

  // validar
  req.checkBody("nombre", "Nombre no puede ir vacio").notEmpty();
  req.checkBody("email", "El Correo no puede ir vacio").notEmpty();

  const errores = req.validationErrors();

  if (errores) {
    // recargar la vista con los erorres
    req.flash(
      "error",
      errores.map((error) => error.msg)
    );

    res.render("editar-perfil", {
      nombrePagina: "Edita tu pefil en devJobs",
      usuario: req.user,
      cerrarSesion: true,
      nombre: req.user.nombre,
      mensajes: req.flash(),
    });
    return;
  }
  next(); //siguiente middlware
};

module.exports = {
  formCrearCuenta,
  crearUsuario,
  validarRegistro,
  formIniciarSesion,
  formEditarPerfil,
  editarPerfil,
  validarPerfil,
};
