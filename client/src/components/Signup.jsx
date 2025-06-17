import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/Signup.css';

function Signup() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [validated, setValidated] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        
        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
            return;
        }

        setIsLoading(true);
    
        if (formData.password !== formData.confirmPassword) {
            setMessage('❌ Passwords do not match!');
            setIsLoading(false);
            return;
        }
    
        try {
            const response = await fetch('https://travelease-5z19.onrender.com/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    name: formData.fullName,
                    email: formData.email,
                    password: formData.password
                })
            });
    
            const data = await response.json();
    
            if (response.ok) {
                setMessage('✅ Signup successful! Please log in.');
                setFormData({
                    fullName: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                });
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                setMessage(data.error || '❌ Signup failed.');
            }
        } catch (error) {
            console.error('Signup Error:', error);
            setMessage('❌ Error signing up. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-form-container">
                <div className="signup-header">
                    <h2>Create Your Account</h2>
                    <p>Join TravelEase and start planning your next adventure</p>
                </div>
                
                <Form noValidate validated={validated} onSubmit={handleSubmit} className="signup-form">
                    {message && (
                        <Alert variant={message.includes('✅') ? 'success' : 'danger'} className="signup-alert">
                            {message}
                        </Alert>
                    )}
                    
                    <Form.Group className="mb-3" controlId="fullName">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            placeholder="Enter your full name"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter your full name.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter your email"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter a valid email address.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength="6"
                            placeholder="Create a password"
                        />
                        <Form.Control.Feedback type="invalid">
                            Password must be at least 6 characters long.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            placeholder="Confirm your password"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please confirm your password.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Button 
                        variant="primary" 
                        type="submit" 
                        className="signup-button"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Creating Account...' : 'Create Account'}
                    </Button>

                    <div className="signup-footer">
                        <p>Already have an account? <a href="/login">Log in</a></p>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default Signup;
