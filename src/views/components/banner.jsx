function Banner(props) {
  return (
    <div className="banner">
      <div className="container">
        <span className="titleText"> {props.text}</span>
      </div>
    </div>
  );
}

export default Banner;
