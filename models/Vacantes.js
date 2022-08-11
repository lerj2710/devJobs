const { Schema, model } = require("mongoose");

const slug = require("slug");
const shortid = require("shortid");

const vacanteSchema = Schema({
  titulo: {
    type: String,
    required: [true, "El nombre de la vacante es obligatorio"],
    trim: true,
  },
  empresa: {
    type: String,
    trim: true,
  },
  ubicacion: {
    type: String,
    trim: true,
    required: [true, "la ubicacion es obligatoria"],
  },
  salario: {
    type: String,
    default: 0,
    trim: true,
  },
  contrato: {
    type: String,
    trim: true,
  },
  descripcion: {
    type: String,
    trim: true,
  },
  url: {
    type: String,
    lowercase: true,
    trim: true,
  },
  skills: [String],
  candidatos: [
    {
      nombre: String,
      email: String,
      cv: String,
    },
  ],
  autor: {
    type: Schema.ObjectId,
    ref: "Usuarios",
    required: "El Autor es obligatorio",
  },
});

vacanteSchema.pre("save", function (next) {
  //crear url
  const url = slug(this.titulo);
  this.url = `${url}-${shortid.generate()}`;

  next();
});

module.exports = model("Vacante", vacanteSchema);
