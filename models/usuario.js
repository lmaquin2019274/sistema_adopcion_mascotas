const { Schema, model} = require('mongoose');

const UsuarioSchema = Schema ({
    nombre: {
        type: String,
        required: [true, 'Nombre obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'Correo obligatorio']
    },
    password: {
        type: String,
        required: [true, 'Password obligatorio']
    },
    img:{
        type: String
    },
    role:{
        type: String,
        required: true,
        enum: ["ADMIN_ROLE", "USER_ROLE"]
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }
});

/*UsuarioSchema.methods.toJSON = function(){
    const { __v, password, ...usuario} = this.Object();
    return usuario;
}*/

module.exports = model('Usuario', UsuarioSchema);