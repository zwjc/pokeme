function InputForm(props) {
  return (
    <div className="flextRowParent">
      <div className="normalText">{props.text}</div>
      <input
        className="inputForm"
        type={props.type}
        onChange={props.onChange}
        value={props.value}
      />
    </div>
  );
}

export default InputForm;
