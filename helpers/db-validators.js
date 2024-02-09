const Usuario = require('../models/usuario');
const Perros = require('../models/perros')

const existenteEmail = async (correo = '') => {
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        throw new Error(`El email ${ correo } ya fue registrado`);
    }
}

const existeUsuarioById = async ( id = '') => {
    const existeUsuario = await Usuario.findOne({id});
    if(existeUsuario){
        throw new Error(`El usuario con el id: ${ id } no existe`);
    }
}

const existenteTelefono = async (telefono_dueño = '') => {
    const existeTelefono = await Perros.findOne({telefono_dueño});
    if(existeTelefono){
        throw new Error(`El telefono del dueño ${ telefono_dueño } ya fue registrado`);
    }
}

const existePerroById = async ( id = '') => {
    const existePerro = await Perros.findOne({id});
    if(existePerro){
        throw new Error(`La mascota con el id: ${ id } no existe`);
    }
}

module.exports = {
    existenteEmail,
    existeUsuarioById,
    existenteTelefono,
    existePerroById
}