import { useEffect, useState } from "react";
import api from "../../services/api";
import "./Livros.css";
import Card from "../../components/Card/Card";

function Livros() {
  const [livros, setLivros] = useState([]);
  const [autores, setAutores] = useState([]);

  const [titulo, setTitulo] = useState("");
  const [editora, setEditora] = useState("");
  const [preco, setPreco] = useState("");
  const [paginas, setPaginas] = useState("");
  const [livroEditando, setLivroEditando] = useState(null);
  const [autor, setAutor] = useState("");

  const [idEdicao, setIdEdicao] = useState(null);

  const [mensagem, setMensagem] = useState("");

  async function buscarLivros() {
    try {
      const resposta = await api.get("/livros");

      setLivros(resposta.data);
    } catch (error) {
      console.log("Erro ao buscar livros:", error);

      setMensagem("Erro ao carregar livros.");
    }
  }

  async function buscarAutores() {
    try {
      const resposta = await api.get("/autores");

      setAutores(resposta.data);
    } catch (error) {
      console.log("Erro ao buscar autores:", error);

      setMensagem("Erro ao carregar autores.");
    }
  }

  function validarCampos() {
    if (
      titulo === "" ||
      editora === "" ||
      preco === "" ||
      paginas === "" ||
      autor === ""
    ) {
      setMensagem("Preencha todos os campos.");

      return false;
    }

    return true;
  }

  async function cadastrarLivro() {
    if (!validarCampos()) {
      return;
    }

    try {
      const novoLivro = {
        titulo,

        editora,

        preco: Number(preco),

        paginas: Number(paginas),

        autor,
      };

      await api.post("/livros", novoLivro);

      setMensagem("Livro cadastrado com sucesso!");

      limparFormulario();

      buscarLivros();
    } catch (error) {
      console.log("Erro ao cadastrar:", error);

      setMensagem("Erro ao cadastrar livro.");
    }
  }

  function editarLivro(livro) {
    setLivroEditando(livro);
  }

  async function salvarEdicao() {
    try {
      await api.put(`/livros/${livroEditando._id}`, livroEditando);

      alert("Livro atualizado!");

      setLivroEditando(null);

      buscarLivros();
    } catch (erro) {
      console.log(erro);
    }
  }

  async function atualizarLivro() {
    if (!validarCampos()) {
      return;
    }

    try {
      const livroAtualizado = {
        titulo,

        editora,

        preco: Number(preco),

        paginas: Number(paginas),

        autor,
      };

      await api.put(`/livros/${idEdicao}`, livroAtualizado);

      setMensagem("Livro atualizado com sucesso!");

      limparFormulario();

      buscarLivros();
    } catch (error) {
      console.log("Erro ao atualizar:", error);

      setMensagem("Erro ao atualizar livro.");
    }
  }

  async function excluirLivro(id) {
    try {
      await api.delete(`/livros/${id}`);

      alert("Livro excluído com sucesso!");

      buscarLivros();
    } catch (error) {
      console.log(error);

      alert("Erro ao excluir livro");
    }
  }

  function limparFormulario() {
    setTitulo("");

    setEditora("");

    setPreco("");

    setPaginas("");

    setAutor("");

    setIdEdicao(null);
  }

  useEffect(() => {
    async function carregarDados() {
      await buscarLivros();

      await buscarAutores();
    }

    carregarDados();
  }, []);

  return (
    <div>
      {mensagem && <p className="mensagem">{mensagem}</p>}

      {livroEditando && (
        <div className="form-edicao">
          <h2>Editando livro</h2>

          <input
            value={livroEditando.titulo}
            onChange={(e) =>
              setLivroEditando({
                ...livroEditando,
                titulo: e.target.value,
              })
            }
          />

          <input
            value={livroEditando.editora}
            onChange={(e) =>
              setLivroEditando({
                ...livroEditando,
                editora: e.target.value,
              })
            }
          />

          <input
            value={livroEditando.preco}
            onChange={(e) =>
              setLivroEditando({
                ...livroEditando,
                preco: e.target.value,
              })
            }
          />

          <input
            value={livroEditando.paginas}
            onChange={(e) =>
              setLivroEditando({
                ...livroEditando,
                paginas: e.target.value,
              })
            }
          />

          <button onClick={salvarEdicao}>Salvar</button>
        </div>
      )}

      <div className="formulario">
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />

        <input
          type="text"
          placeholder="Editora"
          value={editora}
          onChange={(e) => setEditora(e.target.value)}
        />

        <input
          type="number"
          placeholder="Preço"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
        />

        <input
          type="number"
          placeholder="Quantidade de páginas"
          value={paginas}
          onChange={(e) => setPaginas(e.target.value)}
        />

        <select value={autor} onChange={(e) => setAutor(e.target.value)}>
          <option value="">Selecione o autor</option>

          {autores.map((item) => (
            <option key={item._id} value={item._id}>
              {item.nome}
            </option>
          ))}
        </select>

        {idEdicao ? (
          <button onClick={atualizarLivro}>Atualizar livro</button>
        ) : (
          <button onClick={cadastrarLivro}>Cadastrar livro</button>
        )}
      </div>

      <div className="cards">
        {livros.map((livro) => (
          <Card
            key={livro._id}
            titulo={livro.titulo}
            editora={livro.editora}
            preco={livro.preco}
            paginas={livro.paginas}
            editar={() => editarLivro(livro)}
            excluir={() => excluirLivro(livro._id)}
          />
        ))}
      </div>
    </div>
  );
}

export default Livros;
