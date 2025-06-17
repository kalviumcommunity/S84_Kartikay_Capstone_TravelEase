import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Login.css';

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const resetForm = () => {
        setFormData({ email: '', password: '' });
        setValidated(false);
    };

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
    
        try {
            const response = await fetch('https://travelease-5z19.onrender.com/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            });
    
            const data = await response.json();
    
            if (response.ok) {
                await login(data);
                setMessage('✅ Login successful! Welcome back.');
                resetForm();
            
                setTimeout(() => {
                    navigate('/Dashboard');
                }, 1500);
            } else {
                setMessage(data.error || '❌ Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Login Error:', error);
            setMessage('❌ Error logging in. Please try again later.');
        } finally {
            setIsLoading(false);
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
            </div>
        </div>
    );
}

export default Login;
