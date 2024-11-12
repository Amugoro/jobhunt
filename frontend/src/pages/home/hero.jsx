/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import SearchBar from "./Searchbar";

export default function HeroSection() {
  return (
    <section className="relative z-0 py-52 bg-blue-700 md:min-h-[130vh] min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="bg bg-no-repeat inset-0 absolute bg-center z-[-1] ">
        <img
          src="/images/hero-bg.png"
          alt="Background shape"
          className="absolute block -bottom-5 dark:hidden w-full"
        />
      </div>
      
      <div className="container relative mx-auto px-4 text-center">
        {/* Hero Heading */}
        <h1 className="mb-3 text-5xl md:text-4xl text-white font-semibold leading-tight">
          Search Between More Than
          <br />
          <span className="text-primary">10,000+</span> Open Jobs.
        </h1>
        <p className="text-white text-lg md:text-base mt-3">
          Find jobs, create trackable resumes, and enrich your applications.
        </p>

        {/* Search Bar */}
        <div className="flex justify-center w-full mt-10">
          <SearchBar />
        </div>

        {/* Trending Keywords */}
        <div className="mt-4">
          <ul className="text-center flex gap-4 items-center justify-center flex-wrap text-white">
            <li>
              <i className="text-lg text-primary mdi mdi-tag-multiple-outline"></i>
              Trending Keywords:
            </li>
            <li className="text-white/50 hover:text-white">
              <a href="#">Design,</a>
            </li>
            <li className="text-white/50 hover:text-white">
              <a href="#">Development,</a>
            </li>
            <li className="text-white/50 hover:text-white">
              <a href="#">Manager,</a>
            </li>
            <li className="text-white/50 hover:text-white">
              <a href="#">Senior</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Background Images */}
      <img
        src="/images/bg-shape.png"
        alt="Background shape"
        className="absolute block -bottom-5 dark:hidden w-full"
      />
      <div className="absolute block -bottom-5 w-full bg-blue-900 opacity-80 ">
      <img
        src="/images/bg-shape-dark.png"
        alt="Dark background shape"
        className="absolute hidden -bottom-5 dark:block w-full"
      />
      </div>
    </section>
  );
}
