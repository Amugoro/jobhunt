
import React from 'react';


const HowItWorks = () => {
  const steps = [
    "Sign up and create your profile",
    "Find and apply for jobs that suit your skills",
    "Communicate with employers",
    "Apply for the job and get hired"
  ];

  return (
    <section className="how-it-works">
      <h2>How It Works</h2>
      <ol>
        {steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
      <img src="how-it-works-image.png" alt="How It Works" />
    </section>
  );
};

export default HowItWorks;
