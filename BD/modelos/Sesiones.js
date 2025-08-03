const mongoose = require('mongoose');

const sesionesSchema = new mongoose.Schema(
    {
        _id:{type:Number, require:true},
        usuario:{type:String, require:true},
        inicio:Date,
        ip:String,
        ubicacion:String,
        device:String
    })

    

module.exports = mongoose.model('sesiones', sesionesSchema);