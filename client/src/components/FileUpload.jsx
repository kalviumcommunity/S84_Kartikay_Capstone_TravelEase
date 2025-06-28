import React, { useState, useRef } from 'react';
import { Button, Form, Alert, Spinner, Card } from 'react-bootstrap';
import '../styles/FileUpload.css';

const FileUpload = ({ 
    onUpload, 
    accept = "image/*", 
    maxSize = 5, // in MB
    buttonText = "Choose File",
    showPreview = true,
    disabled = false,
    className = ""
}) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState('');
    const [uploadedFile, setUploadedFile] = useState(null);
    const [showOneImageAlert, setShowOneImageAlert] = useState(false);
    const fileInputRef = useRef(null);

    const validateFile = (file) => {
        // Check file type
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        
        if (!allowedTypes.includes(file.type)) {
            throw new Error('Please select a valid image file (JPEG, JPG, or PNG)');
        }

        // Check file size
        const maxSizeBytes = maxSize * 1024 * 1024; // Convert MB to bytes
        if (file.size > maxSizeBytes) {
            throw new Error(`File size must be less than ${maxSize}MB`);
        }

        return true;
    };

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        setError('');

        if (!file) {
            setSelectedFile(null);
            setPreview(null);
            return;
        }

        try {
            validateFile(file);
            setSelectedFile(file);

            // Create preview
            if (showPreview) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setPreview(e.target.result);
                };
                reader.readAsDataURL(file);
            }
        } catch (err) {
            setError(err.message);
            setSelectedFile(null);
            setPreview(null);
            // Reset file input
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setError('Please select a file first');
            return;
        }

        setIsUploading(true);
        setError('');

        try {
            await onUpload(selectedFile);
            
            // Store uploaded file info for success card
            setUploadedFile({
                name: selectedFile.name,
                size: selectedFile.size,
                preview: preview
            });
            
            // Show one image alert
            setShowOneImageAlert(true);
            
            // Reset after successful upload
            setSelectedFile(null);
            setPreview(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        } catch (err) {
            setError(err.message || 'Upload failed. Please try again.');
        } finally {
            setIsUploading(false);
        }
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        setPreview(null);
        setError('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleRemoveUploaded = () => {
        setUploadedFile(null);
        setShowOneImageAlert(false);
    };

    return (
        <div className={`file-upload-container ${className}`}>
            <Form.Group>
                <Form.Label>Select Image</Form.Label>
                <div className="file-input-wrapper">
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept={accept}
                        onChange={handleFileSelect}
                        disabled={disabled || isUploading}
                        className="file-input"
                    />
                    <Button
                        variant="outline-primary"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={disabled || isUploading}
                        className="file-select-button"
                    >
                        {buttonText}
                    </Button>
                </div>
                
                {selectedFile && (
                    <div className="file-info">
                        <p className="file-name">{selectedFile.name}</p>
                        <p className="file-size">
                            Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                    </div>
                )}

                {showPreview && preview && (
                    <div className="image-preview-container">
                        <div className="image-preview">
                            <img src={preview} alt="Preview" />
                        </div>
                        <div className="upload-actions">
                            <Button
                                variant="success"
                                onClick={handleUpload}
                                disabled={isUploading}
                                className="upload-btn"
                            >
                                {isUploading ? (
                                    <>
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                            className="me-2"
                                        />
                                        Uploading...
                                    </>
                                ) : (
                                    'Upload'
                                )}
                            </Button>
                            <Button
                                variant="outline-secondary"
                                onClick={handleRemoveFile}
                                disabled={isUploading}
                                className="remove-btn"
                            >
                                Remove
                            </Button>
                        </div>
                    </div>
                )}

                {showOneImageAlert && (
                    <Alert 
                        variant="info" 
                        className="mt-3"
                        dismissible
                        onClose={() => setShowOneImageAlert(false)}
                    >
                        <strong>📸 One Image at a Time:</strong> You can only upload one image per session. 
                        To upload another image, please remove the current one first.
                    </Alert>
                )}

                {uploadedFile && (
                    <Card className="uploaded-card mt-3">
                        <Card.Body>
                            <div className="uploaded-content">
                                <div className="uploaded-image">
                                    <img src={uploadedFile.preview} alt="Uploaded" />
                                </div>
                                <div className="uploaded-info">
                                    <h6 className="uploaded-title">✅ Uploaded Successfully!</h6>
                                    <p className="uploaded-name">{uploadedFile.name}</p>
                                    <p className="uploaded-size">
                                        Size: {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={handleRemoveUploaded}
                                        className="remove-uploaded-btn"
                                    >
                                        Remove
                                    </Button>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                )}

                {error && (
                    <Alert variant="danger" className="mt-2">
                        {error}
                    </Alert>
                )}
            </Form.Group>
        </div>
    );
};

export default FileUpload; 