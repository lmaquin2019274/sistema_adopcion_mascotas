const { Schema, model} = require('mongoose');

const PerrosSchema = Schema ({
    nombre: {
        type: String,
        required: [true, 'Nombre obligatorio']
    },
    especie: {
        type: String,
        required: [true, 'Especie obligatoria']
    },
    raza: {
        type: String,
        required: [true, 'Raza obligatoria']
    },
    edad:{
        type: String
    },
    dueño:{
        type: String
    },
    telefono_dueño:{
        type: String
    },
    estado:{
        type: Boolean,
        default: true
    }
});

module.exports = model('Perro', PerrosSchema);