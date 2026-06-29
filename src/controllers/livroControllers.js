import Livro from "../models/Livro.js";

class LivroController {

    static async listarLivros (req, res){ 
        try{
        const listaLivros = await Livro.find({}); //chama o model livro atraves do find 
        res.status(200).json(listaLivros);
        } catch(erro){
            res.status(500).json({message: `${erro.message} - falha na requisição`});
        }
        
        
    };

    static async listarLivrosPorId (req, res){ 
        try{
            const id = req.params.id;
        const livroEncontrado = await Livro.findById(id); //chama o model livro atraves do find 
        res.status(200).json(livroEncontrado);
        } catch(erro){
            res.status(500).json({message: `${erro.message} - falha na requisição do livro`});
        }
        
        
    };
    
    static async cadastrarLivro (req, res){
        try{
            const novoLivro = await Livro.create(req.body); 
            res.status(201).json({message: "criado com sucesso", livro: novoLivro});
        
        } catch (erro){
            res.status(500).json({message: `${erro.message} - falha ao cadastrar livro`});
        }

    };

     static async atualizarLivro (req, res){ 
        try{
            const id = req.params.id;
        await Livro.findByIdAndUpdate(id, req.body); //chama o model livro atraves do find 
        res.status(200).json({message: "Livro atualizado"});
        } catch(erro){
            res.status(500).json({message: `${erro.message} - falha na atualização do livro`});
        }
        
        
    };
};

    

export default LivroController;