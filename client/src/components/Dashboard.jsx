import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card, Button, Tabs, Tab, Badge, Modal, Alert, Spinner } from 'react-bootstrap';
import FileUpload from './FileUpload';
import GalleryUploadModal from './GalleryUploadModal';
import { userAPI } from '../services/apiService';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const { user, updateUser } = useAuth();
    const [activeTab, setActiveTab] = useState('upcoming');
    const [currentTime, setCurrentTime] = useState('');
    const [currentDate, setCurrentDate] = useState(new Date());
    const [greeting, setGreeting] = useState('');
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [showGalleryModal, setShowGalleryModal] = useState(false);
    const [gallery, setGallery] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [hasProfileImage, setHasProfileImage] = useState(false);

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

    useEffect(() => {
        const updateTimeAndGreeting = () => {
            const now = new Date();
            const hour = now.getHours();
            
            if (hour < 12) {
                setGreeting('Good Morning');
            } else if (hour < 18) {
                setGreeting('Good Afternoon');
            } else {
                setGreeting('Good Evening');
            }
            
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

        // Load user gallery only once when component mounts
        if (user && !loading) {
            loadUserGallery();
        }

        return () => clearInterval(interval);
    }, [user]); // Only depend on user changes

    const loadUserGallery = async () => {
        if (loading) return; // Prevent multiple simultaneous calls
        
        try {
            setLoading(true);
            console.log('Loading user gallery...');
            const response = await userAPI.getUserGallery();
            console.log('Gallery response:', response);
            
            if (response && response.gallery) {
                setGallery(response.gallery);
                console.log('Gallery loaded successfully:', response.gallery.length, 'images');
            } else {
                console.log('No gallery data in response');
                setGallery([]);
            }
        } catch (error) {
            console.error('Error loading gallery:', error);
            setError('Failed to load gallery');
            setGallery([]);
        } finally {
            setLoading(false);
            console.log('Gallery loading finished');
        }
    };

    // Function to reload header profile image
    const reloadHeaderProfileImage = () => {
        const headerProfileImg = document.querySelector('.header-profile-image');
        if (headerProfileImg) {
            headerProfileImg.src = userAPI.getProfileImageUrl(user._id) + '?t=' + new Date().getTime();
        }
    };

    const handleProfileImageUpload = async (file) => {
        try {
            const response = await userAPI.uploadProfileImage(file);
            console.log('Profile upload response:', response);
            setShowProfileModal(false);
            setError(''); // Clear any existing errors
            // Refresh profile image state
            setTimeout(() => {
                checkProfileImage();
                // Force reload the profile image
                const profileImg = document.querySelector('.profile-image');
                if (profileImg) {
                    profileImg.src = userAPI.getProfileImageUrl(user._id) + '?t=' + new Date().getTime();
                }
                // Reload header profile image
                reloadHeaderProfileImage();
            }, 500);
        } catch (error) {
            console.error('Profile upload error:', error);
            setError('Failed to upload profile image');
        }
    };

    const handleDeleteProfileImage = async () => {
        if (window.confirm('Are you sure you want to delete your profile photo?')) {
            try {
                await userAPI.deleteProfileImage();
                setError(''); // Clear any existing errors
                // Refresh profile image state
                setHasProfileImage(false);
                // Force reload the profile image to show default
                const profileImg = document.querySelector('.profile-image');
                if (profileImg) {
                    profileImg.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNDAiIGZpbGw9IiM2QjcyODAiLz4KPHN2ZyB4PSIyMCIgeT0iMjAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJ3aGl0ZSI+CjxwYXRoIGQ9Ik0xMiAxMmMyLjIxIDAgNC0xLjc5IDQtNHMtMS43OS00LTQtNC00IDEuNzktNCA0IDEuNzkgNCA0IDR6bTAgMmMtMi42NyAwLTggMS4zNC04IDR2MmgxNnYtMmMwLTIuNjYtNS4zMy00LTgtNHoiLz4KPC9zdmc+Cjwvc3ZnPgo=';
                }
                // Reload header profile image to show default
                reloadHeaderProfileImage();
            } catch (error) {
                console.error('Error deleting profile image:', error);
                setError('Failed to delete profile image');
            }
        }
    };

    // Check if user has profile image
    const checkProfileImage = async () => {
        try {
            const response = await fetch(userAPI.getProfileImageUrl(user._id));
            setHasProfileImage(response.ok);
        } catch (error) {
            setHasProfileImage(false);
        }
    };

    useEffect(() => {
        if (user) {
            checkProfileImage();
        }
    }, [user]);

    const handleChangePhotoClick = () => {
        if (hasProfileImage) {
            alert('Please delete your current profile photo first before uploading a new one.');
        } else {
            setShowProfileModal(true);
        }
    };

    const handleGalleryUploadSuccess = async () => {
        console.log('Gallery upload success, reloading gallery...');
        // Add a small delay to ensure backend has processed the upload
        setTimeout(async () => {
            try {
                if (!loading) { // Only reload if not already loading
                    await loadUserGallery();
                    console.log('Gallery reloaded successfully');
                    // Force reload all gallery images to ensure they display correctly
                    const galleryImages = document.querySelectorAll('.memory-image');
                    galleryImages.forEach(img => {
                        if (img.src && !img.src.includes('data:')) {
                            img.src = img.src + '?t=' + new Date().getTime();
                        }
                    });
                }
            } catch (error) {
                console.error('Error reloading gallery:', error);
            }
        }, 1000);
    };

    const handleDeleteGalleryImage = async (imageId) => {
        if (window.confirm('Are you sure you want to delete this image?')) {
            try {
                await userAPI.deleteGalleryImage(imageId);
                // Immediate reload of gallery after deletion
                await loadUserGallery();
                console.log('Gallery reloaded after deletion');
            } catch (error) {
                console.error('Error deleting image:', error);
                setError('Failed to delete image');
            }
        }
    };

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
                    <div className="profile-section">
                        <div className="profile-image-container">
                            <img 
                                src={userAPI.getProfileImageUrl(user._id)} 
                                alt="Profile" 
                                className="profile-image"
                                onLoad={() => {
                                    console.log('Profile image loaded successfully');
                                    console.log('Full image URL:', userAPI.getProfileImageUrl(user._id));
                                }}
                                onError={(e) => {
                                    console.error('Profile image failed to load');
                                    console.error('Attempted URL:', e.target.src);
                                    // Show default avatar on error
                                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNDAiIGZpbGw9IiM2QjcyODAiLz4KPHN2ZyB4PSIyMCIgeT0iMjAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJ3aGl0ZSI+CjxwYXRoIGQ9Ik0xMiAxMmMyLjIxIDAgNC0xLjc5IDQtNHMtMS43OS00LTQtNC00IDEuNzktNCA0IDEuNzkgNCA0IDR6bTAgMmMtMi42NyAwLTggMS4zNC04IDR2MmgxNnYtMmMwLTIuNjYtNS4zMy00LTgtNHoiLz4KPC9zdmc+Cjwvc3ZnPgo=';
                                }}
                            />
                            <div className="profile-buttons">
                                {hasProfileImage ? (
                                    <>
                                        <Button 
                                            variant="outline-primary" 
                                            size="sm" 
                                            className="change-photo-btn"
                                            onClick={handleChangePhotoClick}
                                        >
                                            Change Photo
                                        </Button>
                                        <Button 
                                            variant="outline-danger" 
                                            size="sm" 
                                            className="delete-photo-btn"
                                            onClick={handleDeleteProfileImage}
                                        >
                                            Delete Photo
                                        </Button>
                                    </>
                                ) : (
                                    <Button 
                                        variant="outline-primary" 
                                        size="sm" 
                                        className="change-photo-btn"
                                        onClick={handleChangePhotoClick}
                                    >
                                        Add Photo
                                    </Button>
                                )}
                            </div>
                        </div>
                        <div className="user-info">
                            <h1>{greeting}, {user?.name}!</h1>
                            <p className="current-time">{currentTime}</p>
                            <p className="current-date">{currentDate.toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
            </div>

            {error && (
                <Alert variant="danger" dismissible onClose={() => setError('')}>
                    {error}
                </Alert>
            )}

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

            {/* Memories Section */}
            <section className="memories-section">
                <div className="memories-header">
                    <h2>My Travel Memories</h2>
                    <div className="memories-controls">
                        <span className="memories-count">
                            {gallery.length}/9 photos
                        </span>
                        <Button 
                            variant="primary" 
                            size="sm"
                            onClick={() => setShowGalleryModal(true)}
                            className="add-memory-btn"
                            disabled={gallery.length >= 9}
                        >
                            📸 Add Memory
                        </Button>
                    </div>
                </div>

                {loading ? (
                    <div className="loading-memories">
                        <Spinner animation="border" variant="primary" />
                    </div>
                ) : gallery.length === 0 ? (
                    <div className="empty-memories">
                        <p>No travel memories yet. Start by adding your first photo!</p>
                    </div>
                ) : (
                    <div className="memories-grid">
                        {gallery.map(photo => {
                            const imageUrl = userAPI.getGalleryImageUrl(photo._id);
                            
                            return (
                                <div key={photo._id} className="memory-item">
                                    <div className="memory-image-container">
                                        <img 
                                            src={imageUrl} 
                                            alt={photo.description || 'Travel memory'} 
                                            className="memory-image"
                                            onError={(e) => {
                                                console.error('Memory image failed to load:', e.target.src);
                                                e.target.style.display = 'none';
                                            }}
                                            onLoad={() => console.log('Memory image loaded successfully:', photo._id)}
                                        />
                                        {photo.tripDate && (
                                            <div className="memory-date-overlay">
                                                {new Date(photo.tripDate).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </div>
                                        )}
                                        <Button 
                                            variant="danger" 
                                            size="sm" 
                                            className="delete-memory-btn"
                                            onClick={() => handleDeleteGalleryImage(photo._id)}
                                            title="Delete this photo"
                                        >
                                            ✕
                                        </Button>
                                    </div>
                                    <div className="memory-info">
                                        <h4>{photo.location}</h4>
                                        {photo.description && <p className="description">{photo.description}</p>}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {gallery.length >= 9 && (
                    <Alert variant="warning" className="mt-3">
                        <strong>Memories Full!</strong> You've reached the maximum of 9 photos. Delete some photos to upload new ones.
                    </Alert>
                )}
            </section>

            {/* Profile Image Upload Modal */}
            <Modal show={showProfileModal} onHide={() => setShowProfileModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Profile Photo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FileUpload
                        onUpload={handleProfileImageUpload}
                        buttonText="Choose Profile Photo"
                        maxSize={5}
                        showPreview={true}
                    />
                </Modal.Body>
            </Modal>

            {/* Gallery Upload Modal */}
            <GalleryUploadModal
                show={showGalleryModal}
                onHide={() => setShowGalleryModal(false)}
                onUploadSuccess={handleGalleryUploadSuccess}
                currentGalleryCount={gallery.length}
            />
        </div>
    );
};

export default Dashboard;
