import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../model/authContext.jsx";
import Alert from "../views/components/alert.jsx";
import TestView from "../views/testView.jsx";
import questions from "../model/questions";
import { saveToFirebase, readFromFirebase } from "../model/firebaseModel.js";
import { callChatGPT } from "../model/openai/GetPersonalityMatch";
import "/src/style.css";
import { observer } from "mobx-react-lite";
import _get_window_height from "../utilities";
import { response } from "msw";


export default observer(function Test(props) {
  const { currentUser } = useContext(AuthContext);
  const [selections, setSelections] = useState({});
  const [openAIResponse, setOpenAIResponse] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate(); 
  const questionRefs = useRef(questions.map(() => React.createRef()));
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (currentUser) {
      readFromFirebase(currentUser.uid, (savedState) => {
        if (savedState) {
          setSelections(savedState);
          console.log("savedState:" + savedState);
          console.log("selections: "+ Object.keys(savedState).length);
          setProgress(Object.keys(savedState).length*5);
        }
      });
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser && Object.keys(selections).length > 0) {
      setProgress(Object.keys(selections).length*5);
      saveToFirebase(currentUser.uid, selections);
    }
  }, [selections, currentUser]);

  const formatResponsesForOpenAI = () => {
    return Object.entries(selections)
      .map(([questionId, answer]) => {
        const matchingQuestion = questions.find(q => q.id === parseInt(questionId));
        if (!matchingQuestion) {
          console.error(`Question with ID ${questionId} not found`);
          return `Question ID: ${questionId}, Answer: ${answer}`;
        }
        return `Question: ${matchingQuestion.question}, Answer: ${answer}`;
      })
      .join('\n');
  };

  const handleSubmitTest = async () => {
    const unansweredIndex = questions.findIndex((_, index) => !selections[index]);
    
    if (unansweredIndex !== -1) {
      questionRefs.current[unansweredIndex].current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      setAlertMessage('Please answer all questions before submitting.');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000); 
      return; 
    }
    
    setAlertMessage('Submitting your answers, please wait for the result...');
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000); 
    
    const formattedResponses = formatResponsesForOpenAI();
    try {
      const parsedResponse = await callChatGPT(formattedResponses);
      setOpenAIResponse(parsedResponse);
      setSelections({});
      await saveToFirebase(currentUser.uid, {});
      navigate('/results', { state: { openAIResponse: parsedResponse } });
    } catch (error) {
      console.error("Error in submitting test:", error);
      setAlertMessage('Error during submission, please try again.');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000); 
    }
  };
  
  function goToResults() {
    window.location.hash = "#/results";
  }

  function toTop() {
    document.documentElement.scrollIntoView({
      behavior:'smooth'
    })
  }

  const handleSelect = (index, value) => {
    setSelections((prevSelections) => {
      const updatedSelections = { ...prevSelections };
      if (updatedSelections[index] === value) {
        delete updatedSelections[index];
        setProgress(progress-5); 
      } else {
        if(updatedSelections[index]==='') setProgress(progress+5) 
        updatedSelections[index] = value;
      console.log(progress)
      }
  
      saveToFirebase(currentUser.uid, updatedSelections);
  
      setTimeout(() => {
        const nextQuestionIndex = Object.keys(updatedSelections).length;
        if (nextQuestionIndex < questions.length && questionRefs.current[nextQuestionIndex]) {
          const nextQuestionEl = questionRefs.current[nextQuestionIndex].current;
          if (nextQuestionEl) {
            nextQuestionEl.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            });
          }
        }
      }, 0);
  
      return updatedSelections;
    });
  };  

  questionRefs.current = questions.map((_, i) => questionRefs.current[i] ?? React.createRef());

  return (
    <>
      {showAlert && <Alert message={alertMessage} />}
      <TestView
            handleSelect={handleSelect}
            formatResponses={formatResponsesForOpenAI}
            openAIResponse={openAIResponse}
            handleSubmitTest={handleSubmitTest}
            goToResults={goToResults}
            toTop={toTop}
            selections={selections}
            questionRefs={questionRefs}
            progress={progress}
        />;
    </>
  );
  }
);