import { createHashRouter, RouterProvider } from "react-router-dom";
import { observer } from "mobx-react-lite";
import Login from "./loginPresenter";
import Register from "./registerPresenter";
import Home from "./homePresenter";
import PokemonDetailsView from "../views/pokemonDetailsView";
import Test from "./testPresenter";
import Result from "./testResultPresenter";
import Start from "./startPresenter";
import History from "./historyPresenter";
import TopBar from "../views/components/topbar";
import React, { useEffect, useState } from "react";
import { AuthProvider } from "../model/authContext";
import { ChakraProvider } from "@chakra-ui/react";

export default observer(function ReactRoot(props) {
  const [notOnStartPage, setNotOnStartPage] = useState(window.location.hash!=="");
  useEffect(() => {
    const handleHashChange = () => {
      setNotOnStartPage(window.location.hash!=="");
      
    };
    window.addEventListener("hashchange", handleHashChange);
  }, []);
  function makeRouter(model) {
    return createHashRouter([
      { path: "/", element: <Start model={model} /> },
      { path: "/login", element: <Login model={model} /> },
      { path: "/register", element: <Register model={model} /> },
      { path: "/home", element: <Home model={model} /> },
      { path: "/test", element: <Test model={model} /> },
      { path: "/results", element: <Result model={model} /> },
      { path: "/history", element: <History model={model} /> },
      { path: "/pokemon/:name", element: <PokemonDetailsView model={model} /> }
    ]);
  }
  function App(props) {
    return (
        
            <AuthProvider>
              <ChakraProvider>
                <div>
                  {
                    notOnStartPage && (
                      <TopBar />
                    )
                  }
                  <RouterProvider router={makeRouter(props.model)} />
                </div>
              </ChakraProvider>
              
            </AuthProvider>
            
          );
  }
  return <App model={props.model}></App>;
});
