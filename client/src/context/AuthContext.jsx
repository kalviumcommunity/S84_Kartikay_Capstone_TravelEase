import { createContext, useContext, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem('token') || '';
    } catch (error) {
      console.error('Error getting token from localStorage:', error);
      return '';
    }
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => !!user);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (data) => {
    try {
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    try {
      setIsLoading(true);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setUser(null);
      setToken('');
      setIsLoggedIn(false);
      window.location.href = '/'; // Force navigation to landing page
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const isAuthenticated = useCallback(() => {
    return !!token && !!user;
  }, [token, user]);

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        token, 
        isLoggedIn, 
        isLoading,
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
