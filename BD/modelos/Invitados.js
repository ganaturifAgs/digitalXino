const mongoose = require('mongoose')
const esquemaInv = mongoose.Schema({
    _id:Number,
    nombre:String,
    url:String
})

const Invitatados = mongoose.model("invitados",esquemaInv)

module.exports = Invitatados