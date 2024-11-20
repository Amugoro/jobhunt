import  { useState } from 'react';
import axios from 'axios';

const RateUser = ({ userId, userType }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleSubmitRating = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        'http://localhost:5000/api/client/rate',
        { userId, userType, rating, review },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Rating submitted successfully');
    } catch (error) {
      console.error('Failed to submit rating');
    }
  };

  return (
    <div className="mt-4">
      <input
        type="number"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        max="5"
        min="1"
        className="border p-2 rounded"
      />
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Write your review..."
        className="w-full p-2 border rounded mt-2"
      />
      <button onClick={handleSubmitRating} className="bg-yellow-500 text-white p-2 rounded mt-2">
        Submit Rating
      </button>
    </div>
  );
};

export default RateUser;
