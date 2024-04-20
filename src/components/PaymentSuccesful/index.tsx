import React from "react";
import styles from "./PaymentSuccesful.module.scss";
const PaymentSuccessful: React.FC = () => {
  return (
    <div className={styles.root}>
      <h2>
        <img src="/img/checkmark.svg" alt="Галочка" />
      </h2>
      <p>Заказ успешно оплачен</p>
      <a href="/" className="button button--black">
        <span>Вернуться на главную страницу</span>
      </a>
    </div>
  );
};

export default PaymentSuccessful;
