import React from 'react';

const Freelance = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Header Section */}
      <div className="relative w-full bg-purple-700 text-white text-center py-16 px-4">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
          Unlock Global Freelance Opportunities with Jobwing- SkilledHunt
        </h1>
        <p className="mt-4 text-lg md:text-xl">
          Your gateway to connecting with top international businesses and elevating your freelance career.
        </p>
      </div>

      {/* Image Section */}
      <div className="w-full max-w-5xl px-4 py-8">
        <img
          src="/images/tip1.jpg"
          alt="Global Freelance Opportunities"
          className="rounded-lg shadow-lg"
        />
      </div>

      {/* Content Section */}
      <div className="w-full max-w-6xl px-6 py-8 bg-white rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div>
            <p className="text-lg md:text-xl leading-relaxed text-gray-700">
              Are you a talented freelancer in Africa looking to:
            </p>
            <ul className="list-disc list-inside mt-4 text-gray-700 space-y-2">
              <li>Expand your services globally?</li>
              <li>Work with top international businesses?</li>
              <li>Get paid in foreign currency?</li>
            </ul>
            <p className="mt-6 text-lg md:text-xl text-gray-700">
              <strong>Jobwing- SkilledHunt</strong> is your gateway to success! Our platform connects African freelancers with global companies, providing access to lucrative projects and opportunities.
            </p>
          </div>

          {/* Right Column */}
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
              Benefits of partnering with Jobwing- SkilledHunt:
            </h2>
            <ul className="list-disc list-inside mt-4 text-gray-700 space-y-2">
              <li><strong>Global exposure:</strong> Reach top businesses worldwide.</li>
              <li><strong>Competitive pay:</strong> Receive payments in foreign currency.</li>
              <li><strong>Streamlined payments:</strong> Our integrated payment service ensures seamless transactions.</li>
              <li><strong>Diverse projects:</strong> Explore various industries and projects.</li>
            </ul>
          </div>
        </div>

        {/* Join Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {/* Left Column */}
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
              Join JW SkilledHunt today and:
            </h2>
            <ul className="list-disc list-inside mt-4 text-gray-700 space-y-2">
              <li>Create a professional profile showcasing your skills.</li>
              <li>Browse and apply for international projects.</li>
              <li>Get hired and work with top global clients.</li>
              <li>Receive payments in foreign currency.</li>
            </ul>
          </div>

          {/* Right Column */}
          <div className="flex items-center justify-center">
            <div className="text-center">
              <p className="text-lg md:text-xl font-semibold text-gray-700">
                Sign up now and take your freelance career global!
              </p>
              <button className="mt-6 px-6 py-3 bg-purple-700 text-white rounded-lg shadow-lg hover:bg-green-600 transition duration-300">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Freelance;
