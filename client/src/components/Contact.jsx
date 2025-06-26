import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Contact.css';

const socialLinks = [
  {
    href: 'https://github.com/kartikay-28',
    label: 'GitHub',
    icon: 'https://img.icons8.com/m_outlined/512/github.png',
  },
  {
    href: 'https://www.instagram.com/_kartikay.rattan28/',
    label: 'Instagram',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/1024px-Instagram_icon.png',
  },
  {
    href: 'https://www.linkedin.com/in/kartikay-rattan-10b071326/',
    label: 'LinkedIn',
    icon: 'https://static.vecteezy.com/system/resources/previews/018/910/721/non_2x/linkedin-logo-linkedin-symbol-linkedin-icon-free-free-vector.jpg',
  },
];

const Contact = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const subject = encodeURIComponent(`TravelEase Contact from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:kartikayrattan1@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="contactus-page">
      <header className="contactus-hero">
        <button className="contactus-back-home-btn" onClick={() => navigate('/home')}>
          ← Back to Home
        </button>
        <div className="contactus-hero-content">
          <h1 className="contactus-title">Contact Us</h1>
          <p className="contactus-tagline">We'd love to hear from you!</p>
        </div>
      </header>
      <main className="contactus-main">
        <section className="contactus-form-section">
          <h2>Send a Message</h2>
          <form className="contactus-form" onSubmit={handleSubmit} autoComplete="off">
            <div className="contactus-form-group">
              <input
                type="text"
                name="name"
                id="contactus-name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder=" "
                autoComplete="off"
              />
              <label htmlFor="contactus-name">Your Name</label>
            </div>
            <div className="contactus-form-group">
              <input
                type="email"
                name="email"
                id="contactus-email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder=" "
                autoComplete="off"
              />
              <label htmlFor="contactus-email">Your Email</label>
            </div>
            <div className="contactus-form-group">
              <textarea
                name="message"
                id="contactus-message"
                value={form.message}
                onChange={handleChange}
                required
                placeholder=" "
                rows={5}
                autoComplete="off"
              />
              <label htmlFor="contactus-message">Your Message</label>
            </div>
            <button type="submit">Send</button>
          </form>
        </section>
        <aside className="contactus-info-section">
          <h2>Contact Info</h2>
          <div className="contactus-info-item">
            <span>Email:</span>
            <a href="mailto:kartikayrattan1@gmail.com">kartikayrattan1@gmail.com</a>
          </div>
          <div className="contactus-socials">
            {socialLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="contactus-social-link"
                aria-label={link.label}
              >
                <img src={link.icon} alt={link.label} />
              </a>
            ))}
          </div>
        </aside>
      </main>
      <footer className="contactus-footer">
        <div className="contactus-footer-content">
          <div className="contactus-footer-main">
            <div className="contactus-footer-left">
              <div className="contactus-footer-status">
                <span className="contactus-status-indicator"></span>
                <span>All systems operational</span>
              </div>
              <div className="contactus-footer-contact">
                <span>Contact: <a href="mailto:kartikayrattan1@gmail.com">kartikayrattan1@gmail.com</a></span>
              </div>
            </div>
            <div className="contactus-footer-center">
              <div className="contactus-footer-links">
                <a href="/about">About</a>
                <a href="/hotels">Hotels</a>
                <a href="/destinations">Destinations</a>
                <a href="/dashboard">Dashboard</a>
                <a href="/privacy">Privacy Policy</a>
                <a href="/terms">Terms of Service</a>
              </div>
            </div>
          </div>
          <div className="contactus-footer-copyright">
            <p>© 2025 TravelEase. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact; 