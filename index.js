const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const handlebars = require('handlebars');
const exphbs = require("express-handlebars");
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const MongoStore = require("connect-mongo");
const router = require("./routers");
const session = require("express-session");
// const expressValidator = require("express-validator");
const flash = require("connect-flash");
const passport = require("./config/passport");

require("dotenv").config();
require("./config/db");

const path = require("path");
const app = express();

//habilitar body parse
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// habilitar campos
// app.use(expressValidator());

// habilitar handlebars como view
app.engine(
  "handlebars",
  exphbs.engine({
    defaultLayout: "layout",
    handlebars: allowInsecurePrototypeAccess(handlebars),
    helpers: require("./helpers/handlebars"),
  })
);

app.set("view engine", "handlebars");
// static files
app.use(express.static(path.join(__dirname, "public")));

//inciar la session
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SECRETO,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE }),
  })
);

//inciarlizar passport
app.use(passport.initialize());
app.use(passport.session());


// Alertas y flash messages
app.use(flash());

// Crear nuestro middleware
app.use((req, res, next) => {
  res.locals.mensajes = req.flash();
  next();
});

app.use("/", router);

//correr el puerto
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`corriedo en el puerto ${port}`);
});
