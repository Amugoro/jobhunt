import React from "react";
import "./CareerTips.css";

const CareerTips = () => {
  const tips = [
    {
      title: "Elevate Your Trade Skills",
      description: `Take Your Expertise to New Heights!
      Are you a skilled Tradesperson seeking to:
      Expand your services to a wider audience?
      Increase your visibility to potential clients?
      Grow your professional network?
      
      Join Our Platform Today!
      If you excel in:
      Construction
      Maintenance
      Repair
      Design
      Electrical
      Plumbing
      Carpentry
      And more!
      
      Sign Up & Complete Your Profile
      Connect with:
      Employers seeking top talent
      Clients in need of reliable services
      Other skilled Tradespeople for collaboration
      
      Benefits:
      Increased exposure for your services
      Access to diverse job opportunities
      Easy communication with clients and employers
      Verified profile for credibility
      
      Get Started Now!
      Hurry! Unlock new opportunities and take your trade skills to the next level!`,
      img: "/images/tip.jpg",
    },
    {
      title: "Unlock Global Freelance Opportunities with Jobwing- SkilledHunt",
      description: `Are you a talented freelancer in Africa looking to:
      Expand your services globally?
      Work with top international businesses?
      Get paid in foreign currency?
      
      Jobwing- SkilledHunt is your gateway to success! Our platform connects African freelancers with global companies, providing access to lucrative projects and opportunities.
      
      Benefits of partnering with Jobwing- SkilledHunt:
      - Global exposure: Reach top businesses worldwide.
      - Competitive pay: Receive payments in foreign currency.
      - Streamlined payments: Our integrated payment service ensures seamless transactions.
      - Diverse projects: Explore various industries and projects.
      
      Join JW SkilledHunt today and:
      - Create a professional profile showcasing your skills.
      - Browse and apply for international projects.
      - Get hired and work with top global clients.
      - Receive payments in foreign currency.
      
      Sign up now and take your freelance career global!`,
      img: "/images/tip1.jpg",
    },
    {
      title: "Hire with Purpose. Grow with Us",
      description: `Are you an employer or company looking to hire professional candidates, freelancers, or tradespeople? Our platform makes it easy.
      
      Simple 4-Step Process:
      1. Sign Up: Create your employer account in minutes.
      2. Post a Job: Describe your ideal candidate and job requirements.
      3. Search Profiles: Browse our database of skilled freelancers and tradespeople.
      4. Message Directly: Connect with potential hires and start conversations.
      
      Hire with Confidence
      - Access a vast pool of qualified candidates.
      - Review profiles, portfolios, and reviews.
      - Communicate directly with potential hires.
      - Streamline your hiring process.
      
      Get Started Today!`,
      img: "/images/tip3.jpg",
    },
  ];

  return (
    <section className="career-tips">
      <h2 className="text-center mb-6 text-2xl font-bold">Quick Career Tips</h2>
      <div className="slider">
        <div className="slider-track">
          {tips.concat(tips).map((tip, index) => (
            <div key={index} className="tip-card">
              <img src={tip.img} alt={tip.title} className="card-img" />
              <h3 className="card-title">{tip.title}</h3>
              <p className="card-description">{tip.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerTips;
