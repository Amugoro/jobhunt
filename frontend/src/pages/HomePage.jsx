import React from 'react';
import HeroSection from './home/hero';
import JobCategories from './home/Jobcategory';
import Client from './home/joblisting';
import Freelance from './home/process';
import JobSearchFilters from './home/JobSearchFilters';
import CareerTips from './home/CareerTips';
import FloatingSupport from './home/FloatingSupport';

function HomePage() {
  return (
    <div className="homepage">
      <HeroSection/>
      <JobSearchFilters/>
      <JobCategories/>
      <Client/>
      <Freelance/>
      <CareerTips />
      <FloatingSupport />
    </div>
  );
}

export default HomePage;
