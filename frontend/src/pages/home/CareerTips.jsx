import { useState } from "react";
import "./CareerTips.css";

const CareerTips = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const tips = [
    {
      title: "Elevate Your Trade Skills",
      description: `Take Your Expertise to New Heights!\n\nAre you a skilled Tradesperson seeking to:\n\n- Expand your services to a wider audience?\n- Increase your visibility to potential clients?\n- Grow your professional network?\n\nJoin Our Platform Today!\n\nIf you excel in:\n\n- Construction\n- Maintenance\n- Repair\n- Design\n- Electrical\n- Plumbing\n- Carpentry\n- And more!\n\nSign Up & Complete Your Profile.\n\nConnect with:\n\n- Employers seeking top talent\n- Clients in need of reliable services\n- Other skilled Tradespeople for collaboration\n\n**Benefits**:\n\n- Increased exposure for your services\n- Access to diverse job opportunities\n- Easy communication with clients and employers\n- Verified profile for credibility\n\nGet Started Now!\n\nHurry! Unlock new opportunities and take your trade skills to the next level!`,
      img: "/images/tip.jpg",
    },
    {
      title: "Unlock Global Freelance Opportunities with Jobwing- SkilledHunt",
      description: `Are you a talented freelancer in Africa looking to:\n\n- Expand your services globally?\n- Work with top international businesses?\n- Get paid in foreign currency?\n\n**Jobwing- SkilledHunt** is your gateway to success! Our platform connects African freelancers with global companies, providing access to lucrative projects and opportunities.\n\n**Benefits of partnering with Jobwing- SkilledHunt**:\n\n- Global exposure: Reach top businesses worldwide.\n- Competitive pay: Receive payments in foreign currency.\n- Streamlined payments: Our integrated payment service ensures seamless transactions.\n- Diverse projects: Explore various industries and projects.\n\nJoin JW SkilledHunt today and:\n\n- Create a professional profile showcasing your skills.\n- Browse and apply for international projects.\n- Get hired and work with top global clients.\n- Receive payments in foreign currency.\n\nSign up now and take your freelance career global!`,
      img: "/images/tip1.jpg",
    },
    {
      title: "Hire with Purpose. Grow with Us",
      description: `Are you an employer or company looking to hire professional candidates, freelancers, or tradespeople? Our platform makes it easy.\n\n**Simple 4-Step Process**:\n\n1. Sign Up: Create your employer account in minutes.\n2. Post a Job: Describe your ideal candidate and job requirements.\n3. Search Profiles: Browse our database of skilled freelancers and tradespeople.\n4. Message Directly: Connect with potential hires and start conversations.\n\n**Hire with Confidence**:\n\n- Access a vast pool of qualified candidates.\n- Review profiles, portfolios, and reviews.\n- Communicate directly with potential hires.\n- Streamline your hiring process.\n\nGet Started Today!`,
      img: "/images/tip3.jpg",
    },
  ];

  const toggleExpanded = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="career-tips">
      <h1 className="text-center mb-6 text-2xl font-bold bg-purple-600 pt-10 text-white">
        Get Started
      </h1>
      <p className="text-center mb-6 text-lg font-semibold">
        Connect with Top Employers, Freelancers, and Tradespeople
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
          <h3 className="card-title text-xl font-bold mt-4">{tip.title}</h3>
          <p className="card-description">
            {expandedIndex === index || tip.description.length <= 300
              ? tip.description.split("\n\n").map((paragraph, i) => (
                  <span key={i} className="block mb-3">
                    {paragraph}
                  </span>
                ))
              : `${tip.description.slice(0, 300)}...`}
          </p>
          {tip.description.length > 300 && (
            <button
              onClick={() => toggleExpanded(index)}
              className="read-more text-purple-600 font-semibold mt-2"
            >
              {expandedIndex === index ? "Show Less" : "Read More"}
            </button>
          )}
        </div>
      ))}
    </div>
      </div>
    </section>
  );
};

export default CareerTips;
