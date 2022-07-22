const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const exphbs = require("express-handlebars");
const MongoStore = require("connect-mongo");
const router = require("./routers");
const session = require("express-session");

require("dotenv").config();
require("./config/db");

const path = require("path");
const app = express();

//habilitar body parse
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", router);

// habilitar handlebars como view
app.engine(
  "handlebars",
  exphbs.engine({
    defaultLayout: "layout",
    // layoutsDir: path.join(app.get("views"), "layouts"),
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

//correr el puerto
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`corriedo en el puerto ${port}`);
});
