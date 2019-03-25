const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();

//conecto la base de datos
const uri = "mongodb+srv://demo:demo@cluster0-ehdar.mongodb.net/lucas?retryWrites=true";

mongoose.connect(uri, { useNewUrlParser: true })
    .then(db => console.log('conectado'))
    .catch(err => console.log('nope'));

//import routes
const indexRoutes = require('./routes/index');

//settings
app.set('port', process.env.PORT || 3000);//defino port como variable, la puedo usar donde quiera

//le digo al servidor donde estan las carpetas de las vistas
//con el path.join uno los dos textos
app.set('views', path.join(__dirname, 'views'));

//motor de plantillas: ejs
app.set('view engine', 'ejs');

//middlewares -> uso morgan
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

//routes
app.use('/', indexRoutes);

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
})