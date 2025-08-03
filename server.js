const express = require('express');
const { dirname } = require('path');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('./BD/mongoose-connect')
const rutasDesarrollo = require("./rutas/desarrollo")
const rutasInvitados = require("./rutas/invitados")
const rutasJSyCSS = require("./rutas/js-css")
const rutasImagenes = require("./rutas/imagenes")
const rutasFonts = require("./rutas/webFonts")
const rutasSesiones = require("./rutas/sesiones")
const rutasIds = require("./rutas/ids")

console.log("Desde server.js  -->> ",__dirname)

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname +'/public'));

const _url = "/desarrollo"

app.get(`${_url}/`, (req,res)=>{
    res.render("templates/tarjetaPresentacion")
})

app.use(`${_url}/invitacion`,rutasDesarrollo)
app.use(`${_url}/invitados`,rutasInvitados)
app.use(`${_url}/jsycss`,rutasJSyCSS)
app.use(`${_url}/img`,rutasImagenes)
app.use(`${_url}/webfonts`,rutasFonts)
app.use(`${_url}/sesiones`,rutasSesiones)
app.use(`${_url}/ids`,rutasIds[0])

app.listen(80, () => {
    console.log(`Servidor iniciado en http://192.168.1.15${_url}`);
});