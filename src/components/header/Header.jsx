import React, { useState, useEffect } from "react";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/netflix-flogo.png";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState(""); 
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0,0);
  }, [location])
  

  const controlNavbar = () => {
    if (window.scrollY > 352) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide")
      }
      else {
        setShow("show")
      }
   }
    else{
      setShow("top")
    }
    setLastScrollY(window.scrollY);
  }

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar)
    return () => {
      window.removeEventListener('scroll', controlNavbar)
    }
  }, [lastScrollY])


  const openMobileMenu = () => {
    setMobileMenu(true)
  }

  const navigationHandeler = (type) => {
    if (type === "movie") {
      navigate("/explore/movie");
    }
    else {
      navigate("/explore/tv");
    }
    setMobileMenu(false);
  }

  return (
    < header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`} >
      <ContentWrapper>

        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={() =>
            navigationHandeler("movie")}>Movies</li>
          <li className="menuItem" onClick={() =>
            navigationHandeler("tv")}>TV Shows</li>
        </ul>

        <div className="mobileMenuItems">
          {mobileMenu ? (
            <VscChromeClose
              onClick={() => {
                setMobileMenu(false)
              }} />
          ) : (
            <SlMenu
              onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrapper>
    </header >
  );
};

export default Header;