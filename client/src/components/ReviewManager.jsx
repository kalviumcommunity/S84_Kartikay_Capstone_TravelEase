import { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { FaStar } from 'react-icons/fa';

export default function ReviewManager({ destinationName, onReviewChanged }) {
  const { user, token } = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [existingReview, setExistingReview] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchExistingReview = async () => {
      if (!user?._id) return;
      try {
        const res = await axios.get(`https://travelease-5z19.onrender.com/api/reviews/user/${user._id}/destination/${destinationName}`);
        if (res.data) {
          setExistingReview(res.data);
          setRating(res.data.rating);
          setComment(res.data.comment);
          setIsUpdating(true);
        } else {
          setExistingReview(null);
          setIsUpdating(false);
        }
      } catch (err) {
        setExistingReview(null);
        setIsUpdating(false);
      }
    };
    fetchExistingReview();
  }, [user?._id, destinationName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      let res;
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
      if (isUpdating && existingReview) {
        res = await axios.put(`https://travelease-5z19.onrender.com/api/reviews/update/${existingReview._id}`, {
          destination: destinationName,
          rating,
          comment,
          user: user?._id || user?.id || 'Anonymous',
        }, config);
        setSuccess('Review updated!');
        setExistingReview(res.data);
        if (onReviewChanged) onReviewChanged(res.data);
        setTimeout(() => window.location.reload(), 1000);
      } else {
        res = await axios.post('https://travelease-5z19.onrender.com/api/reviews', {
          destination: destinationName,
          rating,
          comment,
          user: user?._id || user?.id || 'Anonymous',
        }, config);
        setSuccess('Review submitted!');
        setExistingReview(res.data);
        if (onReviewChanged) onReviewChanged(res.data);
        setTimeout(() => window.location.reload(), 1000);
      }
    } catch (err) {
      setError('Failed to submit review.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="review-manager">
      <h5 className="text-light mb-3">Your Review as <span style={{ color: '#ffb400' }}>{existingReview?.user?.name || user.name || 'Anonymous'}</span></h5>
      {existingReview && (
        <div className="mb-3 p-2" style={{ background: '#f7fafc', borderRadius: 8, boxShadow: '0 1px 4px rgba(53,122,189,0.07)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ color: '#357abd', fontWeight: 600 }}>Previous Rating:</span>
            {[1,2,3,4,5].map((star) => (
              <FaStar key={star} size={20} style={{ color: star <= existingReview.rating ? '#ffb400' : '#ccc' }} />
            ))}
            <span style={{ marginLeft: 8, color: '#ffb400', fontWeight: 600 }}>{existingReview.rating} / 5</span>
          </div>
          <div style={{ color: '#333', fontSize: '1.01rem' }}><span style={{ color: '#357abd', fontWeight: 600 }}>Previous Comment:</span> {existingReview.comment}</div>
        </div>
      )}
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit} className="bg-dark p-3 rounded">
        <Form.Group className="mb-3">
          <Form.Label className="text-light">Rating</Form.Label>
          <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
            {[1,2,3,4,5].map((star) => (
              <FaStar
                key={star}
                size={28}
                style={{ cursor: 'pointer', color: star <= rating ? '#ffb400' : '#ccc', transition: 'color 0.2s' }}
                onClick={() => setRating(star)}
                onMouseOver={() => setRating(star)}
                onMouseOut={() => setRating(rating)}
                data-testid={`star-${star}`}
              />
            ))}
            <span style={{ marginLeft: 10, color: '#ffb400', fontWeight: 600, fontSize: '1.1rem' }}>{rating} / 5</span>
          </div>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="text-light">Comment</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={comment}
            onChange={e => setComment(e.target.value)}
            disabled={loading}
            required
          />
        </Form.Group>
        <Button type="submit" variant="info" disabled={loading}>
          {loading ? (isUpdating ? 'Updating...' : 'Submitting...') : (isUpdating ? 'Update Review' : 'Submit Review')}
        </Button>
      </Form>
    </div>
  );
} 