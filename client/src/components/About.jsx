import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/About.css';

const travelImages = [
  {
    src: 'https://images.pexels.com/photos/62623/wing-plane-flying-airplane-62623.jpeg',
    alt: 'Airplane flying',
    direction: 'left',
  },
  {
    src: 'https://images.pexels.com/photos/41949/earth-earth-at-night-night-lights-41949.jpeg',
    alt: 'World map',
    direction: 'up',
  },
  {
    src: 'https://images.pexels.com/photos/6033950/pexels-photo-6033950.jpeg',
    alt: 'Beach and palm trees',
    direction: 'down',
  },
  {
    src: 'https://images.pexels.com/photos/7368202/pexels-photo-7368202.jpeg',
    alt: 'Suitcase ',
    direction: 'right',
  },
];

const About = () => {
  const navigate = useNavigate();
  const galleryRef = useRef(null);
  const [galleryVisible, setGalleryVisible] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGalleryVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (galleryRef.current) {
      observer.observe(galleryRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div className="about-page">
      <section className="about-hero">
        <button className="about-back-home-btn" onClick={() => navigate('/home')}>
          ← Back to Home
        </button>
        <div className="about-hero-content">
          <h1 className="about-title">TravelEase</h1>
          <p className="about-tagline">Your One-Stop Travel Companion</p>
        </div>
      </section>

      <section className="about-section about-motivation">
        <h2>Why I Built TravelEase</h2>
        <div className="about-motivation-text">
          <p>
            Hi, I'm Kartikay Rattan. I created this project as my capstone because I personally faced a lot of issues while planning my own travels—finding reliable information, comparing hotels, and discovering the best things to do was always a hassle. TravelEase is the solution I wish I had: a single platform to explore destinations, compare hotels, and plan trips with confidence and ease.
          </p>
        </div>
      </section>

      <div
        className={`about-motivation-gallery-animate${galleryVisible ? ' visible' : ''}`}
        ref={galleryRef}
      >
        <div className="about-motivation-gallery">
          {travelImages.map((img, i) => (
            <img
              key={i}
              src={img.src}
              alt={img.alt}
              className={`about-motivation-img about-motivation-img-${img.direction}`}
              style={{ '--img-index': i }}
            />
          ))}
        </div>
      </div>

      <section className="about-section about-mission">
        <h2>Our Mission</h2>
        <p>
          TravelEase revolutionizes your travel planning experience with cutting-edge technology and personalized service. Our platform combines AI-powered recommendations with human expertise to create unforgettable journeys for every traveler.
        </p>
      </section>

      <section className="about-section about-features">
        <h2>Key Features</h2>
        <ul>
          <li><strong>AI Trip Planning:</strong> Personalized itineraries tailored to your style, budget, and interests.</li>
          <li><strong>Destination Explorer:</strong> Discover popular and hidden gems worldwide, filter by category, and get detailed guides.</li>
          <li><strong>Hotel Insights:</strong> Access detailed hotel information including amenities, locations, and images.</li>
          <li><strong>Flight Information:</strong> Browse comprehensive flight details for planning purposes.</li>
          <li><strong>Smart Dashboard:</strong> Create, update, and manage your trips with ease.</li>
          <li><strong>Secure Access:</strong> Enjoy secure authentication and privacy for your travel plans.</li>
        </ul>
      </section>

      <section className="about-section about-unique">
        <h2>What Makes TravelEase Unique?</h2>
        <ul>
          <li>Combines AI-powered suggestions with real human insights</li>
          <li>Modern, intuitive, and mobile-first design</li>
          <li>Comprehensive coverage: destinations, hotels, flights, and more</li>
          <li>Personalized dashboard and trip management</li>
          <li>Always up-to-date with the latest travel trends and safety info</li>
        </ul>
      </section>

      <section className="about-section about-team">
        <h2>Meet the Creator</h2>
        <p>
          This project was made by <strong>Kartikay Rattan</strong> as a capstone project. I'm passionate about making travel accessible, enjoyable, and stress-free for everyone. I hope TravelEase helps you plan your next adventure with ease!
        </p>
      </section>

      <footer className="about-footer">
        <div className="about-footer-content">
          <div className="about-footer-main">
            <div className="about-footer-left">
              <div className="about-footer-status">
                <span className="about-status-indicator"></span>
                <span>All systems operational</span>
              </div>
              <div className="about-footer-contact">
                <span>Contact: <a href="mailto:kartikayrattan1@gmail.com">kartikayrattan1@gmail.com</a></span>
              </div>
            </div>
            <div className="about-footer-center">
              <div className="about-footer-links">
                <a href="/about">About</a>
                <a href="/hotels">Hotels</a>
                <a href="/destinations">Destinations</a>
                <a href="/dashboard">Dashboard</a>
                <a href="/privacy">Privacy Policy</a>
                <a href="/terms">Terms of Service</a>
              </div>
            </div>
          </div>
          <div className="about-footer-copyright">
            <p>© 2025 TravelEase. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About; 