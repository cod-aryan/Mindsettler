import { createContext, useState, useEffect, useContext } from 'react';
import API from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await API.get('/user/me');
        setUser(res.data.user); // Now you have the role!
      } catch (err) {
        console.error("Error fetching user data:", err); // Debugging line to check for errors
      }
      setLoading(false);
    };
    checkUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);