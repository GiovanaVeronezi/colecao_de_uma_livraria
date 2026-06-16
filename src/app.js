import express from "express";
import conectaNaDataBase from "./config/dbConnect.js";
import livro from "./models/Livro.js";

const conexao = await conectaNaDataBase(); 

conexao.on("error", (erro) => {
  console.error("Erro de conexão", erro);
});

conexao.once("open", () => {
  console.log("Conexão com o banco feita com sucesso");
});

const app = express();
app.use(express.json()); //registra um middleware do Express que interpreta requisições com corpo JSON e disponibiliza os dados em req.body

app.get("/", (req, res) => {// quando for feita uma req get pra o caminho com /, execute o código
  res.status(200).send("Curso de node.js");
});

app.get("/livros", async (req, res) => {
  const listaLivros = await livro.find({}); //find conecta e acessa o mongoose e retorna a coleção livro
  res.status(200).json(listaLivros);
});

app.get("/livros/:id", async (req,res)=>{
  const livroEncontrado = await livro.findById(req.params.id);
  res.status(200).json(livroEncontrado);
});

app.post("/livros", async (req, res) => {
  const novoLivro = new livro(req.body);
  await novoLivro.save();
  res.status(201).json(novoLivro);
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
