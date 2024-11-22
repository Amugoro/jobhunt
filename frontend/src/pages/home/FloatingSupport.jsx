import React, { useState } from "react";

const FloatingSupport = () => {
  const [open, setOpen] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(null);

  const toggleAnswer = (index) => {
    setActiveQuestion((prev) => (prev === index ? null : index));
  };

  const supportQuestions = [
    {
      question: "Are you looking for a job?",
      answer: "Browse our job listings and apply today to kickstart your career!",
    },
    {
      question: "Are you looking for a skilled person or freelancer?",
      answer:
        "Connect with skilled tradespeople or freelancers using our search feature. Post your requirements to find the right match!",
    },
    {
      question: "Do you need help in signing up?",
      answer: "Check out our step-by-step signup guide or contact support for assistance.",
    },
    {
      question: "You can chat with a support personnel on WhatsApp.",
      answer: (
        <a
          href="https://wa.me/1234567890" // Replace with your WhatsApp link
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          Click here to chat on WhatsApp.
        </a>
      ),
    },
    {
      question: "How can I update my profile?",
      answer: "Go to your account settings and edit your details to update your profile.",
    },
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-purple-400 text-white p-6 rounded-lg shadow-lg hover:bg-purple-700 focus:outline-none"
      >
        {open ? "Close" : "Do you need asistant? click me"}
      </button>

      {/* Support Box */}
      {open && (
        <div className="bg-white w-80 p-4 rounded-lg shadow-lg mt-3 transition-all duration-300">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">
            How may I help you?
          </h3>
          <div>
            {supportQuestions.map((item, index) => (
              <div key={index} className="mb-4">
                {/* Question */}
                <button
                  onClick={() => toggleAnswer(index)}
                  className="text-left w-full text-purple-600 font-medium focus:outline-none"
                >
                  {item.question}
                </button>
                {/* Answer */}
                {activeQuestion === index && (
                  <div className="mt-2 text-sm text-gray-600">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingSupport;
