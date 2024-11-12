import React, { useState } from 'react';

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? null : index);
  };

  const sections = [
    {
      title: 'Introduction',
      content: `
      JobWing- SKILLEDHUNT is an online recruitment platform for professionals and tradespeople. This privacy policy explains how we collect, use, and share your personal data when you visit our website or use our services.
      `,
    },
    {
      title: 'Data We Collect',
      content: `
      We collect data in the following ways:
      - When you create an account and provide profile information
      - When you sync your address book or calendar
      - When you post or upload content
      - When you communicate with others through our services
      - When you visit our sites or use our apps
      - When others provide data about you (e.g. employers or partners)
      `,
    },
    {
      title: 'How We Use Your Data',
      content: `
      We use your data to:
      - Provide and personalize our services
      - Authorize access to our services
      - Help you connect with others
      - Send you messages and notifications
      - Serve you targeted ads
      - Develop and improve our services
      - Conduct research and analysis
      - Provide customer support
      - Ensure security and prevent fraud
      `,
    },
    {
      title: 'How We Share Information',
      content: `
      We share your data:
      - With others on our services (e.g. profile visible to all members)
      - With our affiliates and related services
      - With service providers (e.g. maintenance, analysis)
      - When required by law or to protect rights and safety
      `,
    },
    {
      title: 'Your Choices and Obligations',
      content: `
      You have choices about the data we collect and how we use it. You can:
      - Edit your profile and privacy settings
      - Opt-out of targeted ads
      - Unsubscribe from messages and notifications
      - Close your account
      `,
    },
    {
      title: 'Securing Your Data',
      content: `
      The security and confidentiality of your personal data are paramount to us. We implement advanced data storage and security protocols to safeguard your information from unauthorized access or misuse.
      `,
    },
    {
      title: 'Protecting Minors',
      content: `
      Minors accessing our website must have parental consent to submit personal data. Parents or guardians providing consent uphold this Policy concerning minors' data submission.
      `,
    },
    {
      title: 'Links to Third Parties',
      content: `
      Our website may include links to third-party services. While we review third parties' privacy policies, we do not govern their apps or services.
      `,
    },
    {
      title: 'Active Scripting & JavaScript',
      content: `
      We employ scripting to enhance website functionality, ensuring swift information delivery to you. Neither scripting technology installs software nor extracts unauthorized data from your device.
      `,
    },
    {
      title: 'Updating You on Changes',
      content: `
      As we continuously enhance our services, including adding new features, any modifications to our Policy will be promptly communicated on this page.
      `,
    },
    {
      title: 'Contact Us',
      content: `
      If you have questions or concerns, please contact us at support@jwskilledhunt.org.
      `,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold text-center mb-6">Privacy Policy</h1>
      {sections.map((section, index) => (
        <div key={index} className="border-b border-gray-300 pb-4">
          <button
            onClick={() => toggleSection(index)}
            className="w-full text-left text-lg font-medium text-blue-600 hover:text-blue-800 focus:outline-none transition duration-200"
          >
            {section.title}
          </button>
          {activeSection === index && (
            <div
              className="mt-2 text-gray-700 transition-all duration-300 ease-in-out overflow-hidden"
            >
              <p className="whitespace-pre-line">{section.content}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PrivacyPolicy;
