const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');
const expressPino = require('express-pino-logger');
const config = require('config');

const models = require('./models');
const { Routes } = require('./middleware/routes');
const logger = require('./middleware/logger');

const app = express();

// Attach logger
const expressLogger = expressPino({ logger });
app.use(expressLogger);

// Connect front-end with express
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Register routes
const router = express.Router();
router.use((req, res, next) => {
  req.database = models;
  req.logger = logger;
  next();
});
Routes.registerRoutes(router);
app.use('/', router);

// Run migration
models.sequelize.sync();

// Start up service
http.createServer(app).listen(config.get('port'), () => {
  logger.info(`Server is up on the port ${config.get('port')}`);
});
