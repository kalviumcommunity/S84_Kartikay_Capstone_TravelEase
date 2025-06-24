import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, Row, Col, Spinner } from 'react-bootstrap';
import ReviewManager from '../components/ReviewManager';
import { useAuth } from '../context/AuthContext';
import '../styles/DestinationPage.css';
import { FaStar } from 'react-icons/fa';

export default function DestinationPage() {
  const { destinationName } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [destination, setDestination] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [events, setEvents] = useState([]);
  const [cityInfo, setCityInfo] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [destinationNotFound, setDestinationNotFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setDestinationNotFound(false);

        const destRes = await axios.get(`https://travelease-5z19.onrender.com/api/destinations?city=${destinationName}`);
        if (!destRes.data || destRes.data.length === 0) {
          setDestinationNotFound(true);
        } else {
          setDestination(destRes.data[0]);
        }

        const hotelRes = await axios.get(`https://travelease-5z19.onrender.com/api/hotels?location=${destinationName}`);
        setHotels(hotelRes.data);

        const eventRes = await axios.get(`https://travelease-5z19.onrender.com/api/events?location=${destinationName}`);
        setEvents(eventRes.data);

        const cityRes = await axios.get(`https://travelease-5z19.onrender.com/api/cities/${destinationName}`);
        setCityInfo(cityRes.data);

        const reviewsRes = await axios.get(`https://travelease-5z19.onrender.com/api/reviews?destination=${destinationName}`);
        setReviews(reviewsRes.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setDestinationNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [destinationName]);

  const handleReviewChanged = async (updatedReview) => {
    try {
      setLoading(true);
      setReviews((prevReviews) => {
        if (updatedReview) {
          const updatedReviews = prevReviews.filter((rev) => rev._id !== updatedReview._id);
          return [...updatedReviews, updatedReview];
        } else {
          return prevReviews.filter((rev) => rev._id !== updatedReview._id);
        }
      });
    } catch (err) {
      console.error("Error handling review change:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" variant="dark" />
      </Container>
    );
  }

  if (destinationNotFound && !cityInfo) {
    return (
      <Container className="text-center my-5 p-5 text-light" style={{ backgroundColor: '#1c1c1c', borderRadius: '16px' }}>
        <h2>Destination not found</h2>
        <p>Please check the name and try again.</p>
      </Container>
    );
  }

  return (
    <div className="dest-page">
      {/* Back to Home Button (now outside hero) */}
      <div className="dest-back-btn-wrapper">
        <button className="back-home-btn" onClick={() => navigate('/home')}>
          ← Back to Home
        </button>
      </div>
      {/* Hero Section */}
      {cityInfo?.images?.length > 0 && (
        <div className="dest-hero" style={{ backgroundImage: `url(${cityInfo.images[0]})` }}>
          <div className="dest-hero-overlay">
            <h1 className="dest-title">{destination?.name || cityInfo?.city}</h1>
          </div>
        </div>
      )}
      {/* Description below hero */}
      <div className="dest-main-description">
        <p>{destination?.description || cityInfo?.description}</p>
      </div>
      {/* Image Gallery */}
      {cityInfo?.images?.length > 1 && (
        <div className="dest-gallery">
          {cityInfo.images.slice(1, 7).map((img, i) => (
            <div className="dest-gallery-image-wrapper" key={i}>
              <img src={img} alt={`City View ${i}`} className="dest-gallery-image" />
            </div>
          ))}
        </div>
      )}

      {/* Attractions */}
      <section className="dest-section">
        <h2 className="dest-section-header">Top Attractions</h2>
        <div className="dest-attractions-grid">
          {(destination?.popularAttractions || cityInfo?.attractions || []).map((place, i) => (
            <div className="dest-attraction-card" key={i}>
              <span className="attraction-name">{place.name || place}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Hotels */}
      <section className="dest-section">
        <h2 className="dest-section-header">Top 10 Recommended Hotels</h2>
        <div className="dest-hotels-grid">
          {hotels.slice(0, 10).map((hotel, index) => (
            <div className="dest-hotel-card" key={hotel._id || index}>
              <img src={hotel.image} alt={hotel.name} className="dest-hotel-image" />
              <div className="dest-hotel-info">
                <h3 className="dest-hotel-title">{hotel.name}</h3>
                <p className="dest-hotel-price">₹{hotel.price} / night</p>
                <p className="dest-hotel-location">{hotel.location}</p>
                <div className="dest-hotel-amenities">
                  {hotel.amenities?.length > 0 ? (
                    <ul>
                      {hotel.amenities.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <span>No amenities listed</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="dest-section">
        <h2 className="dest-section-header">Reviews</h2>
        <div className="dest-reviews-grid">
          {reviews.length === 0 && <p>No reviews yet. Be the first to add one!</p>}
          {reviews.map((review) => (
            <div className="dest-review-card" key={review._id}>
              <div className="dest-review-header">
                <div className="dest-review-avatar">
                  {((review.user?.name || 'A')[0] || 'A').toUpperCase()}
                </div>
                <div className="dest-review-user">{review.user?.name || 'Anonymous'}</div>
                <div className="dest-review-rating">
                  <FaStar style={{ color: '#ffb400', marginRight: 2, marginLeft: 6, fontSize: '1.1em', verticalAlign: 'middle' }} />
                  {review.rating} / 5
                </div>
              </div>
              <div className="dest-review-comment">{review.comment}</div>
            </div>
          ))}
        </div>
        <ReviewManager destinationName={destinationName} onReviewChanged={handleReviewChanged} />
      </section>
    </div>
  );
} 