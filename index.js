const express = require('express');
const router = require('./routes');
const exphbs = require('express-handlebars');

const path = require('path');
const app = express();
const port = 5000

app.use('/', router());

// habilitar handlebars como view
app.engine('handlebars', exphbs.engine({
    defaultLayout: 'layout',
    layoutsDir: path.join(app.get('views'), 'layouts')
}));

app.set('view engine', 'handlebars');
// static files
app.use(express.static(path.join(__dirname, 'public')));

//correr el puerto
app.listen(port, () => {
  console.log(`Corriendo en el Puerto ${port}`)
})