import React from 'react';

const Client = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Header Section */}
      <div className="relative w-full bg-purple-700 text-white text-center py-16 px-4">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
          Hire with Purpose. Grow with Us
        </h1>
        <p className="mt-4 text-lg md:text-xl">
          Discover the easiest way to hire skilled professionals, freelancers, and tradespeople.
        </p>
      </div>

      {/* Image Section */}
      <div className="w-full max-w-5xl px-4 py-8">
        <img
          src="/images/tip3.jpg" // Replace with the actual image path
          alt="Hiring Process Illustration"
          className="rounded-lg shadow-lg"
        />
      </div>

      {/* Content Section */}
      <div className="w-full max-w-6xl px-6 py-8 bg-white rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
              Simple 4-Step Process:
            </h2>
            <ul className="list-decimal list-inside mt-4 text-gray-700 space-y-2">
              <li>
                <strong>Sign Up:</strong> Create your employer account in minutes.
              </li>
              <li>
                <strong>Post a Job:</strong> Describe your ideal candidate and job requirements.
              </li>
              <li>
                <strong>Search Profiles:</strong> Browse our database of skilled freelancers and tradespeople.
              </li>
              <li>
                <strong>Message Directly:</strong> Connect with potential hires and start conversations.
              </li>
            </ul>
          </div>

          {/* Right Column */}
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
              Hire with Confidence
            </h2>
            <ul className="list-disc list-inside mt-4 text-gray-700 space-y-2">
              <li>Access a vast pool of qualified candidates.</li>
              <li>Review profiles, portfolios, and reviews.</li>
              <li>Communicate directly with potential hires.</li>
              <li>Streamline your hiring process.</li>
            </ul>
          </div>
        </div>

        {/* Footer Call-to-Action */}
        <div className="mt-12 text-center">
          <p className="text-lg md:text-xl font-semibold text-gray-700">
            Get started today and find the right talent for your business needs!
          </p>
          <button className="mt-6 px-6 py-3 bg-purple-700 text-white rounded-lg shadow-lg hover:bg-green-600 transition duration-300">
            Start Hiring
          </button>
        </div>
      </div>
    </div>
  );
};

export default Client;
