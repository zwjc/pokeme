import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { auth } from "../model/firebaseModel";
import { createUserWithEmailAndPassword } from "firebase/auth";
import RegisterView from "../views/registerView";
import Alert from "../views/components/alert.jsx";


const RegisterPresenter = observer(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAlert, setShowAlert] = useState(false);


  const formatErrorMessage = (error) => {
    switch (error.code) {
      case "auth/email-already-in-use":
        return "This email is already in use. Please login or use a different email.";
      case "auth/invalid-email":
        return "The email address is invalid. Please enter a valid email.";
      case "auth/operation-not-allowed":
        return "Registration is currently not allowed. Please try again later.";
      case "auth/weak-password":
        return "The password is too weak. Please enter a stronger password.";
      default:
        return "An unexpected error occurred. Please try again.";
    }
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setIsProcessing(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setShowAlert(true); 
      setTimeout(() => {
        window.location.hash = "#/login";
      }, 2500);
    } catch (error) {
      setError(formatErrorMessage(error));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      {showAlert && (
        <Alert 
          message="Registration successful! Redirecting to login..." 
        />
      )}
      <RegisterView
      setEmail={setEmail}
      setPassword={setPassword}
      setConfirmPassword={setConfirmPassword}
      handleRegister={handleRegister}
      error={error}
      isProcessing={isProcessing}
    />
    </>
  );
});

export default RegisterPresenter;
