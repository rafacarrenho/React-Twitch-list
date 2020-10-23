import React from "react";
import Find from "./Find";
import styles from "./Header.module.css";
import OrderBy from "./OrderBy";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer} `}>
        <Find></Find>
        <OrderBy></OrderBy>
      </div>
    </header>
  );
};

export default Header;
