import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-semibold text-gray-800">Privacy Policy</h1>
        <p className="text-lg text-gray-600">Your privacy is important to us. Please read our policy to understand how we handle your data.</p>
      </div>

      {/* Introduction Card */}
      <div className="bg-white shadow-md rounded-lg mb-6 p-6">
        <h2 className="text-2xl font-semibold text-gray-800">Introduction</h2>
        <p className="text-gray-700">
          JobWing- SKILLEDHUNT is an online recruitment platform for professionals and tradespeople. This privacy policy explains how we collect, use, and share your personal data when you visit our website or use our services.
        </p>
      </div>

      {/* Data We Collect */}
      <div className="bg-white shadow-md rounded-lg mb-6 p-6">
        <h2 className="text-2xl font-semibold text-gray-800">Data We Collect</h2>
        <ul className="list-disc pl-6 text-gray-700">
          <li>When you create an account and provide profile information</li>
          <li>When you sync your address book or calendar</li>
          <li>When you post or upload content</li>
          <li>When you communicate with others through our services</li>
          <li>When you visit our sites or use our apps</li>
          <li>When others provide data about you (e.g. employers or partners)</li>
        </ul>
      </div>

      {/* How We Use Your Data */}
      <div className="bg-white shadow-md rounded-lg mb-6 p-6">
        <h2 className="text-2xl font-semibold text-gray-800">How We Use Your Data</h2>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Provide and personalize our services</li>
          <li>Authorize access to our services</li>
          <li>Help you connect with others</li>
          <li>Send you messages and notifications</li>
          <li>Serve you targeted ads</li>
          <li>Develop and improve our services</li>
          <li>Conduct research and analysis</li>
          <li>Provide customer support</li>
          <li>Ensure security and prevent fraud</li>
        </ul>
      </div>

      {/* How We Share Information */}
      <div className="bg-white shadow-md rounded-lg mb-6 p-6">
        <h2 className="text-2xl font-semibold text-gray-800">How We Share Information</h2>
        <ul className="list-disc pl-6 text-gray-700">
          <li>With others on our services (e.g. profile visible to all members)</li>
          <li>With our affiliates and related services</li>
          <li>With service providers (e.g. maintenance, analysis)</li>
          <li>When required by law or to protect rights and safety</li>
        </ul>
      </div>

      {/* Your Choices and Obligations */}
      <div className="bg-white shadow-md rounded-lg mb-6 p-6">
        <h2 className="text-2xl font-semibold text-gray-800">Your Choices and Obligations</h2>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Edit your profile and privacy settings</li>
          <li>Opt-out of targeted ads</li>
          <li>Unsubscribe from messages and notifications</li>
          <li>Close your account</li>
        </ul>
      </div>

      {/* Managing Your Data */}
      <div className="bg-white shadow-md rounded-lg mb-6 p-6">
        <h2 className="text-2xl font-semibold text-gray-800">Managing Your Data</h2>
        <p className="text-gray-700">
          JobWing- SKILLEDHUNT is an online recruitment platform supporting Job seekers in their job search and assisting employers with hiring needs. By engaging with our website, you agree to the storage of your personal data on servers in the United States/ Nigeria and its collection, processing, transfer, and storage by the JobWing- SKILLEDHUNT Team across different countries. The entity responsible for your personal data varies based on your interactions with the website, be it making a donation or initiating contact through unsolicited applications.
        </p>
      </div>

      {/* Securing Your Data */}
      <div className="bg-white shadow-md rounded-lg mb-6 p-6">
        <h2 className="text-2xl font-semibold text-gray-800">Securing Your Data</h2>
        <p className="text-gray-700">
          The security and confidentiality of your personal data are paramount to us. We implement advanced data storage and security protocols to safeguard your information from unauthorized access or misuse. All personnel handling personal data and third parties involved in processing your information are bound by confidentiality agreements. Your personal data is retained for a reasonable time or to comply with legal obligations.
        </p>
      </div>

      {/* Protecting Minors */}
      <div className="bg-white shadow-md rounded-lg mb-6 p-6">
        <h2 className="text-2xl font-semibold text-gray-800">Protecting Minors</h2>
        <p className="text-gray-700">
          Minors accessing our website must have parental consent to submit personal data. Parents or guardians providing consent uphold this Policy concerning minors' data submission.
        </p>
      </div>

      {/* Links to Third Parties */}
      <div className="bg-white shadow-md rounded-lg mb-6 p-6">
        <h2 className="text-2xl font-semibold text-gray-800">Links to Third Parties</h2>
        <p className="text-gray-700">
          Our website may include links to third-party services. While we review third parties' privacy policies, we do not govern their apps or services. Hence, it is advisable to review their terms before engaging with them.
        </p>
      </div>

      {/* Active Scripting & JavaScript */}
      <div className="bg-white shadow-md rounded-lg mb-6 p-6">
        <h2 className="text-2xl font-semibold text-gray-800">Active Scripting & JavaScript</h2>
        <p className="text-gray-700">
          We employ scripting to enhance website functionality, ensuring swift information delivery to you. Neither scripting technology installs software nor extracts unauthorized data from your device. Enabling JavaScript boosts optimal website performance, and most browsers allow it to be enabled or disabled for specific sites.
        </p>
      </div>

      {/* Updating You on Changes */}
      <div className="bg-white shadow-md rounded-lg mb-6 p-6">
        <h2 className="text-2xl font-semibold text-gray-800">Updating You on Changes</h2>
        <p className="text-gray-700">
          As we continuously enhance our services, including adding new features, any modifications to our Policy will be promptly communicated on this page. Be informed of the information collected and utilized through our Policy updates. You can contact us with questions or concerns.
        </p>
      </div>

      {/* Contact Information */}
      <div className="bg-white shadow-md rounded-lg mb-6 p-6">
        <h2 className="text-2xl font-semibold text-gray-800">Contact Us</h2>
        <p className="text-gray-700">
          If you have any questions or concerns about this Privacy Policy, please contact us at support@jwskilledhunt.org.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
