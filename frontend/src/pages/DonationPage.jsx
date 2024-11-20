import React, { useState } from 'react';
import axios from 'axios';

const DonationPage = () => {
  const [amount, setAmount] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleDonation = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('https://jobhunt-b23g.onrender.com/api/donate', { email, amount });
      window.location.href = response.data.url; // Redirect to Stripe Checkout
    } catch (error) {
      console.error('Error processing donation:', error);
      alert('Something went wrong, please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Make a Donation</h2>
        <form onSubmit={handleDonation}>
          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              className="w-full p-2 border rounded"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Amount ($):</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Donate Now'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonationPage;
