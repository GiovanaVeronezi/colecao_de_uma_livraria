import { useEffect, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Container,
  Form,
  Modal,
  Spinner,
  Table,
} from "react-bootstrap";
import api from "../../services/api";
import "./Livros.css";

const formVazio = {
  titulo: "",
  editora: "",
  preco: Number,
  paginas: "",
  autor: Number,
};

function formatarPreco(valor) {
  const numero = Number(valor);

  if (Number.isNaN(numero)) {
    return "R$ 0,00";
  }

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(numero);
}

function normalizarNumero(valor) {
  if (typeof valor === "number") {
    return Number.isFinite(valor) ? valor : null;
  }

  const convertido = Number(String(valor).replace(",", "."));
  return Number.isFinite(convertido) ? convertido : null;
}

function obterAutorLivro(livro) {
  return livro?.autor || "Autor não informado";
}

function LivroModal({
  show,
  title,
  submitLabel,
  form,
  setForm,
  onHide,
  onSubmit,
}) {
  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form
          className="livros-form"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <Form.Group>
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              value={form.titulo}
              onChange={(e) =>
                setForm((atual) => ({ ...atual, titulo: e.target.value }))
              }
              placeholder="Ex.: O Senhor dos Anéis"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Editora</Form.Label>
            <Form.Control
              type="text"
              value={form.editora}
              onChange={(e) =>
                setForm((atual) => ({ ...atual, editora: e.target.value }))
              }
              placeholder="Ex.: Martins Fontes"
            />
          </Form.Group>

          <div className="livros-form__grid">
            <Form.Group>
              <Form.Label>Preço</Form.Label>
              <Form.Control
                type="number"
                min="0"
                step="0.01"
                value={form.preco}
                onChange={(e) =>
                  setForm((atual) => ({ ...atual, preco: e.target.value }))
                }
                placeholder="0,00"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Páginas</Form.Label>
              <Form.Control
                type="number"
                min="1"
                value={form.paginas}
                onChange={(e) =>
                  setForm((atual) => ({ ...atual, paginas: e.target.value }))
                }
                placeholder="Ex.: 320"
              />
            </Form.Group>
          </div>

          <Form.Group>
            <Form.Label>Autor</Form.Label>
            <Form.Control
              type="text"
              value={form.autor}
              onChange={(e) =>
                setForm((atual) => ({ ...atual, autor: e.target.value }))
              }
              placeholder="Ex.: Machado de Assis"
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline-secondary" type="button" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="primary" type="button" onClick={onSubmit}>
          {submitLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function Livros() {
  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alerta, setAlerta] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [livroSelecionado, setLivroSelecionado] = useState(null);
  const [form, setForm] = useState(formVazio);

  async function carregarLivros() {
    const resposta = await api.get("/livros");
    setLivros(resposta.data);
  }

  function abrirModalNovo() {
    setLivroSelecionado(null);
    setForm({ ...formVazio });
    setShowCreateModal(true);
  }

  function abrirModalEdicao(livro) {
    setLivroSelecionado(livro);
    setForm({
      titulo: livro.titulo || "",
      editora: livro.editora || "",
      preco: livro.preco?.toString() || "",
      paginas: livro.paginas?.toString() || "",
      autor: livro.autor || "",
    });
    setShowEditModal(true);
  }

  function fecharModais() {
    setShowCreateModal(false);
    setShowEditModal(false);
    setLivroSelecionado(null);
    setForm({ ...formVazio });
  }

  function validarFormulario() {
    const preco = normalizarNumero(form.preco);
    const paginas = normalizarNumero(form.paginas);

    if (
      !form.titulo.trim() ||
      !form.editora.trim() ||
      preco === null ||
      paginas === null ||
      !form.autor.trim()
    ) {
      setAlerta({
        variant: "warning",
        text: "Preencha todos os campos antes de salvar.",
      });
      return false;
    }

    return true;
  }

  async function salvarNovoLivro() {
    if (!validarFormulario()) {
      return;
    }

    try {
      await api.post("/livros", {
        titulo: form.titulo.trim(),
        editora: form.editora.trim(),
        preco: normalizarNumero(form.preco),
        paginas: normalizarNumero(form.paginas),
        autor: form.autor.trim(),
      });

      setAlerta({
        variant: "success",
        text: "Livro cadastrado com sucesso.",
      });
      fecharModais();
      await carregarLivros();
    } catch (error) {
      console.error("Erro ao cadastrar livro:", error);
      setAlerta({
        variant: "danger",
        text: error.response?.data?.message || "Erro ao cadastrar o livro.",
      });
    }
  }

  async function salvarEdicao() {
    if (!validarFormulario() || !livroSelecionado?._id) {
      return;
    }

    try {
      await api.put(`/livros/${livroSelecionado._id}`, {
        titulo: form.titulo.trim(),
        editora: form.editora.trim(),
        preco: normalizarNumero(form.preco),
        paginas: normalizarNumero(form.paginas),
        autor: form.autor.trim(),
      });

      setAlerta({
        variant: "success",
        text: "Livro atualizado com sucesso.",
      });
      fecharModais();
      await carregarLivros();
    } catch (error) {
      console.error("Erro ao atualizar livro:", error);
      setAlerta({
        variant: "danger",
        text: error.response?.data?.message || "Erro ao atualizar o livro.",
      });
    }
  }

  async function excluirLivro(id) {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este livro?",
    );

    if (!confirmar) {
      return;
    }

    try {
      await api.delete(`/livros/${id}`);
      setAlerta({
        variant: "success",
        text: "Livro excluído com sucesso.",
      });
      await carregarLivros();
    } catch (error) {
      console.error("Erro ao excluir livro:", error);
      setAlerta({
        variant: "danger",
        text: error.response?.data?.message || "Erro ao excluir o livro.",
      });
    }
  }

  useEffect(() => {
    let cancelado = false;

    async function iniciarTela() {
      setLoading(true);
      setAlerta(null);

      try {
        const livrosResposta = await api.get("/livros");

        if (cancelado) {
          return;
        }

        setLivros(livrosResposta.data);
      } catch (error) {
        if (!cancelado) {
          console.error("Erro ao carregar dados:", error);
          setAlerta({
            variant: "danger",
            text: "Não foi possível carregar os livros agora.",
          });
        }
      } finally {
        if (!cancelado) {
          setLoading(false);
        }
      }
    }

    void iniciarTela();

    return () => {
      cancelado = true;
    };
  }, []);

  return (
    <Container className="livros-page">
      <section className="livros-hero">
        <div>
          <p className="livros-hero__eyebrow">Acervo</p>
          <h1>Livros cadastrados</h1>
          <p>
            A tela abaixo mostra apenas os livros já existentes. Criação e
            edição acontecem em modais, deixando a navegação mais limpa.
          </p>
        </div>

        <Button
          variant="primary"
          className="livros-hero__button"
          onClick={abrirModalNovo}
        >
          Novo livro
        </Button>
      </section>

      {alerta && (
        <Alert variant={alerta.variant} className="mt-4">
          {alerta.text}
        </Alert>
      )}

      <section className="livros-card">
        <div className="f4d6fc">
          <div>
            <h2>Lista de livros</h2>
            <p>Use os botões de ação para editar ou excluir cada registro.</p>
          </div>

          <Badge bg="secondary" pill>
            {livros.length} livro(s)
          </Badge>
        </div>

        {loading ? (
          <div className="livros-state">
            <Spinner animation="border" role="status" />
            <span>Carregando livros...</span>
          </div>
        ) : livros.length === 0 ? (
          <div className="livros-state livros-state--empty">
            <h3>Nenhum livro cadastrado</h3>
            <p>Crie o primeiro livro usando o botão "Novo livro".</p>
          </div>
        ) : (
          <div className="livros-table-wrap">
            <Table responsive hover className="livros-table" striped>
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Autor</th>
                  <th>Editora</th>
                  <th>Preço</th>
                  <th>Páginas</th>
                  <th className="text-end">Ações</th>
                </tr>
              </thead>
              <tbody>
                {livros.map((livro) => (
                  <tr key={livro._id}>
                    <td>{livro.titulo}</td>
                    <td>{obterAutorLivro(livro)}</td>
                    <td>{livro.editora || "-"}</td>
                    <td>{formatarPreco(livro.preco)}</td>
                    <td>{livro.paginas || "-"}</td>
                    <td>
                      <div className="livros-actions">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => abrirModalEdicao(livro)}
                        >
                          Editar
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => excluirLivro(livro._id)}
                        >
                          Excluir
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </section>

      <LivroModal
        show={showCreateModal}
        title="Cadastrar livro"
        submitLabel="Cadastrar"
        form={form}
        setForm={setForm}
        onHide={fecharModais}
        onSubmit={salvarNovoLivro}
      />

      <LivroModal
        show={showEditModal}
        title="Editar livro"
        submitLabel="Salvar alterações"
        form={form}
        setForm={setForm}
        onHide={fecharModais}
        onSubmit={salvarEdicao}
      />
    </Container>
  );
}

export default Livros;
