import express from "express";
import LivroController from "../controllers/livroControllers.js";

const routes = express.Router();

routes.get("/Livros", LivroController.listarLivros);
routes.get("/Livros/:id", LivroController.listarLivrosPorId);
routes.post("/livros", LivroController.cadastrarLivro);
routes.put("/Livros/:id", LivroController.atualizarLivro);
routes.delete("/Livros/:id", LivroController.excluirLivro);

export default routes