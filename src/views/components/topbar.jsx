import pikachu from "../../assets/images/pikachu.png";
import menu from "../../assets/images/menu-burger.png";
import React, { useEffect, useState } from "react";

const goBack = () => {
  window.location.hash = "#/home";
};

function TopBar() {
  const [notOnLoginPage, setNotOnLoginPage] = useState(window.location.hash!==""&&window.location.hash!=="#"&&window.location.hash!=="#/login");
  const [notOnRegisterPage, setNotOnRegisterPage] = useState(window.location.hash!=="#/register");

  useEffect(() => {
    const handleHashChange = () => {
      console.log(window.location.hash)
      setNotOnLoginPage(window.location.hash!==""&&window.location.hash!=="#"&&window.location.hash!=="#/login");
      setNotOnRegisterPage(window.location.hash!=="#/register");
      
    };

    window.addEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <div className="topbar">
      {notOnLoginPage && notOnRegisterPage && (
        <>
          <div className="topbarIcon" onClick={goBack}>
            <img src={pikachu} className="img_1" />
            <div className="iconText">PokéMe</div>
          </div>
          <div className="container2">
            <div className="dropdown">
              <button className="dropbtn">
                <img src={menu} className="menu" />
              </button>
              <div className="dropdown-content">
                <a href="#history">History</a>
                <a href="#">Logout</a>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default TopBar;
