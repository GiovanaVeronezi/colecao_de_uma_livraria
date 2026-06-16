import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({

    nome: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    senha: {
        type: String,
        required: true
    },

    telefone: {
        type: String
    }

}, {versionKey: false});


const usuario = mongoose.model("usuarios", usuarioSchema);

export default usuario;