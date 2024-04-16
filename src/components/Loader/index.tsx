import React from "react";
import styles from "./Loader.module.scss";
export const Loader: React.FC = () => {
  return (
    <div className={styles.pizzaLoader}>
      <img src="/img/loader.gif" alt="Loading..." />
    </div>
  );
};
