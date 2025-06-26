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
import HotelsList from './components/HotelsList';
import About from './components/About';
import Contact from './components/Contact';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
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
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />

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
                path="/hotels"
                element={
                  <ProtectedRoute>
                    <>
                      <Header />
                      <HotelsList />
                    </>
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
              <Route
                path="/about"
                element={
                  <ProtectedRoute>
                    <>
                      <Header />
                      <About />
                    </>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/contact"
                element={
                  <ProtectedRoute>
                    <>
                      <Header />
                      <Contact />
                    </>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/privacy"
                element={
                  <ProtectedRoute>
                    <>
                      <Header />
                      <PrivacyPolicy />
                    </>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/terms"
                element={
                  <ProtectedRoute>
                    <>
                      <Header />
                      <TermsOfService />
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
