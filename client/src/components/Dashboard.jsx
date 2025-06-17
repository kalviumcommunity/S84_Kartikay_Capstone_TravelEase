import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card, Button, Tabs, Tab, Badge } from 'react-bootstrap';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('upcoming');
    const [currentTime, setCurrentTime] = useState('');
    const [currentDate, setCurrentDate] = useState(new Date());
    const [greeting, setGreeting] = useState('');

    // Sample data - replace with actual API calls
    const [favorites] = useState([
        { id: 1, name: 'Bali, Indonesia', image: 'https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg' },
        { id: 2, name: 'Paris, France', image: 'https://images.pexels.com/photos/2365457/pexels-photo-2365457.jpeg' },
        { id: 3, name: 'Tokyo, Japan', image: 'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg' }
    ]);

    const [trips] = useState({
        upcoming: [
            {
                id: 1,
                destination: 'Bali, Indonesia',
                startDate: '2025-06-15',
                endDate: '2025-06-22',
                budget: 2500,
                status: 'upcoming',
                flight: {
                    airline: 'Singapore Airlines',
                    flightNumber: 'SQ123',
                    departure: '10:00 AM',
                    arrival: '2:00 PM'
                },
                hotel: {
                    name: 'Bali Resort & Spa',
                    checkIn: '2025-06-15',
                    checkOut: '2025-06-22',
                    roomType: 'Deluxe Ocean View'
                }
            },
            {
                id: 2,
                destination: 'Paris, France',
                startDate: '2025-07-01',
                endDate: '2025-07-08',
                budget: 3000,
                status: 'upcoming',
                flight: {
                    airline: 'Air France',
                    flightNumber: 'AF456',
                    departure: '8:00 AM',
                    arrival: '11:00 AM'
                },
                hotel: {
                    name: 'Hotel de Paris',
                    checkIn: '2025-07-01',
                    checkOut: '2025-07-08',
                    roomType: 'Executive Suite'
                }
            }
        ],
        ongoing: [
            {
                id: 3,
                destination: 'Tokyo, Japan',
                startDate: '2025-05-01',
                endDate: '2025-05-08',
                budget: 2800,
                status: 'ongoing',
                flight: {
                    airline: 'Japan Airlines',
                    flightNumber: 'JL789',
                    departure: '9:00 AM',
                    arrival: '2:00 PM'
                },
                hotel: {
                    name: 'Tokyo Grand Hotel',
                    checkIn: '2025-05-01',
                    checkOut: '2025-05-08',
                    roomType: 'Standard Room'
                }
            }
        ],
        completed: []
    });

    const [gallery] = useState([
        { id: 1, image: 'https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg', location: 'Bali, Indonesia', date: '2025-06-15' },
        { id: 2, image: 'https://images.pexels.com/photos/2365457/pexels-photo-2365457.jpeg', location: 'Paris, France', date: '2025-07-01' },
        { id: 3, image: 'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg', location: 'Tokyo, Japan', date: '2025-05-01' }
    ]);

    useEffect(() => {
        // Update time, date, and greeting
        const updateTimeAndGreeting = () => {
            const now = new Date();
            const hours = now.getHours();
            
            // Set greeting based on time of day
            if (hours < 12) setGreeting('Good Morning');
            else if (hours < 18) setGreeting('Good Afternoon');
            else setGreeting('Good Evening');

            // Format time
            const options = {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            };
            setCurrentTime(now.toLocaleTimeString('en-US', options));
            setCurrentDate(now);
        };

        updateTimeAndGreeting();
        const interval = setInterval(updateTimeAndGreeting, 1000);

        return () => clearInterval(interval);
    }, []);

    const calculateTimeRemaining = (startDate) => {
        const start = new Date(startDate);
        const diff = start - currentDate;
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const months = Math.floor(days / 30);
        const remainingDays = days % 30;

        if (months > 0) {
            return `${months} month${months > 1 ? 's' : ''} and ${remainingDays} day${remainingDays !== 1 ? 's' : ''}`;
        }
        return `${days} day${days !== 1 ? 's' : ''}`;
    };

    const calculateTripProgress = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const total = end - start;
        const elapsed = currentDate - start;
        const progress = Math.min(Math.max((elapsed / total) * 100, 0), 100);
        return Math.round(progress);
    };

    const renderTripCard = (trip) => {
        const timeRemaining = calculateTimeRemaining(trip.startDate);
        const progress = trip.status === 'ongoing' ? calculateTripProgress(trip.startDate, trip.endDate) : null;

        return (
            <Card key={trip.id} className="trip-card">
                <Card.Body>
                    <div className="trip-header">
                        <h3>{trip.destination}</h3>
                        <Badge bg={trip.status === 'upcoming' ? 'primary' : trip.status === 'ongoing' ? 'success' : 'secondary'}>
                            {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                        </Badge>
                    </div>
                    <div className="trip-dates">
                        <p>📅 {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</p>
                        <p>💰 Budget: ${trip.budget}</p>
                        {trip.status === 'upcoming' && (
                            <p>⏳ Trip starts in {timeRemaining}</p>
                        )}
                        {trip.status === 'ongoing' && (
                            <div className="trip-progress">
                                <p>Progress: {progress}%</p>
                                <div className="progress-bar">
                                    <div 
                                        className="progress-fill" 
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="trip-details">
                        <div className="flight-details">
                            <h4>✈️ Flight Details</h4>
                            <p>{trip.flight.airline} - {trip.flight.flightNumber}</p>
                            <p>Departure: {trip.flight.departure} | Arrival: {trip.flight.arrival}</p>
                        </div>
                        <div className="hotel-details">
                            <h4>🏨 Hotel Details</h4>
                            <p>{trip.hotel.name}</p>
                            <p>Room: {trip.hotel.roomType}</p>
                            <p>Check-in: {new Date(trip.hotel.checkIn).toLocaleDateString()}</p>
                            <p>Check-out: {new Date(trip.hotel.checkOut).toLocaleDateString()}</p>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        );
    };

    return (
        <div className="dashboard-container">
            {/* Header Section */}
            <div className="dashboard-header">
                <div className="welcome-section">
                    <h1>{greeting}, {user?.name}!</h1>
                    <p className="current-time">{currentTime}</p>
                    <p className="current-date">{currentDate.toLocaleDateString()}</p>
                </div>
            </div>

            {/* Favorites Section */}
            <section className="dashboard-section">
                <h2>Favorite Destinations</h2>
                <div className="favorites-grid">
                    {favorites.map(favorite => (
                        <Card key={favorite.id} className="favorite-card">
                            <Card.Img variant="top" src={favorite.image} />
                            <Card.Body>
                                <Card.Title>{favorite.name}</Card.Title>
                                <Button variant="outline-primary" size="sm">View Details</Button>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Trips Section */}
            <section className="dashboard-section">
                <h2>Your Trips</h2>
                <Tabs
                    activeKey={activeTab}
                    onSelect={(k) => setActiveTab(k)}
                    className="trips-tabs"
                >
                    <Tab eventKey="upcoming" title="Upcoming">
                        <div className="trips-grid">
                            {trips.upcoming.map(trip => renderTripCard(trip))}
                        </div>
                    </Tab>
                    <Tab eventKey="ongoing" title="Ongoing">
                        <div className="trips-grid">
                            {trips.ongoing.map(trip => renderTripCard(trip))}
                        </div>
                    </Tab>
                    <Tab eventKey="completed" title="Completed">
                        <div className="trips-grid">
                            {trips.completed.map(trip => renderTripCard(trip))}
                        </div>
                    </Tab>
                </Tabs>
            </section>

            {/* Gallery Section */}
            <section className="dashboard-section">
                <h2>Travel Gallery</h2>
                <div className="gallery-grid">
                    {gallery.map(photo => (
                        <div key={photo.id} className="gallery-item">
                            <img src={photo.image} alt={photo.location} />
                            <div className="gallery-overlay">
                                <h4>{photo.location}</h4>
                                <p>{new Date(photo.date).toLocaleDateString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
