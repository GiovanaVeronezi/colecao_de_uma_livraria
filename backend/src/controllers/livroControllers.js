import livro from "../models/Livro.js";

function normalizarNumero(valor) {
  if (typeof valor === "number") {
    return Number.isFinite(valor) ? valor : null;
  }

  const convertido = Number(String(valor).replace(",", ".").trim());
  return Number.isFinite(convertido) ? convertido : null;
}

function montarLivroPayload(dados) {
  const preco = normalizarNumero(dados.preco);
  const paginas = normalizarNumero(dados.paginas);
  const autorNormalizado =
    typeof dados.autor === "string" ? dados.autor.trim() : "";

  return {
    titulo: typeof dados.titulo === "string" ? dados.titulo.trim() : "",
    editora: typeof dados.editora === "string" ? dados.editora.trim() : "",
    preco,
    paginas,
    autor: autorNormalizado,
  };
}

class LivroController {
  static async listarLivros(req, res) {
    try {
      const listaLivros = await livro.find({}); //chama o model livro atraves do find
      res.status(200).json(listaLivros);
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - falha na requisição` });
    }
  }

  static async listarLivrosPorId(req, res) {
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findById(id);
      res.status(200).json(livroEncontrado);
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - falha na requisição do livro` });
    }
  }

  static async cadastrarLivro(req, res) {
    try {
      const livroCompleto = montarLivroPayload(req.body);

      if (
        !livroCompleto.titulo ||
        !livroCompleto.editora ||
        livroCompleto.preco === null ||
        livroCompleto.paginas === null ||
        !livroCompleto.autor
      ) {
        return res.status(400).json({
          message:
            "Preencha titulo, editora, preco, paginas e autor corretamente.",
        });
      }

      const livroCriado = await livro.create(livroCompleto);
      res
        .status(201)
        .json({ message: "criado com sucesso", livro: livroCriado });
    } catch (erro) {
      console.error(erro);

      res.status(500).json({
        message: `${erro.message} - falha ao cadastrar livro`,
      });
    }
  }

  static async atualizarLivro(req, res) {
    try {
      const id = req.params.id;
      const dadosAtualizados = montarLivroPayload(req.body);

      if (
        !dadosAtualizados.titulo ||
        !dadosAtualizados.editora ||
        dadosAtualizados.preco === null ||
        dadosAtualizados.paginas === null ||
        !dadosAtualizados.autor
      ) {
        return res.status(400).json({
          message:
            "Preencha titulo, editora, preco, paginas e autor corretamente.",
        });
      }

      await livro.findByIdAndUpdate(id, dadosAtualizados);
      res.status(200).json({ message: "Livro atualizado" });
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - falha na atualização do livro` });
    }
  }

  static async excluirLivro(req, res) {
    try {
      const id = req.params.id;
      await livro.findByIdAndDelete(id); // removi declaração variavel
      res.status(200).json({ message: "Livro excluido com sucesso" });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na exclusão` });
    }
  }

  static async listarLivrosPorEditora(req, res) {
    const editora = req.query.editora; //parametro que chega via rota
    try {
      const livrosPorEditora = await livro.find({ editora: editora });
      res.status(200).json(livrosPorEditora);
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na busca` });
    }
  }
}

export default LivroController;
