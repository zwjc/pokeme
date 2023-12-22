import React, { useState, useContext, useEffect } from "react";
import Alert from "../views/components/alert.jsx";
import { callChatGPT } from "../model/openai/GetPersonalityMatch";
import { useLocation } from 'react-router-dom'; //
import { AuthContext } from "../model/authContext";
import TestResultsView from "../views/testResultsView";
import { saveResultToHistory } from "../model/firebaseModel";
import { observer } from "mobx-react-lite";


export default
observer(             // needed for the presenter to update (its view) when relevant parts of the model change
    function TestResult(props){
        const location = useLocation();
        const { openAIResponse } = location.state || {};
        const { currentUser } = useContext(AuthContext);
        const [testResult, setTestResult] = useState(null); 
        const [alertMessage, setAlertMessage] = useState("");
        const [showAlert, setShowAlert] = useState(false);

        
        useEffect(() => {
            if (openAIResponse) {
              setTestResult(openAIResponse);
            }
          }, [location, openAIResponse]);
        

        const handleTryAgain = () => {
            window.location.hash = "#/test"; 
            document.documentElement.scrollIntoView({
                behavior:'smooth'
              })
            console.log("Try Again clicked");
        };
  
 
        const handleSaveResult = () => {
          if (testResult && currentUser) {
            saveResultToHistory(currentUser.uid, testResult)
              .then(() => {
                console.log("Saved to history:", testResult);
                setAlertMessage("Your result has been saved successfully!");
                setShowAlert(true);
                setTimeout(() => {
                  setShowAlert(false);
                }, 2000); 
              })
              .catch((error) => {
                console.error("Error saving to history:", error);
                setAlertMessage("Error saving result. Please try again.");
                setShowAlert(true);
                setTimeout(() => {
                  setShowAlert(false);
                }, 2000);
              });
          }
        };
        
      
    
        const handleShare = () => {
            window.open(
            "https://www.facebook.com/sharer/sharer.php?u=" +
                "https://pokeme-dh2642.web.app",
            "_blank"
            );
        };

        return (
          <>
            {showAlert && <Alert message={alertMessage} />}
            <TestResultsView 
              handleTryAgain={handleTryAgain} 
              handleSaveResult={handleSaveResult} 
              testResult={testResult}
              handleShare={handleShare} 
            />
          </>
        );
      });