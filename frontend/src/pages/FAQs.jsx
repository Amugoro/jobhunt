import { useState } from "react";

const FAQS = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);

  const toggleQuestion = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "What is JW SkilledHunt, and how does it work?",
          answer:
            "JobWing- SkilledHunt is an online recruitment platform that connects job seekers with employers. Create an account, search for jobs, and apply or post job openings to find the right talent.",
        },
        {
          question: "Who can use JW SkilledHunt?",
          answer: "Individuals from all backgrounds are welcome to use the platform.",
        },
        {
          question: "Do I need to create an account to use JW SkilledHunt?",
          answer:
            "Yes, creating an account allows you to save job postings, apply for jobs, and post job openings.",
        },
      ],
    },
    {
      category: "Accounts and Support",
      questions: [
        {
          question: "How do I create an account?",
          answer: "Click 'Sign Up' and fill out the registration form.",
        },
        {
          question: "What if I forgot my password?",
          answer: "Click 'Forgot Password' and follow the reset instructions.",
        },
        {
          question: "How do I contact JW SkilledHunt support?",
          answer: "Email us at support@jwskilledhunt.org or use our online form.",
        },
      ],
    },
    {
      category: "Job Seekers",
      questions: [
        {
          question: "How do I search for jobs?",
          answer:
            "Use our job search bar to find openings by keyword, location, or category.",
        },
        {
          question: "How do I apply for a job?",
          answer: "Click the 'Apply' button on the job posting and follow the application instructions.",
        },
        {
          question: "Can I save job postings for later?",
          answer: "Yes, create an account and save job postings to your dashboard for easy access.",
        },
        {
          question: "Can I apply for multiple jobs at once?",
          answer: "Yes, you can apply for multiple jobs with one application.",
        },
        {
          question: "How do I know if an employer has viewed my application?",
          answer: "You'll receive a notification when an employer views your application.",
        },
      ],
    },
    {
      category: "Employers",
      questions: [
        {
          question: "How do I post a job opening?",
          answer:
            "Create an account, click 'Find Me Candidates,' and fill out the job description form.",
        },
        {
          question: "How do I manage job applications?",
          answer: "Log in to your account to view and manage applications for your job postings.",
        },
        {
          question: "Can I manage multiple job postings at once?",
          answer: "Yes, use our employer dashboard to manage all your job postings.",
        },
        {
          question: "How do I contact job applicants?",
          answer: "Use our messaging system to contact applicants directly.",
        },
        {
          question: "What if I need help with recruitment?",
          answer:
            "Contact our support team for assistance with finding the best candidates.",
        },
      ],
    },
    {
      category: "Support and Donation",
      questions: [
        {
          question: "What payment methods do you accept for donations?",
          answer:
            "We accept various payment methods for donations, including credit cards and online payment options.",
        },
        {
          question: "How do I contact JW SkilledHunt support for donation-related queries?",
          answer:
            "Email us at donate@jwskilledhunt.org, and our team will be happy to assist you.",
        },
      ],
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-purple-700 mb-8">
          Frequently Asked Questions
        </h1>
        <div className="space-y-10">
          {faqs.map((section, sectionIndex) => (
            <div key={sectionIndex} className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-purple-600 mb-4">
                {section.category}
              </h2>
              <div>
                {section.questions.map((item, index) => (
                  <div key={index} className="mb-4">
                    <button
                      className="w-full text-left flex justify-between items-center py-2 text-lg font-medium text-gray-700 focus:outline-none"
                      onClick={() => toggleQuestion(`${sectionIndex}-${index}`)}
                    >
                      {item.question}
                      <span className="text-purple-600">
                        {activeQuestion === `${sectionIndex}-${index}` ? "-" : "+"}
                      </span>
                    </button>
                    {activeQuestion === `${sectionIndex}-${index}` && (
                      <p className="mt-2 text-gray-600">{item.answer}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQS;
