import React from "react";
import { UserContext } from "../UseContext";
import styles from "./OrderBy.module.css";

const OrderBy = () => {
  const { setOrder } = React.useContext(UserContext);
  return (
    <div>
      <span>Ordenar por: </span>
      <button
        onClick={() => {
          setOrder("viewers");
        }}
        className={styles.btn}
      >
        Viewer
      </button>
      <button
        onClick={() => {
          setOrder("nome");
        }}
        className={styles.btn}
      >
        Titulo
      </button>
      <button
        onClick={() => {
          setOrder("tempo");
        }}
        className={styles.btn}
      >
        Duração
      </button>
    </div>
  );
};

export default OrderBy;
