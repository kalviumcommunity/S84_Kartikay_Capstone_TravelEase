import React, { useState, useCallback } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Login.css';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [validated, setValidated] = useState(false);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();
    const location = useLocation();
    const showPopup = location.state?.popup;

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);

    const resetForm = useCallback(() => {
        setFormData({ email: '', password: '' });
        setValidated(false);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        
        if (!form.checkValidity()) {
            e.stopPropagation();
            setValidated(true);
            return;
        }

        setIsLoading(true);
        setValidated(true);
        setMessage(''); // Clear any previous messages
    
        try {
            // Set a timeout for the API call to prevent hanging
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 30000); // Increased to 30 seconds

            const response = await fetch('https://travelease-5z19.onrender.com/api/users/login', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                }),
                signal: controller.signal
            });
    
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Login failed');
            }

            const data = await response.json();
    
            if (data && data.token && data.user) {
                // Start the login process
                await login(data);
                setMessage('✅ Login successful! Welcome back.');
                resetForm();
                
                // Navigate after the delay
                setTimeout(() => {
                    navigate('/dashboard');
                }, 1500);
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (error) {
            if (error.name === 'AbortError') {
                setMessage('❌ The server is taking too long to respond. Please try again in a few moments.');
            } else if (error.message === 'Invalid response from server') {
                setMessage('❌ Server response was invalid. Please try again.');
            } else {
                console.error('Login Error:', error);
                setMessage(error.message || '❌ Error logging in. Please try again later.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLoginSuccess = async (credentialResponse) => {
        try {
            // Send Google ID token to backend for verification and login/signup
            const res = await axios.post('https://travelease-5z19.onrender.com/api/users/auth/google/token', {
                token: credentialResponse.credential
            });
            if (res.data.token && res.data.user) {
                await login(res.data); // Store JWT and user info
                navigate('/dashboard'); // Redirect to dashboard
            } else {
                setMessage('Google login failed: No token returned');
            }
        } catch (err) {
            setMessage('Google login failed: ' + (err.response?.data?.error || err.message));
        }
    };

    return (
        <div className="login-container">
            <div className="login-form-container">
                <div className="login-header">
                    <h2>Welcome Back to TravelEase</h2>
                </div>

                {showPopup && (
                    <Alert variant="info" className="login-alert">
                        Please log in to continue.
                    </Alert>
                )}

                {message && (
                    <Alert
                        variant={message.includes('✅') ? 'success' : 'danger'}
                        className="login-alert"
                    >
                        {message}
                    </Alert>
                )}

                <Form 
                    className="login-form" 
                    noValidate 
                    validated={validated} 
                    onSubmit={handleSubmit}
                >
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter your email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            autoComplete="email"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter a valid email address.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength={6}
                            autoComplete="current-password"
                        />
                        <Form.Control.Feedback type="invalid">
                            Password must be at least 6 characters long.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Button
                        className="login-button"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="spinner-border text-light" role="status" style={{ width: '20px', height: '20px' }}>
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        ) : (
                            'Log In'
                        )}
                    </Button>
                </Form>

                <div className="signup-link">
                    Don't have an account?{' '}
                    <a href="/signup" onClick={(e) => {
                        e.preventDefault();
                        navigate('/signup');
                    }}>
                        Sign up here
                    </a>
                </div>

                <GoogleLogin
                    onSuccess={handleGoogleLoginSuccess}
                    onError={() => { /* handle error */ }}
                />
            </div>
        </div>
    );
}

export default Login;
