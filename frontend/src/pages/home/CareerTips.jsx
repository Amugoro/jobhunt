import { useState } from "react";
import "./CareerTips.css";

const CareerTips = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const tips = [
    {
      img: "/images/tip.jpg",
    },
    {
      img: "/images/tip4.jpg",
    },
    {
      img: "/images/tip5.jpg",
    },
    {
      img: "/images/tip6.jpg",
    },
    {
      img: "/images/tip9.jpg",
    },
    {
      img: "/images/tip0.jpg",
    },
  ];

  const toggleExpanded = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
        <section className="career-tips items-center">
          <h1 className="text-center mb-6 text-2xl font-bold bg-purple-600 pt-10 text-white">
            What we mean by Trade Person
          </h1>
          <p className="text-center mb-6 text-lg font-semibold">
            Connect with Top Tradespeople
          </p>
          <div
            className={`slider ${isPaused ? "paused" : ""}`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="slider-track">
              {tips.concat(tips).map((tip, index) => (
                <div key={index} className="tip-card">
                  <img src={tip.img} alt={tip.title} className="card-img" />
                  <h3 className="card-title text-xl font-bold mt-4">
                    {tip.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
       
          <section className="bg-purple-50 shadow-lg rounded-xl p-10 mb-12">
          <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">
            Elevate Your Trade Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
            {/* Left Column */}
            <div className="shadow-lg bg-white p-4">
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                Take Your Expertise to New Heights! Are you a skilled Tradesperson seeking to:
              </p>
              <ul className="list-disc list-inside space-y-4 text-gray-800">
                <li>Expand your services to a wider audience?</li>
                <li>Increase your visibility to potential clients?</li>
                <li>Grow your professional network?</li>
              </ul>
              <p className="mt-6 text-lg text-gray-700 leading-relaxed ">
                Join Our Platform Today! If you excel in:
              </p>
              <ul className="list-disc list-inside mt-4 space-y-4 text-gray-800">
                <li>Construction</li>
                <li>Maintenance</li>
                <li>Repair</li>
                <li>Design</li>
                <li>Electrical</li>
                <li>Plumbing</li>
                <li>Carpentry</li>
                <li>And more!</li>
              </ul>
            </div>
            {/* Right Column */}
            <div className="text-lg text-gray-700 leading-relaxed shadow-lg bg-white p-4">
              <p className="text-lg text-gray-700 leading-relaxed ">
                <strong>Sign Up & Complete Your Profile</strong> to connect with:
              </p>
              <ul className="list-disc list-inside mt-4 space-y-4 text-gray-800">
                <li>Employers seeking top talent</li>
                <li>Clients in need of reliable services</li>
                <li>Other skilled Tradespeople for collaboration</li>
              </ul>
              <p className="mt-6 text-lg text-gray-700 leading-relaxed">
                <strong>Benefits:</strong>
              </p>
              <ul className="list-disc list-inside mt-4 space-y-4 text-gray-800">
                <li>Increased exposure for your services</li>
                <li>Access to diverse job opportunities</li>
                <li>Easy communication with clients and employers</li>
                <li>Verified profile for credibility</li>
              </ul>
            </div>
          </div>
          <div className="mt-10 text-center shadow-lg bg-white p-4">
            <p className="text-lg text-gray-700 leading-relaxed font-semibold">
              Get Started Now! Hurry! Unlock new opportunities and take your trade skills to the next level!
            </p>
            <button className="mt-6 px-6 py-3 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition duration-300">
            <a href='/signup'>Join Our Platform</a>
            </button>
          </div>
        </section>
        
        
      </section>
      
   
  );
};

export default CareerTips;
