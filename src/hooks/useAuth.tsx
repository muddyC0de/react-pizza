import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const useAuth = () => {
  const { email, token, id } = useSelector(
    (state: RootState) => state.userSlice
  );

  return {
    isAuth: !!email,
    email,
    token,
    id,
  };
};
