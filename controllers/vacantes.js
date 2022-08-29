const flash = require("express-flash");
const { check, sanitizeBody } = require("express-validator");
const Vacante = require("../models/Vacantes");

const formularioNuevaVacante = (req, res) => {
  res.render("nueva-vacante", {
    nombrePagina: "Nueva Vacante",
    tagline: "Llena el formulario y publica tu vacante",
    cerrarSesion: true,
    nombre: req.user.nombre,
  });
};

//agregar vacantes a la base de datos
const agregarVacante = async (req, res) => {
  const vacante = new Vacante(req.body);

  // usuario autor de la vacante
  vacante.autor = req.user._id;

  //crear arreglo de habilidades
  vacante.skills = req.body.skills.split(",");

  //almacenar en DB
  const nuevaVacante = await vacante.save();

  res.redirect(`/vacantes/${nuevaVacante.url}`);
};

const mostrarVacantes = async (req, res, next) => {
  const vacante = await Vacante.findOne({ url: req.params.url }).lean();

  // si no hay resultados
  if (!vacante) return next();

  res.render("vacante", {
    vacante,
    nombrePagina: vacante.titulo,
    barra: true,
  });
};

const formEditarVacante = async (req, res, next) => {
  const vacante = await Vacante.findOne({ url: req.params.url }).lean();

  if (!vacante) return next();

  res.render("editar-vacante", {
    vacante,
    nombrePagina: `Editar - ${vacante.titulo}`,
    cerrarSesion: true,
    nombre: req.user.nombre,
  });
};

const editarVacante = async (req, res) => {
  const vacanteActualizada = req.body;

  vacanteActualizada.skills = req.body.skills.split(",");

  const vacante = await Vacante.findOneAndUpdate(
    { url: req.params.url },
    vacanteActualizada,
    {
      new: true,
      runValidators: true,
    }
  ).lean();

  res.redirect(`/vacantes/${vacante.url}`);
};

// validar y sanitiar los campos de las vacantes
const validarVacante = (req, res, next) => {
  // sanitizar
  req.sanitizeBody("titulo").escape();
  req.sanitizeBody("empresa").escape();
  req.sanitizeBody("ubicacion").escape();
  req.sanitizeBody("salario").escape();
  req.sanitizeBody("contrato").escape();
  req.sanitizeBody("skills").escape();

  // validar
  req.check("titulo", "Agrega un Titulo a la Vacante").notEmpty();
  req.check("empresa", "Agrega una Empresa").notEmpty();
  req.check("ubicacion", "Agrega una Ubicación").notEmpty();
  req.check("contrato", "Seleciona un Contrato").notEmpty();
  req.check("skills", "Agrega al menos una habilidad").notEmpty();

  const errores = req.validationErrors();

  if (errores) {
    // recargar la vista con los erorres
    req.flash(
      "error",
      errores.map((error) => error.msg)
    );

    res.render("nueva-vacante", {
      nombrePagina: "Nueva Vacante",
      tagline: "Llena el formulario y publica tu vacante",
      cerrarSesion: true,
      nombre: req.user.nombre,
      mensajes: req.flash(),
    });
    return;
  }
  next(); //siguiente middlware
};

const eliminarVacante = async (req, res) => {
  
  const { id } = req.params;
  res.status(200).json("Vacante eliminada correctamente");
  
  // const vacante = await Vacantes.findById( _id ) 
  // console.log(vacante);
  // res.json(vacante)
  //   console.log(id);
  // console.log('funcinando');
};

module.exports = {
  formularioNuevaVacante,
  agregarVacante,
  mostrarVacantes,
  formEditarVacante,
  editarVacante,
  validarVacante,
  eliminarVacante,
};
