import React, { useEffect } from 'react';
import '../styles/Preloader.css';
import logo from '../assets/Travelease logo.png';

const Preloader = ({ onReady }) => {
  useEffect(() => {
    let isMounted = true;
    const minDelay = new Promise(resolve => setTimeout(resolve, 5000));
    const backendPing = fetch('https://travelease-5z19.onrender.com/', { method: 'GET' });
    Promise.all([minDelay, backendPing.catch(() => {})])
      .then(() => {
        if (isMounted && typeof onReady === 'function') onReady();
      });
    return () => { isMounted = false; };
  }, [onReady]);

  return (
    <div className="preloader-overlay">
      <div className="preloader-content">
        <img src={logo} alt="TravelEase Logo" className="preloader-logo" />
        {/* Animated dot-dot-dot loader */}
        <div className="preloader-dots">
          <span>.</span><span>.</span><span>.</span>
        </div>
        <div className="preloader-text">TravelEase is loading...</div>
      </div>
    </div>
  );
};

export default Preloader; 