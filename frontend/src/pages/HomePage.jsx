import React from 'react';
import HeroSection from './home/hero';
import JobCategories from './home/Jobcategory';
import JobListing from './home/joblisting';
import ProcessSection from './home/process';
import JobSearchFilters from './home/JobSearchFilters';

function HomePage() {
  return (
    <div className="homepage">
      <HeroSection/>
      <JobSearchFilters/>
      <JobCategories/>
      <JobListing/>
      <ProcessSection/>

    </div>
  );
}

export default HomePage;
