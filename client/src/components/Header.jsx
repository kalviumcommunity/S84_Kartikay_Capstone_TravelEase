import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaUser, FaSignOutAlt, FaTimes } from 'react-icons/fa';
import { IoCloseCircleSharp } from 'react-icons/io5';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Travelease logo.png';
import '../styles/Header.css';
import { userAPI } from '../services/apiService';

function Header() {
    const [showSidebar, setShowSidebar] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [showProfileSidebar, setShowProfileSidebar] = useState(false);
    const { isLoggedIn, logout, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close profile sidebar when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showProfileSidebar && !event.target.closest('.profile-sidebar') && !event.target.closest('.header-user-icon')) {
                setShowProfileSidebar(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showProfileSidebar]);

    const toggleSidebar = () => setShowSidebar(!showSidebar);
    const closeSidebar = () => setShowSidebar(false);
    const toggleProfileSidebar = () => setShowProfileSidebar(!showProfileSidebar);
    const closeProfileSidebar = () => setShowProfileSidebar(false);

    const handleLogout = () => {
        console.log('Logout button clicked');
        if (window.confirm('Are you sure you want to log out?')) {
            console.log('User confirmed logout');
            logout();
            navigate('/');
            setShowProfileSidebar(false);
        }
    };

    const isActive = (path) => location.pathname === path ? 'active' : '';

    return (
        <>
            <div className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
                <div className="navbar-left">
                    <div className="hamburger-icon" onClick={toggleSidebar}>
                        <FaBars size={24} />
                    </div>
                </div>
                
                <div className="logo">
                    <Link to="/home">
                        <img src={logo} alt="TravelEase Logo" />
                    </Link>
                </div>

                <div className="navbar-right">
                    {isLoggedIn && (
                        <div className="header-profile-dropdown">
                            <div className="header-user-icon" onClick={toggleProfileSidebar}>
                                <FaUser className="header-icon" />
                            </div>
                        </div>
                    )}
                    <div className="nav-links">
                        {!isLoggedIn && (
                            <>
                                <Link to="/signup" className={isActive('/signup')}>Signup</Link>
                                <Link to="/login" className={isActive('/login')}>Login</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Profile Sidebar */}
            {showProfileSidebar && (
                <div className="profile-sidebar-overlay" onClick={closeProfileSidebar}>
                    <div className="profile-sidebar" onClick={e => e.stopPropagation()}>
                        <div className="profile-sidebar-header">
                            <div className="profile-close-icon" onClick={closeProfileSidebar}>
                                <FaTimes size={24} />
                            </div>
                        </div>
                        
                        <div className="profile-sidebar-body">
                            <div className="profile-user-info">
                                <div className="profile-user-avatar">
                                    {user && (
                                        <img 
                                            src={userAPI.getProfileImageUrl(user._id)} 
                                            alt="Profile" 
                                            className="header-profile-image"
                                            onError={(e) => {
                                                console.log('Profile image failed to load, showing default icon');
                                                console.log('Attempted URL:', e.target.src);
                                                e.target.style.display = 'none';
                                                e.target.nextSibling.style.display = 'flex';
                                            }}
                                            onLoad={() => {
                                                console.log('Profile image loaded successfully');
                                                console.log('Image URL:', userAPI.getProfileImageUrl(user._id));
                                            }}
                                        />
                                    )}
                                    <FaUser 
                                        size={40} 
                                        style={{ 
                                            display: user?.profileImage ? 'none' : 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    />
                                </div>
                                <div className="profile-user-details">
                                    <h3 className="profile-user-name">{user?.name}</h3>
                                    <p className="profile-user-email">{user?.email}</p>
                                </div>
                            </div>
                            
                            <div className="profile-sidebar-links">
                                <Link to="/dashboard" className="profile-sidebar-link" onClick={closeProfileSidebar}>
                                    Dashboard
                                </Link>
                                <button onClick={handleLogout} className="profile-sidebar-logout">
                                    <FaSignOutAlt />
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Sidebar */}
            {showSidebar && (
                <div className="sidebar-overlay" onClick={closeSidebar}>
                    <div className="sidebar" onClick={e => e.stopPropagation()}>
                        <div className="sidebar-header">
                            <div className="close-icon" onClick={closeSidebar}>
                                <IoCloseCircleSharp size={28} />
                            </div>
                        </div>
                        <div className="sidebar-body">
                            {[
                                { path: '/home', label: 'Home' },
                                { path: '/hotels', label: 'Hotels' },
                                { path: '/destinations', label: 'Destinations' },
                                { path: '/dashboard', label: 'Dashboard' },
                                { path: '/trip-planner', label: 'Trip Planner' },
                                { path: '/about', label: 'About' },
                                { path: '/contact', label: 'Contact Us' }
                            ].map(({ path, label }) => (
                                <Link
                                    key={path}
                                    to={path}
                                    onClick={closeSidebar}
                                    className={isActive(path)}
                                >
                                    {label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Header;
