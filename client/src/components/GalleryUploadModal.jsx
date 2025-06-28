import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import FileUpload from './FileUpload';
import { userAPI } from '../services/apiService';

const GalleryUploadModal = ({ show, onHide, onUploadSuccess, currentGalleryCount = 0 }) => {
    const [formData, setFormData] = useState({
        location: '',
        description: '',
        tripDate: ''
    });
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    // Check if gallery is full
    const isGalleryFull = currentGalleryCount >= 9;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileSelect = (file) => {
        setSelectedFile(file);
    };

    const handleSubmit = async () => {
        if (!selectedFile) {
            setError('Please select an image first');
            return;
        }

        if (!formData.location.trim()) {
            setError('Please enter a location');
            return;
        }

        setIsUploading(true);
        setError('');

        try {
            await userAPI.uploadGalleryImage(
                selectedFile,
                formData.location,
                formData.description,
                formData.tripDate
            );

            // Reset form
            setFormData({
                location: '',
                description: '',
                tripDate: ''
            });
            setSelectedFile(null);
            setError('');

            // Close modal and notify parent
            onHide();
            if (onUploadSuccess) {
                onUploadSuccess();
            }
        } catch (err) {
            setError(err.message || 'Upload failed. Please try again.');
        } finally {
            setIsUploading(false);
        }
    };

    const handleClose = () => {
        // Reset form when closing
        setFormData({
            location: '',
            description: '',
            tripDate: ''
        });
        setSelectedFile(null);
        setError('');
        onHide();
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header closeButton style={{ borderBottom: '2px solid #4facfe' }}>
                <Modal.Title style={{ color: '#2d3748', fontWeight: '600' }}>
                    📸 Upload Travel Photo
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ padding: '2rem' }}>
                {isGalleryFull && (
                    <Alert variant="warning" style={{ borderRadius: '10px', marginBottom: '1.5rem' }}>
                        <strong>⚠️ Gallery Full!</strong> You've reached the maximum of 9 photos. Please delete some photos before uploading new ones.
                    </Alert>
                )}
                
                <Form>
                    <Form.Group className="mb-4">
                        <Form.Label style={{ fontWeight: '500', color: '#2d3748' }}>Image *</Form.Label>
                        <FileUpload
                            onUpload={handleFileSelect}
                            buttonText="Choose Photo"
                            maxSize={10}
                            showPreview={true}
                        />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label style={{ fontWeight: '500', color: '#2d3748' }}>Location *</Form.Label>
                        <Form.Control
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            placeholder="e.g., Bali, Indonesia"
                            required
                            style={{ 
                                border: '2px solid #e2e8f0',
                                borderRadius: '10px',
                                padding: '0.75rem'
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label style={{ fontWeight: '500', color: '#2d3748' }}>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Tell us about this place or your experience..."
                            style={{ 
                                border: '2px solid #e2e8f0',
                                borderRadius: '10px',
                                padding: '0.75rem'
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label style={{ fontWeight: '500', color: '#2d3748' }}>Trip Date</Form.Label>
                        <Form.Control
                            type="date"
                            name="tripDate"
                            value={formData.tripDate}
                            onChange={handleInputChange}
                            style={{ 
                                border: '2px solid #e2e8f0',
                                borderRadius: '10px',
                                padding: '0.75rem',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                backgroundColor: '#fff',
                                color: '#2d3748'
                            }}
                            max={new Date().toISOString().split('T')[0]}
                            onClick={(e) => e.target.showPicker && e.target.showPicker()}
                        />
                        <Form.Text className="text-muted">
                            Optional: When did you visit this place?
                        </Form.Text>
                    </Form.Group>

                    {error && (
                        <Alert variant="danger" style={{ borderRadius: '10px' }}>
                            {error}
                        </Alert>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer style={{ borderTop: '2px solid #4facfe', padding: '1.5rem 2rem' }}>
                <Button 
                    variant="outline-secondary" 
                    onClick={handleClose}
                    style={{ borderRadius: '25px', padding: '0.5rem 1.5rem' }}
                >
                    Cancel
                </Button>
                <Button 
                    variant="primary" 
                    onClick={handleSubmit}
                    disabled={isUploading || !selectedFile || !formData.location.trim() || isGalleryFull}
                    style={{ 
                        borderRadius: '25px', 
                        padding: '0.5rem 1.5rem',
                        background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                        border: 'none'
                    }}
                >
                    {isUploading ? '📤 Uploading...' : '📸 Upload Photo'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default GalleryUploadModal; 