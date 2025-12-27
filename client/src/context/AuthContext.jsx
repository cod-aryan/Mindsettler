import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:4000/api' });

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await API.get('/user/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data.user); // Now you have the role!
      } catch (err) {
        console.error("Error fetching user data:", err); // Debugging line to check for errors
        // localStorage.remo veItem('token');
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