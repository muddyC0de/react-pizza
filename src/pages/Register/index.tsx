import SignUp from "../../components/SignUp";
import styles from "./Register.module.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setUser } from "../../redux/slices/userSlice";
const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleRegister = (email: string, password: string) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password).then(({ user }) =>
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
      <div className="content__title">Регистрация</div>
      <SignUp handleClick={handleRegister} />
    </div>
  );
};

export default Register;
