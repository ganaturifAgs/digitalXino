const express = require("express")
const router = express.Router()
const fs = require('fs')
const {path,dirname} = require('path');
const modeloSesiones = require("../BD/modelos/Sesiones")

// Funciones para modeloSesiones (colección time series)
async function obtenerSesiones() {
    return await modeloSesiones.find();
}

async function obtenerSesionPorId(id) {
    return await modeloSesiones.findById(id);
}

async function crearSesion(datos) {
    const nuevaSesion = new modeloSesiones(datos);
    return await nuevaSesion.save();
}

async function actualizarSesion(id, datos) {
    return await modeloSesiones.findByIdAndUpdate(id, datos, { new: true });
}

async function eliminarSesion(id) {
    return await modeloSesiones.findByIdAndDelete(id);
}

// Rutas
router.get("/", async (req, res) => {
    try {
        const sesiones = await obtenerSesiones();
        res.json(sesiones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const sesion = await obtenerSesionPorId(req.params.id);
        if (!sesion) return res.status(404).json({ error: "Sesión no encontrada" });
        res.json(sesion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.post("/crear", async (req, res) => {
    try {                
        const sesionGuardada = await crearSesion(req.body);
        res.status(201).json(sesionGuardada);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const sesionActualizada = await actualizarSesion(req.params.id, req.body);
        if (!sesionActualizada) return res.status(404).json({ error: "Sesión no encontrada" });
        res.json(sesionActualizada);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const sesionEliminada = await eliminarSesion(req.params.id);
        if (!sesionEliminada) return res.status(404).json({ error: "Sesión no encontrada" });
        res.json({ mensaje: "Sesión eliminada" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;