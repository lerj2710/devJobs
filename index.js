require("dotenv").config();
require("./config/db");

const cookieParser = require("cookie-parser");
const express = require("express");
const exphbs = require("express-handlebars");
// const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const router = require("./routes");
const session = require("express-session");

const path = require("path");
const app = express();

app.use("/", router());

// habilitar handlebars como view
app.engine(
  "handlebars",
  exphbs.engine({
    defaultLayout: "layout",
    layoutsDir: path.join(app.get("views"), "layouts"),
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
app.listen(process.env.PORT, () => {
  console.log(`corriedo en el puerto ${process.env.PORT}`);
});
