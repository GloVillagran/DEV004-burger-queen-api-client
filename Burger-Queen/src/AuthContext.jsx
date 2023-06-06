import { createContext, useState, useEffect } from 'react';

//Almacenamiento del token de autenticación
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const login = (data) => {
    console.log(data)
    setToken(data.accessToken);
    setUser(data.user);
    console.log(token)
    localStorage.setItem('token', data.accessToken); // Guardar el token en el local storage
    
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token'); // Eliminar el token del local storage al hacer logout
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, user }}>
      {children}
      
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };