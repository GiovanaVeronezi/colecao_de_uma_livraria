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
routes(app); //Execute a função chamada routes e entregue o objeto app para ela



export default app;
