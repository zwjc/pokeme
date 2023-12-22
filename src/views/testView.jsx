import Banner from "./components/banner";
import TestItem from "./components/testItem";
import Icon1 from "../assets/images/avatar.png";
import Icon2 from "../assets/images/gaming.png";
import React from "react";
import { callChatGPT } from "../model/openai/GetPersonalityMatch";
import { Progress } from '@chakra-ui/react';
import questions from "../model/questions";
import "/src/style.css";

function TestView(props) {

  return (
    <div>
      <Banner text="Test" />
      <div className="progress-container">
        <div style={{width: "fit-content", fontSize:"1.5vw"}}>{props.progress}%</div>
        <Progress hasStripe colorScheme='blue' size='md' value={props.progress} />
      </div>
      <div className="questionContainer">
        {questions.map((question, index) => {
          const isAnswered = props.selections[index] != null;
          return (
            <div key={question.id} ref={props.questionRefs.current[index]}>
              <TestItem
                id={"test-" + index}
                text={question.question}
                onSelect={(value) => props.handleSelect(index, value)}
                selectedValue={props.selections[index]}
                isAnswered={isAnswered}
              />
              {index !== questions.length - 1 && <hr className="separator-line" />}
            </div>
          );
        })}
      </div>
      <div className="flextRowParent">
        <button className="button_2" onClick={props.toTop}>
          <img
            src={Icon1}
            alt="Review Choices"
            style={{
              width: "auto",
              height: "auto",
              maxWidth: "5vw",
              maxHeight: "5vh",
            }}
          />
          <div style={{ fontSize: "2.5vh" }}>Review Choices</div>
        </button>
        <button
          className="button_2"
          onClick={() => {
            props.handleSubmitTest();
          }}
        >
          <img
            src={Icon2}
            alt="Submit Now!"
            style={{
              width: "auto",
              height: "auto",
              maxWidth: "5vw",
              maxHeight: "5vh",
            }}
          />
          <div style={{ fontSize: "2.5vh" }}>Submit Now!</div>
        </button>
      </div>
    </div>
  );
}

export default TestView;
