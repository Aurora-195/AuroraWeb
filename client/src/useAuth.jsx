import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const [userId, setUserId] = useLocalStorage("userId", null);
  const [userLogin, setUserLogin] = useLocalStorage("userLogin", null);
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = async (data1, data2, data3) => {
    setUser(data1);
    setUserId(data2);
    setUserLogin(data3);
    navigate('/main');
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    setUserId(null);
    setUserLogin(null);
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      userId,
      userLogin,
      login,
      logout,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};