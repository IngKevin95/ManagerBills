import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUserTheme, updateUserTheme } from '../db';
import { useAuth } from './AuthContext';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      getUserTheme(user.id).then(t => setTheme(t));
    }
  }, [user]);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = async () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    if (user) {
      await updateUserTheme(user.id, newTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
