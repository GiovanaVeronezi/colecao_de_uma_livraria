import express from "express";
import cors from "cors";
import conectaNaDataBase from "./config/dbConnect.js";
import routes from "./routes/index.js";

const conexao = await conectaNaDataBase();

conexao.on("error", (erro) => {
  console.error("Erro de conexão", erro);
});

conexao.once("open", () => {
  console.log("Conexão com o banco feita com sucesso");
});

const app = express();

app.use(cors());
app.use(express.json());

routes(app); //execute a função chaamda routes e entregue o obj app a ela 

export default app;