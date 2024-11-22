const OurTeam = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Page Container */}
      <div className="container mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-purple-700 mb-4">
            Meet Our Team
          </h1>
          <p className="text-lg text-gray-700">
            At JobWing- SkilledHunt, we collaborate with passion and purpose to connect talent with opportunity.
          </p>
        </div>

        {/* Intro Section */}
        <section className="bg-white shadow-md rounded-lg p-8 mb-10">
          <p className="text-gray-700 leading-relaxed">
            Our team of dedicated professionals works together in a collaborative, decentralized framework, united by a shared passion for connecting talented individuals with their dream jobs. 
            As we drive JW SkilledHunt forward, we remain committed to our core mission, leveraging our diverse expertise and experience to fuel innovation and growth.
          </p>
        </section>

        {/* Team Roles Section */}
        <section>
          <h2 className="text-2xl font-semibold text-purple-600 mb-6">
            Our Diverse and Experienced Team Includes:
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Recruitment Experts */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-lg font-bold text-purple-600 mb-4">
                Recruitment Experts
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Seasoned professionals with extensive knowledge of the job market and a proven track record in matching candidates with ideal opportunities.
              </p>
            </div>

            {/* Tech Innovators */}
            <div className="bg-purple-50 shadow-md rounded-lg p-6">
              <h3 className="text-lg font-bold text-purple-600 mb-4">
                Tech Innovators
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Skilled developers and designers who leverage cutting-edge technology to create a seamless and efficient recruitment experience.
              </p>
            </div>

            {/* Career Coaches */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-lg font-bold text-purple-600 mb-4">
                Career Coaches
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Experienced professionals who provide guidance and support to help candidates achieve their career goals.
              </p>
            </div>

            {/* Industry Specialists */}
            <div className="bg-purple-50 shadow-md rounded-lg p-6">
              <h3 className="text-lg font-bold text-purple-600 mb-4">
                Industry Specialists
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Experts in various fields who understand the unique needs of different industries and provide tailored solutions.
              </p>
            </div>

            {/* Customer Support Champions */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-lg font-bold text-purple-600 mb-4">
                Customer Support Champions
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Friendly and helpful professionals dedicated to ensuring a positive experience for all users.
              </p>
            </div>
          </div>
        </section>

        {/* Closing Section */}
        <section className="bg-purple-50 shadow-md rounded-lg p-8 mt-12">
          <h2 className="text-2xl font-semibold text-purple-600 mb-4">
            Together, We Make an Impact
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Our team is committed to delivering exceptional results, innovation, and customer satisfaction. We strive to make a positive impact in the job market and support the community we serve.
          </p>
        </section>

        {/* Contact Section */}
        <section className="text-center mt-12">
          <h3 className="text-xl font-semibold text-purple-600 mb-4">
            Get in Touch
          </h3>
          <p className="text-gray-700 mb-4">
            If you'd like to learn more about our team or have a question, please don't hesitate to contact us. We'd love to hear from you!
          </p>
          <p className="text-purple-700 font-bold">
            <a href="mailto:info@jwskilledhunt.org">info@jwskilledhunt.org</a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default OurTeam;
