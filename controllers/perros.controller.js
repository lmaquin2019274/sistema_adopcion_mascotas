const { response, json } = require('express');
const bcryptjs = require('bcryptjs');
const Perros = require('../models/perros');

const perrosGet = async (req, res = response ) => {
    const { limite, desde } = req.query;
    const query = { estado: true};

    const [total, perros] = await Promise.all([
        Perros.countDocuments(query),
        Perros.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        perros
    });
} 

const getPerrosByid = async (req, res) => {
    const { id } = req.params;
    const perro = await Perros.findOne({_id: id});

    res.status(200).json({
        perro
    });
}

const perrosPut = async (req, res) => {
    const { id } = req.params;
    const { _id, especie, raza, dueño, telefono_dueño, ...resto} = req.body;

    const perro = await Perros.findByIdAndUpdate(id, resto);

    res.status(200).json({
        msg: 'Mascota actualizada'
    })
}

const perrosDelete = async (req, res) => {
    const {id} = req.params;
    const perro = await Perros.findByIdAndUpdate(id,{estado: false});

    res.status(200).json({
        msg: 'Mascota eliminada'
    });
}

const perrosPost = async (req, res) =>{
    const { nombre, especie, raza, edad } = req.body;
    const perro = new Perros({nombre, especie, raza, edad, dueño, telefono_dueño});

    await perro.save();
    res.status(200).json({
        perro
    });
}

module.exports = {
    perrosDelete,
    perrosPost,
    perrosGet,
    getPerrosByid,
    perrosPut
}