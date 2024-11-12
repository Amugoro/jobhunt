import React from "react";

const OurTeam = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      {/* Header Section */}
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Our Team</h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          At JobWing- SkilledHunt, our team of dedicated professionals works together in a collaborative, decentralized framework, united by a shared passion for connecting talented individuals with their dream jobs. As we drive JW SkilledHunt forward, we remain committed to our core mission, leveraging our diverse expertise and experience to fuel innovation and growth.
        </p>
      </div>

      {/* Team Categories Section */}
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* Recruitment Experts */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Recruitment Experts</h2>
          <p className="text-gray-600">
            Seasoned professionals with extensive knowledge of the job market and a proven track record in matching candidates with ideal opportunities.
          </p>
        </div>

        {/* Tech Innovators */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Tech Innovators</h2>
          <p className="text-gray-600">
            Skilled developers and designers who leverage cutting-edge technology to create a seamless and efficient recruitment experience.
          </p>
        </div>

        {/* Career Coaches */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Career Coaches</h2>
          <p className="text-gray-600">
            Experienced professionals who provide guidance and support to help candidates achieve their career goals.
          </p>
        </div>

        {/* Industry Specialists */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Industry Specialists</h2>
          <p className="text-gray-600">
            Experts in various fields who understand the unique needs of different industries and provide tailored solutions.
          </p>
        </div>

        {/* Customer Support Champions */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Customer Support Champions</h2>
          <p className="text-gray-600">
            Friendly and helpful professionals dedicated to ensuring a positive experience for all users.
          </p>
        </div>

        {/* Commitment Statement */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Our Commitment</h2>
          <p className="text-gray-600">
            Together, our team is committed to delivering exceptional results, innovation, and customer satisfaction. We strive to make a positive impact in the job market and support the community we serve.
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-blue-600 py-12">
        <div className="container mx-auto px-6 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="text-lg mb-6">
            If you'd like to learn more about our team or have a question, please don't hesitate to contact us. We'd love to hear from you!
          </p>
          <a
            href="mailto:info@jwskilledhunt.org"
            className="text-lg font-semibold hover:underline"
          >
            info@jwskilledhunt.org
          </a>
        </div>
      </div>
    </div>
  );
};

export default OurTeam;
