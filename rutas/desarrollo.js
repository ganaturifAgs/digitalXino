const express = require('express')
const router = express.Router()
const { dirname } = require('path');
const fs = require('fs')
const Mensajes = require("../BD/modelos/Mensajes")
const Confirmaciones = require("../BD/modelos/Confirmaciones")


console.log("Desde desarrollo.js  -->> ",__dirname)


router.get('/',(req,res)=>{
    res.render("templates/tarjetaPresentacion")
})


router.get('/:invitado', async (req, res) => {
    try{
        const Invitados = require("../BD/modelos/Invitados")
        let encontrado = await Invitados.findOne({nombre:req.params.invitado})
        if(!encontrado) res.send({success:false,msg:"Lo sentimos, pero usted no es un invitado del evento"})
        else res.render("index",{title:"Bodas de Oro - Kiko y Ofelia",invitado:encontrado,ruta:"/desarrollo"})
        }catch(error){
            res.send(error)
            console.log(error)
        }   
});



router.get("/audioplayer/plantilla",(req,res)=>{
    res.render("templates/audioPlayer");
})

router.get('/audioplayer/play', (req, res) => {
    const range = req.headers.range
    const videoPath = `./audio/ooooooooofeliaaaaaa.mp3`;
    const videoSize = fs.statSync(videoPath).size
    const chunkSize = 1 * 1e6;
    const start = Number(range.replace(/\D/g, ""))
    const end = Math.min(start + chunkSize, videoSize - 1)
    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "audio/mp3"
    }
    res.writeHead(206, headers)
    const stream = fs.createReadStream(videoPath, {
        start,
        end
    })
    stream.pipe(res)
})


router.post("/confirmacion/nueva",async (req,res)=>{
    try{
        const newId = await Confirmaciones.find({},{_id:1})
        let _id = newId.pop()._id+1
        req.body["_id"]=_id
        const nueva = new Confirmaciones(req.body)
        await nueva.save()
        res.json({success:true,msg:"Se ha confirmado su asistencia con exito. Y generado su código QR"})
    }catch(error){
        res.json({success:false,msg:"Ocurrio  un error al guardar la confirmación"})
        console.log(error)
    }
})

router.get("/confirmacion/:invitado",async (req,res)=>{
    let inv = req.params.invitado
    const mensa = await Confirmaciones.findOne({invitado:inv})
    res.json({success:mensa === null  ? true:false, msg:mensa === null ? "ok":"Usted ya habia confirmado su asistencia"})
})

router.post("/mensajes/nuevo",async (req,res)=>{
    try{
        const newId = await Mensajes.find({},{_id:1})
        let _id = newId.pop()._id+1
        req.body["_id"]=_id
        const nuevo = new Mensajes(req.body)
        await nuevo.save()
        res.json({success:true,msg:"Su mensaje se envio a los novios correctamente."})
    }catch(error){
        res.json({success:false,msg:"Ocurrio  un error al guardar su mensaje"})
        console.log(error)
    }
})

router.get("/mensajes/:invitado",async (req,res)=>{
    let inv = req.params.invitado
    const mensa = await Mensajes.find({invitado:inv})
    res.json({success:mensa.length >= 2  ? false:true,msg:mensa.length >=2 ? "Este invitado ya envio las 2 felicitaciones posibles":"ok"})
})







module.exports = router