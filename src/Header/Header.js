import React from "react";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer} `}>
        <div>Buscar por Streamer/Titulo</div>
        <div>Ordernar por</div>
      </div>
    </header>
  );
};

export default Header;
