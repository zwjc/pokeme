import React, { useState, useContext } from "react";
import { AuthContext } from "../model/authContext";
import { observer } from "mobx-react-lite";
import { auth } from "../model/firebaseModel";
import { signInWithEmailAndPassword } from "firebase/auth";
import LoginView from "../views/loginView";


const LoginPresenter = observer(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function goHome() {
    window.location.hash = "#/home";
  }

  const formatErrorMessage = (error) => {
    switch (error.code) {
      case "auth/invalid-email":
      case "auth/user-not-found":
      case "auth/wrong-password":
        return "Incorrect username or password. Please try again.";
      case "auth/too-many-requests":
        return "Too many attempts. Please try again later.";
      default:
        return "Incorrect username or password. Please try again.";
    }
  };

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Logged in user:", userCredential.user);
      goHome();
    } catch (error) {
      setError(formatErrorMessage(error));
      console.error("Login error:", error);
    }
  };

  return (
    <LoginView
      setEmail={setEmail}
      setPassword={setPassword}
      handleLogin={handleLogin}
      formatErrorMessage={formatErrorMessage}
      error={error}
    />
  );
});

export default LoginPresenter;
