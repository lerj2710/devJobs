require("dotenv").config();

const express = require("express");
const router = require("./routes");
const exphbs = require("express-handlebars");

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

//correr el puerto
app.listen(process.env.port, () => {
  console.log(`corriedo en el puerto ${process.env.port}`);
});
