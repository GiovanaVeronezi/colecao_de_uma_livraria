import mongoose from 'mongoose';


const emprestimoSchema = new mongoose.Schema({

    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usuarios",
        required: true
    },

    livro: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "livros",
        required: true
    },

    dataEmprestimo: {
        type: Date,
        default: Date.now
    },

    dataDevolucao: {
        type: Date
    },

    devolvido: {
        type: Boolean,
        default: false
    }


}, {versionKey:false});


const emprestimo = mongoose.model("emprestimos", emprestimoSchema);


export default emprestimo;