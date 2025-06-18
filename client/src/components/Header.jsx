import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { IoCloseCircleSharp } from 'react-icons/io5';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Travelease logo.png';
import '../styles/Header.css';

function Header() {
    const [showSidebar, setShowSidebar] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
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

    const toggleSidebar = () => setShowSidebar(!showSidebar);
    const closeSidebar = () => setShowSidebar(false);

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to log out?')) {
            logout();
            navigate('/');
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
                        <div className="user-info">
                            <FaUser className="user-icon" />
                            <span className="user-name">{user?.name}</span>
                        </div>
                    )}
                    <div className="nav-links">
                        {!isLoggedIn ? (
                            <>
                                <Link to="/signup" className={isActive('/signup')}>Signup</Link>
                                <Link to="/login" className={isActive('/login')}>Login</Link>
                            </>
                        ) : (
                            <button onClick={handleLogout} className="logout-btn">
                                <FaSignOutAlt /> Logout
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Sidebar */}
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
