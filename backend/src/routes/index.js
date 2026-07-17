import express from "express";  
import livros from "./livrosRoutes.js";

const routes = (app) => { // permite configurar o express
  app.route("/").get((req, res) => res.status(200).send("Curso de Node.js")); 
  app.use(express.json(), livros);
  //registra um middleware que interpreta requisições com corpo JSON e disponibiliza os dados em req.body e livros ativam todas as rotas livros
};

export default routes;
