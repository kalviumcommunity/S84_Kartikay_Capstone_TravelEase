import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './components/Home';
import Signup from './components/Signup';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import ErrorBoundary from './components/ErrorBoundary';
import DestinationPage from './components/DestinationPage';
import DestinationsList from './components/DestinationsList';
import './App.css';

// Protected Route wrapper component
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? (
    <div className="authenticated-page">
      {children}
    </div>
  ) : <Navigate to="/login" />;
};

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <div className="app">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Protected routes */}
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <>
                      <Header />
                      <Home />
                    </>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <>
                      <Header />
                      <Dashboard />
                    </>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/destinations"
                element={
                  <ProtectedRoute>
                    <DestinationsList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/destinations/:destinationName"
                element={
                  <ProtectedRoute>
                    <>
                      <Header />
                      <DestinationPage />
                    </>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
