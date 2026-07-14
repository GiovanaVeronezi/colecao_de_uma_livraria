import mongoose from 'mongoose'; 

const livroSchema = new mongoose.Schema({  
    id: {type: mongoose.Schema.Types.ObjectId }, 
    titulo: { type: String, required: true },
    editora: {type: String },
    preco: {type: Number},
    paginas: {type: Number}
}, {versionKey: false});    

const livro = mongoose.model("livros", livroSchema); // criei a variavel livro e ela recebe um model chamado livros que busca e salva dados do livroschema

export default livro;
