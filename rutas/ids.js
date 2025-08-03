const   mongoose = require('mongoose')

const idsSchema = new mongoose.Schema({
    _id:Number,
    confirmaciones:Number,
    invitados:Number,
    mensajes:Number,
    sesiones:Number
})
const IDS = mongoose.model("ids",idsSchema)


const express = require('express')
const router = express.Router()


router.get("/",  async (req,res)=>{
    const ids = await IDS.findOne()
    res.json({success:true,data:ids})
})


const _getID = async (doc)=>{
    let ids = await IDS.findOne({_id:0})
    let newId = ids[doc]+1
    let actualiza = {}
    actualiza[doc]=newId
    let resp = await IDS.findByIdAndUpdate(0,actualiza, { new: false });
    return resp
}

router.get("/get_id/:doc",async (req,res)=>{
    let doc = req.params.doc
    await _getID(doc).then(_dat=>{
            res.json({_id:_dat[doc]+1})
    })
})

module.exports = [router,_getID]