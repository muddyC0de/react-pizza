import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import styles from "./SignUp.module.scss";
import { Link } from "react-router-dom";
type RegisterProps = {
  handleClick: (email: string, password: string) => void;
};
const SignUp: React.FC<RegisterProps> = ({ handleClick }) => {
  const [emailValue, setEmailValue] = React.useState("");
  const [passwordValue, setPasswordValue] = React.useState("");
  const navigate = useNavigate();
  const { isAuth } = useAuth();

  React.useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, []);
  return (
    <div className={styles.root}>
      <div className={styles.inpContainer}>
        {" "}
        <input
          onInput={(event) => setEmailValue(event.currentTarget.value)}
          placeholder="Email"
          type="text"
        />
        <img src="/img/email.svg" alt="" />
      </div>
      <div className={styles.inpContainer}>
        {" "}
        <input
          onInput={(event) => setPasswordValue(event.currentTarget.value)}
          placeholder="Пароль"
          type="password"
        />
        <img src="/img/password.svg" alt="" />
      </div>
      <p>
        Уже есть аккаунт?{" "}
        <Link to="/login">
          <span className={styles.orange}>Войти</span>
        </Link>
      </p>
      <div className={styles.buttonsContainer}>
        <a className="button button--outline button--add go-back-btn" href="/">
          <svg
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 13L1 6.93015L6.86175 1"
              stroke="#D3D3D3"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <span>Вернуться назад</span>
        </a>
        <div
          onClick={() => handleClick(emailValue, passwordValue)}
          className="button pay-btn"
        >
          <span>Зарегистрироваться</span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
