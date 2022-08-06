const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Usuarios = require("../models/Usuarios");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      const usuario = await Usuarios.findOne({ email });
      if (!usuario)
        return done(null, false, {
          message: "Usuario no existe",
        });

      //usuario exite, verificar su password
      const verificarPass = usuario.compararPass(password);
      if (!verificarPass)
        return done(null, false, {
          message: "Password Incorrecto",
        });
        
      //ambos campos son correcto
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
