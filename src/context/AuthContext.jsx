import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUsers, createUser, initDb } from '../db';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      await initDb();
      const list = await getUsers();
      setUsersList(list);
      setLoading(false);
    };
    loadUsers();
  }, []);

  const login = (selectedUser) => {
    setUser(selectedUser);
  };

  const logout = () => {
    setUser(null);
  };

  const registerAdmin = async (name) => {
    try {
      const newUser = await createUser(name, 'Admin');
      setUsersList([...usersList, newUser]);
      setUser(newUser);
    } catch (error) {
      console.error("Error al registrar administrador:", error);
      alert(error.message);
    }
  };

  const reloadUsers = async () => {
    const list = await getUsers();
    setUsersList(list);
  };

  return (
    <AuthContext.Provider value={{ user, usersList, login, logout, registerAdmin, reloadUsers, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
