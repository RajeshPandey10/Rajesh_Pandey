import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { loginAdmin, verifyOTP } from "../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [adminId, setAdminId] = useState("");
  const [countdown, setCountdown] = useState(0);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Countdown timer for OTP expiration
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0 && showOTPInput) {
      setShowOTPInput(false);
      setAdminId("");
      toast.error("OTP expired! Please login again.");
    }
    return () => clearTimeout(timer);
  }, [countdown, showOTPInput]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginAdmin(username, password);
      if (data.requiresOTP) {
        setShowOTPInput(true);
        setAdminId(data.adminId);
        setCountdown(30); // 30 seconds countdown
        toast.success(
          "OTP sent to your email! You have 30 seconds to enter it."
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Invalid username or password.");
    }
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await verifyOTP(adminId, otp);
      login(data.token);
      toast.success("Login successful!");
      navigate("/admin");
    } catch (error) {
      console.error("OTP verification error:", error);
      if (error.response?.status === 401) {
        toast.error(error.response.data.message || "Invalid or expired OTP");
        if (error.response.data.message === "OTP expired") {
          setShowOTPInput(false);
          setAdminId("");
          setCountdown(0);
        }
      } else {
        toast.error("OTP verification failed.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          {showOTPInput ? "Enter OTP" : "Admin Login"}
        </h2>

        {!showOTPInput ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-700 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-700 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded transition duration-300"
            >
              Login
            </button>
          </form>
        ) : (
          <form onSubmit={handleOTPSubmit} className="space-y-4">
            <div className="text-center mb-4">
              <p className="text-gray-300 mb-2">OTP sent to your email</p>
              <p className="text-red-400 font-bold">
                Time remaining: {countdown}s
              </p>
            </div>
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-3 border border-gray-700 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg"
              maxLength="6"
              required
              autoFocus
            />
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded transition duration-300"
              disabled={countdown === 0}
            >
              Verify OTP
            </button>
            <button
              type="button"
              onClick={() => {
                setShowOTPInput(false);
                setAdminId("");
                setOtp("");
                setCountdown(0);
              }}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 rounded transition duration-300"
            >
              Back to Login
            </button>
          </form>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Login;
