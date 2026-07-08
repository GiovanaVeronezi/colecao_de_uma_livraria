import express from "express";
import autorController from "../controllers/autorControllers.js";

const routes = express.Router();

routes.get("/autores", autorController.listarAutor);
routes.get("/autores/:id", autorController.listarAutorPorId);
routes.post("/autores", autorController.cadastrarAutor);
routes.put("/autores/:id", autorController.atualizarAutor);
routes.delete("/autores/:id", autorController.excluirAutor);

export default routes