import { FcCheckmark } from "react-icons/fc";

const Aboutus = () => {
  return (
    <div className="bg-gray-50 py-12">
      {/* <!-- Start About us --> */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Welcome to JW SkilledHunt
          </h2>
          <p className="text-lg text-gray-600">
            <span className="font-semibold text-indigo-600">JW SKILLEDHUNT</span> is an online non-profit platform for professionals and skilled workers. At JW SkilledHunt, we bridge the gap between talented individuals and top companies. Our mission is to revolutionize the recruitment process by providing a seamless and efficient experience for both job seekers and employers.
          </p>
        </div>

        {/* Our Story Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Story</h2>
          <p className="text-gray-600 leading-relaxed">
            In September 2022, JW SkilledHunt was founded with a mission to empower Jehovah's Witnesses who faced job loss during the pandemic. Our team of seasoned recruitment experts was driven to harness the power of technology and innovation, creating a platform that connects talented individuals with their ideal career opportunities. We're dedicated to making a positive impact in the job market and fostering a supportive community for our users.
          </p>
        </div>

        {/* Our Values Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Values</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <FcCheckmark className="text-xl mr-2" />
              <p><span className="font-semibold text-gray-800">Quality:</span> We prioritize quality over quantity, ensuring that every candidate and job posting meets our high standards.</p>
            </div>
            <div className="flex items-start">
              <FcCheckmark className="text-xl mr-2" />
              <p><span className="font-semibold text-gray-800">Innovation:</span> We embrace cutting-edge technology and creative solutions to stay ahead in the recruitment landscape.</p>
            </div>
            <div className="flex items-start">
              <FcCheckmark className="text-xl mr-2" />
              <p><span className="font-semibold text-gray-800">Integrity:</span> We operate with transparency, honesty, and ethical practices in everything we do.</p>
            </div>
            <div className="flex items-start">
              <FcCheckmark className="text-xl mr-2" />
              <p><span className="font-semibold text-gray-800">Diversity:</span> We celebrate individuality and promote inclusivity, recognizing the strength in a diverse workforce.</p>
            </div>
          </div>
        </div>

        {/* Our Goal Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Goal</h2>
          <p className="text-gray-600 leading-relaxed">
            Our goal is to become the go-to recruitment platform for skilled professionals and top companies worldwide. We strive to make a positive impact on people's lives by facilitating meaningful connections and career growth.
          </p>
        </div>

        {/* Join Us Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Join Us</h2>
          <p className="text-gray-600 leading-relaxed">
            Whether you're a job seeker looking for your next challenge or an employer seeking top talent, we invite you to join the JW SkilledHunt community today.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Aboutus;
