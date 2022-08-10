const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Usuarios = require("../models/Usuarios");

passport.use( new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
    }, async (email, password, done) => {
      const usuario = await Usuarios.findOne({ email: email });
      if (!usuario) return done(null, false, {
          message: "Usuario No Existente",
        });

      // el usuario exite, vamos verificar
      const verificarPass = usuario.compararPass(password);
      if (!verificarPass) return done(null, false, {
          message: "Password Incorrecto",
        });

      //Usuari existe y el pass esta correcto
      return done(null, usuario);
    }
  )
);

passport.serializeUser((usuario, done) => done(null, usuario._id));

passport.deserializeUser(async (id, done) => {
  const usuario = await Usuarios.findById(id).exec();
  return done(null, usuario);
});

module.exports = passport;
