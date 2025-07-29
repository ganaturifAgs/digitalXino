const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')


router.get('/main', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/css/main.css'))
})
router.get('/fa_all', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/css/fontawesome/all.css'))
})

router.get('/jquery', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/js/jquery.min.js'))
})
router.get('/metodos', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/js/metodos.js'))
})
router.get('/fa-all', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/js/fontawesome/all.js'))
})
router.get('/qr', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/js/qrcode.min.js'))
})

module.exports=router