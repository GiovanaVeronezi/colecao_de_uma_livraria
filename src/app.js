import express from "express";
import conectaNaDataBase from "./config/dbConnect.js";
import routes from "./routes/index.js"



const conexao = await conectaNaDataBase(); 

conexao.on("error", (erro) => {
  console.error("Erro de conexão", erro);
});

conexao.once("open", () => {
  console.log("Conexão com o banco feita com sucesso");
});

const app = express();
routes(app);



app.get("/livros/:id", async (req,res)=>{
  const livroEncontrado = await livro.findById(req.params.id);
  res.status(200).json(livroEncontrado);
});

app.put("/livros/:id", async(req,res)=>{

 const livroAtualizado = await livro.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new:true}
 );

 res.status(200).json(livroAtualizado);

});

app.put("/livros/:id", async(req,res)=>{

 const livroAtualizado = await livro.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new:true}
 );

 res.status(200).json(livroAtualizado);

});

export default app;
