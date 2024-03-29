const { response, json } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const usuariosGet = async (req, res = response ) => {
    const { limite, desde } = req.query;
    const query = { estado: true};

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        usuarios
    });
} 

const getUsuarioByid = async (req, res) => {
    const { id } = req.params;
    const usuario = await Usuario.findOne({_id: id});

    res.status(200).json({
        usuario
    });
}

const usuariosPut = async (req, res) => {
    const { id } = req.params;
    const { _id, password, google, correo, ...resto} = req.body;

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.status(200).json({
        msg: 'Usuario actualizado'
    })
}

const usuariosDelete = async (req, res) => {
    const {id} = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id,{estado: false});

    res.status(200).json({
        msg: 'Usuario eliminado'
    });
}

const usuariosPost = async (req, res) =>{
    const { nombre, correo, password, role } = req.body;
    const usuario = new Usuario({nombre, correo, password, role});

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();
    res.status(200).json({
        usuario
    });
}

const usuariosLogin = async (req, res) =>{
    const { Correo, password } = req.body;

    bcryptjs.compare(password, usuario.password).then((result) => {

        if(result === true){
            res.status(200).json({
                msg: 'Bienvenido'
            });
        }else{
            res.status(200).json({
                msg: 'Password equivocado o inexistentes'
            });
        }

    });
}

module.exports = {
    usuariosDelete,
    usuariosPost,
    usuariosGet,
    getUsuarioByid,
    usuariosPut,
    usuariosLogin
}