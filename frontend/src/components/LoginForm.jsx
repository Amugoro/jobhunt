import { useState } from "react";
import { login, forgotPassword } from "../utils/api"; // Import the forgotPassword API
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleForgotPasswordChange = (e) => {
    setForgotEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { success, user, message } = await login(formData);
    if (success) {
      alert(`Welcome back ${user.fullName}`);
      // Redirect based on role
      if (user.role === "client") {
        navigate("/client-dashboard");
      } else if (user.role === "freelancer") {
        navigate("/freelancer-dashboard");
      } else if (user.role === "tradeperson") {
        navigate("/tradeperson-dashboard");
      }
    } else {
      setErrorMessage(message);
    }
  };

  const handleForgotPassword = async () => {
    if (!forgotEmail) {
      alert("Please enter your email address");
      return;
    }

    const { success, message } = await forgotPassword({ email: forgotEmail });
    if (success) {
      alert("Password reset link has been sent to your email");
      setShowForgotPassword(false);
    } else {
      alert(message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {errorMessage && (
            <p className="text-sm text-red-600">{errorMessage}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Log In
          </button>
        </form>

        <p
          className="mt-4 text-sm text-center text-blue-600 cursor-pointer hover:underline"
          onClick={() => setShowForgotPassword(true)}
        >
          Forgot Password?
        </p>

        <p className="mt-6 text-sm text-center text-gray-600">
        Don't have an account?{" "}
        <a href="/signup" className="text-blue-600 hover:underline">
          Signup in here
        </a>
      </p>

        {/* Forgot Password Modal */}
        {showForgotPassword && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
              <h3 className="text-lg font-bold">Reset Password</h3>
              <input
                type="email"
                value={forgotEmail}
                onChange={handleForgotPasswordChange}
                className="w-full px-4 py-2 border border-gray-300 rounded mt-4"
                placeholder="Enter your email"
              />
              <button
                onClick={handleForgotPassword}
                className="w-full mt-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Send Reset Link
              </button>
              <button
                onClick={() => setShowForgotPassword(false)}
                className="w-full mt-2 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginForm;
