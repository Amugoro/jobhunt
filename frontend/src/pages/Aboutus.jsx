const AboutUs = () => {
  return (
    <div className="bg-gray-100 min-h-screen ">
      <div className="container mx-auto px-6 py-12">
       
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-purple-700 mb-4">
            Welcome to JobWing- SkilledHunt
          </h1>
          <p className="text-lg text-gray-700">
            Your trusted online recruitment platform for professionals and tradespeople.
          </p>
        </div>

        {/* About Section */}
        <section className="bg-white shadow-md rounded-lg p-8 mb-10">
          <h2 className="text-2xl font-semibold text-purple-600 mb-6">
            About Us
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            JobWing- SKILLEDHUNT is an online recruitment platform for professionals and tradespeople. At JobWing- SkilledHunt, we bridge the gap between talented individuals and top companies. Our mission is to revolutionize the recruitment process by providing a seamless and efficient experience for both job seekers and employers.
          </p>
        </section>

        {/* Values Section */}
        <section className="bg-purple-50 shadow-md rounded-lg p-8 mb-10">
          <h2 className="text-2xl font-semibold text-purple-600 mb-6">
            Our Values
          </h2>
          <ul className="list-disc list-inside space-y-3">
            <li>
              <span className="font-semibold">Quality:</span> We prioritize quality over quantity, ensuring that every candidate and job posting meets our high standards.
            </li>
            <li>
              <span className="font-semibold">Innovation:</span> We embrace cutting-edge technology and creative solutions to stay ahead in the recruitment landscape.
            </li>
            <li>
              <span className="font-semibold">Integrity:</span> We operate with transparency, honesty, and ethical practices in everything we do.
            </li>
            <li>
              <span className="font-semibold">Diversity:</span> We celebrate individuality and promote inclusivity, recognizing the strength in a diverse workforce.
            </li>
          </ul>
        </section>

        {/* Goal Section */}
        <section className="bg-white shadow-md rounded-lg p-8 mb-10">
          <h2 className="text-2xl font-semibold text-purple-600 mb-6">
            Our Goal
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our goal is to become the go-to recruitment platform for skilled workers and top companies worldwide. We strive to make a positive impact on people's lives by facilitating meaningful connections and career growth.
          </p>
        </section>

        {/* Call to Action Section */}
        <section className="bg-purple-600 text-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-6">Join Us</h2>
          <p className="leading-relaxed mb-6">
            Whether you're a job seeker looking for your next challenge or an employer seeking top talent, we invite you to join the JobWing- SkilledHunt community today.
          </p>
          <div className="text-center">
            <button className="bg-white text-purple-600 font-bold py-2 px-6 rounded-lg shadow-md hover:bg-purple-100">
              Get Started
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
