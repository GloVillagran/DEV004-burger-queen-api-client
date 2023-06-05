import { createContext, useState } from 'react';

//Almacenamiento del token de autenticación
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const login = (data) => {
    console.log(data)
    setToken(data.accessToken);
    setUser(data.user);
    console.log(token)
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, user }}>
      {children}
      
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };