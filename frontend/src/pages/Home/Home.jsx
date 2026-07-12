import "./Home.css";
import Card from "../../components/Card/Card";

function Home() {
  return (
    <main className="home">

      <section className="hero">

        <h2>Bem-vinda ao Sistema da Biblioteca</h2>

        <p>
          Gerencie livros e autores de forma rápida e organizada.
        </p>

      </section>

      <section className="cards">

        <Card
          icone="📚"
          titulo="Livros"
          descricao="Cadastre, edite e exclua livros."
          botao="Acessar"
        />

        <Card
          icone="👤"
          titulo="Autores"
          descricao="Gerencie todos os autores."
          botao="Acessar"
        />

      </section>

    </main>
  );
}

export default Home;