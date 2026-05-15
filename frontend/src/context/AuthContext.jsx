import {
  createContext,
  useState
} from "react";

export const AuthContext =
  createContext();

export const AuthProvider = ({
  children
}) => {

  const [user, setUser] =
    useState(null);

  const [token, setToken] =
    useState(
      localStorage.getItem("token")
    );

  const login = (tokenData) => {

    localStorage.setItem(
      "token",
      tokenData
    );

    setToken(tokenData);
  };

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    setToken(null);

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};