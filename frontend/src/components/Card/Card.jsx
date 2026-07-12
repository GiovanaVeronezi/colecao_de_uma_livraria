import "./Card.css";

function Card(props) {
  return (
    <div className="card">

      <h2>{props.icone}</h2>

      <h3>{props.titulo}</h3>

      <p>{props.descricao}</p>

      <button>{props.botao}</button>

    </div>
  );
}

export default Card;