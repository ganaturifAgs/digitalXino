const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')


router.get('/gothic', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/css/webfonts/GOTHIC.TTF'))
})
router.get('/Virnature.ttf', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/css/webfonts/Virnature.ttf'))
})

router.get('/fa-brands-400.woff2', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/css/webfonts/fa-brands-400.woff2'))
})

router.get('/exmouth_.ttf', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/css/webfonts/exmouth_.ttf'))
})
router.get('/Christmas.otf', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/css/webfonts/Christmas.otf'))
})
router.get('/fa-solid-900.woff2', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/css/webfonts/fa-solid-900.woff2'))
})
router.get('/fa-solid-900.ttf', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/css/webfonts/fa-solid-900.ttf'))
})


module.exports = router