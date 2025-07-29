const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')


router.get('/der-arr', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/img/derecha-arriba.png'))
})
router.get('/tuli-izq', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/img/tulipanIzq.png'))
})
router.get('/tuli-der', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/img/tulipanDer.png'))
})
router.get('/fondo', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/img/fondo.jpg'))
})
router.get('/desenfoque.jpg', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/img/desenfoque.jpg'))
})


module.exports = router