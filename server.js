const express = require('express');
const { dirname } = require('path');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('./BD/mongoose-connect')
const rutasDesarrollo = require("./rutas/desarrollo")
const rutasInvitados = require("./rutas/invitados")

console.log("Desde server.js  -->> ",dirname(),__dirname)

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


app.listen(80, () => {
    console.log(`Servidor iniciado en http://192.168.1.15${_url}`);
});