import React from "react";
import { UserContext } from "../UseContext";
import styles from "./Find.module.css";

const Find = () => {
  const { filter, setFilter } = React.useContext(UserContext);

  return (
    <div>
      <input
        type="text"
        value={filter}
        onChange={({ target }) => setFilter(target.value)}
        placeholder="Pesquisar por nome"
        className={styles.finder}
      />
    </div>
  );
};

export default Find;
