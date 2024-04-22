import styles from "./Login.module.scss";
import SignIn from "../../components/SignIn";
import { setUser } from "../../redux/slices/userSlice";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import React from "react";
import { useAuth } from "../../hooks/useAuth";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth } = useAuth();

  React.useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, []);
  const handleLogin = (email: string, password: string) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password).then(({ user }) =>
      user.getIdToken().then((accessToken) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: accessToken,
          })
        );
      })
    );
    navigate("/");
  };
  return (
    <div className={styles.root}>
      <div className="content__title">Вход</div>
      <SignIn handleClick={handleLogin} />
    </div>
  );
};

export default Login;
