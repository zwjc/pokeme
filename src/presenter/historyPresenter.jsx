import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../model/authContext";
import { readHistoryFromFirebase } from "../model/firebaseModel";
import HistoryView from "../views/historyView";
import { observer } from "mobx-react-lite";

const History = observer(() => {
    const { currentUser } = useContext(AuthContext);
    const [history, setHistory] = useState([]);
  
    useEffect(() => {
        if (currentUser) {
          readHistoryFromFirebase(currentUser.uid, (historyData) => {
            console.log(historyData); 
            setHistory(historyData || []); 
          });
        }
    }, [currentUser]);
  
      
    function formatDate(dateString) {
        const dateOptions = { year: "numeric", month: "long", day: "numeric" };
        const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
        
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString(undefined, dateOptions);
        const formattedTime = date.toLocaleTimeString(undefined, timeOptions);
        
        return `${formattedDate} at ${formattedTime}`;
    }

    function goToTest() {
        window.location.hash = "#/test";
    }

    function goHome() {
    window.location.hash = "#/home";
    }
  
    return (
      <HistoryView 
        history={history} 
        formatDate={formatDate} 
        goHome={goHome}
        goToTest={goToTest}
      />
    );
  });
  
  export default History;

