import React from "react";
import { UserContext } from "../UseContext";
import styles from "./Find.module.css";

const Find = () => {
  const { streams, setfiltersStreams } = React.useContext(UserContext);

  function handleChange(texto) {
    let filterArray = streams.filter((el) => {
      return el.user_name.toLowerCase().includes(texto.toLowerCase());
    });
    setfiltersStreams(filterArray);
  }
  return (
    <div>
      <input
        type="text"
        onChange={({ target }) => handleChange(target.value)}
        placeholder="Pesquisar por nome"
        className={styles.finder}
      />
    </div>
  );
};

export default Find;
