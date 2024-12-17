import React, { useState } from "react";
import { API_URL } from "../../config";

const FeedbackForm = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isOpen, setIsOpen] = useState(false); // State for toggling form visibility
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Handle option change
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    setFormData({});
    setErrors({});
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!selectedOption) newErrors.option = "Please select an option.";
    if (selectedOption === "Hire" && !formData.companyName)
      newErrors.companyName = "Company Name is required.";
    if (selectedOption === "Finding Jobs" && !formData.fullName)
      newErrors.fullName = "Full Name is required.";
    if (selectedOption === "Trade Skills Acquisitions" && !formData.currentTrade)
      newErrors.currentTrade = "Current trade is required.";
    if (selectedOption === "Career Development" && !formData.currentRole)
      newErrors.currentRole = "Current role is required.";
    if (selectedOption === "Other" && !formData.message)
      newErrors.message = "Message is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");  // Reset error message
    setSuccessMessage(""); // Reset success message

    if (!validateForm()) return;

    const formContent = {
      option: selectedOption,
      ...formData,
    };

    setLoading(true);  // Show loading indicator

    try {
      const response = await fetch(`${API_URL}/send-feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formContent),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage(data.message);
        setFormData({});
        setSelectedOption("");
      } else {
        setErrorMessage(data.message || "Error submitting feedback.");
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again later.");
    }

    setLoading(false);  // Hide loading indicator
  };


  return (
    <div>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-10 right-10 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 z-50"
      >
        Feedback
      </button>

      {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

      {/* Feedback Form Popup */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl overflow-y-auto max-h-screen">
            <h2 className="text-2xl font-bold mb-4">Feedback Form</h2>
            <label className="block mb-2 text-gray-700">You Need Assistance With?</label>
            <select
              className="w-full p-2 border rounded-lg mb-4"
              value={selectedOption}
              onChange={handleOptionChange}
            >
              <option value="">Select an option</option>
              <option value="Hire">Hire</option>
              <option value="Finding Jobs">Finding Jobs</option>
              <option value="Trade Skills Acquisitions">Trade Skills Acquisitions</option>
              <option value="Career Development">Career Development</option>
              <option value="Other">Other</option>
            </select>
            {errors.option && <p className="text-red-500">{errors.option}</p>}

            {selectedOption && (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Render Form for "Hire" */}
                {selectedOption === "Hire" && (
                  <>
                    <h3 className="text-lg font-bold">Company Information</h3>
                    <input
                      type="text"
                      name="companyName"
                      placeholder="Company Name"
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-lg"
                    />
                    {errors.companyName && (
                      <p className="text-red-500">{errors.companyName}</p>
                    )}
                    <input
                      type="text"
                      name="industry"
                      placeholder="Industry"
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-lg"
                    />
                    <input
                      type="number"
                      name="employees"
                      placeholder="Number of Employees"
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-lg"
                    />
                    <input
                      type="text"
                      name="location"
                      placeholder="Location"
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-lg"
                    />
                  </>
                )}

                {/* Render Form for "Finding Jobs" */}
                {selectedOption === "Finding Jobs" && (
                  <>
                    <h3 className="text-lg font-bold">Job Seeker Information</h3>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Full Name"
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-lg"
                    />
                    {errors.fullName && <p className="text-red-500">{errors.fullName}</p>}
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-lg"
                    />
                    <input
                      type="text"
                      name="currentRole"
                      placeholder="Current Job Role"
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-lg"
                    />
                  </>
                )}

                {/* Render Form for "Trade Skills Acquisitions" */}
                {selectedOption === "Trade Skills Acquisitions" && (
                  <>
                    <h3 className="text-lg font-bold">Trade Skills Information</h3>
                    <input
                      type="text"
                      name="currentTrade"
                      placeholder="Current Trade"
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-lg"
                    />
                    {errors.currentTrade && (
                      <p className="text-red-500">{errors.currentTrade}</p>
                    )}
                  </>
                )}

                {/* Render Form for "Career Development" */}
                {selectedOption === "Career Development" && (
                  <>
                    <h3 className="text-lg font-bold">Career Development</h3>
                    <input
                      type="text"
                      name="currentRole"
                      placeholder="Current Role"
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-lg"
                    />
                    {errors.currentRole && (
                      <p className="text-red-500">{errors.currentRole}</p>
                    )}
                  </>
                )}

                {/* Render Form for "Other" */}
                {selectedOption === "Other" && (
                  <>
                    <h3 className="text-lg font-bold">Other Feedback</h3>
                    <textarea
                      name="message"
                      placeholder="Your message"
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-lg"
                    />
                    {errors.message && <p className="text-red-500">{errors.message}</p>}
                  </>
                )}

                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded-lg w-full hover:bg-blue-600"
                >
                {loading ? "Submitting..." : "Submit"}
                </button>
              </form>
            )}
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-20 right-20 text-white bg-red-500 p-4 rounded-lg hover:bg-red-600"
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackForm;
