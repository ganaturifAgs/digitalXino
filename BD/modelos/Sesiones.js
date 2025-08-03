const mongoose = require('mongoose');

const sesionesSchema = new mongoose.Schema(
    {
        _id:{type:Number, require:true},
        usuario:String,
        inicio:Date,
        ip:String,
        ubicacion:{long:Number,lat:Number},
        device:String
    })

    

module.exports = mongoose.model('sesiones', sesionesSchema);