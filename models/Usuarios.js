const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const usuariosSchema = Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  token: String,
  expira: Date,
});

// metodo para hashear los passwords
usuariosSchema.pre("save", async function (next) {
  // si el password ya esta hasheado
  if (!this.isModified("password")) {
    return next(); //detener la ejecucion
  }
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

usuariosSchema.post("save",  function (error, doc, next) {
  if(error.code === 11000){
    next('Ese correo ya esta registrado');
  }else{
    next(error);

  }
});
module.exports = model("Usuarios", usuariosSchema);
