import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  let initialUser = null;
  let initialToken = '';

  try {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    initialUser = storedUser ? JSON.parse(storedUser) : null;
    initialToken = storedToken || '';
  } catch (error) {
    console.error('Error parsing auth data from localStorage:', error);
    initialUser = null;
    initialToken = '';
  }

  const [user, setUser] = useState(initialUser);
  const [token, setToken] = useState(initialToken);
  const [isLoggedIn, setIsLoggedIn] = useState(!!initialUser);

  const login = (data) => {
    try {
      if (!data || !data.token || !data.user) {
        throw new Error('Invalid login response data');
      }

      const { token: newToken, user: userData } = data;

      // Normalize user data
      const normalizedUser = {
        _id: userData.id || userData._id,
        name: userData.name,
        email: userData.email,
        role: userData.role || 'user'
      };

      // Store auth data
      localStorage.setItem('user', JSON.stringify(normalizedUser));
      localStorage.setItem('token', newToken);

      setUser(normalizedUser);
      setToken(newToken);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setUser(null);
      setToken('');
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const isAuthenticated = () => {
    return !!token && !!user;
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        token, 
        isLoggedIn, 
        login, 
        logout,
        isAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
