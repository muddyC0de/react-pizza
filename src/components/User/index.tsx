import React from "react";
import styles from "./User.module.scss";
import { Link } from "react-router-dom";

const User: React.FC = () => {
  return (
    <div className={styles.popup}>
      <ul>
        <Link to={"/history"}>
          <li>
            <img src="/img/history.svg" alt="" /> История заказов
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default User;
