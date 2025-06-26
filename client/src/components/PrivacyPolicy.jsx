import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PrivacyPolicy.css';

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  return (
    <div className="privacypolicy-page">
      <header className="privacypolicy-hero">
        <button className="privacypolicy-back-home-btn" onClick={() => navigate('/home')}>
          ← Back to Home
        </button>
        <div className="privacypolicy-hero-content">
          <h1 className="privacypolicy-title">Privacy Policy</h1>
          <p className="privacypolicy-tagline">Your privacy matters to us.</p>
        </div>
      </header>
      <main className="privacypolicy-main">
        <section className="privacypolicy-section">
          <h2>Introduction</h2>
          <p>This Privacy Policy explains how TravelEase collects, uses, and protects your information when you use our services.</p>
        </section>
        <section className="privacypolicy-section">
          <h2>Information Collection</h2>
          <p>We collect information you provide directly, such as when you create an account, and information automatically, such as usage data and cookies.</p>
        </section>
        <section className="privacypolicy-section">
          <h2>Use of Information</h2>
          <p>Your information is used to provide, improve, and personalize our services, communicate with you, and ensure security.</p>
        </section>
        <section className="privacypolicy-section">
          <h2>Data Security</h2>
          <p>We implement industry-standard security measures to protect your data, but no method is 100% secure.</p>
        </section>
        <section className="privacypolicy-section">
          <h2>User Rights</h2>
          <p>You have the right to access, update, or delete your information. Contact us for any privacy-related requests.</p>
        </section>
        <section className="privacypolicy-section">
          <h2>Contact</h2>
          <p>If you have questions about this Privacy Policy, contact us at <a href="mailto:kartikayrattan1@gmail.com">kartikayrattan1@gmail.com</a>.</p>
        </section>
      </main>
      <footer className="privacypolicy-footer">
        <div className="privacypolicy-footer-content">
          <div className="privacypolicy-footer-main">
            <div className="privacypolicy-footer-links">
              <a href="/about">About</a>
              <a href="/contact">Contact</a>
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
            </div>
          </div>
          <div className="privacypolicy-footer-copyright">
            <p>© 2025 TravelEase. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicy; 