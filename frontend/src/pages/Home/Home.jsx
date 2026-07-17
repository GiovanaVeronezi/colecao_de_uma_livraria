import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="home">
      <section className="home__hero">
        <p className="home__eyebrow">Biblioteca Virtual</p>
        <h1>Uma experiência clara, elegante e fácil de usar.</h1>
        <p className="home__text">
          Organize seus livros permitindo que consiga criar, alterar e
          excluí-los a hora que quiser.
        </p>

        <div className="home__actions">
          <Link className="home__button home__button--primary" to="/livros">
            Ver livros
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Home;
