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

app.get("/", (req, res) => {
  // quando for feita uma req get pra o caminho com /, execute o código
  res.status(200).send("Curso de node.js");
});

app.get("/livros", async (req, res) => {
  const listaLivros = await livro.find({}); //find conecta e acessa o mongoose e retorna a coleção livro
  res.status(200).json(listaLivros);
});

app.get("/livros/:id", (req, res) => {
  const index = buscaLivro(req.params.id); //captura o valor do id que foi passado na url
  res.status(200).json(livros[index]); //  acessa o livro naquela posição do array
});


app.post("/livros", async (req, res) => {
  const novoLivro = new livro(req.body);
  await novoLivro.save();
  res.status(201).json(novoLivro);
});

app.put("/livros/:id", (req, res) => {
  const index = buscaLivro(req.params.id);
  livros[index].titulo = req.body.titulo;
  res.status(200).json(livros);
});

app.delete("/livros/:id", (req, res) => {
  const index = buscaLivro(req.params.id);
  livros.splice(index, 1); //metodo de array que localiza um elemento do array e o deleta através do índice com 1 elemento
  res.status(200).send("Livro removido com sucesso");
});

export default app;
