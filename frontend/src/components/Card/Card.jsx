import "./Card.css";

function Card({ titulo, editora, preco, paginas, editar, excluir }) {

    return (

        <div className="card">

            <h2>{titulo}</h2>

            <p>Editora: {editora}</p>

            <p>Preço: R$ {preco}</p>

            <p>Páginas: {paginas}</p>

            <button onClick={editar}>
        Editar
    </button>

    <button onClick={excluir}>
        Excluir
    </button>

        </div>
        

    );


    
  }

  
export default Card;