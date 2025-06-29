const API_BASE_URL = 'https://travelease-5z19.onrender.com/api';

// Helper function to get auth headers
const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
};

// Helper function to get auth headers for file uploads
const getFileUploadHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Authorization': `Bearer ${token}`
    };
};

// Generic API call function
const apiCall = async (endpoint, options = {}) => {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers: {
                ...getAuthHeaders(),
                ...options.headers
            }
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API call error:', error);
        throw error;
    }
};

// File upload function
const uploadFile = async (endpoint, formData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('File upload error:', error);
        throw error;
    }
};

// User API functions
export const userAPI = {
    // Upload profile image
    uploadProfileImage: async (file) => {
        const formData = new FormData();
        formData.append('profileImage', file);
        return uploadFile('/users/upload-profile-image', formData);
    },

    // Delete profile image
    deleteProfileImage: async () => {
        return apiCall('/users/delete-profile-image', {
            method: 'DELETE'
        });
    },

    // Upload gallery image
    uploadGalleryImage: async (file, location, description, tripDate) => {
        const formData = new FormData();
        formData.append('galleryImage', file);
        if (location) formData.append('location', location);
        if (description) formData.append('description', description);
        if (tripDate) formData.append('tripDate', tripDate);
        return uploadFile('/users/upload-gallery-image', formData);
    },

    // Get user gallery
    getUserGallery: async () => {
        return apiCall('/users/gallery');
    },

    // Delete gallery image
    deleteGalleryImage: async (imageId) => {
        return apiCall(`/users/gallery/${imageId}`, {
            method: 'DELETE'
        });
    },

    // Get user dashboard
    getDashboard: async () => {
        return apiCall('/users/dashboard');
    },

    // Get profile image URL
    getProfileImageUrl: (userId) => {
        return `https://travelease-5z19.onrender.com/api/users/profile-image/${userId}`;
    },

    // Get gallery image URL
    getGalleryImageUrl: (imageId) => {
        return `https://travelease-5z19.onrender.com/api/users/gallery-image/${imageId}`;
    },

    // Get user favorites
    getFavorites: async (userId) => {
        return apiCall(`/users/${userId}/favorites`);
    },

    // Add a favorite
    addFavorite: async (userId, destinationId) => {
        return apiCall(`/users/${userId}/favorites`, {
            method: 'POST',
            body: JSON.stringify({ destinationId })
        });
    },

    // Remove a favorite
    removeFavorite: async (userId, destinationId) => {
        return apiCall(`/users/${userId}/favorites/${destinationId}`, {
            method: 'DELETE'
        });
    },

    // Get destination by name
    getDestinationByName: async (name) => {
        return apiCall(`/destinations/${encodeURIComponent(name)}`);
    }
};

export default apiCall; 