import express from "express";  
import livros from "./livrosRoutes.js";
import autores from "./autorRoutes.js"

const routes = (app) => { // permite configurar o express
  app.route("/").get((req, res) => res.status(200).send("Curso de Node.js")); 
  app.use(express.json(), livros, autores);
  //registra um middleware que interpreta requisições com corpo JSON e disponibiliza os dados em req.body e livros/autores ativam todas as rotas livros/autores
};

export default routes;
