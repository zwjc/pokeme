import HomeView from "../views/homeView";
import React, { useState, useContext } from "react";
import { AuthContext } from "../model/authContext";
import { useNavigate } from 'react-router-dom';
import { observer } from "mobx-react-lite";''
import promiseNoDataView from "../views/promiseNoData.jsx";

export default
observer(             // needed for the presenter to update (its view) when relevant parts of the model change
    function Home(props){

        const { currentUser } = useContext(AuthContext);
        const navigate = useNavigate();

        const goToPokemonInfo = (pokemonName) => {
            navigate(`/pokemon/${pokemonName.toLowerCase()}`);
          };

        const goToTest = () => {
            window.location.hash = "#/test";
            console.log("Navigate to the test page");
        };

        return <HomeView 
                goToPokemonInfo={goToPokemonInfo} 
                goToTest={goToTest}
               />;
    }
);


