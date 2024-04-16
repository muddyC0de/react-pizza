import React from "react";
import styles from "./NotFound.module.scss";

const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.notFoundText}>
      <span>😔</span>
      <br />
      <h1>Ничего не найдено</h1>
      <p>К сожалению данная страница отсутствует на нашем интернет-магазине</p>
    </div>
  );
};

export default NotFoundBlock;
