// src/components/MainMenu.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import '../styles/index.css';

const MainMenu = () => {
  const navigate = useNavigate();

  return (
    <div className="container main-menu">
      <h1>メインメニュー</h1>
      <div className="menu-items">
        <div className="menu-item" onClick={() => navigate("/child")}>
          <img src="/child.png" alt="こども" className="menu-img" />
          <p>貯金管理アプリ</p>
        </div>
        <div className="menu-item" onClick={() => navigate("/grandpa")}>
          <img src="/grandpa.png" alt="おじいちゃん" className="menu-img" />
          <p>資産管理アプリ</p>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
