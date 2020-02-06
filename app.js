const mongoose = require('mongoose')
const Movel = require('./models/movel')
const url = 'mongodb://localhost:27017/meuBanco'
const connection = mongoose.connect(url)

connection.then((db) => {
  console.log('conectado ao mongodb')
}).catch(console.log)

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
/***importando rotas***/
const rotasMovel = require('./routes/moveis');//produtos
const rotasPromo = require('./routes/rotasPromo');//promocoes
const rotasCombo = require('./routes/rotasCombo');//combos
const porta = 3000;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/***usando imports***/
app.use('/moveis', rotasMovel);
app.use('/rotasPromo', rotasPromo);
app.use('/combo', rotasCombo);
app.use('/', rotasMovel);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/***servidor***/
const servidor = http.createServer(app)
servidor.listen(porta, () => {
  console.log(`servidor escutando em http://localhost:${porta}/`)
})

module.exports = app;
