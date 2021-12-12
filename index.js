require('dotenv').config();

// module dependencies
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session');
const methodOverride = require('method-override');
const cors = require('cors');

const passportConfig = require('./src/middlewares/passportConfig');

const indexRouter = require('./src/routes');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// session config
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

// passport config
app.use(passport.initialize());
app.use(passport.session());
passportConfig();

// routes handler
app.use(indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Pagina no encontrada');
  err.status = 404;
  return next(err);
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  const error = {
    message: err.message || 'Error interno en el servidor',
    status: err.status || 500,
    stack: req.app.get('env') === 'development' ? err.stack : '',
  };
  res.render('error.ejs', { error });
});

module.exports = app;
