
import React from 'react';
import './CareerTips.css';

const CareerTips = () => {
  const tips = [
    { title: "How to Improve Your Skills", description: "Tips on improving skills", img: "tips1.jpg" },
    { title: "Resume Tips", description: "Craft a resume that stands out", img: "tips2.jpg" },
    { title: "Interview Preparation", description: "Prepare for your interviews", img: "tips3.jpg" }
  ];

  return (
    <section className="career-tips">
      <h2>Quick Career Tips</h2>
      <div className="tips-grid">
        {tips.map((tip, index) => (
          <div key={index} className="tip-card">
            <img src={tip.img} alt={tip.title} />
            <h3>{tip.title}</h3>
            <p>{tip.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CareerTips;
