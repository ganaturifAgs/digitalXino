const express = require('express')
const router = express.Router()
const fs = require('fs')
const Invitados = require("../BD/modelos/Invitados")


router.get('/', async (req, res) => {
    try {
        const invitados = await Invitados.find();
        res.json(invitados);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const invitado = await Invitados.findById(req.params.id);
        if (!invitado) return res.status(404).json({ error: 'Invitado no encontrado' });
        res.json(invitado);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/invitar/:invitado', async (req, res) => {
    try {
        const newId = await Invitados.find({},{_id:1})
        let _id = newId.pop()._id+1
        let datos={_id:_id,nombre:req.params.invitado,url:`https://ganaturideags.com/desarrollo/invitacion/${req.params.invitado}`}
        const nuevoInvitado = new Invitados(datos);
        const invitadoGuardado = await nuevoInvitado.save();
        let linkInvitado = `<a href="${invitadoGuardado.url}"><h2>${invitadoGuardado.url}</h2></a>`
        res.status(201).send(linkInvitado);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const invitadoActualizado = await Invitados.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!invitadoActualizado) return res.status(404).json({ error: 'Invitado no encontrado' });
        res.json(invitadoActualizado);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const invitadoEliminado = await Invitados.findByIdAndDelete(req.params.id);
        if (!invitadoEliminado) return res.status(404).json({ error: 'Invitado no encontrado' });
        res.json({ mensaje: 'Invitado eliminado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;