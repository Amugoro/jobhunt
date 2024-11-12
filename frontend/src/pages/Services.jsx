import React from "react";
import { ImCheckmark } from "react-icons/im";

export default function Services() {
  return (
    <div>
      <div className="main-content">
        <div className="page-content">
          <section className="services-section bg-gray-100 py-16">
            <div className="container mx-auto px-4">
              <div className="services-grid grid md:grid-cols-1 lg:grid-cols-1 gap-10">
                
                {/* Main Introduction */}
                <div className="service-list bg-white p-6 rounded-lg shadow-lg">
                  <p className="intro-text mb-4 text-gray-700">
                    At{" "}
                    <span className="highlighted-text font-bold text-blue-600">
                      JW SKILLEDHUNT
                    </span>
                    , we offer a range of services designed to connect talented
                    individuals with their dream jobs and support employers in
                    finding top talent. Our services include:
                  </p>

                  <ul className="about-list space-y-3">
                    <li className="flex items-start gap-2">
                      <ImCheckmark className="text-green-500 mt-1" />
                      <span>
                        <span className="service-title font-semibold">
                          Job Search:
                        </span>{" "}
                        Browse our extensive job listings and apply to positions that match your skills and interests.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ImCheckmark className="text-green-500 mt-1" />
                      <span>
                        <span className="service-title font-semibold">
                          Resume Building:
                        </span>{" "}
                        Get expert help crafting a resume that showcases your strengths and experience.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ImCheckmark className="text-green-500 mt-1" />
                      <span>
                        <span className="service-title font-semibold">
                          Interview Preparation:
                        </span>{" "}
                        Prepare for your next interview with our comprehensive resources and coaching.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ImCheckmark className="text-green-500 mt-1" />
                      <span>
                        <span className="service-title font-semibold">
                          Career Coaching:
                        </span>{" "}
                        Work with our experienced coaches to define your career goals and create a personalized plan to achieve them.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ImCheckmark className="text-green-500 mt-1" />
                      <span>
                        <span className="service-title font-semibold">
                          Employer Solutions:
                        </span>{" "}
                        Post job openings, access our talent pool, and leverage our expertise to find the best candidates for your team.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Candidate Services */}
                <div className="service-list bg-white p-6 rounded-lg shadow-lg">
                  <h5 className="section-title text-xl font-bold mb-4 text-blue-600">
                    Candidate Services
                  </h5>

                  <ul className="about-list space-y-3">
                    <li className="flex items-start gap-2">
                      <ImCheckmark className="text-green-500 mt-1" />
                      <span>
                        <span className="service-title font-semibold">
                          Job Matching:
                        </span>{" "}
                        Let us match you with job openings that fit your skills and preferences.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ImCheckmark className="text-green-500 mt-1" />
                      <span>
                        <span className="service-title font-semibold">
                          Application Assistance:
                        </span>{" "}
                        Get help with job applications and follow-up support.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Employer Services */}
                <div className="service-list bg-white p-6 rounded-lg shadow-lg">
                  <h5 className="section-title text-xl font-bold mb-4 text-blue-600">
                    Employer Services
                  </h5>

                  <ul className="about-list space-y-3">
                    <li className="flex items-start gap-2">
                      <ImCheckmark className="text-green-500 mt-1" />
                      <span>
                        <span className="service-title font-semibold">
                          Job Posting:
                        </span>{" "}
                        Reach a targeted audience of skilled professionals.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ImCheckmark className="text-green-500 mt-1" />
                      <span>
                        <span className="service-title font-semibold">
                          Candidate Sourcing:
                        </span>{" "}
                        Let us find top talent for your job openings.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Why Choose Us Section */}
                <div className="service-list bg-white p-6 rounded-lg shadow-lg">
                  <h5 className="section-title text-xl font-bold mb-4 text-blue-600">
                    Why Choose JW SKILLEDHUNT?
                  </h5>

                  <ul className="about-list space-y-3">
                    <li className="flex items-start gap-2">
                      <ImCheckmark className="text-green-500 mt-1" />
                      <span>
                        <span className="service-title font-semibold">
                          Expertise:
                        </span>{" "}
                        Access a wide range of skilled professionals.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ImCheckmark className="text-green-500 mt-1" />
                      <span>
                        <span className="service-title font-semibold">
                          Personalized Support:
                        </span>{" "}
                        We understand your unique needs and goals.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ImCheckmark className="text-green-500 mt-1" />
                      <span>
                        <span className="service-title font-semibold">
                          Innovative Technology:
                        </span>{" "}
                        Using the latest tech for efficient recruitment.
                      </span>
                    </li>
                  </ul>

                  {/* Call to Action */}
                  <div className="cta-section mt-6">
                    <p className="cta-text text-gray-700 mb-4">
                      Click below to explore our services.
                    </p>
                    <a
                      href="/register"
                      className="cta-button bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-300"
                    >
                      Get Started
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
