import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TermsOfServices.css';

const TermsOfService = () => {
  const navigate = useNavigate();
  return (
    <div className="termsofservice-page">
      <header className="termsofservice-hero">
        <button className="termsofservice-back-home-btn" onClick={() => navigate('/home')}>
          ← Back to Home
        </button>
        <div className="termsofservice-hero-content">
          <h1 className="termsofservice-title">Terms of Service</h1>
          <p className="termsofservice-tagline">Please read these terms carefully.</p>
        </div>
      </header>
      <main className="termsofservice-main">
        <section className="termsofservice-section">
          <h2>Introduction</h2>
          <p>These Terms of Service govern your use of TravelEase. By using our services, you agree to these terms.</p>
        </section>
        <section className="termsofservice-section">
          <h2>User Responsibilities</h2>
          <p>Users must provide accurate information and use the platform in compliance with all applicable laws.</p>
        </section>
        <section className="termsofservice-section">
          <h2>Prohibited Activities</h2>
          <p>Do not misuse the platform, attempt unauthorized access, or engage in fraudulent activities.</p>
        </section>
        <section className="termsofservice-section">
          <h2>Disclaimers</h2>
          <p>TravelEase is provided "as is" without warranties of any kind. We do not guarantee the accuracy of information.</p>
        </section>
        <section className="termsofservice-section">
          <h2>Limitation of Liability</h2>
          <p>TravelEase is not liable for any damages arising from your use of the platform.</p>
        </section>
        <section className="termsofservice-section">
          <h2>Changes to Terms</h2>
          <p>We may update these terms at any time. Continued use of the service constitutes acceptance of the new terms.</p>
        </section>
        <section className="termsofservice-section">
          <h2>Contact</h2>
          <p>If you have questions about these Terms, contact us at <a href="mailto:kartikayrattan1@gmail.com">kartikayrattan1@gmail.com</a>.</p>
        </section>
      </main>
      <footer className="termsofservice-footer">
        <div className="termsofservice-footer-content">
          <div className="termsofservice-footer-main">
            <div className="termsofservice-footer-links">
              <a href="/about">About</a>
              <a href="/contact">Contact</a>
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
            </div>
          </div>
          <div className="termsofservice-footer-copyright">
            <p>© 2025 TravelEase. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TermsOfService; 