import InputForm from "./components/inputform";
import Banner from "./components/banner";
import PikachuHello from "../assets/images/pikachuhello.gif";
import "/src/style.css";

function LoginView(props) {
  return (
    <div className="login-view-container">
      <Banner text="Login to Test!" />

      <div className="input-group">
        <label htmlFor="email" className="input-label">Email</label>
        <InputForm
          id="email"
          type="text"
          onChange={(e) => props.setEmail(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label htmlFor="password" className="input-label">Password</label>
        <InputForm
          id="password"
          type="password"
          onChange={(e) => props.setPassword(e.target.value)}
        />
      </div>

      {props.error && (
        <div className="error-message">
          <img
            className="error-message-icon"
            src="https://cdn-icons-png.flaticon.com/128/9647/9647409.png"
            alt="Error"
          />
          {props.error}
        </div>
      )}

      <div className="login-pikachu">
        <img src={PikachuHello} alt="pikachu hello" />
      </div>

      <div className="flextRowParent">
        <button className="button_1" onClick={props.handleLogin}>
          Login
        </button>
      </div>

      <div className="columnContainer">
        <div className="normalText">
          Don't have an account yet? <a href="#/register">Register Here!</a>
        </div>
      </div>
    </div>
  );
}

export default LoginView;