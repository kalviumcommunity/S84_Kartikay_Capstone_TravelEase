import { createContext, useContext, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAPI } from '../services/apiService';

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

      console.log('Login response - user data:', userData);
      console.log('Login response - profileImage:', userData.profileImage);

      // Normalize user data
      const normalizedUser = {
        _id: userData.id || userData._id,
        name: userData.name,
        email: userData.email,
        role: userData.role || 'user'
      };

      console.log('Normalized user data:', normalizedUser);

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

  const updateUser = useCallback((updatedUserData) => {
    try {
      console.log('Updating user data:', updatedUserData);
      console.log('Current user data:', user);
      
      const updatedUser = { ...user, ...updatedUserData };
      console.log('Updated user data:', updatedUser);
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  }, [user]);

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
        updateUser,
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
