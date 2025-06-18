import { useNavigate } from 'react-router-dom';
import video from '../assets/video1.mp4';
import '../styles/LandingPage.css'; 
import React, { useState, useEffect } from 'react';

const LandingPage = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: 'Asia/Kolkata',
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      };
      const time = new Date().toLocaleTimeString('en-US', options);
      setCurrentTime(time);
    };

    // Update time immediately
    updateTime();
    
    // Update time every second
    const intervalId = setInterval(updateTime, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleGetStarted = () => {
    navigate('/signup');
  };

  return (
    <div className="landing-page">
      {/* HERO SECTION */}
      <div className="hero-section">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="hero-video"
          style={{ display: 'block' }}
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-content">
          <h1>Discover. Plan. Travel.</h1>
          <p>Your one-stop travel companion</p>
          <button onClick={handleGetStarted}>Get Started</button>
        </div>
      </div>

      {/* FEATURES */}
      <section className="features-section">
        <h2>Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h5>🧠 AI Trip Planning</h5>
            <p>Get personalized itineraries tailored to your style, budget, and interests. Our AI analyzes your preferences to create the perfect travel plan.</p>
          </div>
          <div className="feature-card">
            <h5>🌍 Destination Explorer</h5>
            <p>Discover popular and hidden gems worldwide. Filter destinations by categories like beach, adventure, or historical sites.</p>
          </div>
          <div className="feature-card">
            <h5>🏨 Hotel Insights</h5>
            <p>Access detailed hotel information including amenities, locations, and images. Powered by Amadeus and Google Places APIs.</p>
          </div>
          <div className="feature-card">
            <h5>✈️ Flight Information</h5>
            <p>Browse comprehensive flight details including routes, durations, and costs. All information is for planning purposes only.</p>
          </div>
          <div className="feature-card">
            <h5>📋 Smart Dashboard</h5>
            <p>Create, update, and manage your trips with ease. Save favorite hotels and destinations for future reference.</p>
          </div>
          <div className="feature-card">
            <h5>🔐 Secure Access</h5>
            <p>Enjoy secure email-based authentication with JWT sessions. Your travel plans are private and protected.</p>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="why-section">
        <h2>Why Choose TravelEase?</h2>
        <p>
          TravelEase revolutionizes your travel planning experience with cutting-edge technology and personalized service. 
          Our platform combines AI-powered recommendations with human expertise to create unforgettable journeys.
        </p>
        <div className="why-grid">
          <div className="why-card">
            <h3>Smart Planning</h3>
            <ul>
              <li>✅ AI-powered itinerary suggestions</li>
              <li>✅ Real-time travel updates</li>
              <li>✅ Personalized recommendations</li>
              <li>✅ Smart budget optimization</li>
            </ul>
          </div>
          <div className="why-card">
            <h3>User Experience</h3>
            <ul>
              <li>✅ Intuitive interface design</li>
              <li>✅ Mobile-first approach</li>
              <li>✅ Easy trip planning process</li>
              <li>✅ 24/7 planning support</li>
            </ul>
          </div>
          <div className="why-card">
            <h3>Travel Benefits</h3>
            <ul>
              <li>✅ Detailed destination guides</li>
              <li>✅ Local expert insights</li>
              <li>✅ Weather forecasts</li>
              <li>✅ Travel tips & recommendations</li>
            </ul>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials-section">
        <h2>What Our Users Say</h2>
        <div className="testimonial-grid">
          {[
            { 
              name: 'Emily', 
              text: 'TravelEase made my honeymoon trip unforgettable!',
              image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'
            },
            { 
              name: 'John Doe', 
              text: 'The AI trip builder saved me so much time!',
              image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
            },
            { 
              name: 'Sarah', 
              text: 'I planned everything in one place – it was so easy!',
              image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg'
            },
          ].map((testimonial, i) => (
            <div key={i} className="testimonial-card">
              <div className="testimonial-profile">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="testimonial-avatar"
                />
              </div>
              <p className="testimonial-text">"{testimonial.text}"</p>
              <p className="testimonial-name"><strong>– {testimonial.name}</strong></p>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section className="gallery-section">
        <h2>Explore the World</h2>
        <p>Get inspired by the beauty of travel destinations</p>
        <div className="gallery-grid">
          {[
            {
              src: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg',
              alt: 'Beautiful beach with crystal clear water',
              category: 'Beach'
            },
            {
              src: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg',
              alt: 'Majestic mountain range at sunset',
              category: 'Mountains'
            },
            {
              src: 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg',
              alt: 'Modern city skyline at night',
              category: 'City'
            },
            {
              src: 'https://images.pexels.com/photos/206701/pexels-photo-206701.jpeg',
              alt: 'Vast desert landscape with dunes',
              category: 'Desert'
            },
            {
              src: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg',
              alt: 'Lush green forest with sunlight',
              category: 'Forest'
            },
            {
              src: 'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg',
              alt: 'Tropical island paradise',
              category: 'Island'
            },
            {
              src: 'https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg',
              alt: 'Travel adventure and exploration',
              category: 'Travel'
            },
            {
              src: 'https://images.pexels.com/photos/13129901/pexels-photo-13129901.jpeg',
              alt: 'Ancient temple architecture',
              category: 'Temple'
            },
            {
              src: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg',
              alt: 'Stunning waterfall in nature',
              category: 'Waterfall'
            },
            {
              src: 'https://images.pexels.com/photos/2387871/pexels-photo-2387871.jpeg',
              alt: 'Ancient historical ruins',
              category: 'Historical'
            },
            {
              src: 'https://images.pexels.com/photos/2113566/pexels-photo-2113566.jpeg',
              alt: 'Snowy winter landscape',
              category: 'Winter'
            },
            {
              src: 'https://images.pexels.com/photos/18041018/pexels-photo-18041018.jpeg',
              alt: 'Vibrant cultural festival',
              category: 'Cultural'
            }
          ].map((image, i) => (
            <div key={i} className="gallery-item">
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
              />
              <div className="gallery-item-overlay">
                <span>{image.category}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-main">
            <div className="footer-left">
              <div className="footer-status">
                <span className="status-indicator"></span>
                <span>All systems operational</span>
              </div>
              <div className="footer-time">
              <span className="time-display">{currentTime}</span>
              </div>
            </div>
            <div className="footer-center">
              <div className="footer-links">
                <a href="#privacy">Privacy Policy</a>
                <a href="#terms">Terms of Service</a>
                <a href="#contact">Contact Us</a>
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <p>© 2025 TravelEase. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
