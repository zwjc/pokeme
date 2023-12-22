function PokeItem(props) {
  return (
    <div className="card">
      <img
        className="card__img"
        src={props.image}
        onClick={() => props.goToPokemonInfo(props.name)}
        alt=""
      ></img>
      <div>
        <span className="card__footer">
          <span>{props.name}</span>
        </span>
      </div>
    </div>
  );
}

export default PokeItem;
