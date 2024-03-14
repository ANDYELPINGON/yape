const express         = require('express'); //Framework Express
const bodyParser      = require('body-parser'); //Parsea el post para obtener objetos json en el request
const levelup         = require('levelup'); // Base de datos
const morgan          = require('morgan'); // Sistema de logging (muestra en la cosa los request)
const morganjson      = require('morgan-json');
const apiUsers        = require('./api/users'); //Endpoints relacionados al User model
const apiProducts     = require('./api/products'); //Endpoints relacionados al Product model

const app = express();
const db  = levelup('./data/users', {valueEncoding: 'json'});

const format = morganjson({
  short: ':method :url :status',
  length: ':res[content-length]',
  'response-time': ':response-time ms'
const express         = require('express'); //Framework Express
const bodyParser      = require('body-parser'); //Parsea el post para obtener objetos json en el request
const levelup         = require('levelup'); // Base de datos
const morgan          = require('morgan'); // Sistema de logging (muestra en la cosa los request)
const morganjson      = require('morgan-json');
const apiUsers        = require('./api/users'); //Endpoints relacionados al User model
const apiProducts     = require('./api/products'); //Endpoints relacionados al Product model

const app = express();
const db  = levelup('./data/users', {valueEncoding: 'json'});

const format = morganjson({
  short: ':method :url :status',
  length: ':res[content-length]',
  'response-time': ':response-time ms'
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(morgan(format));

let router = express.Router();

router.get('/', (req, res) => {
  res.json({ name: 'yape-api', version: "0.0.1" });
});

// Rutas para usuarios
app.use('/api', apiUsers(router, db));

// Rutas para productos
router.get('/products', (req, res) => {
  // Aquí podrías consultar la base de datos para obtener una lista de productos
  // Por ahora, retornaremos un mensaje de ejemplo
  res.json({ message: 'List of products' });
});

router.post('/products', (req, res) => {
  // Aquí podrías agregar un nuevo producto a la base de datos
  // Por ahora, retornaremos un mensaje de ejemplo
  res.json({ message: 'Product created successfully' });
});

app.use('/api', apiProducts(router, db));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Server running on port ' + port + '!');
});
