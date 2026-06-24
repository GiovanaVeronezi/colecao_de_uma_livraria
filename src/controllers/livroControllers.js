import Livro from "../models/Livro.js";

class LivroController {

    static async listarLivros (req, res){ 
        const listaLivros = await Livro.find({}); //chama o model livro atraves do find 
        res.status(200).json(listaLivros);
    };
    
    static async cadastrarLivro (req, res){
        try{
            const novoLivro = await Livro.create(req.body); 
            res.status(201).json({message: "criado com sucesso", livro: novoLivro});
        
        } catch (erro){
            res.status(500).json({message: `${erro.message} - falha ao cadastrar livro`});
        }

}

}

    

export default LivroController;