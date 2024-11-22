const Services = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-purple-700 mb-4">
            Our Services
          </h1>
          <p className="text-lg text-gray-700">
            Discover how JobWing- SkilledHunt connects talent with opportunities.
          </p>
        </div>

        {/* Freelance Opportunities Section */}
        <section className="bg-white shadow-md rounded-lg p-8 mb-10">
          <h2 className="text-2xl font-semibold text-purple-600 mb-6">
            Unlock Global Freelance Opportunities
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Are you a talented freelancer in Africa looking to:
          </p>
          <ul className="list-disc list-inside mb-6">
            <li>Expand your services globally?</li>
            <li>Work with top international businesses?</li>
            <li>Get paid in foreign currency?</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            JobWing- SkilledHunt is your gateway to success! Our platform connects African freelancers with global companies, providing access to lucrative projects and opportunities.
          </p>
          <h3 className="text-lg font-semibold text-purple-600 mb-4">
            Benefits of partnering with JobWing- SkilledHunt:
          </h3>
          <ul className="list-disc list-inside space-y-3 mb-6">
            <li>
              <span className="font-semibold">Global exposure:</span> Reach top businesses worldwide.
            </li>
            <li>
              <span className="font-semibold">Competitive pay:</span> Receive payments in foreign currency.
            </li>
            <li>
              <span className="font-semibold">Streamlined payments:</span> Our integrated payment service ensures seamless transactions.
            </li>
            <li>
              <span className="font-semibold">Diverse projects:</span> Explore various industries and projects.
            </li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            Join JW SkilledHunt today and:
          </p>
          <ul className="list-disc list-inside mb-6">
            <li>Create a professional profile showcasing your skills.</li>
            <li>Browse and apply for international projects.</li>
            <li>Get hired and work with top global clients.</li>
            <li>Receive payments in foreign currency.</li>
          </ul>
          <p className="text-purple-600 font-bold text-center">
            Sign up now and take your freelance career global!
          </p>
        </section>

        {/* Tradesperson Services Section */}
        <section className="bg-purple-50 shadow-md rounded-lg p-8 mb-10">
          <h2 className="text-2xl font-semibold text-purple-600 mb-6">
            Tradesperson Service
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Get instant access to skilled tradespeople for your daily needs such as:
          </p>
          <ul className="list-disc list-inside mb-6">
            <li>Maintenance</li>
            <li>Construction</li>
            <li>Repair</li>
            <li>Design</li>
            <li>And many more!</li>
          </ul>
          <h3 className="text-lg font-semibold text-purple-600 mb-4">
            How It Works
          </h3>
          <ol className="list-decimal list-inside mb-6 space-y-2">
            <li>Sign up and create your profile.</li>
            <li>Post your service request.</li>
            <li>Receive quotes from interested tradespeople.</li>
            <li>Review profiles, check ratings, and select your expert.</li>
            <li>Schedule and confirm your appointment.</li>
          </ol>
          <div className="text-center">
            <button className="bg-purple-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-purple-700">
              Find a Tradesperson
            </button>
          </div>
        </section>

        {/* Additional Services Section */}
        <section className="bg-white shadow-md rounded-lg p-8 mb-10">
          <h2 className="text-2xl font-semibold text-purple-600 mb-6">
            Explore More Services
          </h2>
          <ul className="list-disc list-inside space-y-3">
            <li>
              <span className="font-semibold">Job Search:</span> Browse our extensive job listings and apply to positions that match your skills and interests.
            </li>
            <li>
              <span className="font-semibold">Resume Building:</span> Get expert help crafting a resume that showcases your strengths and experience.
            </li>
            <li>
              <span className="font-semibold">Interview Preparation:</span> Prepare for your next interview with our comprehensive resources and coaching.
            </li>
            <li>
              <span className="font-semibold">Career Coaching:</span> Work with our experienced coaches to define your career goals and create a personalized plan to achieve them.
            </li>
            <li>
              <span className="font-semibold">Employer Solutions:</span> Post job openings, access our talent pool, and leverage our expertise to find the best candidates for your team.
            </li>
          </ul>
        </section>

        {/* Candidate Services Section */}
        <section className="bg-purple-50 shadow-md rounded-lg p-8 mb-10">
          <h2 className="text-2xl font-semibold text-purple-600 mb-6">
            Candidate Services
          </h2>
          <ul className="list-disc list-inside space-y-3">
            <li>
              <span className="font-semibold">Job Matching:</span> Let us match you with job openings that fit your skills and preferences.
            </li>
            <li>
              <span className="font-semibold">Application Assistance:</span> Get help with job applications and follow-up support.
            </li>
            <li>
              <span className="font-semibold">Career Development:</span> Access resources and guidance to help you grow in your career.
            </li>
            <li>
              <span className="font-semibold">Tradesperson Career Development:</span> Get specialized guidance on advancing your trade career, including apprenticeships and continuing education.
            </li>
          </ul>
        </section>

        {/* Employer Services Section */}
        <section className="bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-purple-600 mb-6">
            Employer Services
          </h2>
          <ul className="list-disc list-inside space-y-3">
            <li>
              <span className="font-semibold">Job Posting:</span> Reach a targeted audience of skilled professionals.
            </li>
            <li>
              <span className="font-semibold">Candidate Sourcing:</span> Let us find top talent for your job openings.
            </li>
            <li>
              <span className="font-semibold">Recruitment Support:</span> Leverage our expertise to streamline your hiring process.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Services;
