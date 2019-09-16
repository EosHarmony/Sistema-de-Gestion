const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const conexion = require('express-myconnection');

//Inicializar todo
let app = express();

//Importar rutas
const ruta = require('./routes/router');
//Configuraciones
    app.set('port', process.env.PORT || 3000);
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));
//Middlewares
    app.use(morgan('dev'));
    app.use(conexion  (mysql, {
        host: 'localhost',
        user: 'root',
        password: 'n0m3l0',
        port: '3306',
        database: 'sdg'
    }, 'single'));

    app.use(express.urlencoded({extended:false}));

//Rutas
app.use('/', ruta);
//Archivos estaticos
    app.use(express.static(path.join(__dirname, 'public')));
//Servidor
app.listen(app.get('port'), () => {
    console.log('Server in port ', app.get('port'), ':)');
});
