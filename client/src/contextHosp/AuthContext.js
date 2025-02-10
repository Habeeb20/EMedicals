import { createContext, useState, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = async (email, password) => {
    const res = await axios.post(`${import.meta.env.VITE_API}/api/hospital/login`, { email, password });
    setUser(res.data.user);
    setToken(res.data.token);
    localStorage.setItem("token", res.data.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
 

import axios from "axios";

const baseURL = "http://localhost:8000/api/hospital";

export const useUserActions = () => {
  const { token } = useAuth();

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchUsers = async () => {
    const res = await axios.get(`${baseURL}`, config);
    return res.data;
  };

  const addUser = async (userData) => {
    const res = await axios.post(`${baseURL}`, userData, config);
    return res.data;
  };

  const updateUser = async (id, userData) => {
    const res = await axios.put(`${baseURL}/${id}`, userData, config);
    return res.data;
  };

  const deleteUser = async (id) => {
    const res = await axios.delete(`${baseURL}/${id}`, config);
    return res.data;
  };

  return { fetchUsers, addUser, updateUser, deleteUser };
};
